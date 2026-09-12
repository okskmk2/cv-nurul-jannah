import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
