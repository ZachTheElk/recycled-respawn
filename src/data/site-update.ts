export interface SiteUpdate {
	title: string;
	date: Date;
	text: string;
	href?: string;
	linkLabel?: string;
	developmentOnly?: boolean;
}

// Manually maintained publication note. Replace this provisional copy before launch.
export const siteUpdate: SiteUpdate = {
	title: 'Building the publication',
	date: new Date('2026-09-06T12:00:00-04:00'),
	text: 'The publication structure is taking shape while the first real stories are prepared.',
	developmentOnly: true,
};
