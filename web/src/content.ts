import type { ProductOffer } from "./types";

export const metrics = [
  { label: "实践涨粉案例", value: "50K+" },
  { label: "体系化模板", value: "30+" },
  { label: "社群成员", value: "350+" },
  { label: "平均转化提升", value: "3-5x" }
];

export const painPoints = [
  {
    title: "冷启动没有方向",
    description: "不知道第一步该做什么，发布内容也没有反馈。"
  },
  {
    title: "增长难以持续",
    description: "数据时好时坏，缺少系统方法与复盘机制。"
  },
  {
    title: "孤立作战",
    description: "缺少同路人和专家陪跑，遇到问题无处求助。"
  }
];

export const productOffers: ProductOffer[] = [
  {
    id: "playbook",
    name: "推特从 0 到 50K 增长之路",
    headline: "一年涨粉 50K 的完整经验复盘",
    description:
      "33 篇深度长文，拆解冷启动、互动节奏、热点借势与人设打造。适合正在起号、希望快速理解涨粉规律的你。",
    highlights: [
      "实战经验浓度高，每一节都是复盘后的可复制打法",
      "提供 0-1 起号的关键步骤、心态与注意事项",
      "适合有一定社会经验的创作者快速搭建增长框架"
    ],
    bullets: [
      "冷启动、互粉策略与算法利用",
      "连续输出与内容迭代的节奏设计",
      "案例精读：爆款推文背后的流量密码"
    ],
    cta: {
      label: "订阅专栏",
      href: "https://xiaobot.net/p/0-50k-growth"
    },
    support:
      "一次性付费，永久阅读；支付完成后可添加微信加入专属互助群。",
    tone: "light"
  },
  {
    id: "methodology",
    name: "X 增长的系统方法论",
    headline: "补齐方法论与执行细节的系统课程",
    description:
      "8 周视频课 + 模板工具包。帮你掌握增长全景视角，从定位、内容到互动、变现的每一步都有标准动作。",
    highlights: [
      "每周 1-2 小时直播课+复盘答疑",
      "每日 Twitter 任务与共享分析仪表板，数据驱动迭代",
      "专属 X Space 与 Discord 小组，得到伙伴反馈"
    ],
    bullets: [
      "基础搭建：主页审计与信任设计",
      "内容工厂：49 条推文的批量创作体系",
      "增长杠杆：线程、趋势、社交黑客与自动化",
      "变现设计：从粉丝到收入的漏斗搭建"
    ],
    cta: {
      label: "预约下一期",
      href: "https://newsletter.xgrowth.cc/method"
    },
    support:
      "一次性 $297，完成 80% 作业可享 30 天退款保证。",
    tone: "dark"
  },
  {
    id: "community",
    name: "X 增长社群",
    headline: "全球 350+ 创作者的深度陪跑社群",
    description:
      "年付制成长社群，提供每日实战分享、互推资源与线下连结。帮助你在增长路上不再孤单。",
    highlights: [
      "每日增长日报与资源互换墙",
      "每周热点共创、账号复盘与 AMA",
      "社群成员覆盖 10+ 行业，开放合作机会"
    ],
    bullets: [
      "加入方式：支付后扫码添加社群管家微信",
      "名额上限 500 人，超过即止",
      "支持季度成果复盘与一对一策略建议"
    ],
    cta: {
      label: "申请入群",
      href: "https://newsletter.xgrowth.cc/community"
    },
    support:
      "年费制席位，先到先得；支持企业开票与团队加入。",
    tone: "mesh"
  }
];

export const testimonials = [
  {
    quote:
      "按照课程的每日任务执行 6 周，粉丝从 2K 增长到 11K，单周转化提升了 4 倍。体系化真的省了很多试错。",
    name: "Alex Chen",
    role: "独立开发者 & SaaS 创始人"
  },
  {
    quote:
      "以前零散学了很多教程，这次终于拼成完整地图。社群里的复盘和合作机会让我完成第一次六位数发布。",
    name: "Lily Gu",
    role: "知识付费创业者"
  },
  {
    quote:
      "课程+社群是最强组合。遇到卡点随时能获得反馈，也更有动力坚持内容节奏。",
    name: "Ken Nakamura",
    role: "跨境市场顾问"
  }
];

export const faqs = [
  {
    question: "适合什么阶段的创作者加入？",
    answer:
      "我们服务从刚起号的新手到已经有基本受众、希望突破增长瓶颈的创作者。专栏帮助建立基础认知，课程提供系统训练，社群负责长期陪跑。"
  },
  {
    question: "课程是直播还是录播？",
    answer:
      "核心课程采用直播+录播结合：直播用于答疑和案例拆解，录播在课后 24 小时内上线，方便不同时区学员回看。"
  },
  {
    question: "没有 Twitter 基础也能学吗？",
    answer:
      "可以。课程第一模块会手把手指导账号定位与主页搭建；只要愿意每天投入 1-2 小时执行，就能跟上节奏。"
  },
  {
    question: "支付后如何加入社群？",
    answer:
      "完成付款后页面会弹出社群管家微信二维码，同时发送含入群说明的邮件。添加成功后 12 小时内即可进入社群。"
  }
];

export const navCtaLinks = [
  {
    label: "立即加入课程",
    href: "https://newsletter.xgrowth.cc/method"
  },
  {
    label: "获取试听",
    href: "https://newsletter.xgrowth.cc/trial"
  }
];
