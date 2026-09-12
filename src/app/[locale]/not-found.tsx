import { LocaleLink } from "@/components/LocaleLink";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-leaf">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-brand-forest">
        This page could not be found.
      </h1>
      <LocaleLink
        href="/"
        className="mt-8 inline-block rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-forest"
      >
        Back to home
      </LocaleLink>
    </section>
  );
}
