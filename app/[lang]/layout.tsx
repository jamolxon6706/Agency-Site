import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isLang, siteText, supportedLanguages, type Lang } from "@/src/lib/content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolved = await params;
  if (!isLang(resolved.lang)) {
    return {};
  }

  return {
    title: siteText[resolved.lang].brand,
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;

  return (
    <div className="site-root">
      <SiteHeader lang={safeLang} />
      <main>{children}</main>
      <SiteFooter lang={safeLang} />
    </div>
  );
}

