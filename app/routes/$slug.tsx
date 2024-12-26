import type { LoaderFunctionArgs } from '@remix-run/node';
import directus from '../lib/directus';
import { readItem } from '@directus/sdk';
import { Link, type MetaFunction, useLoaderData } from '@remix-run/react';
import { mapMetadata, metaTitle } from '~/lib/meta';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return mapMetadata({
		title: metaTitle(data?.title || 'Page not found'),
		description: 'Webdeveloper and esports enthusiast based in Norway.',
	});
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { slug } = params;
	const page = await directus.request(readItem('pages', slug as string));

	return page;
};

export function ErrorBoundary() {
	return (
		<div className='h-64 flex justify-center flex-col'>
			<h1 className='text-5xl font-semibold'>
				We can't seem to find this page
			</h1>
			<p>
				Maybe you'd like to go back to the{' '}
				<Link to='/' className='underline'>
					home page
				</Link>
				?
			</p>
		</div>
	);
}

export default function Page() {
	const { title, content } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
}
