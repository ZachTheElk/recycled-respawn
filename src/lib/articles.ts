import type { CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;

export function getArticleUrl(article: Pick<ArticleEntry, 'id' | 'data'>) {
	return `/${article.data.section}/${article.id}/`;
}

export function getPublishedArticles(articles: ArticleEntry[]) {
	return articles.filter((article) => !article.data.draft);
}

export function estimateReadTime(markdown: string) {
	const words = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_~|\-]/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;

	return Math.max(1, Math.ceil(words / 225));
}

export function formatArticleDate(date: Date) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'America/New_York',
	}).format(date);
}
