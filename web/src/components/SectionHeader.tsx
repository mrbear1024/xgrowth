interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export function SectionHeader({ eyebrow, title, description, align = "left", tone = "dark" }: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center max-w-3xl mx-auto" : "text-left";
  const eyebrowClass = tone === "light" ? "text-accent" : "text-accent/80";
  const titleClass = tone === "light" ? "text-slate-900" : "text-white";
  const descriptionClass = tone === "light" ? "text-slate-600" : "text-white/70";

  return (
    <div className={`space-y-4 ${alignment}`}>
      {eyebrow && (
        <p className={`text-xs uppercase tracking-[0.3em] ${eyebrowClass}`}>{eyebrow}</p>
      )}
      <h2 className={`text-3xl font-semibold leading-tight sm:text-4xl ${titleClass}`}>
        {title}
      </h2>
      {description && <p className={`text-base sm:text-lg ${descriptionClass}`}>{description}</p>}
    </div>
  );
}
