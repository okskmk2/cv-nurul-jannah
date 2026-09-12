import { Contact, contactMetadata } from "@/i18n/locale-routes";

export const metadata = contactMetadata("id");

export default function Page() {
  return <Contact />;
}
