export const DEVELOPMENT_FIXTURE_ID = 'content-foundation-fixture';

export const PRIVATE_PREVIEW_ARTICLE_IDS = [
	DEVELOPMENT_FIXTURE_ID,
	'every-word-carries-luggage',
	'can-you-pet-that-dog',
	'just-enough-rope',
] as const;

export function isPrivatePreviewArticle(articleId: string) {
	return PRIVATE_PREVIEW_ARTICLE_IDS.some((previewId) => previewId === articleId);
}
