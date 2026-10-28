export interface SiteUpdate {
	title: string;
	date: Date;
	text: string;
	href?: string;
	linkLabel?: string;
	developmentOnly?: boolean;
}

// Keep every approved entry. Dates determine newest-first display; homepage shows three.
export const siteUpdates: SiteUpdate[] = [
	{
		title: 'Still here.',
		date: new Date('2026-10-28T12:00:00-04:00'),
		text: "Two weeks in: the Breen diary became an essay and a video, the old internet got its essay, and BioWare got its farewell. The site itself got a share card and proper search descriptions. Same pace, same rules — no scores, no content for content's sake.",
	},
	{
		title: 'Respawned.',
		date: new Date('2026-10-17T15:00:00-04:00'),
		text: "Recycled Respawn is live. Respawning means getting another shot, so I'm taking mine. Writing what I want at my own pace, without scores or content for content's sake.",
		developmentOnly: false,
	},
].sort((a, b) => b.date.getTime() - a.date.getTime());
