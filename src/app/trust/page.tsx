import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Trust & Certifications",
  description:
    "Organic, Halal, ISO/COA, origin, export capacity, and international track record — CV. Nurul Jannah.",
};

export default function Page() {
  return <TrustPage />;
}
