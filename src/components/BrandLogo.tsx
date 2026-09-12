export function BrandLogo({
  className = "h-10 w-10",
  decorative = true,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt={decorative ? "" : "CV. Nurul Jannah"}
      width={512}
      height={512}
      className={`object-contain ${className}`}
    />
  );
}
