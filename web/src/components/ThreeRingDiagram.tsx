import { CSSProperties } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface ThreeRingDiagramProps {
  className?: string;
}

type Connector = "vertical" | "left" | "right";

const ringLayers = [
  {
    size: 360,
    borderClass: "border-accent/18",
    duration: 18,
    delay: 0,
  },
  {
    size: 260,
    borderClass: "border-white/18",
    duration: 14,
    delay: 0.4,
  },
  {
    size: 180,
    borderClass: "border-white/25",
    duration: 12,
    delay: 0.8,
  },
];

const callouts: Array<{
  title: string;
  description: string;
  connector: Connector;
  style: CSSProperties;
}> = [
  {
    title: "推特从 0 到 50K",
    description: "吸收实战心法，完成冷启动与内容定位。",
    connector: "vertical",
    style: { top: "-9%", left: "50%", transform: "translate(-50%, 0)" },
  },
  {
    title: "X 增长的系统方法论",
    description: "用 8 周动作闭环和模板建立执行节奏。",
    connector: "right",
    style: { top: "52%", right: "-18%", transform: "translate(0, -50%)" },
  },
  {
    title: "X 增长社群",
    description: "在陪跑社群中复盘、互推与合作，实现长期复利。",
    connector: "left",
    style: { bottom: "-6%", left: "-18%" },
  },
];

export function ThreeRingDiagram({ className }: ThreeRingDiagramProps) {
  return (
    <div
      className={clsx(
        "relative isolate flex h-[24rem] w-full max-w-[26rem] items-center justify-center",
        "rounded-[3rem] border border-white/10 bg-surface-dark/95 p-10 shadow-[0_0_0.5rem_rgba(15,23,42,0.6)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[3rem]">
        <div className="absolute inset-0 bg-dot-grid opacity-12" style={{ backgroundSize: "34px 34px" }} />
        <motion.span
          className="absolute left-[-10%] top-[-20%] h-64 w-64 rounded-full bg-accent/14 blur-[180px]"
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-[-12%] bottom-[-18%] h-72 w-72 rounded-full bg-accent-soft/12 blur-[200px]"
          animate={{ opacity: [0.15, 0.28, 0.15], scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {ringLayers.map((ring, index) => (
        <motion.div
          key={ring.size}
          className={clsx(
            "absolute rounded-full border",
            ring.borderClass,
            index === 0 ? "backdrop-blur-sm" : ""
          )}
          style={{ width: ring.size, height: ring.size }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "easeInOut", delay: ring.delay }}
        />
      ))}

      <motion.div
        className="absolute h-[360px] w-[360px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent/80 shadow-[0_0_18px_rgba(29,155,240,0.6)]" />
      </motion.div>

      <motion.div
        className="absolute h-[260px] w-[260px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-0 top-1/3 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_12px_rgba(148,163,184,0.7)]" />
      </motion.div>

      <div className="relative flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-[2rem] border border-white/20 bg-surface-dark/90 text-center shadow-[0_0_26px_rgba(29,155,240,0.22)]">
        <span className="text-[11px] uppercase tracking-[0.35em] text-white/65">X Growth</span>
        <p className="text-lg font-semibold text-white">飞轮核心</p>
        <p className="text-xs text-white/65">认知 → 方法 → 社群</p>
      </div>

      {callouts.map((callout) => (
        <div
          key={callout.title}
          className="pointer-events-none absolute"
          style={callout.style}
        >
          {callout.connector === "vertical" ? (
            <div className="flex flex-col items-center gap-2 text-center text-xs text-white/85">
              <div className="rounded-2xl border border-accent/20 bg-surface-dark/90 px-4 py-3">
                <p className="text-sm font-semibold text-white">{callout.title}</p>
                <p className="mt-1 leading-relaxed">{callout.description}</p>
              </div>
              <motion.span
                className="h-14 w-px bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          ) : callout.connector === "left" ? (
            <div className="flex items-center gap-3 text-right text-xs text-white/85">
              <div className="rounded-2xl border border-accent/20 bg-surface-dark/90 px-4 py-3">
                <p className="text-sm font-semibold text-white">{callout.title}</p>
                <p className="mt-1 leading-relaxed">{callout.description}</p>
              </div>
              <motion.span
                className="h-px w-14 bg-gradient-to-r from-accent/60 to-accent/0"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 text-left text-xs text-white/85">
              <motion.span
                className="h-px w-14 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
              <div className="rounded-2xl border border-accent/20 bg-surface-dark/90 px-4 py-3">
                <p className="text-sm font-semibold text-white">{callout.title}</p>
                <p className="mt-1 leading-relaxed">{callout.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
