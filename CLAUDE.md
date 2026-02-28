# Pavel Popov Portfolio — Контекст проекта

## Обзор

Персональный сайт-портфолио IT & FinTech Advisor. Двуязычный (RU/EN), production-ready, деплой на Vercel.

- **Домен:** beyondcore.pro
- **Стек:** Next.js 16.1.6, React 19.2.3, TypeScript 5, Tailwind CSS 4
- **Контент:** MDX 3 (блог), статические данные в lib/data.ts
- **Email:** Resend (контактная форма → popov@iofm.ru)
- **Аналитика:** GA4 + Yandex.Metrika + Vercel Speed Insights
- **SEO:** next-sitemap, JSON-LD (Person + ProfessionalService), OpenGraph, robots.txt

## Структура

```
app/
├── layout.tsx              # Root layout, мета, шрифт Inter
├── page.tsx                # Главная (RU)
├── globals.css             # Tailwind стили
├── robots.ts, sitemap.ts   # SEO
├── not-found.tsx           # 404
├── api/contact/route.ts    # POST: контактная форма (rate limit, honeypot, Resend)
├── [lang]/                 # Динамические языковые роуты
│   ├── page.tsx            # Главная
│   ├── about/page.tsx      # О себе (таймлайн, образование, навыки)
│   ├── services/page.tsx   # Услуги (6 карточек)
│   ├── cases/page.tsx      # Кейсы (4 анонимизированных проекта)
│   ├── blog/page.tsx       # Блог (листинг)
│   ├── blog/[slug]/page.tsx # Статья блога (MDX)
│   └── contacts/page.tsx   # Контакты (форма + инфо)
├── blog/                   # Корневые роуты блога (RU)
│   ├── page.tsx
│   └── [slug]/page.tsx
├── about/, services/, cases/, contacts/  # Корневые редиректы

components/
├── layout/    Header.tsx, Footer.tsx
├── sections/  Hero.tsx, SocialProof.tsx, ServicesSection.tsx, CasesSection.tsx,
│              AboutSection.tsx, PartnersSection.tsx, Testimonials.tsx, CTABlock.tsx
├── ui/        Button.tsx, Card.tsx, Badge.tsx, ContactForm.tsx, AnimatedCounter.tsx
└── seo/       Analytics.tsx, JsonLd.tsx

lib/
├── data.ts         # Весь контент: услуги, кейсы, блог, отзывы
├── i18n.ts         # Переводы (~200 ключей)
├── i18n-config.ts  # Конфиг локалей (ru, en)
└── utils.ts        # cn(), formatDate()

content/blog/       # 9 MDX-статей (RU + EN)
middleware.ts       # i18n роутинг
```

## Страницы и контент

### Услуги (6)
1. AI Implementation — речевая аналитика, ML-скоринг, фрод-мониторинг
2. IT & Digital Strategy — IT-аудит, стратегия на 3-5 лет
3. FinTech Team Assembly — сборка команд, центры компетенций
4. Turnkey Delivery — DWH, RegTech, Digital Banking
5. RegTech & DWH — регуляторная отчётность для ЦБ
6. CTO-as-a-Service — interim CTO

### Кейсы (4, анонимизированы)
1. Цифровая трансформация гос. банка — 25M+ бюджет, 4 AI-проекта, IT-хаб 60 чел
2. Речевые технологии — выход на рынок за 6 мес, $3M рост выручки
3. IT-компания с нуля до продажи доли — 120 чел, проекты 3B+ руб
4. FinTech-практика — $8M рост, 15 enterprise-клиентов

### Блог (9 статей, двуязычные)
Тематика: digital banking, AI в ЦА, выбор CIO, RegTech, DWH, Speech AI

### Навыки (12 бейджей)
AI Expert, CIO, FinTech, Digital Transformation, DWH, RegTech, ML/AI, Speech Analytics, Team Building, IT Strategy, LLM Integration, Agile

## Дизайн-система

- **Цвета:** #0F172A (dark), #2563EB (primary blue), #F59E0B (accent amber), #F8FAFC (light bg)
- **Шрифт:** Inter (400-800, cyrillic + latin)
- **Скругления:** xl / 2xl / 3xl
- **Макс. ширина:** 7xl (80rem)

## ENV-переменные

- `RESEND_API_KEY` — email-сервис
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4
- `NEXT_PUBLIC_YM_ID` — Yandex.Metrika
- `NEXT_PUBLIC_SITE_URL` — URL сайта (default: beyondcore.pro)

## Деплой

```bash
npm run dev          # локальная разработка
npm run build        # next build && next-sitemap
npm run start        # production
```

Деплой через Vercel (автоматически из git).

## Контекст о владельце

Подробный профайл: `../../pavel_popov_context_profile.md`
Ключевое: CIO/CTO hybrid, AI Transformation Leader, Banking & FinTech в ЦА, МГУ (физфак), базируется в Ташкенте.
