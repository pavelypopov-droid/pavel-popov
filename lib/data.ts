export const stats = [
  { value: 25, suffix: "+", label: "лет опыта" },
  { value: 150, suffix: "+", label: "проектов" },
  { value: 25, prefix: "$", suffix: "M+", label: "управляемый бюджет" },
  { value: 10, suffix: "x", label: "рост выручки клиентов" },
  { value: 6, suffix: "", label: "стран ЦА и СНГ" },
];

export const services = [
  {
    id: 1,
    icon: "Brain",
    title: "AI Implementation",
    description:
      "Речевая аналитика, ML-скоринг, фрод-мониторинг — внедрение с глубоким техническим пониманием. От архитектуры до production.",
    details: [
      "Аудит текущих AI-инициатив и определение приоритетов",
      "Архитектура ML-систем: от постановки задачи до деплоя",
      "Речевая аналитика (ASR/NLP) для колл-центров и контакт-центров",
      "ML-скоринг, антифрод-системы, автоматизация процессов",
      "Интеграция LLM в бизнес-процессы финансовых и государственных организаций",
      "Передача знаний команде заказчика",
    ],
    forWho: "Банки, телеком-операторы, госструктуры, FinTech-компании",
    result:
      "Работающая AI-система в production с обученной командой внутри компании",
  },
  {
    id: 2,
    icon: "Map",
    title: "IT & Digital Strategy",
    description:
      "Разработка ИТ-стратегии и дорожной карты, аудит текущего состояния, подготовка к трансформации.",
    details: [
      "Аудит IT-ландшафта: архитектура, процессы, команды",
      "Разработка 3–5-летней IT-стратегии",
      "Дорожная карта цифровой трансформации",
      "Оценка build/buy/partner решений",
      "Подготовка к регуляторным требованиям ЦБ",
      "Benchmarking с лучшими практиками рынка",
    ],
    forWho: "CIO, CEO и советы директоров банков, телеком-операторов, госкорпораций и финтех-компаний ЦА",
    result: "Чёткая стратегия с приоритетами, бюджетами и KPI на 3–5 лет",
  },
  {
    id: 3,
    icon: "Users",
    title: "FinTech Team Assembly",
    description:
      "Подбор и управление командами под проект любого масштаба. Собственная база экспертов в FinTech и AI.",
    details: [
      "Формирование кросс-функциональных IT-команд",
      "Подбор CTO, архитекторов, тимлидов, AI-инженеров",
      "Создание IT-хабов и центров компетенций",
      "Методология управления распределёнными командами",
      "Мотивация и удержание ключевых специалистов",
      "Передача управления внутренней команде",
    ],
    forWho: "Банки, госкорпорации и телеком, запускающие IT-подразделения; стартапы на growth-стадии",
    result: "Сформированная команда, готовая работать автономно",
  },
  {
    id: 4,
    icon: "Package",
    title: "Turnkey Delivery",
    description:
      "Реализация проектов под ключ: DWH, RegTech, цифровые сервисы, интеграции — с созданием базы знаний и передачей команде.",
    details: [
      "Управление проектами DWH/BI от архитектуры до запуска",
      "Цифровые сервисы для банков, телекома и госструктур",
      "Системы регуляторной отчётности и комплаенс",
      "API-интеграции с платёжными системами и регуляторами",
      "Документирование и создание базы знаний",
      "Поддержка и развитие после сдачи проекта",
    ],
    forWho: "Банки, госкомпании и финтех, которым нужен результат, а не консультации",
    result: "Работающий продукт, документация и компетентная команда заказчика",
  },
  {
    id: 5,
    icon: "Shield",
    title: "RegTech & DWH",
    description:
      "Проектирование и внедрение систем регуляторной отчётности для ЦБ РУз — от инвентаризации данных CBS до передачи выгрузок регулятору под ключ.",
    details: [
      "Инвентаризация данных Core Banking System (1300+ показателей)",
      "GAP-анализ и дорожная карта устранения разрывов, согласованная с ЦБ РУз",
      "Проектирование и построение DWH (Staging + Reporting)",
      "ETL-процессы, API-интеграции и автоматическая выгрузка в ЦБ",
      "Reporting System для банка (Metabase / Superset)",
      "Взаимодействие с регулятором, ведение проекта до получения OK от ЦБ",
    ],
    forWho:
      "Банки и финансовые организации с задачей построения регуляторной отчётности и аналитики",
    result:
      "Полностью рабочая система выгрузки данных в ЦБ РУз, документация и обученная команда банка",
  },
  {
    id: 6,
    icon: "Briefcase",
    title: "CTO-as-a-Service",
    description:
      "Временный технический директор для компании любой отрасли. Принимаю решения — несу ответственность за результат.",
    details: [
      "Роль CTO на период трансформации или поиска постоянного руководителя",
      "Технические решения на уровне совета директоров",
      "Управление IT-бюджетом и вендорами",
      "Построение IT-governance и процессов",
      "Менторинг внутренней IT-команды",
      "Постепенная передача полномочий внутреннему CTO",
    ],
    forWho: "Банки, телеком, госкомпании в период смены руководства; стартапы без технического лидера",
    result:
      "Стабильная IT-функция с выстроенными процессами и сильной командой",
  },
];

