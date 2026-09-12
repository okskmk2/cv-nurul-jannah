import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CV. Nurul Jannah · Moringga — Madura Moringa / Kelor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F3E3",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#1B4D2E",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {/* Satori OG renderer requires img, not next/image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>CV. Nurul Jannah</span>
            <span style={{ fontSize: 16, color: "#3D9B4A", fontWeight: 600 }}>
              MORINGGA
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              color: "#1B4D2E",
              lineHeight: 1.1,
            }}
          >
            Madura Moringa / Kelor Foods
          </div>
          <div style={{ fontSize: 28, color: "#4F6356" }}>
            Coffee · Tea · Powder · Crackers · Noodles · Sticks
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 22,
            fontWeight: 600,
            color: "#2F8F45",
          }}
        >
          <span>Organic</span>
          <span>·</span>
          <span>Halal</span>
          <span>·</span>
          <span>PIRT</span>
          <span>·</span>
          <span>B2B Export</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
