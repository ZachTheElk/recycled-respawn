export interface PlayerStatusEntry {
	label: 'Now Playing' | 'Just Finished' | 'Stuck On' | 'Up Next';
	title?: string;
	text: string;
}

// Manually maintained editorial status, not live activity. Omit unused rows entirely.
export const playerStatus: PlayerStatusEntry[] = [
	{
		label: 'Now Playing',
		title: 'The Witcher 3',
		text: 'Swords, signs, and side quests that swallow whole evenings.',
	},
	{
		label: 'Stuck On',
		text: 'Too many games, not enough evenings.',
	},
	{
		label: 'Up Next',
		text: 'Preparing for GTA VI.',
	},
];
