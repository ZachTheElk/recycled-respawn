// The seven launch articles are public in this candidate. Future drafts require explicit opt-in.
export const PRIVATE_PREVIEW_ARTICLE_IDS: readonly string[] = ['what-bioware-handed-over'];

export function isPrivatePreviewArticle(articleId: string) {
	return PRIVATE_PREVIEW_ARTICLE_IDS.some((previewId) => previewId === articleId);
}
