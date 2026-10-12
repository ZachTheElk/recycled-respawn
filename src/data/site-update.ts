export interface SiteUpdate {
	title: string;
	date?: Date;
	text: string;
	href?: string;
	linkLabel?: string;
	developmentOnly?: boolean;
}

// Approved launch copy for pre-launch review. The actual launch date is not set.
// Retain the disclosure until the coordinated publication transition is approved.
export const siteUpdate: SiteUpdate = {
	title: 'Respawned.',
	text: 'Recycled Respawn is live. Respawning means getting another shot, so I’m taking mine, writing what I want, at my own pace, without scores, news churn, or content for content’s sake.',
	developmentOnly: true,
};
