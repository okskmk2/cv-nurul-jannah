import type { Metadata } from "next";
import { Product, productMetadata, productStaticParams } from "@/i18n/locale-routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return productMetadata("ar", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <Product locale="ar" slug={slug} />;
}
