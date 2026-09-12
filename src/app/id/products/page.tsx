import { Products, productsMetadata } from "@/i18n/locale-routes";

export const metadata = productsMetadata("id");

export default function Page() {
  return <Products />;
}
