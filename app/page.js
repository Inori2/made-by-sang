import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import HomeClients from "./components/sections/HomeClients";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return <HomeClients slices={page.data.slices} />;
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
