import { getCollection } from 'astro:content';
import { isPrivatePreviewArticle } from './private-preview';
import {
	estimateReadTime,
	formatArticleDate,
	formatArticleSection,
	getArticleUrl,
	type ArticleEntry,
	type NormalizedStory,
} from '../lib/articles';

// Homepage placement is editorial curation state, never article frontmatter.
// Only these explicitly curated, allowlisted drafts are eligible during private review.
export const homepageCuration = {
	featured: 'can-you-pet-that-dog',
	column: 'the-man-of-a-thousand-voices-playing-one',
	gaming: {
		lead: 'just-enough-rope',
		supporting: ['late-doesnt-mean-secondary'],
	},
	features: {
		primary: 'every-word-carries-luggage',
	},
} as const;

function normalizeArticle(article: ArticleEntry): NormalizedStory {
	const isPrivatePreview = article.data.draft;
	const date = formatArticleDate(article.data.publishedAt);
	return {
		id: article.id,
		section: article.data.section,
		displaySection: formatArticleSection(article.data.section),
		type: article.data.type,
		formatLabel: article.data.formatLabel,
		headline: article.data.title,
		dek: article.data.dek,
		author: article.data.author,
		publicationDate: isPrivatePreview ? `Draft snapshot ${date}` : date,
		publicationDatetime: article.data.publishedAt.toISOString(),
		readTime: `${estimateReadTime(article.body ?? '')} min read`,
		href: getArticleUrl(article),
		image: article.data.hero ? {
			src: article.data.hero.image.src,
			asset: article.data.hero.image,
			alt: article.data.hero.alt,
			credit: article.data.hero.credit,
			sourceUrl: article.data.hero.sourceUrl,
			license: article.data.hero.license,
			licenseUrl: article.data.hero.licenseUrl,
		} : undefined,
		developmentOnly: false,
		isPrivatePreview,
	};
}

export async function getHomepageStories() {
	const articles = await getCollection('articles');
	const isPreview = import.meta.env.DEV || process.env.CONTEXT === 'deploy-preview';

	function curatedStory(id: string, section: ArticleEntry['data']['section'], type: ArticleEntry['data']['type']) {
		const article = articles.find((entry) => entry.id === id);
		if (!article || article.data.section !== section || article.data.type !== type) {
			throw new Error(`Homepage curation requires its approved article: ${id}`);
		}
		if (article.data.draft) {
			if (!isPreview) return undefined;
			if (!isPrivatePreviewArticle(id)) throw new Error(`Homepage draft must be explicitly allowlisted: ${id}`);
		}
		return normalizeArticle(article);
	}

	return {
		featuredStory: curatedStory(homepageCuration.featured, 'culture', 'article'),
		newestColumn: curatedStory(homepageCuration.column, 'gaming', 'opinion'),
		gamingSection: {
			leadStory: curatedStory(homepageCuration.gaming.lead, 'gaming', 'opinion'),
			supportingStories: homepageCuration.gaming.supporting
				.map((id) => curatedStory(id, 'gaming', 'opinion'))
				.filter((story): story is NormalizedStory => Boolean(story)),
		},
		featuresSection: {
			primaryStory: curatedStory(homepageCuration.features.primary, 'features', 'article'),
		},
	};
}
