export interface PlayerStatusEntry {
	label: 'Now Playing' | 'Just Finished' | 'Stuck On' | 'Up Next';
	title?: string;
	text: string;
}

// Manually maintained editorial status, not live activity. Omit unused rows entirely.
export const playerStatus: PlayerStatusEntry[] = [
	{
		label: 'Now Playing',
		title: 'Star Wars: Galactic Racer',
		text: 'Takes me right back to playing Star Wars: Episode I Racer as a kid.',
	},
	{
		label: 'Stuck On',
		text: 'Finding time to return to Valheim.',
	},
	{
		label: 'Up Next',
		text: 'Preparing for GTA VI.',
	},
];
