// Run with Node after npm install. All fixtures/builds live in a disposable copy.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const source = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const work = await mkdtemp(path.join(tmpdir(), 'rr-publishing-'));
const env = { ...process.env, CONTEXT: 'production', ASTRO_TELEMETRY_DISABLED: '1' };
const cli = path.join(source, 'node_modules/astro/bin/astro.mjs');
const markers = ['rr-regression-allowed', 'rr-regression-unlisted'];
let devStarted = false;

function astro(args, context = 'production') {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: work, env: { ...env, CONTEXT: context }, encoding: 'utf8', timeout: 180_000,
  });
  assert.equal(result.status, 0, `${args.join(' ')} failed\n${result.stdout}\n${result.stderr}\n${result.error ?? ''}`);
}

async function files(dir, prefix = '') {
  const result = new Map();
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) {
      for (const [key, value] of await files(path.join(dir, entry.name), name + '/')) result.set(key, value);
    } else result.set(name, await readFile(path.join(dir, entry.name)));
  }
  return result;
}

async function build(context) {
  // These paths are fixed children of this run's newly created temporary directory.
  await rm(path.join(work, 'dist'), { recursive: true, force: true });
  await rm(path.join(work, '.astro'), { recursive: true, force: true });
  astro(['build'], context);
  return files(path.join(work, 'dist'));
}

function fingerprint(artifact) {
  return [...artifact].map(([name, bytes]) => [name, createHash('sha256').update(bytes).digest('hex')])
    .sort(([a], [b]) => a.localeCompare(b));
}

