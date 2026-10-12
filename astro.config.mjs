// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://recycledrespawn.com',
	// Deploy Previews generate allowlisted draft routes for private review.
	integrations: process.env.CONTEXT === 'deploy-preview' ? [] : [sitemap()],
});
