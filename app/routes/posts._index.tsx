import directus from '~/lib/directus';
import { readItems } from '@directus/sdk';
import { Link, type MetaFunction, useLoaderData } from '@remix-run/react';
import { mapMetadata, metaTitle } from '~/lib/meta';

export const meta: MetaFunction = () => {
	return mapMetadata({
		title: metaTitle('Posts'),
		description: 'Posts by Tobias Barsnes',
	});
};

export const loader = async () => {
	const posts = await directus.request(
		readItems('posts', {
			filter: {
				published: { _eq: true },
			},
			fields: [
				'slug',
				'title',
				'published_date',
				'image',
				/* @ts-expect-error TS2322 */
				{ author: ['name'] },
			],
			sort: ['-published_date'],
		}),
	);
	return { posts };
};

export default function Posts() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className='text-5xl'>Posts</h1>
			<ul className='space-y-4 grid gap-4 grid-cols-1 sm:grid-cols-2'>
				{posts.map((post) => {
					return (
						<li
							key={post.slug}
							className='
              group
              bg-white shadow-lg text-black
              hover:bg-black hover:text-white
            '
						>
							<Link to={`/posts/${post.slug}`}>
								<img
									src={`${directus.url}assets/${post.image}`}
									alt=''
									className='w-full md:h-48 lg:h-64 object-cover'
								/>
								<div className='p-4 space-y-2 group-hover:border-2 group-hover:border-t-0'>
									<h2 className='underline text-xl font-bold leading-tight text-3xl'>
										{post.title}
									</h2>
									<span className='block text-sm'>
										{post.published_date} &bull; {post.author.name}
									</span>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
