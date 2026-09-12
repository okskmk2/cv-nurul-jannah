import type { Locale } from "@/i18n/dictionaries";

export type ProductCategory = "moringa";

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
    slug: "moringa-coffee",
    name: {
      en: "Moringa Coffee",
      id: "Kopi Kelor",
      ar: "قهوة المورينجا",
      ko: "모링가 커피",
    },
    category: "moringa",
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
      en: "Moringga moringa coffee from Madura kelor leaves — for retail and food-service partners.",
      id: "Kopi kelor Moringga dari daun kelor Madura — untuk mitra ritel dan food service.",
      ar: "قهوة مورينجا Moringga من أوراق كيلور مادورا — لشركاء التجزئة وخدمات الطعام.",
      ko: "마두라 켈로 잎으로 만든 Moringga 모링가 커피 — 리테일 및 외식 파트너용.",
    },
  },
  {
    id: "2",
    slug: "moringa-tea",
    name: {
      en: "Moringa Tea",
      id: "Teh Kelor",
      ar: "شاي المورينجا",
      ko: "모링가 차",
    },
    category: "moringa",
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
    slug: "moringa-crackers",
    name: {
      en: "Moringa Crackers",
      id: "Krupuk Kelor",
      ar: "رقائق المورينجا",
      ko: "모링가 크래커",
    },
    category: "moringa",
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
      en: "Crispy moringa crackers with Nusantara spice notes — snack channel ready.",
      id: "Krupuk kelor renyah dengan sentuhan rempah Nusantara — siap saluran camilan.",
      ar: "رقائق مورينجا مقرمشة بنكهات توابل نوسانتارا — جاهزة لقنوات الوجبات الخفيفة.",
      ko: "누산타라 향신료 노트가 있는 바삭한 모링가 크래커 — 스낵 채널용.",
    },
  },
  {
    id: "4",
    slug: "moringa-powder",
    name: {
      en: "Moringa Powder",
      id: "Powder Kelor",
      ar: "مسحوق المورينجا",
      ko: "모링가 분말",
    },
    category: "moringa",
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
      en: "Export-grade moringa leaf powder from Sumenep farms for food and nutraceutical use.",
      id: "Bubuk daun kelor kualitas ekspor dari lahan Sumenep untuk pangan dan nutraceutical.",
      ar: "مسحوق أوراق مورينجا بدرجة تصدير من مزارع سومينيب للأغذية والمكملات.",
      ko: "수메넵 농장의 수출 등급 모링가 잎 분말 — 식품 및 건강기능식품용.",
    },
  },
  {
    id: "5",
    slug: "moringa-noodle",
    name: {
      en: "Moringa Noodle",
      id: "Mie Kelor",
      ar: "نودلز المورينجا",
      ko: "모링가 면",
    },
    category: "moringa",
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
      en: "Everyday moringa noodles for healthy meal programs and retail shelves.",
      id: "Mie kelor sehari-hari untuk program gizi sehat dan rak ritel.",
      ar: "نودلز مورينجا يومية لبرامج الوجبات الصحية وأرفف التجزئة.",
      ko: "건강 식단 프로그램과 리테일 매대를 위한 일상용 모링가 면.",
    },
  },
  {
    id: "6",
    slug: "moringa-stick",
    name: {
      en: "Moringa Stick",
      id: "Stick Kelor",
      ar: "عصي المورينجا",
      ko: "모링가 스틱",
    },
    category: "moringa",
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
      en: "Convenient moringa stick snacks for modern trade and community channels.",
      id: "Camilan stick kelor praktis untuk modern trade dan saluran komunitas.",
      ar: "وجبات مورينجا على شكل عصي مريحة للتجارة الحديثة وقنوات المجتمع.",
      ko: "현대 유통 및 커뮤니티 채널을 위한 간편한 모링가 스틱 스낵.",
    },
  },
];

export const categoryLabels: Record<ProductCategory | "all", LocalizedText> = {
  all: { en: "All", id: "Semua", ar: "الكل", ko: "전체" },
  moringa: {
    en: "Moringa / Kelor",
    id: "Kelor / Moringa",
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