export const cases = [
  {
    id: 1,
    slug: "state-bank-uzbekistan",
    industry: "Государственный банк",
    tags: ["AI/ML", "IT Transformation", "Team Building"],
    title: "Цифровая трансформация государственного банка Узбекистана",
    challenge:
      "Трансформация IT и ИБ департаментов, создание AI-направления с нуля в крупнейшем госбанке страны.",
    solution:
      "Реструктуризация за 4 месяца, запуск AI-проектов, создание IT-хаба из 4 кросс-функциональных команд (60 человек). Внедрение Agile-методологии и системы OKR.",
    results: [
      "+30% к показателям SLA",
      "25 ключевых специалистов наняты и обучены",
      "Бюджет трансформации $25M+",
      "4 AI-проекта запущены в production за год",
    ],
    period: "2023–2026",
  },
  {
    id: 2,
    slug: "it-integrator-central-asia",
    industry: "IT-интегратор",
    tags: ["Speech Analytics", "Sales Strategy", "FinTech"],
    title: "Выход на рынок речевых технологий — лидер за 6 месяцев",
    challenge:
      "Ведущий IT-интегратор ЦА хотел выйти на рынок речевых технологий с нуля. Необходимо было создать стратегию, команду и адаптировать продукты под местный рынок.",
    solution:
      "Разработка go-to-market стратегии, формирование команды пресейла и продаж, адаптация продуктов под законодательство Узбекистана, партнёрства с ведущими вендорами.",
    results: [
      "Лидер рынка речевых технологий за 6 месяцев",
      "+$3M выручки (10x к прошлому году)",
      "Команда из 15 экспертов",
      "5 крупных банков-клиентов",
    ],
    period: "2022–2024",
  },
  {
    id: 3,
    slug: "bank-it-subsidiary",
    industry: "FinTech",
    tags: ["Startup", "AI", "Импортозамещение"],
    title: "IT-компания с нуля до продажи доли банку топ-5",
    challenge:
      "Построить IT-компанию (дочку банка топ-5) с нуля: команда, продукты, продажи. Цель — занять нишу на рынке ПО для банков РФ на фоне ухода иностранных вендоров.",
    solution:
      "Собрал команду 120 человек, запустил AI-направление, выстроил продажи через материнский банк и внешний рынок. Прошли реестр Минцифры по импортозамещению.",
    results: [
      "Команда 120 человек с нуля за 18 месяцев",
      "Проекты на 3+ млрд рублей",
      "Продажа доли стратегическому инвестору",
      "Реестр Минцифры РФ (импортозамещение)",
    ],
    period: "2021–2022",
  },
  {
    id: 4,
    slug: "bell-integrator-fintech",
    industry: "Телеком/FinTech",
    tags: ["Business Development", "Partnerships", "DWH"],
    title: "Развитие FinTech-направления крупнейшего IT-интегратора",
    challenge:
      "Развитие финтех-практики и направления DWH/BI в компании с выручкой $100M+. Выход на новые отраслевые рынки.",
    solution:
      "Запустил банковское и страховое направления, сформировал пресейл-команду, выстроил партнёрства с ведущими вендорами (Oracle, Teradata, SAS).",
    results: [
      "+$8M выручки FinTech-направления за 2 года",
      "15 новых enterprise-клиентов",
      "Партнёрства уровня Gold/Platinum с 3 вендорами",
    ],
    period: "2019–2021",
  },
];

