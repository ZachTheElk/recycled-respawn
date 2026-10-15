export interface SiteUpdate {
	title: string;
	date?: Date;
	text: string;
	href?: string;
	linkLabel?: string;
	developmentOnly?: boolean;
}

// Approved public-state copy for the October 17 launch candidate.
export const siteUpdate: SiteUpdate = {
	title: 'Respawned.',
	date: new Date('2026-10-17T15:00:00-04:00'),
	text: 'Recycled Respawn is live. Respawning means getting another shot, so I’m taking mine, writing what I want, at my own pace, without scores, news churn, or content for content’s sake.',
	developmentOnly: false,
};
