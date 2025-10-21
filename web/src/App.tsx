import { ArrowRightIcon, EnvelopeIcon, PhoneIcon, PlayIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import { CTAButton } from "./components/CTAButton";
import { Section } from "./components/Section";
import { SectionHeader } from "./components/SectionHeader";
import { ProductCard } from "./components/ProductCard";
import { ThreeRingDiagram } from "./components/ThreeRingDiagram";
import {
  faqs,
  metrics,
  navCtaLinks,
  painPoints,
  productOffers,
  testimonials,
} from "./content";

function App() {
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
            <CTAButton href={navCtaLinks[0].href}>{navCtaLinks[0].label}</CTAButton>
            <CTAButton variant="secondary" href={navCtaLinks[1].href} icon={<PlayIcon className="h-4 w-4" />}>
              {navCtaLinks[1].label}
            </CTAButton>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <PainPoints />
        <SystemOverview />
        <ProductShowcase />
        <SocialProof />
        <FinalCTA />
        <FAQ />
        <Contact />
      </main>

      <footer className="border-t border-white/10 bg-black/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} X Growth System. 保留所有权利。</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-white">隐私政策</a>
            <a href="#terms" className="hover:text-white">使用条款</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
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
            <CTAButton href={navCtaLinks[0].href} className="w-full justify-center sm:w-auto">
              立即加入课程
            </CTAButton>
            <CTAButton
              variant="secondary"
              href={navCtaLinks[1].href}
              className="w-full justify-center sm:w-auto"
              icon={<PlayIcon className="h-4 w-4" />}
            >
              预约试听
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

function SystemOverview() {
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
              <CTAButton href="#contact" className="w-full justify-center md:w-auto">
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

function ProductShowcase() {
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
        <div className="mt-16 space-y-12">
          {productOffers.map((offer) => (
            <ProductCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function SocialProof() {
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
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0C111B] p-8 text-sm text-white/70 backdrop-blur">
          <p>
            "一页式落地页像是一位顶尖销售。我们把视觉层次、心理触发与 CTA 位置全部复盘到位，只为让你用最少的滚动完成决策。" -- 团队设计宣言
          </p>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA() {
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
            <CTAButton href={navCtaLinks[0].href} className="justify-center text-base">
              立即加入 X 增长体系
            </CTAButton>
            <CTAButton variant="secondary" href="#contact" className="justify-center text-base" icon={<ArrowRightIcon className="h-4 w-4" />}>
              与团队预约 20 分钟策略电话
            </CTAButton>
          </div>
        </div>
      </div>
    </Section>
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
          <div className="space-y-6">
            <SectionHeader
              eyebrow="联系团队"
              title="不确定该怎么开始？获取一份定制增长方案"
              description="留下联系方式，我们会在 24 小时内回访，与你确认目标、当前挑战与最合适的产品组合。"
            />
            <div className="grid gap-6 text-sm text-white/70 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <EnvelopeIcon className="h-6 w-6 text-accent" />
                <p className="mt-2 text-sm font-semibold text-white">邮箱</p>
                <a href="mailto:hello@xgrowth.cc" className="mt-1 block">
                  hello@xgrowth.cc
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <PhoneIcon className="h-6 w-6 text-accent" />
                <p className="mt-2 text-sm font-semibold text-white">微信</p>
                <p className="mt-1">扫描页面底部二维码，添加社群管家获取帮助。</p>
              </div>
            </div>
          </div>

          <form className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>你的名字</span>
                <input
                  type="text"
                  name="name"
                  placeholder="张三"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>邮箱</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>你当前的增长阶段</span>
              <select
                name="stage"
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
                defaultValue=""
              >
                <option value="" disabled>
                  请选择
                </option>
                <option value="starter">刚开始运营，需要清晰路径</option>
                <option value="builder">已有粉丝，希望突破增长瓶颈</option>
                <option value="scaler">准备规模化变现和合作</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>你最想解决的问题</span>
              <textarea
                name="message"
                rows={4}
                placeholder="例如：希望在 3 个月内从 1K 到 5K 粉丝，并完成首个产品发布。"
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
              />
            </label>
            <p className="text-xs text-white/40">
              提交即表示你同意我们与您联系，并遵守隐私政策。
            </p>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-glow transition-colors duration-200 hover:bg-accent-soft"
            >
              提交信息，获取定制方案
            </motion.button>
          </form>
        </div>
      </div>
    </Section>
  );
}

export default App;
