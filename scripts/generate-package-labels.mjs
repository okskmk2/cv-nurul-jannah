import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "products", "labels");
const chrome =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const DPI = 300;
const MM = DPI / 25.4;

function px(mm) {
  return Math.round(mm * MM);
}

function dataUri(file, mime) {
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}

const fonts = {
  400: dataUri(
    path.join(root, "node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2"),
    "font/woff2",
  ),
  600: dataUri(
    path.join(root, "node_modules/@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff2"),
    "font/woff2",
  ),
  700: dataUri(
    path.join(root, "node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff2"),
    "font/woff2",
  ),
  800: dataUri(
    path.join(root, "node_modules/@fontsource/geist-sans/files/geist-sans-latin-800-normal.woff2"),
    "font/woff2",
  ),
};

const logoUri = dataUri(path.join(root, "public", "logo.png"), "image/png");
const certs = {
  organic: dataUri(path.join(root, "public", "certs", "organik-indonesia.svg"), "image/svg+xml"),
  halal: dataUri(path.join(root, "public", "certs", "halal-indonesia.svg"), "image/svg+xml"),
  pirt: dataUri(path.join(root, "public", "certs", "pirt.svg"), "image/svg+xml"),
};

const COMPANY = {
  name: "CV. Nurul Jannah",
  brand: "MORINGA",
  taglineId: "Sehat Dengan Keajaiban Kelor",
  taglineEn: "Healthy With the Magic of Kelor",
  origin: "Pakandangan Sangra, Bluto · Sumenep, Madura, Indonesia",
  originShort: "Madura",
  email: "export@cvnuruljannah.com",
  whatsapp: "+62 853 6765 9422",
  web: "cvnuruljannah.com",
};

