import { LocaleShell, localeShellMetadata } from "@/i18n/locale-routes";

export const metadata = localeShellMetadata("ko");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocaleShell locale="ko">{children}</LocaleShell>;
}
