import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "B2B Inquiry",
  description:
    "Request a quote from CV. Nurul Jannah — company, country, products, volume, and message.",
};

export default function Page() {
  return <ContactPage />;
}
