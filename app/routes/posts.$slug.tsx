import type { LoaderFunctionArgs } from '@remix-run/node';
import directus from '../lib/directus';
import { readItem } from '@directus/sdk';
import { useLoaderData, type MetaFunction } from '@remix-run/react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { slug } = params;
	const post = await directus.request(readItem('posts', slug as string));
	return post;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{
			title: data ? `${data.title} // Tobias Barsnes` : 'Post not found',
		},
	];
};

export default function Post() {
	const { image, title, content } = useLoaderData<typeof loader>();
	return (
		<div className='max-w-4xl mx-auto'>
			<div className='border-8 border-[rgb(217,217,217)] p-0 shadow-[12px_12px_0px_0px_rgb(217,217,217)]'>
				<img
					src={`${directus.url}assets/${image}`}
					alt=''
					className='w-full object-cover h-64 md:h-96 border-b-8 border-[rgb(217,217,217)]'
				/>
				<div className='p-8 md:p-12 bg-black'>
					<h1 className='text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-8 border-l-8 border-[rgb(217,217,217)] pl-6'>
						{title}
					</h1>
					<div
						className='blog-post'
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</div>
		</div>
	);
}
