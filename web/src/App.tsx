import { ArrowRightIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyboardEvent as ReactKeyboardEvent, MouseEventHandler, useEffect, useState } from "react";
import { CTAButton } from "./components/CTAButton";
import { Section } from "./components/Section";
import { SectionHeader } from "./components/SectionHeader";
import { ProductCard } from "./components/ProductCard";
import { ThreeRingDiagram } from "./components/ThreeRingDiagram";
import {
  aboutMeContent,
  faqs,
  metrics,
  navCtaLinks,
  painPoints,
  productOffers,
  socialProofImages,
  testimonials,
} from "./content";

const WECHAT_QR_URL = "https://images.xlearnity.ai/Weixin%20Image_20251024140317_10_303.jpg";

function App() {
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [activeSocialProofIndex, setActiveSocialProofIndex] = useState<number | null>(null);

  const handleWeChatCTAClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    setIsWeChatModalOpen(true);
  };

  const handleCloseWeChatModal = () => setIsWeChatModalOpen(false);
  const openSocialProofModal = (index: number) => setActiveSocialProofIndex(index);
  const handleCloseSocialProofModal = () => setActiveSocialProofIndex(null);

  return (
    <div className="min-h-screen bg-surface-dark text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">X</span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                X 增长体系
              </p>
              <p className="text-xs text-white/50">0 to 50K Growth Flywheel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CTAButton href="#" onClick={handleWeChatCTAClick}>
              {navCtaLinks[0].label}
            </CTAButton>
            <CTAButton variant="secondary" href="#" onClick={handleWeChatCTAClick} icon={<PlayIcon className="h-4 w-4" />}>
              {navCtaLinks[1].label}
            </CTAButton>
          </div>
        </div>
      </header>

      <main>
        <Hero onWeChatTrigger={handleWeChatCTAClick} />
        <About />
        <PainPoints />
        <SystemOverview onWeChatTrigger={handleWeChatCTAClick} />
        <ProductShowcase onWeChatTrigger={handleWeChatCTAClick} />
        <SocialProof onImageOpen={openSocialProofModal} />
        <FinalCTA onWeChatTrigger={handleWeChatCTAClick} />
        <FAQ />
        <Contact />
      </main>

      <SocialProofModal images={socialProofImages} activeIndex={activeSocialProofIndex} onClose={handleCloseSocialProofModal} />
      <WeChatModal isOpen={isWeChatModalOpen} onClose={handleCloseWeChatModal} />

      <footer className="border-t border-white/10 bg-black/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} XLearnity. 保留所有权利。</p>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-white">隐私政策</a>
              <a href="#terms" className="hover:text-white">使用条款</a>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/pandatalk8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent hover:text-accent"
              aria-label="前往 Twitter/X"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3.75h4.05l3.3 4.38 3.75-4.38H21l-6.45 7.47L21.45 20.25h-4.05l-3.63-4.74-4.05 4.74H3l6.84-7.92L4.5 3.75Zm2.43 1.5 4.5 5.82-4.77 5.55h1.59l4.17-4.89 3.75 4.89h2.52l-4.65-6.06 4.68-5.31h-1.56l-3.96 4.62-3.51-4.62H6.93Z" />
              </svg>
            </a>
            <a
              href={WECHAT_QR_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 transition hover:border-accent"
              aria-label="查看企业微信二维码"
            >
              <img
                src={WECHAT_QR_URL}
                alt="企业微信二维码"
                className="h-full w-full rounded-xl object-cover transition group-hover:scale-[1.02]"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Hero({ onWeChatTrigger }: { onWeChatTrigger: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <motion.section
      className="relative overflow-hidden bg-surface-dark"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(29,155,240,0.18),transparent_55%)]" />
        <motion.span
          className="absolute left-1/2 top-[-10%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/18 blur-[200px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-[-12%] top-1/3 h-80 w-80 rounded-full bg-accent-soft/15 blur-[170px]"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[120%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/60 to-transparent"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-dot-grid opacity-25 [background-size:26px_26px]" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            0 -&gt; 50K 增长飞轮
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            系统化实现你的 X 增长飞轮
          </h1>
          <p className="text-lg text-white/80 sm:text-xl">
            通过实战复盘、系统方法和高能社群，构建可持续的内容增长机器。让粉丝增长、品牌打造与变现进入复利循环。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#" onClick={onWeChatTrigger} className="w-full justify-center sm:w-auto">
              {navCtaLinks[0].label}
            </CTAButton>
            <CTAButton
              variant="secondary"
              href="#"
              onClick={onWeChatTrigger}
              className="w-full justify-center sm:w-auto"
              icon={<PlayIcon className="h-4 w-4" />}
            >
              {navCtaLinks[1].label}
            </CTAButton>
          </div>
          <p className="text-sm text-white/60">
            被数千名创作者验证的 X 增长体系 - 完成 80% 作业可享 30 天退款保证
          </p>
        </div>
        <div className="grid w-full max-w-sm gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur lg:max-w-md">
          <h3 className="text-lg font-semibold">为你规划的增长路径</h3>
          <ol className="space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">1</span>
              <div>
                <p className="font-semibold text-white">吸收实战心法</p>
                <p>《推特从 0 到 50K 增长之路》帮助你理解可复制的涨粉规律。</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">2</span>
              <div>
                <p className="font-semibold text-white">构建增长系统</p>
                <p>《X 增长的系统方法论》给出完整执行方法、模板与复盘机制。</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">3</span>
              <div>
                <p className="font-semibold text-white">获得长期陪跑</p>
                <p>X 增长社群每天提供反馈、合作机会与资源互换，让成果持续放大。</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:grid-cols-4 sm:px-6 lg:px-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="text-sm uppercase tracking-[0.25em] text-white/50">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function About() {
  return (
    <Section id="about" background="bg-surface-dark" className="border-y border-white/5">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow sm:p-12">
        <motion.span
          className="pointer-events-none absolute -left-24 top-10 h-48 w-48 rounded-full bg-accent/20 blur-[140px]"
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-accent-soft/20 blur-[120px]"
          aria-hidden="true"
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">关于我</p>
          <article className="whitespace-pre-wrap text-base leading-relaxed text-white/80 sm:text-lg">
            {aboutMeContent}
          </article>
        </div>
      </div>
    </Section>
  );
}

function PainPoints() {
  return (
    <Section background="bg-slate-900/80">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-18 [background-size:24px_24px]" />
        <motion.span
          className="pointer-events-none absolute left-1/2 top-[-12%] -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/18 blur-[160px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid gap-12 lg:grid-cols-[2fr,3fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="痛点拆解"
              title="为什么你的增长常常停在瓶颈？"
              description="大多数创作者卡在三个关键节点：不知道从何开始、缺乏数据驱动的系统方法，以及长期缺少反馈与支持。"
            />
            <p className="text-sm text-white/60">我们的落地页只服务一个目标--让你明确下一步行动并快速使用起来。</p>
          </div>
          <div className="space-y-6">
            {painPoints.map((item) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-white/15 bg-surface-dark/90 p-6 backdrop-blur"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function SystemOverview({ onWeChatTrigger }: { onWeChatTrigger: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Section background="bg-surface-light" className="text-slate-900">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-25 [background-size:28px_28px]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/12 blur-[140px]" />
        <SectionHeader
          eyebrow="增长全景"
          title="三环体系，让增长从混沌走向可复制"
          description="从实战经验到系统方法，再到社群陪跑，X 增长体系帮助你在每个阶段都有明确抓手与绩效指标。"
          align="center"
          tone="light"
        />

        <div className="mt-16 flex flex-col items-center gap-16">
          <ThreeRingDiagram className="w-full max-w-[28rem]" />

          <div className="grid w-full gap-8 md:grid-cols-3">
            {[
              {
                title: "Step 1 | 推特从 0 到 50K",
                subtitle: "复盘 33 篇爆款背后的策略。",
                detail: "掌握冷启动、互动节奏与热点借势的核心打法，快速突破 0-1。"
              },
              {
                title: "Step 2 | X 增长系统课",
                subtitle: "8 周行动闭环+模板工具。",
                detail: "定位、内容、互动、变现组成的完整增长漏斗，确保每一步都有可执行模板。"
              },
              {
                title: "Step 3 | X 增长社群",
                subtitle: "350+ 创作者共创。",
                detail: "每日复盘、项目互推与深度合作机会，帮助你持续迭代并获得真实反馈。"
              },
            ].map((ring) => (
              <div key={ring.title} className="rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900">{ring.title}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {ring.subtitle}
                </p>
                <p className="mt-4 text-base text-slate-600">{ring.detail}</p>
              </div>
            ))}
          </div>

          <div className="w-full rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-2xl font-semibold">90 天启动你的 X 增长飞轮</h3>
              <CTAButton href="#" onClick={onWeChatTrigger} className="w-full justify-center md:w-auto">
                获取 90 天执行手册
              </CTAButton>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "第 1 阶段 | 认知构建 (第 1-2 周)",
                  body: "系统阅读《推特从 0 到 50K》，按照章节清单完成主页优化与内容定位。"
                },
                {
                  title: "第 2 阶段 | 方法内化 (第 3-10 周)",
                  body: "跟进《X 增长的系统方法论》周更节奏，提交作业并用仪表板复盘关键指标。"
                },
                {
                  title: "第 3 阶段 | 社群放大 (第 11-13 周)",
                  body: "加入社群共创，每周参加复盘与 AMA，将流量转化为合作与营收。"
                },
              ].map((point) => (
                <div key={point.title} className="rounded-2xl border border-white/10 bg-white/10 p-6">
                  <h4 className="text-lg font-semibold text-white">{point.title}</h4>
                  <p className="mt-2 text-sm text-white/70">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProductShowcase({ onWeChatTrigger }: { onWeChatTrigger: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Section background="bg-slate-950">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-line-grid opacity-14"
          style={{ backgroundSize: "140px 140px, 140px 140px" }}
        />
        <motion.span
          className="pointer-events-none absolute left-[10%] top-[-8%] -z-10 h-64 w-64 rounded-full bg-accent/16 blur-[150px]"
          animate={{ y: [0, 25, 0], opacity: [0.15, 0.32, 0.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="pointer-events-none absolute right-[-12%] bottom-[-6%] -z-10 h-80 w-80 rounded-full bg-accent/14 blur-[170px]"
          animate={{ y: [0, -30, 0], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
        <SectionHeader
          eyebrow="产品矩阵"
          title="选择适合你阶段的增长模块"
          description="三个产品构成一条成长路径：先掌握心法，再落实方法论，最终在社群里持续复利。"
          align="center"
        />
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-accent/30 bg-accent/10 p-6 text-center text-sm text-white/80 shadow-glow">
          <p>目前小报童专栏《推特从0到50K增长之路》已经上线， 欢迎订阅。</p>
          <p className="mt-2">我们的社群也在持续开放中， 需要先购买小报童专栏，欢迎申请加入。</p>
        </div>
        <div className="mt-16 space-y-12">
          {productOffers.map((offer) => (
            <ProductCard key={offer.id} offer={offer} onCTAClick={onWeChatTrigger} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function SocialProof({ onImageOpen }: { onImageOpen: (index: number) => void }) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onImageOpen(index);
    }
  };

  return (
    <Section background="bg-surface-dark">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-18 [background-size:34px_34px]" />
        <motion.span
          className="pointer-events-none absolute right-[12%] top-[-8%] -z-10 h-72 w-72 rounded-full bg-accent/15 blur-[160px]"
          animate={{ y: [0, 20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <SectionHeader
          eyebrow="社会证明"
          title="真实创作者的增长飞轮已经启动"
          description="他们来自不同国家与行业，却在同一套方法论中找到了持续增长的节奏。"
          align="center"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <motion.blockquote
              key={item.name}
              className="rounded-3xl border border-white/15 bg-surface-dark/90 p-8 text-sm text-white/85 backdrop-blur"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-base text-white">"{item.quote}"</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.3em] text-white/50">
                {item.name} - {item.role}
              </footer>
            </motion.blockquote>
          ))}
        </div>
        <div className="mt-12">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-white/50">实战落地成果一览</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {socialProofImages.map((image, index) => (
              <motion.figure
                key={image.src}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                role="button"
                tabIndex={0}
                aria-label={`放大查看 ${image.alt}`}
                onClick={() => onImageOpen(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0C111B] p-8 text-sm text-white/70 backdrop-blur">
          <p>
            还在犹豫？加入我们的社群，和数百名创作者一起交流成长经验，感受真实的增长氛围。
          </p>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA({ onWeChatTrigger }: { onWeChatTrigger: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Section background="bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-20 [background-size:30px_30px]" />
        <motion.span
          className="pointer-events-none absolute left-[-8%] top-[-10%] -z-10 h-64 w-64 rounded-full bg-accent/18 blur-[160px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.36, 0.18] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative flex flex-col gap-8 rounded-3xl bg-surface-dark/90 p-10 shadow-glow backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-semibold text-white">准备把增长变成一套可复制的系统了吗？</h2>
            <p className="text-base text-white/70">
              报名后 24 小时内即可拿到课程资料、引流磁铁与首周行动手册。现在加入，锁定稀缺名额与专属赠品。
            </p>
            <ul className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 首屏即见核心价值主张
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 多重 CTA 提升决策效率
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 真实学员背书与案例
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 移动端优先、极速加载
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <CTAButton href="#" onClick={onWeChatTrigger} className="justify-center text-base">
              立即加入 X 增长体系
            </CTAButton>
            <CTAButton variant="secondary" href="#" onClick={onWeChatTrigger} className="justify-center text-base" icon={<ArrowRightIcon className="h-4 w-4" />}>
              与团队预约 20 分钟策略电话
            </CTAButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SocialProofModal({
  images,
  activeIndex,
  onClose,
}: {
  images: typeof socialProofImages;
  activeIndex: number | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose]);

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-surface-dark p-6 shadow-glow"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 p-1.5 text-white/70 transition hover:text-white"
              aria-label="关闭"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  className="w-full rounded-2xl object-contain"
                />
              </div>
              <p className="text-center text-sm text-white/70">{images[activeIndex].alt}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WeChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-surface-dark p-8 text-white shadow-glow"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 p-1 text-white/60 transition hover:text-white"
              aria-label="关闭"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="space-y-4 text-center">
              <h3 className="text-2xl font-semibold">扫码添加企业微信</h3>
              <p className="text-sm text-white/70">
                扫描下方二维码，备注“X 增长”，即可与熊老板一对一对接报名信息。
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <img
                  src={WECHAT_QR_URL}
                  alt="企业微信二维码"
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
              <p className="text-xs text-white/50">我们将在 24 小时内回复，请保持微信畅通。</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FAQ() {
  return (
    <Section background="bg-surface-light" className="text-slate-900" id="faq">
      <SectionHeader
        eyebrow="常见问题"
        title="还有疑问？这里有你想知道的"
        description="课程细节、学习方式与售后政策一目了然，降低决策阻力。"
        align="center"
        tone="light"
      />
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {faqs.map((faqItem) => (
          <Disclosure key={faqItem.question}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900">
                  {faqItem.question}
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    className="text-accent"
                  >
                    +
                  </motion.span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pb-6 text-sm text-slate-600">
                  {faqItem.answer}
                </Disclosure.Panel>
                <div className="h-px bg-slate-100" aria-hidden="true" />
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section background="bg-surface-dark" id="contact">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-line-grid opacity-18"
          style={{ backgroundSize: "120px 120px, 120px 120px" }}
        />
        <motion.span
          className="pointer-events-none absolute left-[8%] bottom-[-12%] -z-10 h-72 w-72 rounded-full bg-accent/18 blur-[160px]"
          animate={{ y: [0, 30, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid gap-12 lg:grid-cols-[1.4fr,1fr]">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-8 shadow-glow backdrop-blur"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.span
              className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-accent/22 blur-[180px]"
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.18, 0.32, 0.18] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="pointer-events-none absolute bottom-[-22%] left-[-15%] h-64 w-64 rounded-full bg-accent-soft/22 blur-[190px]"
              animate={{ y: [0, 26, 0], opacity: [0.15, 0.38, 0.15] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative space-y-6">
              <h3 className="text-2xl font-semibold text-white">冷启动节奏看板</h3>
              <p className="text-sm text-white/70">
                将 90 天冷启动拆成四个阶段，让内容、互动、复盘与变现协同推进。每个阶段都有明确动作与反馈机制。
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { phase: "Phase 1", metric: "基础搭建", focus: "主页诊断 · 人设梳理 · 关键词锁定" },
                  { phase: "Phase 2", metric: "高频创作", focus: "49 条/周内容模版 · 钩子共创" },
                  { phase: "Phase 3", metric: "高能互动", focus: "100+ 精准回复 · 热点借势" },
                  { phase: "Phase 4", metric: "社群迭代", focus: "复盘仪表板 · 资源互换" },
                ].map((item, index) => (
                  <motion.div
                    key={item.phase}
                    className="rounded-2xl border border-white/10 bg-black/35 p-4 text-left backdrop-blur"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6.5 + index, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">{item.phase}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.metric}</p>
                    <p className="mt-1 text-xs text-white/60">{item.focus}</p>
                  </motion.div>
                ))}
              </div>
              <div className="relative h-32 overflow-hidden rounded-2xl border border-white/10 bg-black/45">
                {[25, 52, 78].map((top, row) => (
                  <motion.span
                    key={row}
                    className="absolute left-[-30%] h-16 w-[65%] rounded-full bg-gradient-to-r from-white/5 via-accent/60 to-transparent blur-lg"
                    style={{ top: `${top}%` }}
                    animate={{ x: ["-20%", "115%"] }}
                    transition={{ duration: 8 + row * 1.4, repeat: Infinity, ease: "easeInOut", delay: row * 0.5 }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-around px-6">
                  {["内容", "互动", "复盘", "变现"].map((label, idx) => (
                    <motion.div
                      key={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs text-white/70"
                      animate={{ scale: [1, 1.14, 1], opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 4.5 + idx * 0.8, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span
              className="pointer-events-none absolute -left-10 top-12 h-44 w-44 rounded-full bg-accent/25 blur-[140px]"
              animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.22, 0.38, 0.22] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="pointer-events-none absolute bottom-[-12%] right-[-6%] h-48 w-48 rounded-full bg-accent-soft/20 blur-[160px]"
              animate={{ y: [0, -24, 0], opacity: [0.15, 0.33, 0.15] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative space-y-6">
              <h3 className="text-2xl font-semibold text-white">增长动效演示</h3>
              <p className="text-sm text-white/70">
                让节奏在视觉上持续跳动，提醒自己保持输出、互动与复盘。每一道光束都是一次增长动作的反馈。
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">每日数据脉冲</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {[0.4, 0.75, 0.55].map((width, index) => (
                      <div key={index} className="h-2.5 overflow-hidden rounded-full bg-white/12">
                        <motion.span
                          className="block h-full rounded-full bg-accent"
                          animate={{ width: ["15%", `${width * 100}%`, "32%"] }}
                          transition={{ duration: 5.5 + index * 1.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                          style={{ width: "18%" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">互动热力轨迹</p>
                  <div className="relative mt-3 h-36 overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                    {[10, 28, 46, 64, 82].map((left, idx) => (
                      <motion.span
                        key={idx}
                        className="absolute bottom-0 w-4 rounded-full bg-gradient-to-t from-accent/60 via-accent to-white/80"
                        style={{ left: `${left}%`, height: "38%" }}
                        animate={{ height: ["18%", "92%", "28%"] }}
                        transition={{ duration: 5 + idx * 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                      />
                    ))}
                    <motion.div
                      className="absolute inset-x-6 top-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "内容输出", value: "49 条/周", description: "批量化模板保障持续曝光。" },
                    { label: "高质量互动", value: "50-100 次/日", description: "大 V 评论与圈层连结。" },
                    { label: "社群共创", value: "350+ 成员", description: "实时反馈、资源互换。" },
                    { label: "冷启动突破", value: "前 90 天", description: "建立复利节奏，迈过 1K 粉。" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-white/50">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                      <p className="mt-1 text-xs text-white/60">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export default App;
