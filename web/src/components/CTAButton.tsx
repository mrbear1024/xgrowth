import clsx from "clsx";
import { motion } from "framer-motion";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export function CTAButton({ variant = "primary", className, children, icon, ...props }: CTAButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-accent text-white shadow-glow hover:bg-accent-soft"
      : "bg-white/10 text-white hover:bg-white/20";

  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all",
        styles,
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </motion.a>
  );
}