const products = [
  {
    slug: "moringa-tea",
    enType: "Tea",
    idName: "Teh Kelor",
    net: "100g",
    sku: "MRG-TEA",
    formEn: "Dried leaf tea",
    formId: "Teh daun kering",
    shape: "pouch-closed",
    side: "#A8C99A",
    accent: "#A8C99A",
    bottom: "#F7F3E3",
    rule: "#C4A35A",
    ingredientsEn: "100% dried Moringa oleifera (kelor) leaves.",
    ingredientsId: "100% daun kelor (Moringa oleifera) kering.",
    useEn: "Steep 1 teaspoon (about 2 g) in 200 ml of hot water for 3–5 minutes. Drink warm.",
    useId: "Seduh 1 sendok teh (sekitar 2 g) dalam 200 ml air panas selama 3–5 menit. Minum hangat.",
  },
  {
    slug: "moringa-coffee",
    enType: "Coffee",
    idName: "Kopi Kelor",
    net: "100g",
    sku: "MRG-COF",
    formEn: "Ready-to-brew coffee blend",
    formId: "Campuran kopi siap seduh",
    shape: "pouch-closed",
    side: "#1B4D2E",
    accent: "#C4A35A",
    bottom: "#1B4D2E",
    rule: "#C4A35A",
    ingredientsEn: "Ground coffee, dried Moringa oleifera (kelor) leaves.",
    ingredientsId: "Kopi bubuk, daun kelor (Moringa oleifera) kering.",
    useEn: "Brew as regular coffee — pour-over, French press, or drip. Use 10 g per 180 ml hot water.",
    useId: "Seduh seperti kopi biasa — pour-over, French press, atau drip. Gunakan 10 g per 180 ml air panas.",
  },
  {
    slug: "moringa-powder",
    enType: "Powder",
    idName: "Powder Kelor",
    net: "250g",
    sku: "MRG-PWD",
    formEn: "Fine leaf powder",
    formId: "Bubuk daun halus",
    shape: "pouch-closed",
    side: "#1B4D2E",
    accent: "#3D9B4A",
    bottom: "#1B4D2E",
    rule: "#3D9B4A",
    ingredientsEn: "100% Moringa oleifera (kelor) leaf powder.",
    ingredientsId: "100% bubuk daun kelor (Moringa oleifera).",
    useEn: "Mix 1 teaspoon into water, juice, smoothie, soup, or baked foods. Do not cook at high heat for long periods.",
    useId: "Campurkan 1 sendok teh ke dalam air, jus, smoothie, sup, atau makanan. Hindari pemanasan tinggi dalam waktu lama.",
  },
  {
    slug: "moringa-oil",
    enType: "Seed Oil",
    idName: "Minyak Biji Kelor",
    net: "30ml",
    sku: "MRG-OIL",
    formEn: "30ml glass bottle",
    formId: "Botol kaca 30ml",
    shape: "bottle",
    side: "#F4EBD0",
    accent: "#1B4D2E",
    bottom: "#F4EBD0",
    rule: "#1B4D2E",
    ingredientsEn: "100% Moringa oleifera (kelor) seed oil.",
    ingredientsId: "100% minyak biji kelor (Moringa oleifera).",
    useEn: "Culinary or topical use. Apply a few drops to skin, hair, or food as desired.",
    useId: "Untuk kuliner atau topikal. Teteskan beberapa tetes pada kulit, rambut, atau makanan.",
  },
  {
    slug: "moringa-noodle",
    enType: "Noodle",
    idName: "Mie Kelor",
    net: "200g",
    sku: "MRG-MIE",
    formEn: "Dried noodles",
    formId: "Mie kering",
    shape: "pouch-window",
    side: "#1B4D2E",
    accent: "#C4A35A",
    bottom: "#1B4D2E",
    rule: "#C4A35A",
    companyOnFooter: false,
    ingredientsEn: "Wheat flour, Moringa oleifera (kelor) leaf powder, water, salt.",
    ingredientsId: "Tepung terigu, bubuk daun kelor (Moringa oleifera), air, garam.",
    useEn: "Boil in water for 3–5 minutes until tender. Serve with broth, sauce, or stir-fry.",
    useId: "Rebus dalam air 3–5 menit hingga matang. Sajikan dengan kuah, saus, atau tumisan.",
  },
  {
    slug: "moringa-stick",
    enType: "Stick",
    idName: "Stick Kelor",
    net: "100g",
    sku: "MRG-STK",
    formEn: "Snack sticks",
    formId: "Stick camilan",
    shape: "pouch-window",
    side: "#1B4D2E",
    accent: "#C4A35A",
    bottom: "#1B4D2E",
    rule: "#C4A35A",
    companyOnFooter: true,
    ingredientsEn: "Tapioca starch, Moringa oleifera (kelor) leaf powder, vegetable oil, salt.",
    ingredientsId: "Pati tapioka, bubuk daun kelor (Moringa oleifera), minyak nabati, garam.",
    useEn: "Ready to eat. Open and enjoy as a snack.",
    useId: "Siap makan. Buka kemasan dan nikmati sebagai camilan.",
  },
  {
    slug: "moringa-crackers",
    enType: "Crackers",
    idName: "Krupuk Kelor",
    net: "100g",
    sku: "MRG-CRP",
    formEn: "Snack crackers",
    formId: "Krupuk camilan",
    shape: "pouch-window",
    side: "#1B4D2E",
    accent: "#C4A35A",
    bottom: "#1B4D2E",
    rule: "#C4A35A",
    companyOnFooter: false,
    ingredientsEn: "Tapioca starch, Moringa oleifera (kelor) leaf, Nusantara spices, vegetable oil, salt.",
    ingredientsId: "Pati tapioka, daun kelor (Moringa oleifera), rempah Nusantara, minyak nabati, garam.",
    useEn: "Ready to eat. Open and enjoy as a snack.",
    useId: "Siap makan. Buka kemasan dan nikmati sebagai camilan.",
  },
];

function fontFaceCss() {
  return Object.entries(fonts)
    .map(
      ([weight, uri]) => `@font-face {
  font-family: "Geist Sans";
  src: url("${uri}") format("woff2");
  font-weight: ${weight};
  font-style: normal;
  font-display: block;
}`,
    )
    .join("\n");
}

function certRow() {
  return `<div class="certs">
    <span class="cert-chip"><img src="${certs.organic}" alt="Organik Indonesia" /></span>
    <span class="cert-chip"><img class="halal" src="${certs.halal}" alt="Halal Indonesia" /></span>
    <span class="cert-chip"><img src="${certs.pirt}" alt="P-IRT Indonesia" /></span>
  </div>`;
}

