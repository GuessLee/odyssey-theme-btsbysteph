// Wedding footage for the home page reel wall and the /reels library.
//
// Every entry is real footage already hosted in the btsbs S3 bucket. A clip can
// surface as several tiles: each entry in `moments` is a point in that clip with
// its own cover image, and tapping the tile opens the clip at that second.
//
// To add a clip: upload the web-ready MP4 to the bucket, drop a 540x960 cover
// per moment into src/assets/clips/ (file name = `cover` + .jpg), add the clip
// here, then list its covers in `tileOrder` below.

const clipBaseUrl = 'https://btsbs.s3.us-east-2.amazonaws.com/';

// Filter order. A moment with no tiles renders as a disabled chip, so the gaps
// in the library (no getting-ready or ceremony footage yet) stay visible.
export const moments = [
	'Getting ready',
	'Ceremony',
	'Portraits',
	'Details',
	'Reception',
	'Dance floor',
	'After dark',
	'Venue',
];

// `wedding` groups clips for the library's by-wedding selector. Leave it null
// until the couple has agreed to be named; the selector only appears once at
// least two weddings are named.
const clips = [
	{
		id: 'heart-shades',
		file: 'C9nBkdVRoJ5.mp4',
		wedding: null,
		moments: [
			{
				cover: 'heart-shaped-sunglasses',
				label: 'Heart-shaped sunglasses',
				moment: 'Dance floor',
				start: 0,
			},
			{
				cover: 'dance-floor-moves',
				label: 'Dance floor moves',
				moment: 'Dance floor',
				start: 2.5,
			},
		],
	},
	{
		id: 'day-vs-night',
		file: 'DGyZELqRdgY_fixed.mp4',
		wedding: null,
		moments: [
			{
				cover: 'tables-day-vs-night',
				label: 'Tables, day vs night',
				moment: 'Details',
				start: 0,
			},
			{
				cover: 'candlelit-long-table',
				label: 'Candlelit long table',
				moment: 'Details',
				start: 12,
			},
			{
				cover: 'sunset-on-the-terrace',
				label: 'Sunset on the terrace',
				moment: 'Venue',
				start: 16,
			},
			{
				cover: 'tables-after-dark',
				label: 'Tables after dark',
				moment: 'After dark',
				start: 20,
			},
			{
				cover: 'under-the-string-lights',
				label: 'Under the string lights',
				moment: 'After dark',
				start: 27,
			},
		],
	},
	{
		id: 'welcome-to-first-dance',
		file: 'DGs9WgIRL0P_fixed.mp4',
		wedding: null,
		moments: [
			{
				cover: 'welcome-sign',
				label: 'Welcome sign',
				moment: 'Reception',
				start: 0,
			},
			{
				cover: 'by-the-water',
				label: 'By the water',
				moment: 'Portraits',
				start: 4,
			},
			{
				cover: 'florals-and-candles',
				label: 'Florals and candles',
				moment: 'Details',
				start: 8,
			},
			{
				cover: 'reception-tables',
				label: 'Reception tables',
				moment: 'Reception',
				start: 12,
			},
			{
				cover: 'first-dance',
				label: 'First dance',
				moment: 'Reception',
				start: 23,
			},
		],
	},
	{
		id: 'garden-venue',
		file: 'C-IaHybR3N0_contact.mp4',
		wedding: null,
		moments: [
			{
				cover: 'garden-venue',
				label: 'Garden venue',
				moment: 'Venue',
				start: 0,
			},
			{
				cover: 'garden-path',
				label: 'Garden path',
				moment: 'Venue',
				start: 8,
			},
			{
				cover: 'palms-after-dark',
				label: 'Palms after dark',
				moment: 'After dark',
				start: 16,
			},
			{
				cover: 'walk-under-the-lights',
				label: 'A walk under the lights',
				moment: 'After dark',
				start: 19,
			},
			{
				cover: 'party-under-the-lights',
				label: 'Party under the lights',
				moment: 'Dance floor',
				start: 22.5,
			},
		],
	},
];

// Display order for the wall and the library, by cover name. Mixed so that
// neighbouring tiles come from different clips. The home page shows the first
// `homeWallCount`, which between them cover every moment that has footage.
const tileOrder = [
	'welcome-sign',
	'candlelit-long-table',
	'heart-shaped-sunglasses',
	'walk-under-the-lights',
	'by-the-water',
	'tables-day-vs-night',
	'garden-venue',
	'first-dance',
	'under-the-string-lights',
	'party-under-the-lights',
	'sunset-on-the-terrace',
	'dance-floor-moves',
	'florals-and-candles',
	'garden-path',
	'tables-after-dark',
	'reception-tables',
	'palms-after-dark',
];

const homeWallCount = 10;

// The four clips from their first second, for the hero.
const heroCovers = [
	'heart-shaped-sunglasses',
	'welcome-sign',
	'tables-day-vs-night',
	'garden-venue',
];

const allTiles = clips.flatMap(clip =>
	clip.moments.map(moment => ({
		...moment,
		clipId: clip.id,
		wedding: clip.wedding,
		src: clipBaseUrl + clip.file,
	}))
);

const byCover = new Map(allTiles.map(tile => [tile.cover, tile]));

function pick(covers) {
	return covers.map(cover => {
		const tile = byCover.get(cover);
		if (!tile) {
			throw new Error(
				`src/data/clips.js: "${cover}" is listed for display but no clip has a moment with that cover.`
			);
		}
		return tile;
	});
}

// Any moment left out of tileOrder is appended, so a new clip is never hidden.
export const tiles = [
	...pick(tileOrder),
	...allTiles.filter(tile => !tileOrder.includes(tile.cover)),
];

export const homeWallTiles = tiles.slice(0, homeWallCount);

export const heroTiles = pick(heroCovers);

export const weddings = [
	...new Set(clips.map(clip => clip.wedding).filter(Boolean)),
];
