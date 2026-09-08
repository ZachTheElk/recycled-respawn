export const DEVELOPMENT_FIXTURE_ID = 'content-foundation-fixture';

export const PRIVATE_PREVIEW_ARTICLE_IDS = [
	DEVELOPMENT_FIXTURE_ID,
	'zero-company-draft-0-workflow-test',
] as const;

export function isPrivatePreviewArticle(articleId: string) {
	return PRIVATE_PREVIEW_ARTICLE_IDS.some((previewId) => previewId === articleId);
}
