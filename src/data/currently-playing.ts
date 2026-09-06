export interface CurrentlyPlayingEntry {
	title: string;
	platform: string;
	status?: string;
	context?: string;
}

// Manually maintained. Keep this list to the games Zach is genuinely playing lately.
export const currentlyPlaying: CurrentlyPlayingEntry[] = [
	{
		title: 'Star Wars Zero Company',
		platform: 'PC',
		status: 'Campaign in progress',
		context: 'Current focus; notes may become future coverage.',
	},
];
