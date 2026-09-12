import { Products, productsMetadata } from "@/i18n/locale-routes";

export const metadata = productsMetadata("ar");

export default function Page() {
  return <Products />;
}
