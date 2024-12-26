import directus from '../lib/directus';
import { readSingleton } from '@directus/sdk';
import { type MetaFunction, useLoaderData } from '@remix-run/react';
import { div } from 'motion/react-client';
import Paragraph from '~/components/text-scroll-reveal';
import { metaTitle } from '~/lib/meta';

export const loader = async () => {
	const global = await directus.request(readSingleton('global'));
	return global;
};

const metadata = {
	title: metaTitle('Home'),
	description: 'This is the home page',
};

export const meta: MetaFunction = () => {
	return [
		{
			name: 'description',
			content: metadata.description,
		},
		{ title: metadata.title },
		{
			property: 'og:title',
			content: metadata.title,
		},
		{
			property: 'og:description',
			content: metadata.description,
		},
	];
};

export default function Index() {
	const { title, description } = useLoaderData<typeof loader>();
	return (
		<>
			<div
				className='
			flex flex-col items-start justify-start
			sm:items-center sm:justify-between sm:flex-row
			gap-8 h-4/5 pb-32
			'
			>
				<div>
					<h1 className='md:text-8xl text-5xl'>{title}</h1>
					<p>{description}</p>
				</div>
				<img
					src='/images/root.png'
					alt='Tobias in front of an orange backdrop'
					className='sm:w-96 w-fit h-auto'
				/>
			</div>
			<div className='pb-[1000px]'>
				<h2 className='text-5xl font-semibold mb-6'>About</h2>
				<Paragraph paragraph='Webdeveloper and esports enthusiast based in Norway.' />
			</div>
		</>
	);
}
