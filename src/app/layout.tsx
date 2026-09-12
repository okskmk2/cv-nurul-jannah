import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cvnuruljannah.com"),
  title: {
    default: "CV. Nurul Jannah · Moringga | Madura Moringa / Kelor",
    template: "%s | CV. Nurul Jannah",
  },
  description:
    "CV. Nurul Jannah — Moringga kelor foods from Sumenep, Madura: coffee, tea, powder, crackers, noodles, sticks. Organic, Halal, PIRT. B2B & export for SEA, Middle East, Europe.",
  keywords: [
    "moringa",
    "kelor",
    "Moringga",
    "CV Nurul Jannah",
    "Sumenep",
    "Madura",
    "B2B export",
    "halal organic PIRT",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased pb-20 md:pb-0">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyCta />
        </Providers>
      </body>
    </html>
  );
}