export const timeline = [
  {
    period: "2023–2026",
    role: "CIO",
    company: "АКБ «Туронбанк»",
    country: "UZ",
    description:
      "Цифровая трансформация одного из крупнейших государственных банков Узбекистана. IT-хаб, AI-проекты, команда 60+ человек.",
  },
  {
    period: "2022–2026",
    role: "CTO",
    company: "ООО «U-BSSYS»",
    country: "CA",
    description:
      "Технический директор IT-компании в Средней Азии. Речевые технологии, ИИ-решения для банков и телекома.",
  },
  {
    period: "2021–2022",
    role: "Исполнительный директор",
    company: "ООО «ПСБ-Лаб»",
    country: "RU",
    description:
      "Построение IT-компании с нуля (дочка банка ПСБ). Команда 120 человек, AI-направление, импортозамещение.",
  },
  {
    period: "2019–2021",
    role: "Директор по развитию бизнеса",
    company: "Bell Integrator",
    country: "RU",
    description:
      "Развитие цифровых сервисов у клиентов с выручкой более $100M. Привлёк 2 новых клиента (банки топ-6), рост выручки на 5 млрд рублей. Команда 100+ человек.",
  },
  {
    period: "2016–2019",
    role: "Business Development Director",
    company: "Бэнкс Софт Системс",
    country: "RU",
    description:
      "Развитие инновационных продуктов компании: ДБО, AI и Антифрод-системы для крупнейших банков. Личный портфель — более 1 млрд рублей в год, 50+ проектов.",
  },
  {
    period: "1999–2016",
    role: "Руководящие должности в IT",
    company: "Крупнейшие IT-интеграторы РФ",
    country: "RU",
    description:
      "17 лет в ведущих IT-компаниях России. Проекты для Сбербанка, ВТБ, Газпромбанка, Росбанка и других топ-банков.",
  },
];

export const skills = [
  "AI Expert",
  "CIO",
  "FinTech",
  "Digital Transformation",
  "DWH",
  "RegTech",
  "ML/AI",
  "Speech Analytics",
  "Team Building",
  "IT Strategy",
  "LLM Integration",
  "Agile",
];

export const testimonials = [
  {
    id: 1,
    name: "Руководитель IT-департамента",
    company: "Крупный государственный банк, Узбекистан",
    text: "Павел показал редкое сочетание стратегического мышления и способности быстро доводить до результата. За 4 месяца мы прошли путь, который планировали на 2 года.",
    avatar: null,
  },
  {
    id: 2,
    name: "CEO",
    company: "FinTech-компания, Казахстан",
    text: "Ценность Павла — в том, что он понимает и бизнес, и технологии одинаково глубоко. Его рекомендации всегда реалистичны и уже содержат план реализации.",
    avatar: null,
  },
  {
    id: 3,
    name: "Директор по развитию",
    company: "IT-интегратор, Центральная Азия",
    text: "Благодаря Павлу мы за 6 месяцев стали лидерами рынка речевых технологий. Это казалось нереальным до момента, пока мы не увидели конкретную стратегию и не начали её исполнять.",
    avatar: null,
  },
];

