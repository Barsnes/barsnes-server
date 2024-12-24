import directus from "../lib/directus";
import { readSingleton } from "@directus/sdk";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { metaTitle } from "~/lib/meta";

export const loader = async () => {
  const global = await directus.request(readSingleton("global"));
  return global;
};

const metadata = {
  title: metaTitle("Home"),
  description: "This is the home page",
};

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: metadata.description,
    },
    { title: metadata.title },
    {
      property: "og:title",
      content: metadata.title,
    },
    {
      property: "og:description",
      content: metadata.description,
    },
  ];
};

export default function Index() {
  const { title, description } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
