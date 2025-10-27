# 知识付费平台 SRD v1.0（Next.js + Prisma + Postgres）

> 目标：让代码生成器（如 Codex）“一次过”产出可运行的课程展示 / 销售 / 学习网站最小可行产品（MVP）。本规格书提供**单一事实来源（Single Source of Truth）**，覆盖数据模型、接口合同、页面路由、权限策略、支付抽象、开发与验收清单。

---

## 0. 技术基线与默认约定

* **框架**：Next.js 14（App Router，TypeScript，ESLint，Prettier）
* **UI**：TailwindCSS + shadcn/ui + lucide-react 图标 + Framer Motion 动画
* **认证**：NextAuth（Credentials：email + password；可扩展 OAuth/短信）
* **密码**：bcrypt 哈希（10~12 rounds）
* **数据库**：PostgreSQL（Prisma ORM）
* **价格**：以 **整数分** 存储（`priceInCents`，货币 `CNY`）
* **存储**：本地 `public/uploads`（预留 S3/R2 直传）
* **Markdown**：MDX 渲染（remark/rehype；代码高亮；可选公式）+ sanitize
* **支付**：抽象层 `PaymentProvider = MOCK | WECHAT | ALIPAY | STRIPE`（默认 MOCK 成功）；正式接入仅替换 Provider 实现
* **SEO**：课程详情页生成 OG/Twitter Card
* **国际化**：预留 i18n（默认中文）
* **部署**：Dockerfile + docker-compose（App + Postgres）
* **日志**：基础请求日志 + 错误日志；订单与支付全链路可追踪 `orderId`
* **时区**：统一使用 UTC 存储，界面按浏览器本地时区显示

---

## 1. 环境变量（`.env.example`）

```
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_with_strong_secret

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/paidu?schema=public

# Payments
PAYMENT_PROVIDER=MOCK  # MOCK | WECHAT | ALIPAY | STRIPE
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_SUCCESS_URL=http://localhost:3000/checkout/success
STRIPE_CANCEL_URL=http://localhost:3000/checkout/fail

# Uploads
UPLOAD_DIR=public/uploads
# 如改用 S3：
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

---

## 2. 数据模型（Prisma Schema）

> 在原始草案基础上：补充 `slug`、价格整数分、文章排序 `position`、试读标记、软删除、枚举状态、唯一索引、外键、审计字段。

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole { USER AUTHOR ADMIN }

enum CourseStatus { DRAFT REVIEW PUBLISHED UNLISTED }

enum Visibility { PUBLISHED UNLISTED PRIVATE }

enum OrderStatus { PENDING PAID CANCELED EXPIRED REFUNDED }

enum PaymentStatus { PENDING SUCCESS FAILED REFUNDED }

enum PaymentProvider { MOCK WECHAT ALIPAY STRIPE }

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  userName     String?   @unique
  nickname     String?
  passwordHash String
  role         UserRole  @default(USER)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  deletedAt    DateTime?

  courses      Course[]  @relation("CourseAuthor")
  enrollments  Enrollment[]
  orders       Order[]
}

model Course {
  id            String        @id @default(cuid())
  name          String
  slug          String        @unique
  coverUrl      String
  authorId      String
  author        User          @relation("CourseAuthor", fields: [authorId], references: [id])
  desc          String
  highlight     String?
  priceInCents  Int
  isFree        Boolean       @default(false)
  status        CourseStatus  @default(DRAFT)
  visibility    Visibility    @default(PUBLISHED)
  category      String?
  tags          String[]
  totalLessons  Int           @default(0)
  totalDuration Int           @default(0)
  sortOrder     Int           @default(0)

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  deletedAt     DateTime?

  articles      Article[]
  enrollments   Enrollment[]

  @@index([status, visibility])
}

model Article {
  id           String   @id @default(cuid())
  courseId     String
  course       Course   @relation(fields: [courseId], references: [id])
  title        String
  slug         String
  coverUrl     String?
  contentMdx   String
  videoUrl     String?
  position     Int
  isFreePreview Boolean  @default(false)
  readingTime  Int?
  wordCount    Int?

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  deletedAt    DateTime?

  @@unique([courseId, slug])
  @@index([courseId, position])
}

model Enrollment {
  id        String   @id @default(cuid())
  userId    String
  courseId  String
  source    String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
  course    Course   @relation(fields: [courseId], references: [id])

  @@unique([userId, courseId])
}

model Order {
  id             String          @id @default(cuid())
  userId         String
  status         OrderStatus     @default(PENDING)
  provider       PaymentProvider @default(MOCK)
  currency       String          @default("CNY")
  totalInCents   Int
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  idempotencyKey String?         @unique

  // Stripe 相关（可选）
  stripeCheckoutSessionId String? @unique
  stripePaymentIntentId   String?

  user         User            @relation(fields: [userId], references: [id])
  items        OrderItem[]
  payment      Payment?

  @@index([userId, status])
}

model OrderItem {
  id        String @id @default(cuid())
  orderId   String
  courseId  String
  unitPrice Int
  quantity  Int    @default(1)
  title     String
  coverUrl  String?

  order     Order  @relation(fields: [orderId], references: [id])
  course    Course @relation(fields: [courseId], references: [id])
}

model Payment {
  id               String          @id @default(cuid())
  orderId          String          @unique
  status           PaymentStatus   @default(PENDING)
  provider         PaymentProvider @default(MOCK)
  providerTradeNo  String?
  amountInCents    Int
  paidAt           DateTime?
  meta             Json?

  // 便于对账（Stripe/其他）
  paymentIntentId   String?
  checkoutSessionId String?

  order            Order           @relation(fields: [orderId], references: [id])
}
```

