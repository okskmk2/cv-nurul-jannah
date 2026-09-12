import type { Metadata } from "next";
import { ProductsPage } from "@/components/ProductsPage";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Export catalog — moringa, spices & herbs, oils & extracts from CV. Nurul Jannah.",
};

export default function Page() {
  return <ProductsPage />;
}
