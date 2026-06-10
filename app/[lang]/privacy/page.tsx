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
    path: "/privacy",
    title: siteText[lang].privacyTitle,
    description:
      lang === "uz"
        ? "Shaxsiy ma'lumotlarni qayta ishlash va himoya qilish qoidalari."
        : "Правила обработки и защиты персональных данных.",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const isUz = safeLang === "uz";

  return (
    <section className="shell page-space legal-content">
      <h1>{siteText[safeLang].privacyTitle}</h1>
      <p>
        {isUz
          ? "Biz faqat loyiha so'rovi uchun zarur bo'lgan ma'lumotlarni yig'amiz va ularni uchinchi tomonlarga ruxsatsiz bermaymiz."
          : "Мы собираем только данные, необходимые для обработки проектной заявки, и не передаем их третьим лицам без согласия."}
      </p>
      <h2>{isUz ? "Yig'iladigan ma'lumotlar" : "Какие данные собираем"}</h2>
      <ul>
        <li>{isUz ? "Kontakt ma'lumotlari" : "Контактные данные"}</li>
        <li>{isUz ? "Loyiha tavsifi va talablar" : "Описание проекта и требования"}</li>
        <li>{isUz ? "Texnik diagnostika uchun minimal trafik ma'lumotlari" : "Минимальные технические данные для диагностики"}</li>
      </ul>
      <h2>{isUz ? "Saqlash muddati" : "Срок хранения"}</h2>
      <p>
        {isUz
          ? "Loyihaga oid ma'lumotlar aloqa va taklif tayyorlash uchun oqilona muddat davomida saqlanadi."
          : "Данные по заявке хранятся разумный срок для коммуникации и подготовки коммерческого предложения."}
      </p>
    </section>
  );
}

