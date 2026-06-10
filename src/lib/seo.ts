import type { Metadata } from "next";
import type { Lang } from "@/src/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function buildMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}/${lang}${normalizedPath === "/" ? "" : normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        uz: `${baseUrl}/uz${normalizedPath === "/" ? "" : normalizedPath}`,
        ru: `${baseUrl}/ru${normalizedPath === "/" ? "" : normalizedPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Axis Labs",
      locale: lang === "uz" ? "uz_UZ" : "ru_RU",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: "Axis Labs - digital product agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.svg`],
    },
  };
}