function baseCss(w, h) {
  return `${fontFaceCss()}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  width: ${w}px;
  height: ${h}px;
  overflow: hidden;
  background: #fff;
}
body {
  font-family: "Geist Sans", "Segoe UI", Arial, sans-serif;
  color: #1B4D2E;
  -webkit-font-smoothing: antialiased;
}
.art {
  width: ${w}px;
  height: ${h}px;
  position: relative;
  overflow: hidden;
}
.wordmark {
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 0.95;
  color: #1B4D2E;
}
.en-type {
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #1B4D2E;
}
.id-name {
  font-weight: 700;
  color: #1B4D2E;
  line-height: 1.1;
}
.origin {
  font-weight: 400;
  color: #1B4D2E;
}
.net {
  font-weight: 600;
  color: #1B4D2E;
}
.company {
  font-weight: 600;
  letter-spacing: 0.01em;
}
.certs {
  display: flex;
  align-items: center;
  gap: ${px(2.2)}px;
}
.cert-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px(9)}px;
  height: ${px(9)}px;
  border-radius: ${px(0.6)}px;
  overflow: hidden;
  background: #fff;
}
.cert-chip img {
  width: 92%;
  height: 92%;
  object-fit: contain;
}
.cert-chip img.halal { width: 70%; height: 96%; }
.rule {
  width: ${px(42)}px;
  height: ${px(0.35)}px;
  background: var(--rule, #C4A35A);
}
.logo {
  width: ${px(22)}px;
  height: ${px(22)}px;
  object-fit: contain;
  display: block;
}`;
}

function pouchFront(p) {
  const w = px(130);
  const h = px(210);
  const isWindow = p.shape === "pouch-window";
  const onDarkFooter = Boolean(p.companyOnFooter);
  const footerColor = p.bottom === "#F7F3E3" ? "#1B4D2E" : "#F7F3E3";
  const rows = isWindow
    ? `${px(108)}px ${px(4)}px 1fr ${px(24)}px`
    : `1fr ${px(4.2)}px ${px(22)}px`;
  const panelPadTop = isWindow ? px(12) : px(26);
  const logoSize = isWindow ? px(18) : px(24);
  const wordSize = isWindow ? px(8) : px(9.2);
  const typeSize = isWindow ? px(4.4) : px(5.2);
  const idSize = isWindow ? px(5.2) : px(6.2);

  return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
${baseCss(w, h)}
.art {
  display: grid;
  grid-template-columns: ${px(16)}px 1fr ${px(16)}px;
  grid-template-rows: ${rows};
  background: ${p.side};
}
.side { background: ${p.side}; }
.panel {
  grid-column: 2;
  grid-row: 1;
  background: #F7F3E3;
  display: flex;
  flex-direction: column;
  padding: ${panelPadTop}px ${px(8)}px ${px(6)}px;
  min-height: 0;
}
.panel .logo { width: ${logoSize}px; height: ${logoSize}px; margin: 0 auto ${px(6)}px; }
.wordmark { font-size: ${wordSize}px; text-align: left; letter-spacing: 0.12em; }
.en-type { font-size: ${typeSize}px; margin-top: ${px(1)}px; }
.rule { margin: ${px(4)}px 0 ${px(4.5)}px; background: ${p.rule}; }
.id-name { font-size: ${idSize}px; }
.origin { font-size: ${px(4.2)}px; margin-top: ${px(1)}px; }
.net { font-size: ${px(4)}px; margin-top: ${px(3.5)}px; }
.grow { flex: 1; }
.foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${px(4)}px;
  color: #1B4D2E;
}
.foot .company { font-size: ${px(3.1)}px; }
.accent {
  grid-column: 1 / -1;
  grid-row: 2;
  background: ${p.accent};
}
.bottom {
  grid-column: 1 / -1;
  grid-row: ${isWindow ? 4 : 3};
  background: ${p.bottom};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${px(20)}px;
  color: ${footerColor};
}
.bottom .company { font-size: ${px(3.2)}px; color: ${footerColor}; }
.window {
  grid-column: 2;
  grid-row: 3;
  background: #ffffff;
}
.window-side {
  grid-row: 3;
  background: ${p.side};
}
</style></head>
<body>
<div class="art">
  <div class="side"></div>
  <div class="panel">
    <img class="logo" src="${logoUri}" alt="NJ" />
    <div class="wordmark">MORINGA</div>
    <div class="en-type">${p.enType}</div>
    <div class="rule"></div>
    <div class="id-name">${p.idName}</div>
    <div class="origin">${COMPANY.originShort}</div>
    <div class="net">${p.net}</div>
    <div class="grow"></div>
    ${
      onDarkFooter
        ? ""
        : `<div class="foot">
      <div class="company">${COMPANY.name}</div>
      ${certRow()}
    </div>`
    }
  </div>
  <div class="side"></div>
  <div class="accent"></div>
  ${
    isWindow
      ? `<div class="side window-side"></div>
         <div class="window"></div>
         <div class="side window-side"></div>`
      : ""
  }
  <div class="bottom">
    ${
      onDarkFooter
        ? `<div class="company">${COMPANY.name}</div>${certRow()}`
        : ""
    }
  </div>
