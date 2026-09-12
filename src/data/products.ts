export type ProductCategory = "moringa";

export type Product = {
  id: string;
  slug: string;
  name: { en: string; id: string; ar: string };
  category: ProductCategory;
  form: { en: string; id: string; ar: string };
  sku: string;
  moq: string;
  featured?: boolean;
  description: { en: string; id: string; ar: string };
};

export const products: Product[] = [
  {
    id: "1",
    slug: "moringa-coffee",
    name: {
      en: "Moringa Coffee",
      id: "Kopi Kelor",
      ar: "قهوة المورينجا",
    },
    category: "moringa",
    form: {
      en: "Ready-to-brew coffee blend",
      id: "Campuran kopi siap seduh",
      ar: "خليط قهوة جاهز للتحضير",
    },
    sku: "MRG-COF",
    moq: "10 kg",
    featured: true,
    description: {
      en: "MARONGGHI moringa coffee from Madura kelor leaves — for retail and food-service partners.",
      id: "Kopi kelor MARONGGHI dari daun kelor Madura — untuk mitra ritel dan food service.",
      ar: "قهوة مورينجا مارونغي من أوراق كيلور مادورا — لشركاء التجزئة وخدمات الطعام.",
    },
  },
  {
    id: "2",
    slug: "moringa-tea",
    name: {
      en: "Moringa Tea",
      id: "Teh Kelor",
      ar: "شاي المورينجا",
    },
    category: "moringa",
    form: {
      en: "Dried leaf tea",
      id: "Teh daun kering",
      ar: "شاي أوراق مجففة",
    },
    sku: "MRG-TEA",
    moq: "10 kg",
    featured: true,
    description: {
      en: "Clean dried kelor leaf tea for wellness blends and private-label packing.",
      id: "Teh daun kelor kering bersih untuk blend wellness dan kemasan private label.",
      ar: "شاي أوراق كيلور مجففة نظيفة لمزائج العافية والتعبئة بالعلامة الخاصة.",
    },
  },
  {
    id: "3",
    slug: "moringa-crackers",
    name: {
      en: "Moringa Crackers",
      id: "Krupuk Kelor",
      ar: "رقائق المورينجا",
    },
    category: "moringa",
    form: {
      en: "Snack crackers",
      id: "Krupuk camilan",
      ar: "رقائق خفيفة",
    },
    sku: "MRG-CRP",
    moq: "20 carton",
    featured: true,
    description: {
      en: "Crispy moringa crackers with Nusantara spice notes — snack channel ready.",
      id: "Krupuk kelor renyah dengan sentuhan rempah Nusantara — siap saluran camilan.",
      ar: "رقائق مورينجا مقرمشة بنكهات توابل نوسانتارا — جاهزة لقنوات الوجبات الخفيفة.",
    },
  },
  {
    id: "4",
    slug: "moringa-powder",
    name: {
      en: "Moringa Powder",
      id: "Powder Kelor",
      ar: "مسحوق المورينجا",
    },
    category: "moringa",
    form: {
      en: "Fine leaf powder",
      id: "Bubuk daun halus",
      ar: "مسحوق أوراق ناعم",
    },
    sku: "MRG-PWD",
    moq: "25 kg",
    featured: true,
    description: {
      en: "Export-grade moringa leaf powder from Sumenep farms for food and nutraceutical use.",
      id: "Bubuk daun kelor kualitas ekspor dari lahan Sumenep untuk pangan dan nutraceutical.",
      ar: "مسحوق أوراق مورينجا بدرجة تصدير من مزارع سومينيب للأغذية والمكملات.",
    },
  },
  {
    id: "5",
    slug: "moringa-noodle",
    name: {
      en: "Moringa Noodle",
      id: "Mie Kelor",
      ar: "نودلز المورينجا",
    },
    category: "moringa",
    form: {
      en: "Dried noodles",
      id: "Mie kering",
      ar: "نودلز مجففة",
    },
    sku: "MRG-MIE",
    moq: "20 carton",
    featured: true,
    description: {
      en: "Everyday moringa noodles for healthy meal programs and retail shelves.",
      id: "Mie kelor sehari-hari untuk program gizi sehat dan rak ritel.",
      ar: "نودلز مورينجا يومية لبرامج الوجبات الصحية وأرفف التجزئة.",
    },
  },
  {
    id: "6",
    slug: "moringa-stick",
    name: {
      en: "Moringa Stick",
      id: "Stick Kelor",
      ar: "عصي المورينجا",
    },
    category: "moringa",
    form: {
      en: "Snack sticks",
      id: "Stick camilan",
      ar: "عصي خفيفة",
    },
    sku: "MRG-STK",
    moq: "20 carton",
    featured: true,
    description: {
      en: "Convenient moringa stick snacks for modern trade and community channels.",
      id: "Camilan stick kelor praktis untuk modern trade dan saluran komunitas.",
      ar: "وجبات مورينجا على شكل عصي مريحة للتجارة الحديثة وقنوات المجتمع.",
    },
  },
];

export const categoryLabels: Record<
  ProductCategory | "all",
  { en: string; id: string; ar: string }
> = {
  all: { en: "All", id: "Semua", ar: "الكل" },
  moringa: { en: "Moringa / Kelor", id: "Kelor / Moringa", ar: "مورينجا / كيلور" },
};

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: ProductCategory | "all") {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
