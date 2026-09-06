import type { HomepageDevelopmentRecord } from '../lib/articles';

// PRE-LAUNCH PLACEHOLDER AUDIT: non-routable normalized records used only to preserve
// approved homepage compositions until real collection entries replace them.
// These are not articles and must never be attributed to ZachTheElk.
export const homepageDevelopmentRecords: HomepageDevelopmentRecord[] = [
	{
		id: 'dev-column-choosing-what-to-play', section: 'gaming', type: 'opinion', formatLabel: 'Opinion',
		title: 'The Ritual of Choosing What to Play Is Half the Experience',
		dek: 'A development-only layout sample about the anticipation, indecision, and small personal rituals that can matter as much as pressing Start.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-05T12:00:00-04:00'), readTimeMinutes: 4,
	},
	{
		id: 'dev-gaming-familiar-world', section: 'gaming', type: 'article',
		title: 'What Changes When a Familiar World Stops Asking You to Hurry',
		dek: 'A layout sample considering how slower goals and repeated routes can turn progress into a different kind of play.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-05T12:00:00-04:00'), readTimeMinutes: 7,
		image: { alt: 'Development-only Gaming image placeholder; no editorial image has been selected.' },
	},
	{
		id: 'dev-gaming-memorable-map', section: 'gaming', type: 'article',
		title: 'A Good Map Can Be More Memorable Than the Destination',
		dek: 'Development-only copy for testing a compact supporting story with a short excerpt.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-05T12:00:00-04:00'), readTimeMinutes: 5,
	},
	{
		id: 'dev-gaming-review-layout', section: 'gaming', type: 'review',
		title: 'Testing How Reviews Fit Without Turning Into Scores',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-05T12:00:00-04:00'), readTimeMinutes: 8,
	},
	{
		id: 'dev-gaming-interface-detail', section: 'gaming', type: 'article',
		title: 'The Small Interface Detail That Changes an Entire Routine',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-05T12:00:00-04:00'), readTimeMinutes: 4,
	},
	{
		id: 'dev-culture-interface-memory', section: 'culture', type: 'article',
		title: 'When the Interface Becomes Part of the Memory',
		dek: 'A development-only layout sample about the menus, sounds, and small digital rituals that linger after the technology itself changes.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 6,
		image: { alt: 'Development-only Culture image placeholder; no editorial image has been selected.' },
	},
	{
		id: 'dev-culture-skip-the-intro', section: 'culture', type: 'article', formatLabel: 'Media note',
		title: 'The Comfort of Knowing Exactly When to Skip the Intro',
		dek: 'Development-only copy testing one compact Culture item with supporting context.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 4,
	},
	{
		id: 'dev-culture-community-archive', section: 'culture', type: 'article', formatLabel: 'Internet culture',
		title: 'A Community Archive Can Outlast the Platform That Needed It',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 5,
	},
	{
		id: 'dev-culture-convenience-habits', section: 'culture', type: 'article', formatLabel: 'Technology',
		title: 'Convenience Changes Faster Than Our Habits Do',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 3,
	},
	{
		id: 'dev-features-teaching-rules', section: 'features', type: 'article', formatLabel: 'Design analysis',
		title: 'What a Game Teaches Us Before It Explains a Single Rule',
		dek: 'A development-only layout sample following the quiet ways spaces, consequences, and repeated choices can teach a system more effectively than instructions do.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 12,
	},
	{
		id: 'dev-features-interface-hardware', section: 'features', type: 'article', formatLabel: 'Historical thread',
		title: 'The Interface Ideas That Survived Their Original Hardware',
		dek: 'Development-only copy testing an evergreen feature with a restrained supporting image.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 9,
		image: { alt: 'Development-only Features image placeholder; no editorial image has been selected.' },
	},
	{
		id: 'dev-features-useful-friction', section: 'features', type: 'article', formatLabel: 'Essay',
		title: 'Why Useful Friction Can Make a Digital Place Feel Real',
		dek: 'A development-only sample about the difference between an obstacle and a system that gives decisions weight.',
		author: 'Development sample — not ZachTheElk', publishedAt: new Date('2026-09-06T12:00:00-04:00'), readTimeMinutes: 8,
	},
];
