import type { Metadata } from "next";

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
const SITE_NAME = process.env.SITE_NAME || "AI Language Learning";

export function createPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: `${opts.title} | ${SITE_NAME}`,
    description: opts.description,
    keywords: opts.keywords,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    alternates: { canonical: url },
  };
}