export const blogPosts = [
  // Sorted by date descending (newest first)
  {
    slug: "digital-banking-uzbekistan-2026",
    title: "Цифровой банкинг Узбекистана: тренды 2026 года",
    titleEn: "Uzbekistan Digital Banking: 2026 Trends",
    excerpt: "От экспериментов к зрелости: LLM-ассистенты, Open Banking, eKYC и персонализация — что стало нормой для банков Узбекистана в 2026 году.",
    excerptEn: "From experiments to maturity: LLM assistants, Open Banking, eKYC and personalisation — what became the norm for Uzbekistan banks in 2026.",
    category: "FinTech",
    date: "2026-02-09",
    readTime: "5 мин",
    readTimeEn: "5 min",
    coverImage: "/images/blog-digital-banking-2026.jpg",
  },
  {
    slug: "ai-banking-central-asia-2025",
    title: "AI в банкинге ЦА: реальные кейсы vs хайп",
    titleEn: "AI in Central Asian Banking: Real Cases vs Hype",
    excerpt: "Что реально работает из AI в банках Узбекистана, Казахстана и других стран ЦА — на основе практики внедрений, а не маркетинговых обещаний.",
    excerptEn: "What actually works in AI for banks in Uzbekistan, Kazakhstan and other CA countries — based on real implementation experience, not marketing promises.",
    category: "AI/ML",
    date: "2025-02-10",
    readTime: "8 мин",
    readTimeEn: "8 min",
    coverImage: "/images/blog-ai-banking.jpg",
  },
  {
    slug: "how-to-choose-cio-uzbekistan",
    title: "Как выбрать CIO для банка в Узбекистане",
    titleEn: "How to Choose a CIO for a Bank in Uzbekistan",
    excerpt: "Критерии отбора, типичные ошибки и что отличает сильного технического директора для банка на рынке ЦА.",
    excerptEn: "Selection criteria, common mistakes, and what sets a strong technology leader apart in the Central Asian banking market.",
    category: "Команды",
    categoryEn: "Teams",
    date: "2025-01-20",
    readTime: "6 мин",
    readTimeEn: "6 min",
    coverImage: "/images/blog-cio.jpg",
  },
  {
    slug: "regtech-uzbekistan-2024-2025",
    title: "RegTech в Узбекистане: что изменилось в 2024–2025",
    titleEn: "RegTech in Uzbekistan: What Changed in 2024–2025",
    excerpt: "Обзор изменений регулирования ЦБ Узбекистана и практические советы по адаптации IT-систем.",
    excerptEn: "An overview of Central Bank of Uzbekistan regulatory changes and practical advice on adapting IT systems.",
    category: "RegTech",
    date: "2025-01-05",
    readTime: "7 мин",
    readTimeEn: "7 min",
    coverImage: "/images/blog-regtech.jpg",
  },
  {
    slug: "dwh-bank-build-vs-buy",
    title: "DWH для банка: build vs buy",
    titleEn: "Bank DWH: Build vs Buy",
    excerpt: "Когда строить собственное хранилище данных, а когда покупать готовое решение — взвешенный анализ на основе реальных проектов в банках ЦА.",
    excerptEn: "When to build your own data warehouse and when to buy a ready-made solution — a balanced analysis based on real CA banking projects.",
    category: "Data",
    date: "2024-12-15",
    readTime: "10 мин",
    readTimeEn: "10 min",
    coverImage: "/images/blog-dwh.jpg",
  },
  {
    slug: "speech-ai-uzbekistan-2024",
    title: "Идеальное внедрение начинается с идеальных заказчиков",
    titleEn: "The Perfect Implementation Starts with the Perfect Client",
    excerpt: "Об особенностях внедрения речевых технологий и ИИ в банках Узбекистана, диалектах, пилотах и реальных результатах — интервью для Spot.uz.",
    excerptEn: "On deploying speech AI in Uzbekistan banks — dialects, pilots, and real results. Interview for Spot.uz.",
    category: "AI/ML",
    date: "2024-02-19",
    readTime: "7 мин",
    readTimeEn: "7 min",
    coverImage: "/images/blog-speech-ai-2024.jpg",
  },
  {
    slug: "import-substitution-banking-2020",
    title: "С переходом на отечественное ПО можно подождать",
    titleEn: "The Switch to Domestic Software Can Wait",
    excerpt: "Почему перенос сроков импортозамещения в банковском секторе с 2021 на 2025 год — обдуманное решение, и что нужно сделать за это время.",
    excerptEn: "Why postponing the banking sector import substitution deadline from 2021 to 2025 was the right call — and what to do in the meantime.",
    category: "RegTech",
    date: "2020-10-15",
    readTime: "5 мин",
    readTimeEn: "5 min",
    coverImage: "/images/blog-import-substitution-2020.jpg",
  },
  {
    slug: "it-cost-forecast-2021",
    title: "Стоимость IT-услуг в 2021 году: прогноз",
    titleEn: "IT Services Cost in 2021: Forecast",
    excerpt: "Почему стоимость IT-услуг росла в 2021 году — дефицит специалистов, удалённая работа и налоговые льготы, которые не помогли снизить цены.",
    excerptEn: "Why IT service costs rose in 2021 — talent shortage, remote work and tax breaks that failed to lower prices.",
    category: "IT Рынок",
    categoryEn: "IT Market",
    date: "2020-09-30",
    readTime: "4 мин",
    readTimeEn: "4 min",
    coverImage: "/images/blog-it-cost-2021.jpg",
  },
  {
    slug: "soft-vs-hard-skills-it",
    title: "Soft skills vs hard skills: что важнее в IT?",
    titleEn: "Soft Skills vs Hard Skills: What Matters More in IT?",
    excerpt: "Вечный вопрос найма и развития: технические компетенции или гибкие навыки? Взгляд из практики управления IT-командами в банках и интеграторах.",
    excerptEn: "The eternal hiring question: technical skills or soft skills? A perspective from managing IT teams in banks and system integrators.",
    category: "Команды",
    categoryEn: "Teams",
    date: "2020-06-01",
    readTime: "5 мин",
    readTimeEn: "5 min",
    coverImage: "/images/blog-soft-hard-skills.jpg",
  },
];