> 说明：统一命名 `userName`；课程作者为 `User` 外键；软删除字段 `deletedAt`；价格整型；文章试读布尔位；支付/订单状态与 Provider 枚举完整化；幂等键 `idempotencyKey`。

---

## 3. 页面与路由（Next.js App Router）

```
app/
  layout.tsx
  page.tsx                          # 首页（发现）

  course/[slug]/page.tsx            # 课程详情（宣传页）
  course/[slug]/content/page.tsx    # 课程内容页（需已购）
  course/[slug]/read/[article]/page.tsx  # 阅读页（需已购或试读）

  me/courses/page.tsx               # 我的课程（用户中心）

  checkout/page.tsx                 # 结算页
  checkout/success/page.tsx         # 支付成功
  checkout/fail/page.tsx            # 支付失败

  auth/login/page.tsx
  auth/register/page.tsx

  api/
    auth/login/route.ts
    auth/register/route.ts
    courses/route.ts                # GET 列表
    courses/[slug]/route.ts         # GET 详情
    courses/[slug]/articles/[article]/route.ts  # GET 章节内容
    me/courses/route.ts             # GET 已购
    checkout/create/route.ts        # POST 创建订单
    checkout/confirm/route.ts       # POST 确认支付

components/
  Header.tsx Footer.tsx
  CourseCard.tsx CourseGrid.tsx
  PriceTag.tsx BuyButton.tsx
  SidebarToc.tsx MarkdownRenderer.tsx
  Skeletons.tsx EmptyState.tsx

lib/
  db.ts auth.ts payments.ts mdx.ts format.ts acl.ts
```

### 交互规范

* **首页卡片**：封面/名/价格/作者/亮点简摘 + 按钮

  * 已购显示 `已购`（禁用购买按钮）+ `开始学习`
  * 未购显示 `立即购买`（跳转结算页）
* **详情页**：显示目录（仅标题与是否试读）；未购点击试读可读，非试读跳登录/购买
* **内容页**：左目录按 `position` 升序；右侧简介 + `开始阅读`
* **阅读页**：MDX 渲染；上一章/下一章；TOC（可选）
* **我的课程**：Enrollment 列表 → 进入内容页
* **Skeleton**：列表、详情、阅读均配骨架屏
* **错误页**：403（未购/未授权）、404（不存在）、500（服务器）

---

## 4. 权限与访问控制（ACL）

