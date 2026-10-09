import { getImage } from 'astro:assets';
import posterReception from '@assets/images/posters/portfolio-reception.jpg';
import posterTablescape from '@assets/images/posters/portfolio-tablescape.jpg';
import posterCeremony from '@assets/images/posters/portfolio-ceremony.jpg';

export const portfolioVideos = await Promise.all(
	[
		{ src: 'C9nBkdVRoJ5.mp4', poster: posterReception },
		{ src: 'DGyZELqRdgY_fixed.mp4', poster: posterTablescape },
		{ src: 'DGs9WgIRL0P_fixed.mp4', poster: posterCeremony },
	].map(async ({ src, poster }) => ({
		src: `https://btsbs.s3.us-east-2.amazonaws.com/${src}`,
		poster: (await getImage({ src: poster, width: 562, format: 'webp' })).src,
	}))
);
