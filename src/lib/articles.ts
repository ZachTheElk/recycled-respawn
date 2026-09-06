import type { CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;

export const ARTICLE_SECTIONS = ['gaming', 'culture', 'features'] as const;
export type ArticleSection = (typeof ARTICLE_SECTIONS)[number];

export type ArticleType = ArticleEntry['data']['type'];

export interface StoryImage {
	src?: string;
	alt: string;
}

export interface NormalizedStory {
	id: string;
	section: ArticleSection;
	displaySection: string;
	type: ArticleType;
	formatLabel?: string;
	headline: string;
	dek?: string;
	author: string;
	publicationDate: string;
	publicationDatetime: string;
	readTime: string;
	// null explicitly identifies development records that have no public article route.
	href: string | null;
	image?: StoryImage;
	developmentOnly: boolean;
}

export interface HomepageDevelopmentRecord {
	id: string;
	section: ArticleSection;
	type: ArticleType;
	formatLabel?: string;
	title: string;
	dek?: string;
	author: 'Development sample — not ZachTheElk';
	publishedAt: Date;
	readTimeMinutes: number;
	image?: StoryImage;
}

export function getArticleUrl(article: Pick<ArticleEntry, 'id' | 'data'>) {
	return `/${article.data.section}/${article.id}/`;
}

export function getPublishedArticles(articles: ArticleEntry[]) {
	return articles.filter((article) => !article.data.draft);
}

export function getSectionArticles(articles: ArticleEntry[], section: ArticleSection) {
	return getPublishedArticles(articles)
		.filter((article) => article.data.section === section)
		.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
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

export function formatArticleSection(section: ArticleSection) {
	return section.charAt(0).toUpperCase() + section.slice(1);
}