* 未登录：浏览首页/详情；仅可打开试读章节
* 登录：可购买；阅读已购课程全部章节
* `AUTHOR`：仅管理自己课程（若实现后台）
* `ADMIN`：全量读写
* **路由守卫**：

  * `/course/[slug]/content`、`/course/[slug]/read/[article]` 需 `已购 或 isFreePreview=true`
  * API 端统一校验，返回 `401/403`

---

## 5. API 合同（请求/响应与错误）

> 统一 `application/json`；失败返回：`{ error: { code: string, message: string } }`

### Auth

* `POST /api/auth/register`

  * body: `{ email: string, password: string, nickname?: string }`
  * 201: `{ user: { id, email } }`
  * 409: 邮箱已存在
* `POST /api/auth/login`

  * body: `{ email: string, password: string }`
  * 200: `{ token: string }`（或使用 NextAuth session）
  * 401: 账号或密码错误

### Courses

* `GET /api/courses?q=&category=&tag=&page=1&pageSize=12`

  * 200: `{ items: CourseCardDTO[], total: number }`
  * `CourseCardDTO = { id, slug, name, coverUrl, author: { id, nickname }, highlight, priceInCents, isFree }`
* `GET /api/courses/:slug`

  * 200: `{ course: CourseDetailDTO, articles: ArticleListItem[] }`
  * `ArticleListItem = { title, slug, position, isFreePreview }`
* `GET /api/courses/:slug/articles/:articleSlug`

  * 未购且非试读 → 403
  * 200: `{ article: { title, contentMdx, videoUrl, position }, course: { id, name, slug } }`

### Me

* `GET /api/me/courses`（需登录）

  * 200: `{ items: CourseCardDTO[] }`

### Checkout

* `POST /api/checkout/create`（需登录）

  * body: `{ courseId: string, provider: 'MOCK' | 'WECHAT' | 'ALIPAY', idempotencyKey?: string }`
  * 200: `{ orderId: string, paymentIntentUrl?: string, qrcodeUrl?: string }`
* `POST /api/checkout/confirm`

  * body: `{ orderId: string, providerResult?: any }`
  * MOCK：直接置 `Payment.SUCCESS`，`Order.PAID`，创建 Enrollment
  * 200: `{ status: 'PAID' }`
  * 幂等：若已 `PAID` 重复调用，直接返回 `{ status: 'PAID' }`

### 错误码（建议）

* `AUTH_401` 未登录；`ACL_403` 未授权；`NOT_FOUND`；`ORDER_INVALID`；`PAYMENT_FAILED`

---

## 6. 支付抽象层（可替换实现）

```ts
// lib/payments.ts（伪代码）
export type Provider = 'MOCK'|'WECHAT'|'ALIPAY'|'STRIPE'

export async function createPayment(orderId: string, provider: Provider) {
  switch (provider) {
    case 'MOCK':
      return { ok: true, redirectUrl: null, qrcodeUrl: null }
    case 'WECHAT':
      return { ok: true, qrcodeUrl: 'weixin://pay/q/...' }
    case 'ALIPAY':
      return { ok: true, redirectUrl: 'https://openapi.alipay.com/gateway.do?...' }
    case 'STRIPE':
      // 实际创建在 /api/checkout/create 中完成，这里仅声明：将返回前端需跳转的 Checkout URL
      return { ok: true, redirectUrl: 'https://checkout.stripe.com/c/pay/cs_test_xxx' }
  }
}

export async function confirmPayment(orderId: string, provider: Provider, payload?: any) {
  switch (provider) {
    case 'MOCK':
      return { status: 'SUCCESS', providerTradeNo: 'MOCK-'+Date.now() }
    case 'WECHAT':
    case 'ALIPAY':
      return { status: 'SUCCESS', providerTradeNo: payload?.tradeNo }
    case 'STRIPE':
      // Stripe 推荐以 Webhook 完成最终确认；此处返回 PENDING，待 /api/webhooks/stripe 异步置为已支付
      return { status: 'PENDING' }
  }
}
```

**幂等**：`/checkout/create` 支持 `idempotencyKey`；若同键重复请求，返回已建订单。

