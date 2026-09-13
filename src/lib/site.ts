export const SITE_URL = "https://cvnuruljannah.com";
export const SITE_NAME = "CV. Nurul Jannah";
export const SITE_BRAND = "Moringga";
export const SITE_EMAIL = "export@cvnuruljannah.com";

export function isPlaceholderWhatsApp(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length < 8 || /000000/.test(digits);
}
