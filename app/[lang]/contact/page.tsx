import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
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
    path: "/contact",
    title: siteText[lang].nav.contact,
    description: siteText[lang].contactBody,
  });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = siteText[safeLang];

  return (
    <section className="shell page-space">
      <Reveal>
        <h1>{t.contactTitle}</h1>
        <p className="hero-subtitle">{t.contactBody}</p>
      </Reveal>

      <div className="panel-grid two-up section-space">
        <Reveal>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Nima bo'ladi keyin?" : "Что дальше?"}</h2>
            <ol>
              <li>{safeLang === "uz" ? "Forma yuboriladi va avtomatik qayd etiladi" : "Заявка отправляется и фиксируется автоматически"}</li>
              <li>{safeLang === "uz" ? "Biz 24 soat ichida bog'lanamiz" : "Мы связываемся в течение 24 часов"}</li>
              <li>{safeLang === "uz" ? "Strategik call orqali scope aniqlanadi" : "На стратегическом звонке определяем scope"}</li>
              <li>{safeLang === "uz" ? "Custom taklif va timeline beriladi" : "Формируем custom-предложение и timeline"}</li>
            </ol>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="panel">
            <h2>{safeLang === "uz" ? "Ishonch signallari" : "Сигналы доверия"}</h2>
            <ul>
              <li>{safeLang === "uz" ? "Aniq SLA: 24 soat" : "Четкий SLA: 24 часа"}</li>
              <li>{safeLang === "uz" ? "No-template, faqat custom yechim" : "Без шаблонов, только custom-решения"}</li>
              <li>{safeLang === "uz" ? "Anonymized case study va texnik portfolio" : "Анонимизированные кейсы и техническое портфолио"}</li>
              <li>{safeLang === "uz" ? "Maxfiylik va ma'lumotlarni himoya qilish" : "Конфиденциальность и защита данных"}</li>
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <article className="panel section-space">
          <LeadForm lang={safeLang} />
        </article>
      </Reveal>
    </section>
  );
}

