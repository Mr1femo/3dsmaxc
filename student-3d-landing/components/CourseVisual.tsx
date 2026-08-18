import { cn } from "@/lib/cn";

type CourseVisualProps = {
  src?: string;
  alt: string;
  caption?: string;
  badge?: string;
  variant?: "hero" | "card" | "wide";
  accent?: "gold" | "cyan" | "violet";
  className?: string;
};

function ArchitecturalPlaceholder({
  variant,
}: {
  variant: CourseVisualProps["variant"];
}) {
  const isHero = variant === "hero";
  const uid = variant ?? "card";

  return (
    <svg viewBox="0 0 960 720" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="55%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id={`${uid}-light`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <rect width="960" height="720" fill={`url(#${uid}-sky)`} />
      <ellipse cx="720" cy="180" rx="90" ry="90" fill="#f5f3ff" opacity="0.8" />

      <polygon points="180,540 440,390 440,180 180,290" fill="#5b21b6" />
      <polygon points="440,180 720,240 720,450 440,390" fill="#7c3aed" />
      <polygon points="180,290 440,180 720,240 490,340" fill="#a78bfa" />
      <polygon points="250,520 250,340 360,300 360,490" fill={`url(#${uid}-light)`} />
      <polygon points="500,410 650,380 650,300 500,325" fill="#ddd6fe" opacity="0.85" />
      <polygon points="720,240 840,310 840,500 720,450" fill="#6d28d9" />

      <g fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4">
        <path d="M180 540 L440 390 L720 450 L840 500" />
        <path d="M180 290 L440 180 L720 240 L840 310" />
        <path d="M440 180 L440 390" />
      </g>

      {isHero ? (
        <g fontFamily="ui-sans-serif, sans-serif" fill="#4c1d95">
          <text x="48" y="56" fontSize="18" fontWeight="700">
            3ds Max  ·  V-Ray  ·  Corona
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export function CourseVisual({
  src,
  alt,
  caption,
  badge,
  variant = "card",
  className,
}: CourseVisualProps) {
  const frame = {
    hero: "aspect-[4/5] sm:aspect-[4/5]",
    card: "aspect-[5/4]",
    wide: "aspect-[16/9]",
  }[variant];

  return (
    <figure className={cn("group relative overflow-hidden rounded-[28px]", className)}>
      <div className={cn("relative overflow-hidden rounded-[28px] bg-brand-soft", frame)}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <ArchitecturalPlaceholder variant={variant} />
        )}
        {badge ? (
          <span
            className={cn(
              "absolute top-3 start-3 z-10 text-xs font-bold drop-shadow-sm",
              src ? "text-white" : "text-slate-900",
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
