import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/src/lib/seo";
import { isLang, siteText, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) {
    return {};
  }

  return buildMetadata({
    lang,
    path: "/thank-you",
    title: siteText[lang].thanksTitle,
    description: siteText[lang].thanksBody,
  });
}

export default async function ThankYouPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <article className="panel center-panel">
        <h1>{t.thanksTitle}</h1>
        <p>{t.thanksBody}</p>
        <div className="button-row top-gap">
          <Link href={`/${safeLang}`} className="button button-ghost">
            {safeLang === "uz" ? "Bosh sahifa" : "Главная"}
          </Link>
          <Link href={`/${safeLang}/work`} className="button">
            {safeLang === "uz" ? "Case study lar" : "Кейсы"}
          </Link>
        </div>
      </article>
    </section>
  );
}

