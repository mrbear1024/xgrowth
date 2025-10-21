import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface SectionProps extends PropsWithChildren {
  id?: string;
  background?: string;
  className?: string;
}

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Section({ id, background, className, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={clsx(
        "relative overflow-hidden",
        background,
        className
      )}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      variants={variants}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {children}
      </div>
    </motion.section>
  );
}
