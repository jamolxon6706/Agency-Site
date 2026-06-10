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
    path: "/terms",
    title: siteText[lang].termsTitle,
    description:
      lang === "uz"
        ? "Axis Labs xizmatlaridan foydalanish bo'yicha asosiy qoidalar."
        : "Основные условия использования услуг Axis Labs.",
  });
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const isUz = safeLang === "uz";

  return (
    <section className="shell page-space legal-content">
      <h1>{siteText[safeLang].termsTitle}</h1>
      <h2>{isUz ? "Xizmatlar" : "Услуги"}</h2>
      <p>
        {isUz
          ? "Har bir loyiha scope, muddat va deliverablelar bo'yicha alohida kelishuv asosida bajariladi."
          : "Каждый проект выполняется на основе отдельного согласования scope, сроков и deliverables."}
      </p>
      <h2>{isUz ? "To'lov va bosqichlar" : "Оплата и этапы"}</h2>
      <p>
        {isUz
          ? "To'lov shartlari tijorat taklifida yoki shartnomada belgilanadi."
          : "Условия оплаты фиксируются в коммерческом предложении или договоре."}
      </p>
      <h2>{isUz ? "Intellektual mulk" : "Интеллектуальная собственность"}</h2>
      <p>
        {isUz
          ? "Loyiha topshirilgach va kelishilgan to'lov bajarilgach, kod egaligi shartnoma shartlariga muvofiq o'tadi."
          : "После сдачи проекта и выполнения согласованных платежей права на код передаются по условиям договора."}
      </p>
    </section>
  );
}

