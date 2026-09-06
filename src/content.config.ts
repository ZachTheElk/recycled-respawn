import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
	schema: ({ image }) => {
		const hero = z
			.object({
				image: image(),
				alt: z.string().min(1),
				caption: z.string().optional(),
				credit: z.string().min(1),
				provenance: z.enum(['capture', 'official', 'licensed', 'custom']),
				sourceUrl: z.string().url().optional(),
				license: z.string().optional(),
			})
			.superRefine((heroData, context) => {
				if (['official', 'licensed'].includes(heroData.provenance) && !heroData.sourceUrl) {
					context.addIssue({
						code: 'custom',
						message: 'Official and licensed images require a source URL.',
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