### 6.1 Stripe 接入规范（Checkout + Webhook）

* 依赖：`stripe` NPM 包；`.env` 需配置：`STRIPE_SECRET_KEY`、`STRIPE_WEBHOOK_SECRET`、`STRIPE_SUCCESS_URL`、`STRIPE_CANCEL_URL`。
* **创建订单**：`POST /api/checkout/create` 在 `provider=STRIPE` 时：

  1. 创建 `Order(PENDING)` + `OrderItem`；
  2. 使用 `stripe.checkout.sessions.create` 生成 Checkout Session（`mode:'payment'`，`payment_method_types:['card']`，`line_items:[{ price_data:{ currency:'cny', unit_amount: totalInCents, product_data:{ name: course.name } }, quantity:1 }]`，`success_url/cancel_url`），并设置 `metadata.orderId`；
  3. 持久化 `stripeCheckoutSessionId` 至 `Order`，返回 `redirectUrl=session.url` 给前端跳转。
* **确认支付**：**不要**以前端 query 判断成功，改用 `POST /api/webhooks/stripe`：

  * 校验 `Stripe-Signature`，用原始 body 调 `stripe.webhooks.constructEvent`；
  * 处理 `checkout.session.completed`：读取 `event.data.object.metadata.orderId`；将 `Order->PAID`、写入 `Payment{SUCCESS}`、创建 `Enrollment`；幂等处理（订单已 PAID 直接返回 200）。
* **Next.js App Router Webhook 注意**：需读取 `await req.text()` 获取原始字符串；

  ```ts
  export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    // ...handle
  }
  ```
* **回跳成功页**：仅做友好提示 + 轮询 `GET /api/orders/:id` 或等待 Webhook 把订单置为 PAID 后再展示“开始学习”。

---

## 7. Markdown/MDX 渲染管线

* `remark-gfm`、`remark-breaks`、`rehype-slug`、`rehype-autolink-headings`
* 代码高亮：`rehype-prism-plus`
* 安全：对 HTML 片段 sanitize（仅白名单标签/属性）
* 链接：外链增加 `target="_blank" rel="noopener noreferrer"`
* TOC：基于 `h2/h3` 生成目录（可选）

---

## 8. 组件与交互细节

* `CourseCard`：

  * 展示封面、名、作者、亮点简摘（截断 2~3 行）、价格（`formatCNY`）；
  * 动作按钮：已购 → `已购`（禁用）+ `开始学习`；未购 → `立即购买`。
* `PriceTag`：`免费` 或 `￥{(priceInCents/100).toFixed(2)}`
* `SidebarToc`：当前章节高亮；上一章/下一章基于 `position`；移动端可折叠。
* `MarkdownRenderer`：接收 `contentMdx` 字符串；
* 骨架屏：列表、详情、阅读页统一 Skeleton 组件。

---

## 9. 安全与健壮性

* 认证：登录/注册参数校验（zod/yup），防撞库；密码强度校验（≥8位、含字母数字）
* 速率限制：登录/注册/支付创建接口限流（如 10 req/min/IP）
* 权限：API 端强校验课程可见性与是否已购；拦截未授权访问
* 事务：订单、支付、发放 Enrollment 在事务中完成
* 幂等：创建订单、确认支付均可重复调用
* 软删除：所有查询过滤 `deletedAt IS NULL`

---

## 10. 种子数据（`prisma/seed.ts`）

* 创建 1 个 `ADMIN`、1 个 `AUTHOR`、1 个普通用户
* 创建 2~3 门课程，每门 6~10 篇 `Article`（含 1~2 篇 `isFreePreview=true`）
* 为普通用户创建 1 笔已支付订单 + Enrollment

---

## 11. 开发脚本与 Docker

**package.json**（关键脚本）：

```
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:seed": "tsx prisma/seed.ts"
}
```

---

## 12. 管理后台（课程创建/编辑/发布）

### 12.1 页面路由

