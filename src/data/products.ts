import type { Locale } from "@/i18n/dictionaries";

export type ProductCategory = "moringga";

export type LocalizedText = Record<Locale, string>;

export type Product = {
  id: string;
  slug: string;
  name: LocalizedText;
  category: ProductCategory;
  form: LocalizedText;
  sku: string;
  moq: string;
  featured?: boolean;
  description: LocalizedText;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "moringga-coffee",
    name: {
      en: "Moringga Coffee",
      id: "Kopi Kelor",
      ar: "قهوة المورينجا",
      ko: "모링가 커피",
    },
    category: "moringga",
    form: {
      en: "Ready-to-brew coffee blend",
      id: "Campuran kopi siap seduh",
      ar: "خليط قهوة جاهز للتحضير",
      ko: "바로 내리는 커피 블렌드",
    },
    sku: "MRG-COF",
    moq: "10 kg",
    featured: true,
    description: {
      en: "Moringga coffee from Madura kelor leaves — for retail and food-service partners.",
      id: "Kopi kelor Moringga dari daun kelor Madura — untuk mitra ritel dan food service.",
      ar: "قهوة مورينجا Moringga من أوراق كيلور مادورا — لشركاء التجزئة وخدمات الطعام.",
      ko: "마두라 켈로 잎으로 만든 Moringga 모링가 커피 — 리테일 및 외식 파트너용.",
    },
  },
  {
    id: "2",
    slug: "moringga-tea",
    name: {
      en: "Moringga Tea",
      id: "Teh Kelor",
      ar: "شاي المورينجا",
      ko: "모링가 차",
    },
    category: "moringga",
    form: {
      en: "Dried leaf tea",
      id: "Teh daun kering",
      ar: "شاي أوراق مجففة",
      ko: "건조 잎차",
    },
    sku: "MRG-TEA",
    moq: "10 kg",
    featured: true,
    description: {
      en: "Clean dried kelor leaf tea for wellness blends and private-label packing.",
      id: "Teh daun kelor kering bersih untuk blend wellness dan kemasan private label.",
      ar: "شاي أوراق كيلور مجففة نظيفة لمزائج العافية والتعبئة بالعلامة الخاصة.",
      ko: "웰니스 블렌드와 프라이빗 라벨 포장을 위한 깨끗한 건조 켈로 잎차.",
    },
  },
  {
    id: "3",
    slug: "moringga-crackers",
    name: {
      en: "Moringga Crackers",
      id: "Krupuk Kelor",
      ar: "رقائق المورينجا",
      ko: "모링가 크래커",
    },
    category: "moringga",
    form: {
      en: "Snack crackers",
      id: "Krupuk camilan",
      ar: "رقائق خفيفة",
      ko: "스낵 크래커",
    },
    sku: "MRG-CRP",
    moq: "20 carton",
    featured: true,
    description: {
      en: "Crispy moringga crackers with Nusantara spice notes — snack channel ready.",
      id: "Krupuk kelor renyah dengan sentuhan rempah Nusantara — siap saluran camilan.",
      ar: "رقائق مورينجا مقرمشة بنكهات توابل نوسانتارا — جاهزة لقنوات الوجبات الخفيفة.",
      ko: "누산타라 향신료 노트가 있는 바삭한 모링가 크래커 — 스낵 채널용.",
    },
  },
  {
    id: "4",
    slug: "moringga-powder",
    name: {
      en: "Moringga Powder",
      id: "Powder Kelor",
      ar: "مسحوق المورينجا",
      ko: "모링가 분말",
    },
    category: "moringga",
    form: {
      en: "Fine leaf powder",
      id: "Bubuk daun halus",
      ar: "مسحوق أوراق ناعم",
      ko: "고운 잎 분말",
    },
    sku: "MRG-PWD",
    moq: "25 kg",
    featured: true,
    description: {
      en: "Export-grade moringga leaf powder from Sumenep farms for food and nutraceutical use.",
      id: "Bubuk daun kelor kualitas ekspor dari lahan Sumenep untuk pangan dan nutraceutical.",
      ar: "مسحوق أوراق مورينجا بدرجة تصدير من مزارع سومينيب للأغذية والمكملات.",
      ko: "수메넵 농장의 수출 등급 모링가 잎 분말 — 식품 및 건강기능식품용.",
    },
  },
  {
    id: "5",
    slug: "moringga-noodle",
    name: {
      en: "Moringga Noodle",
      id: "Mie Kelor",
      ar: "نودلز المورينجا",
      ko: "모링가 면",
    },
    category: "moringga",
    form: {
      en: "Dried noodles",
      id: "Mie kering",
      ar: "نودلز مجففة",
      ko: "건면",
    },
    sku: "MRG-MIE",
    moq: "20 carton",
    featured: true,
    description: {
      en: "Everyday moringga noodles for healthy meal programs and retail shelves.",
      id: "Mie kelor sehari-hari untuk program gizi sehat dan rak ritel.",
      ar: "نودلز مورينجا يومية لبرامج الوجبات الصحية وأرفف التجزئة.",
      ko: "건강 식단 프로그램과 리테일 매대를 위한 일상용 모링가 면.",
    },
  },
  {
    id: "6",
    slug: "moringga-stick",
    name: {
      en: "Moringga Stick",
      id: "Stick Kelor",
      ar: "عصي المورينجا",
      ko: "모링가 스틱",
    },
    category: "moringga",
    form: {
      en: "Snack sticks",
      id: "Stick camilan",
      ar: "عصي خفيفة",
      ko: "스낵 스틱",
    },
    sku: "MRG-STK",
    moq: "20 carton",
    featured: true,
    description: {
      en: "Convenient moringga stick snacks for modern trade and community channels.",
      id: "Camilan stick kelor praktis untuk modern trade dan saluran komunitas.",
      ar: "وجبات مورينجا على شكل عصي مريحة للتجارة الحديثة وقنوات المجتمع.",
      ko: "현대 유통 및 커뮤니티 채널을 위한 간편한 모링가 스틱 스낵.",
    },
  },
  {
    id: "7",
    slug: "moringga-oil",
    name: {
      en: "Moringga Oil",
      id: "Minyak Kelor",
      ar: "زيت المورينجا",
      ko: "모링가 오일",
    },
    category: "moringga",
    form: {
      en: "30ml glass bottle",
      id: "Botol kaca 30ml",
      ar: "زجاجة زجاج 30 مل",
      ko: "30ml 유리병",
    },
    sku: "MRG-OIL",
    moq: "100 bottle",
    featured: true,
    description: {
      en: "Madura kelor (moringga) oil in 30ml glass bottles — for retail, wellness, and private-label partners.",
      id: "Minyak kelor Madura dalam botol kaca 30ml — untuk mitra ritel, wellness, dan kemasan private label.",
      ar: "زيت كيلور مادورا في زجاجات 30 مل — لشركاء التجزئة والعافية والعلامة الخاصة.",
      ko: "30ml 유리병에 담긴 마두라 켈로(모링가) 오일 — 리테일, 웰니스, 프라이빗 라벨 파트너용.",
    },
  },
];

export const categoryLabels: Record<ProductCategory | "all", LocalizedText> = {
  all: { en: "All", id: "Semua", ar: "الكل", ko: "전체" },
  moringga: {
    en: "Moringga / Kelor",
    id: "Kelor / Moringga",
    ar: "مورينجا / كيلور",
    ko: "모링가 / 켈로",
  },
};

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: ProductCategory | "all") {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productImagePath(slug: string) {
  return `/products/${slug}.jpg`;
}
