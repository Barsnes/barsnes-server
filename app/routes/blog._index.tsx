import directus from "~/lib/directus";
import { readItems } from "@directus/sdk";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const posts = await directus.request(
    readItems("posts", {
      fields: [
        "slug",
        "title",
        "published_date",
        "image",
        /* @ts-expect-error TS2322 */
        { author: ["name"] },
      ],
      sort: ["-published_date"],
    })
  );
  return { posts };
};

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();

  console.log(posts);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul className='space-y-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => {
          return (
            <li key={post.slug} className='bg-gray-800 rounded-lg'>
              <Link
                to={`/blog/${post.slug}`}
                className='text-blue-500 hover:text-blue-300 transition-colors duration ease-in-out'
              >
                <img
                  src={`${directus.url}assets/${post.image}`}
                  alt=''
                  className='w-full md:h-48 lg:h-64 object-cover rounded-lg'
                />
                <div className='p-4 space-y-2'>
                  <h2 className='underline text-xl'>{post.title}</h2>
                  <span className='block text-sm text-gray-400'>
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
