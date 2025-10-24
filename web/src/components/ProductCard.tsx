import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CTAButton } from "./CTAButton";
import type { ProductOffer } from "../types";
import type { MouseEventHandler } from "react";

interface ProductCardProps {
  offer: ProductOffer;
  onCTAClick: MouseEventHandler<HTMLAnchorElement>;
}

const toneClasses: Record<ProductOffer["tone"], string> = {
  light:
    "bg-white text-slate-900 ring-slate-900/5 [&_.muted]:text-slate-600 [&_.muted-strong]:text-slate-800",
  dark:
    "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white ring-white/10 [&_.muted]:text-white/80",
  mesh:
    "bg-surface-dark text-white ring-white/10 [&_.muted]:text-white/80",
};

export function ProductCard({ offer, onCTAClick }: ProductCardProps) {
  const supportClasses =
    offer.tone === "light"
      ? "border border-slate-200 bg-slate-50 text-slate-700"
      : "border border-white/10 bg-white/5 text-white/80";

  return (
    <motion.article
      className={clsx(
        "relative overflow-hidden rounded-3xl p-10 shadow-xl",
        toneClasses[offer.tone]
      )}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {offer.name}
          </span>
          <h3 className="text-3xl font-semibold leading-tight muted-strong">{offer.headline}</h3>
          <p className="muted text-base md:max-w-2xl md:text-lg">{offer.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              关键价值
            </p>
            <ul className="space-y-3 text-sm leading-relaxed">
              {offer.highlights.map((highlight) => (
                <li key={highlight} className="muted flex items-start gap-3">
                  <CheckBadgeIcon className="mt-0.5 h-5 w-5 flex-none text-accent" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              课程大纲
            </p>
            <ul className="space-y-3 text-sm leading-relaxed">
              {offer.bullets.map((bullet) => (
                <li key={bullet} className="muted flex items-start gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-col gap-4 rounded-2xl p-6 text-sm md:flex-row md:items-center md:justify-between",
            supportClasses
          )}
        >
          <p className="muted md:max-w-2xl">{offer.support}</p>
          <CTAButton
            href="#"
            onClick={onCTAClick}
            className="w-full justify-center md:w-auto"
            icon={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
          >
            {offer.cta.label}
          </CTAButton>
        </div>
      </div>
    </motion.article>
  );
}
