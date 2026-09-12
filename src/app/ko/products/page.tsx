import { Products, productsMetadata } from "@/i18n/locale-routes";

export const metadata = productsMetadata("ko");

export default function Page() {
  return <Products />;
}
