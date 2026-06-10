import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/src/lib/seo";
import { caseStudies, getCaseStudyBySlug, isLang, siteText, type Lang } from "@/src/lib/content";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ lang: Lang; slug: string }> = [];
  for (const lang of ["uz", "ru"] as const) {
    for (const caseStudy of caseStudies) {
      params.push({ lang, slug: caseStudy.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) {
    return {};
  }

  const item = getCaseStudyBySlug(slug);
  if (!item) {
    return {};
  }

  return buildMetadata({
    lang,
    path: `/work/${item.slug}`,
    title: item.title[lang],
    description: item.solution[lang],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { lang, slug } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const item = getCaseStudyBySlug(slug);
  if (!item) {
    notFound();
  }

  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <Reveal>
        <p className="kicker">{safeLang === "uz" ? "Case Study" : "Кейс"}</p>
        <h1>{item.title[safeLang]}</h1>
        <p className="hero-subtitle">{item.industry[safeLang]}</p>
      </Reveal>

      <Reveal className="section-space">
        <div className="image-wrap panel">
          <Image
            src={item.media.src}
            alt={item.media.alt[safeLang]}
            width={1200}
            height={630}
            className="cover-image"
            priority
          />
        </div>
      </Reveal>

      <div className="panel-grid two-up section-space">
        <Reveal>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Muammo" : "Проблема"}</h2>
            <p>{item.challenge[safeLang]}</p>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Yechim" : "Решение"}</h2>
            <p>{item.solution[safeLang]}</p>
          </article>
        </Reveal>
      </div>

      <div className="panel-grid two-up section-space">
        <Reveal>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Natijalar" : "Результаты"}</h2>
            <ul>
              {item.outcomes[safeLang].map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Texnik tafsilotlar" : "Технические детали"}</h2>
            <p>{safeLang === "uz" ? "Timeline" : "Срок"}: {item.timeline[safeLang]}</p>
            <div className="chip-row top-gap">
              {item.techStack.map((stack) => (
                <span className="chip" key={stack}>
                  {stack}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <article className="panel section-space">
          <h2>{safeLang === "uz" ? "Keyingi qadam" : "Следующий шаг"}</h2>
          <p>
            {safeLang === "uz"
              ? "Shunga o'xshash tizimni sizga mos scope bilan rejalashtirib beramiz."
              : "Подготовим для вас аналогичную систему с учетом вашего бизнес-scope."}
          </p>
          <div className="button-row top-gap">
            <Link href={`/${safeLang}/contact`} className="button">
              {t.hero.primaryCta}
            </Link>
            <Link href={`/${safeLang}/work`} className="button button-ghost">
              {safeLang === "uz" ? "Barcha case study" : "Все кейсы"}
            </Link>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

