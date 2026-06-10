"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/src/lib/content";

type Props = {
  lang: Lang;
};

export function LanguageSwitcher({ lang }: Props) {
  const pathname = usePathname();
  const nextLang: Lang = lang === "uz" ? "ru" : "uz";

  const segments = (pathname || "/").split("/").filter(Boolean);
  if (segments.length > 0 && (segments[0] === "uz" || segments[0] === "ru")) {
    segments[0] = nextLang;
  } else {
    segments.unshift(nextLang);
  }

  const destination = `/${segments.join("/")}`;
  const label = nextLang === "uz" ? "O'zbek" : "Рус";

  return (
    <Link className="lang-switch" href={destination} aria-label="Switch language">
      {label}
    </Link>
  );
}

