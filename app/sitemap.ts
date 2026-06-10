import type { MetadataRoute } from "next";
import { caseStudies, services, supportedLanguages } from "@/src/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/work", "/process", "/about", "/contact", "/thank-you", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of supportedLanguages) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }

    for (const service of services) {
      entries.push({
        url: `${baseUrl}/${lang}/services/${service.slug}`,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }

    for (const caseStudy of caseStudies) {
      entries.push({
        url: `${baseUrl}/${lang}/work/${caseStudy.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}

