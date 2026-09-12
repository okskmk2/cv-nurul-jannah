import { LocaleShell, localeShellMetadata } from "@/i18n/locale-routes";

export const metadata = localeShellMetadata("ar");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocaleShell locale="ar">{children}</LocaleShell>;
}
