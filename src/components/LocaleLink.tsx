"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { localizedPath } from "@/i18n/routing";
import { useLanguage } from "@/i18n/LanguageContext";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function LocaleLink({ href, children, ...rest }: Props) {
  const { locale } = useLanguage();
  const raw = typeof href === "string" ? href : href.toString();
  const localized = raw.startsWith("/")
    ? localizedPath(raw, locale)
    : raw;

  return (
    <Link href={localized} {...rest}>
      {children}
    </Link>
  );
}