</div>
</body></html>`;
}

function pouchBack(p) {
  const w = px(130);
  const h = px(210);
  const section = (en, id, bodyEn, bodyId) => `
    <section>
      <h2>${en} <span>/ ${id}</span></h2>
      <p>${bodyEn}</p>
      <p class="id">${bodyId}</p>
    </section>`;

  return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
${baseCss(w, h)}
.art {
  display: grid;
  grid-template-columns: ${px(16)}px 1fr ${px(16)}px;
  background: ${p.side};
}
.panel {
  grid-column: 2;
  background: #F7F3E3;
  padding: ${px(10)}px ${px(8)}px ${px(8)}px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: ${h}px;
}
.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${px(4)}px;
  padding-bottom: ${px(5)}px;
  border-bottom: ${px(0.35)}px solid ${p.accent};
}
.head-left .kicker {
  font-size: ${px(2.4)}px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #4F6356;
}
.head-left .wordmark { font-size: ${px(6.4)}px; margin-top: ${px(1)}px; }
.head-left .id-name { font-size: ${px(3.6)}px; margin-top: ${px(0.6)}px; }
.meta {
  text-align: right;
  font-size: ${px(2.6)}px;
  line-height: 1.45;
  color: #1B4D2E;
  font-weight: 600;
}
.tagline {
  margin: ${px(4)}px 0 ${px(5)}px;
  font-size: ${px(2.6)}px;
  font-weight: 600;
  color: #2F8F45;
  line-height: 1.35;
}
section {
  margin: 0 0 ${px(4.2)}px;
}
section h2 {
  margin: 0 0 ${px(1.4)}px;
  font-size: ${px(2.5)}px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1B4D2E;
}
section h2 span {
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #4F6356;
  text-transform: none;
}
section p {
  margin: 0;
  font-size: ${px(2.7)}px;
  line-height: 1.38;
  color: #1B4D2E;
}
section p.id {
  color: #4F6356;
  margin-top: ${px(0.6)}px;
}
.grow { flex: 1; }
.mfg {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${px(4)}px;
  align-items: end;
  padding-top: ${px(4)}px;
  border-top: ${px(0.35)}px solid ${p.accent};
}
.mfg .name { font-size: ${px(3.1)}px; font-weight: 800; }
.mfg .addr { font-size: ${px(2.4)}px; line-height: 1.4; color: #4F6356; margin-top: ${px(1)}px; }
.batch {
  margin-top: ${px(3.5)}px;
  font-size: ${px(2.3)}px;
  line-height: 1.4;
  color: #4F6356;
}
.batch strong { color: #1B4D2E; font-weight: 700; }
</style></head>
<body>
<div class="art">
  <div></div>
  <div class="panel">
    <div class="head">
      <div class="head-left">
        <div class="kicker">CV. Nurul Jannah</div>
        <div class="wordmark">MORINGA</div>
        <div class="id-name">${p.enType} · ${p.idName}</div>
      </div>
      <div class="meta">
        Net / Bersih ${p.net}<br/>
        SKU ${p.sku}<br/>
        ${p.formEn}
      </div>
    </div>
    <div class="tagline">${COMPANY.taglineId}<br/>${COMPANY.taglineEn}</div>
    ${section("Ingredients", "Komposisi", p.ingredientsEn, p.ingredientsId)}
    ${section("Directions", "Cara penyajian", p.useEn, p.useId)}
    ${section(
      "Storage",
      "Penyimpanan",
      "Store in a cool, dry place away from direct sunlight. Reseal after opening.",
      "Simpan di tempat sejuk dan kering, jauh dari sinar matahari langsung. Tutup rapat setelah dibuka.",
    )}
    ${section(
      "Origin",
      "Asal",
      "Grown and packed in Sumenep, Madura, Indonesia. Product of Indonesia.",
      "Ditanam dan dikemas di Sumenep, Madura, Indonesia. Produk Indonesia.",
    )}
    <div class="grow"></div>
    <div class="mfg">
      <div>
        <div class="name">${COMPANY.name}</div>
        <div class="addr">
          Pakandangan Sangra, Bluto<br/>
          Sumenep, Madura, Indonesia<br/>
          ${COMPANY.email}<br/>
          ${COMPANY.whatsapp}<br/>
          ${COMPANY.web}<br/>
          Organic · Halal · PIRT · Zero Waste
        </div>
      </div>
      ${certRow()}
    </div>
    <div class="batch">
      <strong>Batch / Exp:</strong> production code and best-before date are printed on the pack.
      Kode produksi dan tanggal kedaluwarsa tercetak pada kemasan.
      No. PIRT sesuai izin produksi CV. Nurul Jannah.
    </div>
  </div>
  <div></div>
</div>
</body></html>`;
}

