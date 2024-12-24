import { LoaderFunctionArgs } from "@remix-run/node";
import directus from "../lib/directus";
import { readItem } from "@directus/sdk";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  const post = await directus.request(readItem("posts", slug as string));
  return post;
};

export default function Post() {
  const { image, title, content } = useLoaderData<typeof loader>();
  return (
    <div className='space-y-4'>
      <img
        src={`${directus.url}assets/${image}`}
        alt=''
        className='
        w-full
        object-cover
        h-96
        rounded-lg
      '
      />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
