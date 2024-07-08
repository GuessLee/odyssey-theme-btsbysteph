import { tiktokIcon } from '../icons/icons.js';

console.log("TikTok Icon:", tiktokIcon);

export const footerSocials = [
  {
    name: 'Twitter',
    url: 'https://linktr.ee/SunshineSteph?utm_source=linktree_profile_share&ltsid=61ae010a-49df-47c4-8c11-2863670bf663', //redirect to linktree
    icon: "mdi:twitter",
  },
  {
	name: 'Instagram',
	url: 'https://www.instagram.com/btsbysteph/?igsh=MWZzMnpxbGhyOWFsaQ%3D%3D&utm_source=qr',
	icon: "mdi:instagram",
  },
/* {
	name: 'TikTok',
	url: 'https://www.tiktok.com/@sunshine_steph',
	icon: "tiktokIcon",
}, */
]

export const footerLists = [
	{
		// title: 'Landing Pages',
		items: [
			/* {
				title: 'Landing Page 1',
				slug: '/landing-pages/landing-1',
			}, */
			/* {
				title: 'Landing Page 2',
				slug: '/landing-pages/landing-2',
			}, */
      // {
			// 	title: 'Landing Page 3',
			// 	slug: '/landing-pages/landing-3',
			// },
		],
	},
	{
		title: 'The Company',
		items: [
			{
				title: 'About',
				slug: '/company/about',
			},
			/* {
				title: 'Blog',
				slug: '/blog',
			}, */
			{
				title: 'Contact',
				slug: '/company/contact',
			},
		],
	},
	/* {
		title: 'Theme',
		items: [
			{
				title: 'Get Started',
				slug: '/theme/get-started',
			},
			{
				title: 'Style Guide',
				slug: '/theme/style-guide',
			},
      {
        title: 'Theme Setup',
        slug: '/theme/theme-setup',
      },
      {
        title: 'Customizing Odyssey',
        slug: '/theme/customizing-odyssey',
      }
		],
	}, */
];
