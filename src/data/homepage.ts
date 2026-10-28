import { getCollection } from 'astro:content';
import { isPrivatePreviewArticle } from './private-preview';
import {
	estimateReadTime,
	getRecentArticles,
	formatArticleDate,
	formatArticleSection,
	getArticleUrl,
	type ArticleEntry,
	type NormalizedStory,
} from '../lib/articles';

// Homepage placement is editorial curation state, never article frontmatter.
// Drafts require explicit allowlisting during private review; published stories are public.
export const homepageCuration = {
	// Set a published article ID for a deliberate override; null follows newest site-wide.
	featured: null as string | null,
	column: 'never-trust-the-quiet-ones',
	gaming: {
		lead: 'just-enough-rope',
		supporting: [
			{ id: 'late-doesnt-mean-secondary', type: 'opinion' },
			{ id: 'galactic-racer-review', type: 'review' },
		],
	},
	culture: {
		lead: 'the-internet-used-to-be-stupid-on-purpose',
	},
	features: {
		primary: 'everything-got-written-down',
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
			credit: article.data.hero.credit.replace(' Uncropped; resized and converted to WebP for display.', ''),
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

	const featuredArticle = homepageCuration.featured === null
		? getRecentArticles(articles, 1)[0]
		: articles.find((article) => article.id === homepageCuration.featured && !article.data.draft);
	if (homepageCuration.featured !== null && !featuredArticle) {
		throw new Error(`Featured Story override requires a published article: ${homepageCuration.featured}`);
	}

	return {
		featuredStory: featuredArticle ? normalizeArticle(featuredArticle) : undefined,
		newestColumn: curatedStory(homepageCuration.column, 'gaming', 'opinion'),
		gamingSection: {
			leadStory: curatedStory(homepageCuration.gaming.lead, 'gaming', 'opinion'),
			supportingStories: homepageCuration.gaming.supporting
				.map(({ id, type }) => curatedStory(id, 'gaming', type))
				.filter((story): story is NormalizedStory => Boolean(story)),
		},
		cultureSection: {
			leadStory: curatedStory(homepageCuration.culture.lead, 'culture', 'article'),
		},
		featuresSection: {
			primaryStory: curatedStory(homepageCuration.features.primary, 'features', 'article'),
		},
	};
}
