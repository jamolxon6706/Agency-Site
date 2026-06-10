import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/src/lib/seo";
import { isLang, siteText, techStack, type Lang } from "@/src/lib/content";

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
    path: "/about",
    title: siteText[lang].nav.about,
    description:
      lang === "uz"
        ? "Biznesga natija beradigan raqamli mahsulotlar uchun texnik hamkor jamoa."
        : "Техническая команда-партнер для digital-продуктов с измеримым бизнес-результатом.",
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <Reveal>
        <h1>{t.aboutTitle}</h1>
        <p className="hero-subtitle">{t.aboutBody}</p>
      </Reveal>

      <div className="panel-grid two-up section-space">
        <Reveal>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Asosiy prinsiplar" : "Ключевые принципы"}</h2>
            <ul>
              <li>{safeLang === "uz" ? "Clarity first: noaniqlikni tez yopish" : "Clarity first: быстро закрываем неопределенность"}</li>
              <li>{safeLang === "uz" ? "Architecture matters: scalega tayyor yechim" : "Architecture matters: решения готовы к масштабированию"}</li>
              <li>{safeLang === "uz" ? "Ownership: natija uchun javobgarlik" : "Ownership: берем ответственность за результат"}</li>
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Texnik stack" : "Технологический стек"}</h2>
            <div className="chip-row">
              {techStack.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <article className="panel section-space">
          <h2>{safeLang === "uz" ? "Biz bilan ishlash" : "Сотрудничество"}</h2>
          <p>
            {safeLang === "uz"
              ? "Agar sizga tez, sifatli va biznesga mos yechim kerak bo'lsa, strategik call orqali project scope ni birga aniqlaymiz."
              : "Если вам нужен быстрый, качественный и бизнес-ориентированный результат, начнем со стратегического звонка и определим scope."}
          </p>
          <Link href={`/${safeLang}/contact`} className="button top-gap">
            {t.hero.primaryCta}
          </Link>
        </article>
      </Reveal>
    </section>
  );
}

