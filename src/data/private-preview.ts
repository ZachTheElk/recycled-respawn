export const PRIVATE_PREVIEW_ARTICLE_IDS = [
	'every-word-carries-luggage',
	'can-you-pet-that-dog',
	'just-enough-rope',
	'late-doesnt-mean-secondary',
	'the-man-of-a-thousand-voices-playing-one',
	'galactic-racer-review',
	'never-trust-the-quiet-ones',
] as const;

export function isPrivatePreviewArticle(articleId: string) {
	return PRIVATE_PREVIEW_ARTICLE_IDS.some((previewId) => previewId === articleId);
}