function publicChecks(artifact, sitemap = true) {
  const articles = [];
  for (const [name, bytes] of artifact) {
    if (!name.endsWith('.html')) continue;
    const html = bytes.toString();
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${name}: primary heading`);
    assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, `${name}: main landmark`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g) ?? [];
    if (name === '404.html') {
      assert.equal(canonical.length, 0);
      assert.match(html, /name="robots" content="noindex, nofollow"/);
      continue;
    }
    // Existing allowlisted draft pages are deliberately excluded from public metadata checks.
    if (html.includes('name="robots" content="noindex, nofollow"')) continue;
    assert.equal(canonical.length, 1, `${name}: canonical`);
    const url = canonical[0].match(/href="([^"]+)"/)[1];
    assert.equal(url, 'https://recycledrespawn.com/' + name.replace(/index\.html$/, ''));
    assert.ok(html.includes(`property="og:url" content="${url}"`));
    const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    const twitter = html.match(/name="twitter:image" content="([^"]+)"/)?.[1];
    assert.equal(twitter, og, `${name}: social image consistency`);
    if (og) assert.ok(artifact.has(new URL(og).pathname.slice(1)), `${name}: social image exists`);
    for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      const data = JSON.parse(match[1]);
      if (data['@type'] !== 'Article') continue;
      articles.push(url);
      assert.equal(data.url, url);
      assert.equal(data.image, og);
      assert.ok(html.includes(`property="article:published_time" content="${data.datePublished}"`));
      if (data.dateModified) assert.ok(new Date(data.dateModified) >= new Date(data.datePublished));
    }
  }
  const rss = artifact.get('rss.xml').toString();
  const rssUrls = [...rss.matchAll(/<item>(.*?)<\/item>/gs)].map(m => m[1].match(/<link>(.*?)<\/link>/s)[1]);
  assert.deepEqual(rssUrls.sort(), articles.sort(), 'RSS must match public article routes');
  if (sitemap) {
    const xml = [...artifact].filter(([name]) => /^sitemap.*\.xml$/.test(name)).map(([, b]) => b.toString()).join('');
    const urls = [...xml.matchAll(/<loc>(https:\/\/recycledrespawn.com\/(?:gaming|culture|features)\/[^/]+\/)<\/loc>/g)].map(m => m[1]);
    assert.deepEqual(urls.sort(), articles.sort(), 'Sitemap must match public article routes');
  }
  return articles.length;
}

function draftPage(html) {
  assert.match(html, /Private preview/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.ok(!html.includes('application/ld+json'));
  assert.ok(!html.includes('article:published_time'));
  assert.ok(!html.includes('property="og:image"'));
  for (let i = 0; i < 3; i++) assert.ok(html.includes(`alt="Regression image ${i}"`));
}

try {
  for (const name of ['src', 'public', 'package.json', 'astro.config.mjs', 'tsconfig.json']) {
    await cp(path.join(source, name), path.join(work, name), { recursive: true });
  }
  await symlink(path.join(source, 'node_modules'), path.join(work, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
  console.log('Building clean production baseline…');
  const baseline = await build('production');
  const count = publicChecks(baseline);
  for (const [index, marker] of markers.entries()) {
    const dir = path.join(work, 'src/content/articles', marker);
    await mkdir(dir);
    for (let i = 0; i < 3; i++) {
      // Distinct local images, created only inside the disposable copy.
      await writeFile(path.join(dir, `${marker}-${i}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" width="${30 + i}" height="${30 + index}"><rect width="100%" height="100%" fill="#24557d"/></svg>`);
    }
    await writeFile(path.join(dir, 'index.md'), `---\ntitle: ${marker}\ndek: ${marker} description\nauthor: Regression fixture\nsection: features\ntype: article\npublishedAt: 2020-01-01T12:00:00Z\ndraft: true\nhero:\n  image: ./${marker}-0.svg\n  alt: Regression image 0\n  credit: Regression fixture\n  provenance: custom\n---\n${marker} body\n\n![Regression image 1](./${marker}-1.svg)\n\n![Regression image 2](./${marker}-2.svg)\n`);
  }
  const allowlist = path.join(work, 'src/data/private-preview.ts');
  const original = await readFile(allowlist, 'utf8');
  assert.ok(original.includes('= ['), 'Expected existing explicit allowlist declaration');
  await writeFile(allowlist, original.replace('= [', `= ['${markers[0]}', `));

  console.log('Checking production with two drafts and six local images…');
  const production = await build('production');
  assert.deepEqual(fingerprint(production), fingerprint(baseline), 'Drafts must not change ANY production artifact');
  for (const [name, bytes] of production) for (const marker of markers) {
    assert.ok(!name.includes(marker) && !bytes.includes(marker), `Draft leaked: ${name}`);
  }

  console.log('Checking clean Deploy Preview…');
  const preview = await build('deploy-preview');
  draftPage(preview.get(`features/${markers[0]}/index.html`)?.toString() ?? '');
  assert.ok(!preview.has(`features/${markers[1]}/index.html`), 'Unlisted draft route must not render');
  for (let i = 0; i < 3; i++) assert.ok([...preview.keys()].some(name => name.includes(`${markers[0]}-${i}`)), 'Preview image missing');
  for (const [name, bytes] of preview) if (name === 'index.html' || name === 'rss.xml' || /^(gaming|culture|features)\/index.html$/.test(name)) {
    for (const marker of markers) assert.ok(!bytes.includes(marker), `${name}: drafts must not enter public listings`);
  }
  assert.ok(![...preview.keys()].some(name => name.startsWith('sitemap')), 'Preview sitemap must be absent');
  assert.equal(publicChecks(preview, false), count);

  console.log('Checking isolated local development…');
  // Astro chooses an available port; its status command reports the actual address.
  devStarted = true;
  astro(['dev', '--background', '--host', '127.0.0.1', '--port', '14321'], '');
  const status = spawnSync(process.execPath, [cli, 'dev', 'status'], { cwd: work, env, encoding: 'utf8' });
  const origin = (status.stdout + status.stderr).match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
  assert.ok(origin, `Cannot locate dev server: ${status.stdout} ${status.stderr}`);
  const response = await fetch(`${origin}/features/${markers[0]}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  draftPage(html);
  for (const match of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) assert.equal((await fetch(new URL(match[1].replaceAll('&amp;', '&'), origin))).status, 200);
  assert.equal((await fetch(`${origin}/features/${markers[1]}/`)).status, 404);
  for (const route of ['/', '/features/', '/rss.xml']) {
    const text = await (await fetch(origin + route)).text();
    for (const marker of markers) assert.ok(!text.includes(marker), `${route}: draft listing leak in dev`);
  }
  console.log(`PASS: ${count} published articles; production artifact unchanged (${baseline.size} files); draft package, preview and local-development checks passed.`);
} finally {
  if (devStarted) astro(['dev', 'stop'], '');
  // Remove the dependency link first, never traverse the original installed dependencies.
  await rm(path.join(work, 'node_modules'), { force: true, recursive: true });
  await rm(work, { recursive: true, force: true });
}