function bottleFront(p) {
  const w = px(60);
  const h = px(90);
  return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
${baseCss(w, h)}
.art {
  background: #F4EBD0;
  display: flex;
  flex-direction: column;
  padding: ${px(7)}px ${px(6)}px ${px(5)}px;
}
.logo { width: ${px(16)}px; height: ${px(16)}px; margin: 0 auto ${px(3)}px; }
.wordmark { font-size: ${px(5.6)}px; text-align: center; }
.en-type { font-size: ${px(3.6)}px; text-align: center; margin-top: ${px(0.6)}px; }
.rule { width: ${px(28)}px; margin: ${px(3.5)}px auto; background: #1B4D2E; }
.id-name { font-size: ${px(3.8)}px; text-align: center; }
.origin, .net { font-size: ${px(3.2)}px; text-align: center; margin-top: ${px(1)}px; }
.grow { flex: 1; }
.foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px(2)}px;
}
.foot .company { font-size: ${px(2.4)}px; }
.certs { justify-content: center; }
.cert-chip { width: ${px(7.5)}px; height: ${px(7.5)}px; }
</style></head>
<body>
<div class="art">
  <img class="logo" src="${logoUri}" alt="NJ" />
  <div class="wordmark">MORINGA</div>
  <div class="en-type">${p.enType}</div>
  <div class="rule"></div>
  <div class="id-name">${p.idName}</div>
  <div class="origin">${COMPANY.originShort}</div>
  <div class="net">${p.net}</div>
  <div class="grow"></div>
  <div class="foot">
    <div class="company">${COMPANY.name}</div>
    ${certRow()}
  </div>
