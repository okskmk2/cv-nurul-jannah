export type ProcessStep = {
  id: string;
  image: string;
  titleKey: string;
  bodyKey: string;
  altKey: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "farm",
    image: "/process/farm.jpg",
    titleKey: "process.farm.title",
    bodyKey: "process.farm.body",
    altKey: "process.farm.alt",
  },
  {
    id: "receive",
    image: "/process/receiving.jpg",
    titleKey: "process.receive.title",
    bodyKey: "process.receive.body",
    altKey: "process.receive.alt",
  },
  {
    id: "sort",
    image: "/process/sorting.jpg",
    titleKey: "process.sort.title",
    bodyKey: "process.sort.body",
    altKey: "process.sort.alt",
  },
  {
    id: "process",
    image: "/process/processing.jpg",
    titleKey: "process.process.title",
    bodyKey: "process.process.body",
    altKey: "process.process.alt",
  },
  {
    id: "dry",
    image: "/process/drying.jpg",
    titleKey: "process.dry.title",
    bodyKey: "process.dry.body",
    altKey: "process.dry.alt",
  },
  {
    id: "pack",
    image: "/process/packing.jpg",
    titleKey: "process.pack.title",
    bodyKey: "process.pack.body",
    altKey: "process.pack.alt",
  },
];
