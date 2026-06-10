import Link from "next/link";
import type { Lang } from "@/src/lib/content";
import { siteText } from "@/src/lib/content";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type Props = {
  lang: Lang;
};

export function SiteHeader({ lang }: Props) {
  const t = siteText[lang];

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link href={`/${lang}`} className="brand-mark" aria-label="Axis Labs home">
          <span className="brand-dot" />
          <span>{t.brand}</span>
        </Link>

        <nav aria-label="Primary" className="main-nav">
          <Link href={`/${lang}`}>{t.nav.home}</Link>
          <Link href={`/${lang}/services`}>{t.nav.services}</Link>
          <Link href={`/${lang}/work`}>{t.nav.work}</Link>
          <Link href={`/${lang}/process`}>{t.nav.process}</Link>
          <Link href={`/${lang}/about`}>{t.nav.about}</Link>
          <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
        </nav>

        <div className="nav-actions">
          <LanguageSwitcher lang={lang} />
          <Link className="button button-small" href={`/${lang}/contact`}>
            {t.hero.primaryCta}
          </Link>
        </div>
      </div>
    </header>
  );
}

