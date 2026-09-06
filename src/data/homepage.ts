import { getCollection } from 'astro:content';
import { DEVELOPMENT_FIXTURE_ID } from './content-foundation';
import { homepageDevelopmentRecords } from './homepage-development-records';
import {
	estimateReadTime,
	formatArticleDate,
	formatArticleSection,
	getArticleUrl,
	type ArticleEntry,
	type NormalizedStory,
} from '../lib/articles';

// Homepage placement is editorial curation state, never article frontmatter.
export const homepageCuration = {
	featured: DEVELOPMENT_FIXTURE_ID,
	column: 'dev-column-choosing-what-to-play',
	gaming: {
		lead: 'dev-gaming-familiar-world',
		supporting: ['dev-gaming-memorable-map', 'dev-gaming-review-layout', 'dev-gaming-interface-detail'],
	},
	culture: {
		lead: 'dev-culture-interface-memory',
		briefs: ['dev-culture-skip-the-intro', 'dev-culture-community-archive', 'dev-culture-convenience-habits'],
	},
	features: {
		primary: 'dev-features-teaching-rules',
		secondary: ['dev-features-interface-hardware', 'dev-features-useful-friction'],
	},
} as const;

function normalizeArticle(article: ArticleEntry): NormalizedStory {
	return {
		id: article.id,
		section: article.data.section,
		displaySection: formatArticleSection(article.data.section),
		type: article.data.type,
		formatLabel: article.data.formatLabel,
		headline: article.data.title,
		dek: article.data.dek,
		author: article.data.author,
		publicationDate: `Development fixture date: ${formatArticleDate(article.data.publishedAt)}`,
		publicationDatetime: article.data.publishedAt.toISOString(),
		readTime: `${estimateReadTime(article.body ?? '')} min read fixture`,
		href: getArticleUrl(article),
		image: article.data.hero ? { src: article.data.hero.image.src, alt: article.data.hero.alt } : undefined,
		developmentOnly: article.id === DEVELOPMENT_FIXTURE_ID,
	};
}

function requireStory(stories: Map<string, NormalizedStory>, id: string, slot: string) {
	const story = stories.get(id);

	if (!story) {
		throw new Error(`Required homepage curation reference is missing: ${slot} -> ${id}`);
	}

	return story;
}

export async function getHomepageStories() {
	const articles = await getCollection('articles');
	const stories = new Map<string, NormalizedStory>();

	for (const article of articles) {
		if (!article.data.draft || article.id === DEVELOPMENT_FIXTURE_ID) {
			stories.set(article.id, normalizeArticle(article));
		}
	}

	for (const record of homepageDevelopmentRecords) {
		if (stories.has(record.id)) {
			throw new Error(`Homepage development record conflicts with article ID: ${record.id}`);
		}

		stories.set(record.id, {
			id: record.id,
			section: record.section,
			displaySection: formatArticleSection(record.section),
			type: record.type,
			formatLabel: record.formatLabel,
			headline: record.title,
			dek: record.dek,
			author: record.author,
			publicationDate: `Sample date: ${formatArticleDate(record.publishedAt)}`,
			publicationDatetime: record.publishedAt.toISOString(),
			readTime: `${record.readTimeMinutes} min read sample`,
			href: null,
			image: record.image,
			developmentOnly: true,
		});
	}

	return {
		featuredStory: requireStory(stories, homepageCuration.featured, 'featured'),
		newestColumn: requireStory(stories, homepageCuration.column, 'column'),
		gamingSection: {
			leadStory: requireStory(stories, homepageCuration.gaming.lead, 'gaming.lead'),
			supportingStories: homepageCuration.gaming.supporting.map((id, index) =>
				requireStory(stories, id, `gaming.supporting[${index}]`),
			),
		},
		cultureSection: {
			leadStory: requireStory(stories, homepageCuration.culture.lead, 'culture.lead'),
			briefs: homepageCuration.culture.briefs.map((id, index) =>
				requireStory(stories, id, `culture.briefs[${index}]`),
			),
		},
		featuresSection: {
			primaryStory: requireStory(stories, homepageCuration.features.primary, 'features.primary'),
			secondaryStories: homepageCuration.features.secondary.map((id, index) =>
				requireStory(stories, id, `features.secondary[${index}]`),
			),
		},
	};
}