```
/admin                       # 仪表盘（统计入口，可简化为空）
/admin/courses               # 课程列表：筛选（状态/可见性/关键词）、分页
/admin/courses/new           # 新建课程表单
/admin/courses/[id]          # 编辑课程（基本信息）
/admin/courses/[id]/articles # 章节列表（增删改、拖拽排序）
/admin/uploads               # （可选）素材管理
```

### 12.2 表单字段

* 课程：名称、封面上传、slug（自动生成/可手改、唯一校验）、作者（默认当前管理员/作者）、简介、亮点、价格（分）、是否免费、可见性、状态（DRAFT/REVIEW/PUBLISHED/UNLISTED）、分类、标签（多选/自定义）。
* 章节：标题、slug（课程内唯一）、封面、MDX 内容、视频 URL（可留空）、是否试读、排序位置。

### 12.3 交互

* 新建后默认 `DRAFT`；“保存草稿 / 发布 / 取消发布 / 预览”；
* 章节支持**拖拽排序**：保存时批量提交 `[{id, position}]`；
* 封面/图片上传采用 `/api/admin/upload` 返回 URL，写入 `coverUrl`。

### 12.4 权限

* 仅 **ADMIN** 访问 `/admin/**`；如开放给作者（AUTHOR），则作者仅能管理自己 `authorId` 的课程。
* API 端二次校验（切勿只靠前端）。

### 12.5 管理端 API 合同

* `GET /api/admin/courses?status=&visibility=&q=&page=&pageSize=` → `{ items, total }`

* `POST /api/admin/courses` → 新建课程（默认 `DRAFT`）

* `PATCH /api/admin/courses/:id` → 更新课程基本信息

* `POST /api/admin/courses/:id/publish` → `status=PUBLISHED`

* `POST /api/admin/courses/:id/unpublish` → `status=DRAFT` 或 `UNLISTED`

* `DELETE /api/admin/courses/:id` → 软删除（`deletedAt`）

* `GET /api/admin/courses/:id/articles` → `{ items }`

* `POST /api/admin/articles` → 新建章节（含 `courseId`）

* `PATCH /api/admin/articles/:id` → 更新章节

* `DELETE /api/admin/articles/:id`

* `PATCH /api/admin/articles/reorder` → body: `[{ id: string, position: number }]`

* `POST /api/admin/upload`（multipart/form-data）→ `{ url }`

  * 校验：图片 `image/png|jpg|jpeg|webp`，≤ 5MB；文件名做哈希去重；保存到 `UPLOAD_DIR`。

### 12.6 发布流程

* `DRAFT → PUBLISHED`：发布后出现在首页；
* `PUBLISHED → UNLISTED`：下架但保留直达链接；
* 修改已发布课程时：即时生效（或新增 `REVIEW` 流程，MVP 可省）。

---

## 13. 结算页与 Stripe 流程（前端）

* 选择 Stripe 支付时：调用 `POST /api/checkout/create`，拿到 `redirectUrl` 后 `window.location = redirectUrl`；
* 成功回跳 `/checkout/success?orderId=...`：提示“我们正在确认你的支付”，并**轮询** `GET /api/orders/:id`（或等待 Webhook 完成后刷新状态）；
* 失败回跳 `/checkout/fail`：展示错误信息与重试入口；
* `BuyButton` 根据 `isPurchased` 渲染 `已购 / 立即购买`。

---

## 14. Definition of Done（更新）

* [ ] ADMIN 能登录后台，完成**新建课程 / 编辑 / 发布 / 下架**；
* [ ] ADMIN 能**增删改查**章节，并拖拽排序；
* [ ] Stripe：`/api/checkout/create` 能返回 Checkout URL；`/api/webhooks/stripe` 正确验签并置单为 PAID、发放 Enrollment；
* [ ] 用户支付成功后，课程出现在“我的课程”，可完整阅读；
* [ ] 权限：未登录/未购访问受限内容 → 401/403；
* [ ] 幂等：相同 `idempotencyKey` 不重复建单；Webhook 重放不导致二次发货；
* [ ] E2E：注册→购买（Stripe 测试卡）→回跳→Webhook 生效→开始学习；
* [ ] Docker 一键跑通，seed 数据包含 ADMIN 与示例课程。