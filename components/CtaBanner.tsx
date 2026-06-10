import Link from "next/link";
import type { Lang } from "@/src/lib/content";
import { siteText } from "@/src/lib/content";
import { Reveal } from "@/components/Reveal";

type Props = {
  lang: Lang;
};

export function CtaBanner({ lang }: Props) {
  const t = siteText[lang];

  return (
    <Reveal className="cta-banner" delay={0.08}>
      <h2>{t.ctaBannerTitle}</h2>
      <Link href={`/${lang}/contact`} className="button">
        {t.ctaBannerButton}
      </Link>
    </Reveal>
  );
}

