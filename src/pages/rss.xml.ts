import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getArticleUrl, getPublishedArticles } from '../lib/articles';

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error('RSS requires the canonical Astro site URL.');

	const articles = await getCollection('articles');

	return rss({
		title: 'Recycled Respawn',
		description: 'An independent gaming and culture publication.',
		site,
		items: getPublishedArticles(articles)
			.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
			.map((article) => ({
				title: article.data.title,
				description: article.data.dek,
				pubDate: article.data.publishedAt,
				link: new URL(getArticleUrl(article), site).href,
			})),
		customData: '<language>en-us</language>',
	});
};
