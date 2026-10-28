import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleFiles = glob({ base: './src/content/articles', pattern: '**/*.md' });

const articles = defineCollection({
	loader: {
		name: 'articles-with-draft-boundary',
		async load(context) {
			await articleFiles.load(context);
			// Route filtering happens too late to exclude content images from the asset graph.
			// Remove drafts before Astro writes the collection's asset imports for ordinary builds.
			if (import.meta.env.DEV || process.env.CONTEXT === 'deploy-preview') return;
			for (const [id, entry] of context.store.entries()) {
				if (entry.data.draft === true) context.store.delete(id);
			}
		},
	},
	schema: ({ image }) => {
		const hero = z
			.object({
				image: image(),
				alt: z.string().min(1),
				caption: z.string().optional(),
				credit: z.string().min(1),
				provenance: z.enum(['capture', 'official', 'licensed', 'custom', 'editorial']),
				sourceUrl: z.string().url().optional(),
				license: z.string().optional(),
				licenseUrl: z.string().url().optional(),
			})
			.superRefine((heroData, context) => {
				if (['official', 'licensed', 'editorial'].includes(heroData.provenance) && !heroData.sourceUrl) {
					context.addIssue({
						code: 'custom',
						message: 'Official, licensed, and editorial images require a source URL.',
						path: ['sourceUrl'],
					});
				}

				if (heroData.provenance === 'licensed' && !heroData.license) {
					context.addIssue({
						code: 'custom',
						message: 'Licensed images require license information.',
						path: ['license'],
					});
				}
			});

		return z
			.object({
				title: z.string().min(1),
				dek: z.string().min(1),
				author: z.string().min(1),
				section: z.enum(['gaming', 'culture', 'features']),
				type: z.enum(['article', 'opinion', 'review']),
				publishedAt: z.coerce.date(),
				draft: z.boolean(),
				updatedAt: z.coerce.date().optional(),
				formatLabel: z.string().min(1).optional(),
				seoDescription: z.string().min(1).optional(),
				hero: hero.optional(),
				corrections: z
					.array(
						z.object({
							date: z.coerce.date(),
							note: z.string().min(1),
						}),
					)
					.optional(),
			})
			.superRefine((article, context) => {
				if (article.updatedAt && article.updatedAt < article.publishedAt) {
					context.addIssue({
						code: 'custom',
						message: 'updatedAt cannot be earlier than publishedAt.',
						path: ['updatedAt'],
					});
				}
			});
	},
});

export const collections = { articles };