</div>
</body></html>`;
}

function bottleBack(p) {
  const w = px(60);
  const h = px(90);
  return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
${baseCss(w, h)}
.art {
  background: #F4EBD0;
  padding: ${px(5)}px ${px(5)}px ${px(4)}px;
  display: flex;
  flex-direction: column;
}
.kicker {
  font-size: ${px(1.9)}px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #4F6356;
}
.wordmark { font-size: ${px(4.2)}px; margin-top: ${px(0.6)}px; }
.sub { font-size: ${px(2.5)}px; margin: ${px(0.4)}px 0 ${px(2.5)}px; }
.rule { width: 100%; height: ${px(0.3)}px; background: #1B4D2E; margin-bottom: ${px(2.5)}px; }
h2 {
  margin: ${px(2)}px 0 ${px(0.8)}px;
  font-size: ${px(1.9)}px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
p {
  margin: 0;
  font-size: ${px(2.15)}px;
  line-height: 1.32;
  color: #1B4D2E;
}
p.id { color: #4F6356; margin-top: ${px(0.4)}px; }
.grow { flex: 1; }
.mfg {
  border-top: ${px(0.3)}px solid #1B4D2E;
  padding-top: ${px(2)}px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${px(2)}px;
}
.mfg .name { font-size: ${px(2.2)}px; font-weight: 800; }
.mfg .addr { font-size: ${px(1.85)}px; line-height: 1.3; color: #4F6356; }
.cert-chip { width: ${px(7)}px; height: ${px(7)}px; }
</style></head>
<body>
<div class="art">
  <div class="kicker">CV. Nurul Jannah</div>
  <div class="wordmark">MORINGA</div>
  <div class="sub">${p.enType} · ${p.idName} · ${p.net}</div>
  <div class="rule"></div>
  <h2>Ingredients / Komposisi</h2>
  <p>${p.ingredientsEn}</p>
  <p class="id">${p.ingredientsId}</p>
  <h2>Directions / Cara pakai</h2>
  <p>${p.useEn}</p>
  <p class="id">${p.useId}</p>
  <h2>Storage / Penyimpanan</h2>
  <p>Keep tightly closed in a cool, dark place.</p>
  <p class="id">Tutup rapat, simpan di tempat sejuk dan gelap.</p>
  <div class="grow"></div>
  <div class="mfg">
    <div>
      <div class="name">${COMPANY.name}</div>
      <div class="addr">
        ${COMPANY.origin}<br/>
        ${COMPANY.email}<br/>
        ${COMPANY.whatsapp}<br/>
        Organic · Halal · PIRT<br/>
        Batch/Exp printed on bottle
      </div>
    </div>
    ${certRow()}
  </div>
</div>
</body></html>`;
}

function printSpec() {
  return `# Package print labels — CV. Nurul Jannah / Moringa

RGB PNG files at 300 DPI. Convert to CMYK at the printer.

## Pouch products (tea, coffee, powder, noodle, stick, crackers)

| | |
|---|---|
| Trim size | 130 × 210 mm |
| Resolution | 300 DPI |
| Pixel size | ${px(130)} × ${px(210)} px |
| Files | \`{slug}-front.png\`, \`{slug}-back.png\` |

Front matches the current pack design (NJ mark, MORINGA wordmark, Indonesian name, Madura, net weight, cert marks).
Window pouches (noodle, stick, crackers): the solid white panel is a **knockout / transparent window**. Do not print ink there.

Add 3 mm bleed around the trim when making plates.

## Oil (glass bottle)

| | |
|---|---|
| Trim size | 60 × 90 mm |
| Resolution | 300 DPI |
| Pixel size | ${px(60)} × ${px(90)} px |
| Files | \`moringa-oil-front.png\`, \`moringa-oil-back.png\` |

Scale to the bottle die if the 30 ml glass wrap differs.

## Notes for production

- Batch code, best-before, and official PIRT number are **not** baked into the art — inkjet/stamp them on pack.
- Ingredient lines are typical for each SKU. Confirm against the approved recipe before press.
- Cert marks: Organik Indonesia, Halal Indonesia, P-IRT Indonesia as used on the website.
- Company: CV. Nurul Jannah · Pakandangan Sangra, Bluto, Sumenep, Madura
- Contact: export@cvnuruljannah.com · +62 853 6765 9422 · cvnuruljannah.com

Regenerate: \`node scripts/generate-package-labels.mjs\`
`;
}

async function renderHtml(browser, html, width, height, outFile) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: outFile,
    type: "png",
    clip: { x: 0, y: 0, width, height },
    omitBackground: false,
  });
  await page.close();
}

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--hide-scrollbars", "--allow-file-access-from-files", "--disable-gpu"],
});

try {
  for (const p of products) {
    const isBottle = p.shape === "bottle";
    const w = isBottle ? px(60) : px(130);
    const h = isBottle ? px(90) : px(210);
    const front = isBottle ? bottleFront(p) : pouchFront(p);
    const back = isBottle ? bottleBack(p) : pouchBack(p);
    const frontPath = path.join(outDir, `${p.slug}-front.png`);
    const backPath = path.join(outDir, `${p.slug}-back.png`);
    await renderHtml(browser, front, w, h, frontPath);
    await renderHtml(browser, back, w, h, backPath);
    console.log("wrote", path.basename(frontPath), "and", path.basename(backPath));
  }
  fs.writeFileSync(path.join(outDir, "PRINT-SPEC.md"), printSpec(), "utf8");
  console.log("wrote PRINT-SPEC.md");
} finally {
  await browser.close();
}
