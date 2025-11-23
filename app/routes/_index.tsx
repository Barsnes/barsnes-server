import directus from '../lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { metaTitle } from '~/lib/meta';

export const loader = async () => {
	const global = await directus.request(readSingleton('global'));
	const posts = await directus.request(
		readItems('posts', {
			filter: {
				published: { _eq: true },
			},
			fields: [
				'slug',
				'title',
				'published_date',
				/* @ts-expect-error TS2322 */
				{ author: ['name'] },
			],
			sort: ['-published_date'],
		}),
	);
	return { global, posts };
};

const metadata = {
	title: metaTitle('Home'),
	description: 'Webdeveloper and esports enthusiast based in Norway.',
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
	const { global, posts } = useLoaderData<typeof loader>();
	const { title, description } = global;
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
				<h2 className='text-5xl font-black mb-12 uppercase tracking-tight'>
					Posts
				</h2>
				<ul className='space-y-6 group/list'>
					{posts.map((post) => {
						return (
							<li
								key={post.slug}
								className='group/item transition-opacity duration-300 hover:!opacity-100 group-hover/list:opacity-40'
							>
								<a
									href={`/posts/${post.slug}`}
									className='block border-4 border-[rgb(217,217,217)] p-6 hover:bg-[rgb(217,217,217)] hover:text-black transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(217,217,217,0.8)]'
								>
									<h3 className='text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-4'>
										{post.title}
									</h3>
									{/* @ts-expect-error - excerpt field exists in API */}
									{post.excerpt && (
										<p className='text-base font-mono leading-relaxed mb-4 group-hover/item:text-black'>
											{/* @ts-expect-error - excerpt field exists in API */}
											{post.excerpt}
										</p>
									)}
									<div className='flex items-center gap-2 text-sm font-mono uppercase'>
										<span className='bg-[rgb(217,217,217)] text-black px-2 py-1 group-hover/item:bg-black group-hover/item:text-[rgb(217,217,217)]'>
											{post.published_date}
										</span>
									</div>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}
