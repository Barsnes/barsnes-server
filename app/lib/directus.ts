import { createDirectus, rest } from '@directus/sdk';

type Global = {
	title: string;
	description: string;
};

type Author = {
	name: string;
};

type Page = {
	title: string;
	content: string;
	slug: string;
};

type Post = {
	image: string;
	title: string;
	author: Author;
	content: string;
	published_date: string;
	slug: string;
	published: boolean;
};

type Schema = {
	posts: Post[];
	global: Global;
	pages: Page[];
};

const directus = createDirectus<Schema>('https://directus.barsnes.dev').with(
	rest(),
);

export default directus;
