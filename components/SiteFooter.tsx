import Link from "next/link";
import type { Lang } from "@/src/lib/content";
import { siteText } from "@/src/lib/content";

type Props = {
  lang: Lang;
};

export function SiteFooter({ lang }: Props) {
  const t = siteText[lang];

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">{t.brand}</p>
          <p className="footer-note">{t.footerNote}</p>
        </div>

        <div className="footer-links">
          <Link href={`/${lang}/services`}>{t.nav.services}</Link>
          <Link href={`/${lang}/work`}>{t.nav.work}</Link>
          <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
          <Link href={`/${lang}/privacy`}>{t.privacyTitle}</Link>
          <Link href={`/${lang}/terms`}>{t.termsTitle}</Link>
        </div>
      </div>
    </footer>
  );
}

