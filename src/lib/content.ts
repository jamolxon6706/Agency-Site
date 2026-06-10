export const supportedLanguages = ["uz", "ru"] as const;

export type Lang = (typeof supportedLanguages)[number];

export type Localized<T> = Record<Lang, T>;

export type Service = {
  slug: "custom-crm" | "telegram-bots" | "dashboards" | "landing-pages" | "websites";
  title: Localized<string>;
  short: Localized<string>;
  outcomes: Localized<string[]>;
  stack: string[];
};

export type CaseStudy = {
  slug: "crm-integrator" | "hr-screening-bot" | "amocrm-telegram-notifier";
  title: Localized<string>;
  industry: Localized<string>;
  challenge: Localized<string>;
  solution: Localized<string>;
  techStack: string[];
  timeline: Localized<string>;
  outcomes: Localized<string[]>;
  anonymizationLevel: "company-hidden" | "metrics-partially-masked";
  media: {
    src: string;
    alt: Localized<string>;
  };
};

export const services: Service[] = [
  {
    slug: "custom-crm",
    title: {
      uz: "Custom CRM tizimlari",
      ru: "Индивидуальные CRM-системы",
    },
    short: {
      uz: "Savdo, lead va jamoa jarayonlarini bitta boshqaruv panelida avtomatlashtiramiz.",
      ru: "Автоматизируем продажи, лиды и процессы команды в единой CRM-платформе.",
    },
    outcomes: {
      uz: ["Lead yo'qotilishi kamayadi", "Sotuv bosqichlari shaffoflashadi", "Integratsiyalar bitta joyda ishlaydi"],
      ru: ["Снижается потеря лидов", "Этапы продаж становятся прозрачными", "Интеграции работают в одном месте"],
    },
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "tRPC"],
  },
  {
    slug: "telegram-bots",
    title: {
      uz: "Telegram botlar",
      ru: "Telegram-боты",
    },
    short: {
      uz: "HR, sales, support va notification jarayonlari uchun biznes-botlar ishlab chiqamiz.",
      ru: "Разрабатываем бизнес-ботов для HR, продаж, поддержки и уведомлений.",
    },
    outcomes: {
      uz: ["24/7 avtomatik javob", "Tez lead kvalifikatsiyasi", "Operator yuklamasi kamayadi"],
      ru: ["Автоответ 24/7", "Быстрая квалификация лидов", "Снижается нагрузка на операторов"],
    },
    stack: ["Telegraf", "TypeScript", "Telegram Bot API", "Webhook", "PostgreSQL"],
  },
  {
    slug: "dashboards",
    title: {
      uz: "Analitik dashboardlar",
      ru: "Аналитические дашборды",
    },
    short: {
      uz: "Real-time KPI ko'rsatkichlarni boshqaruv qarorlari uchun vizual shaklda taqdim etamiz.",
      ru: "Показываем KPI в реальном времени для быстрых управленческих решений.",
    },
    outcomes: {
      uz: ["Qarorlar tezlashadi", "Qo'lda report kamroq bo'ladi", "Jamoa uchun yagona haqiqat manbai"],
      ru: ["Решения принимаются быстрее", "Меньше ручной отчетности", "Единый источник правды для команды"],
    },
    stack: ["Next.js", "React Query", "Recharts", "PostgreSQL", "REST/tRPC"],
  },
  {
    slug: "landing-pages",
    title: {
      uz: "Landing page lar",
      ru: "Landing-страницы",
    },
    short: {
      uz: "Konversiyaga yo'naltirilgan, tez yuklanadigan va mobilga mos landing sahifalar.",
      ru: "Конверсионные, быстрые и адаптивные landing-страницы для лидогенерации.",
    },
    outcomes: {
      uz: ["CTA bosishlar oshadi", "Ishonch tezroq shakllanadi", "Reklama trafikdan ko'proq lead"],
      ru: ["Растут клики по CTA", "Доверие формируется быстрее", "Больше лидов с рекламного трафика"],
    },
    stack: ["Next.js", "Framer Motion", "SEO", "Core Web Vitals"],
  },
  {
    slug: "websites",
    title: {
      uz: "Korporativ web-saytlar",
      ru: "Корпоративные сайты",
    },
    short: {
      uz: "Brend imijini kuchaytiradigan va sotuv funnelini qo'llab-quvvatlaydigan saytlar.",
      ru: "Сайты, которые усиливают бренд и поддерживают воронку продаж.",
    },
    outcomes: {
      uz: ["Professional birinchi taassurot", "SEO uchun toza struktura", "Savdo bo'limi uchun kuchli argument"],
      ru: ["Профессиональное первое впечатление", "Чистая структура для SEO", "Сильный аргумент для отдела продаж"],
    },
    stack: ["Next.js", "TypeScript", "Structured Content", "Analytics"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "crm-integrator",
    title: {
      uz: "Ko'p ijarachili CRM Integrator Platforma",
      ru: "Мультиарендная CRM Integrator платформа",
    },
    industry: {
      uz: "Sales Ops / B2B xizmatlar",
      ru: "Sales Ops / B2B-услуги",
    },
    challenge: {
      uz: "Turli manbalardan kelgan lead va webhooklarni qo'lda boshqarish sababli jarayon sekinlashgan.",
      ru: "Ручная обработка лидов и webhook-событий из разных систем тормозила процесс.",
    },
    solution: {
      uz: "Next.js + Express + tRPC asosida integratsion platforma, queue worker va rolga asoslangan boshqaruv paneli qurildi.",
      ru: "Построили интеграционную платформу на Next.js + Express + tRPC с воркерами очередей и role-based панелью.",
    },
    techStack: ["Next.js", "Express", "tRPC", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    timeline: {
      uz: "MVP: 10 hafta",
      ru: "MVP: 10 недель",
    },
    outcomes: {
      uz: ["Integratsiyalar bitta markazga yig'ildi", "Webhook jarayonlari avtomatlashtirildi", "Operatsion xatolar sezilarli kamaydi"],
      ru: ["Интеграции собраны в единый центр", "Webhook-процессы автоматизированы", "Операционные ошибки заметно снижены"],
    },
    anonymizationLevel: "company-hidden",
    media: {
      src: "/work/crm-integrator.jpg",
      alt: {
        uz: "CRM integrator dashboard preview",
        ru: "Превью dashboard CRM integrator",
      },
    },
  },
  {
    slug: "hr-screening-bot",
    title: {
      uz: "HR nomzod filtrlash Telegram boti",
      ru: "Telegram-бот для HR-скрининга кандидатов",
    },
    industry: {
      uz: "HR Tech",
      ru: "HR Tech",
    },
    challenge: {
      uz: "Nomzodlarni bir xil formatda yig'ish va HR guruhga tez yetkazish muammoli edi.",
      ru: "Не хватало единого формата сбора анкет и быстрой передачи в HR-группу.",
    },
    solution: {
      uz: "Qattiq validatsiyali savol-javob oqimi, admin buyruqlari va to'liq hisobot yuboradigan bot yaratildi.",
      ru: "Реализовали строгий опросный flow, admin-команды и отправку полного отчета в HR-группу.",
    },
    techStack: ["Node.js", "TypeScript", "Telegraf", "Prisma", "PostgreSQL"],
    timeline: {
      uz: "Ishchi versiya: 3 hafta",
      ru: "Рабочая версия: 3 недели",
    },
    outcomes: {
      uz: ["Nomzodlar bir xil standartda yig'ildi", "HR ko'rib chiqish vaqti qisqardi", "Spam nazorati kuchaydi"],
      ru: ["Анкеты кандидатов стандартизированы", "Сократилось время первичного отбора", "Усилен антиспам-контроль"],
    },
    anonymizationLevel: "metrics-partially-masked",
    media: {
      src: "/work/hr-bot.jpg",
      alt: {
        uz: "HR Telegram bot process preview",
        ru: "Превью процесса HR Telegram-бота",
      },
    },
  },
  {
    slug: "amocrm-telegram-notifier",
    title: {
      uz: "AmoCRM -> Telegram lead notification tizimi",
      ru: "Система уведомлений AmoCRM -> Telegram",
    },
    industry: {
      uz: "CRM Integrations",
      ru: "CRM Integrations",
    },
    challenge: {
      uz: "Yangi yoki qayta tayinlangan leadlar managerlarga kech yetib borardi.",
      ru: "Новые и переназначенные лиды доходили до менеджеров с задержкой.",
    },
    solution: {
      uz: "Webhook validatsiyasi, mapping paneli va Telegram real-time xabarnoma tizimi ishlab chiqildi.",
      ru: "Реализовали валидацию webhook, панель mapping и real-time уведомления в Telegram.",
    },
    techStack: ["Next.js", "TypeScript", "Telegram Bot API", "AmoCRM API", "PostgreSQL"],
    timeline: {
      uz: "MVP: 4 hafta",
      ru: "MVP: 4 недели",
    },
    outcomes: {
      uz: ["Lead reaksiyasi tezlashdi", "Xabarnomalar izchil loglandi", "Webhook xavfsizligi kuchaydi"],
      ru: ["Ускорена реакция на лиды", "Уведомления стабильно логируются", "Повышена безопасность webhook"],
    },
    anonymizationLevel: "company-hidden",
    media: {
      src: "/work/amocrm-notifier.jpg",
      alt: {
        uz: "AmoCRM Telegram notification interface preview",
        ru: "Превью интерфейса уведомлений AmoCRM Telegram",
      },
    },
  },
];

export const techStack = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "tRPC",
  "Telegram Bot API",
  "AmoCRM API",
  "Vercel",
  "Railway",
] as const;

export const processSteps: Localized<Array<{ title: string; text: string }>> = {
  uz: [
    {
      title: "1. Discovery",
      text: "Biznes maqsad, joriy jarayon va KPIlarni aniqlaymiz.",
    },
    {
      title: "2. Architecture",
      text: "Texnik arxitektura, integratsiyalar va xavf zonalari bo'yicha yechim ishlab chiqamiz.",
    },
    {
      title: "3. Build",
      text: "Iterativ ishlab chiqish: demo, feedback, sprint deliverables.",
    },
    {
      title: "4. QA & Launch",
      text: "Test, optimizatsiya, deploy va monitoringni ishga tushiramiz.",
    },
    {
      title: "5. Support",
      text: "Post-launch qo'llab-quvvatlash, yaxshilashlar va scaling roadmap.",
    },
  ],
  ru: [
    {
      title: "1. Discovery",
      text: "Фиксируем цели бизнеса, текущие процессы и KPI.",
    },
    {
      title: "2. Architecture",
      text: "Проектируем техническую архитектуру, интеграции и рисковые зоны.",
    },
    {
      title: "3. Build",
      text: "Итеративная разработка: демо, обратная связь, спринт-результаты.",
    },
    {
      title: "4. QA & Launch",
      text: "Тестирование, оптимизация, деплой и запуск мониторинга.",
    },
    {
      title: "5. Support",
      text: "Сопровождение после запуска и roadmap на масштабирование.",
    },
  ],
};

export const faqItems: Localized<Array<{ q: string; a: string }>> = {
  uz: [
    {
      q: "Narxlar qanday hisoblanadi?",
      a: "Har bir loyiha biznes mantiq, integratsiya soni va timeline bo'yicha baholanadi. Avval strategik call, keyin aniq smeta beramiz.",
    },
    {
      q: "Qancha vaqtda ishga tushadi?",
      a: "Landing sahifalar 1-2 hafta, Telegram botlar 2-4 hafta, CRM/dashboard loyihalar esa scopega qarab 4+ hafta davom etadi.",
    },
    {
      q: "Kod va ma'lumot egaligi kimda bo'ladi?",
      a: "Loyiha topshirilgach, kod va loyiha artefaktlari bo'yicha kelishilgan egalik sizga o'tadi.",
    },
    {
      q: "Qo'llab-quvvatlash bormi?",
      a: "Ha, SLA asosida post-launch support, monitoring va iterativ yaxshilash paketlari mavjud.",
    },
  ],
  ru: [
    {
      q: "Как формируется стоимость?",
      a: "Каждый проект оценивается индивидуально: бизнес-логика, интеграции и сроки. После стратегического звонка даем точную смету.",
    },
    {
      q: "Сколько длится запуск?",
      a: "Landing обычно 1-2 недели, Telegram-боты 2-4 недели, CRM/дашборды от 4+ недель в зависимости от scope.",
    },
    {
      q: "Кому принадлежит код и данные?",
      a: "После передачи проекта права на код и артефакты закрепляются по договоренности за вами.",
    },
    {
      q: "Есть поддержка после релиза?",
      a: "Да, доступны SLA-пакеты сопровождения, мониторинга и итеративных улучшений.",
    },
  ],
};

export const siteText = {
  uz: {
    localeName: "O'zbekcha",
    otherLocaleName: "Русский",
    brand: "Axis Labs",
    nav: {
      home: "Bosh sahifa",
      services: "Xizmatlar",
      work: "Loyihalar",
      process: "Jarayon",
      about: "Jamoa",
      contact: "Aloqa",
    },
    hero: {
      kicker: "CUSTOM CRM, BOT, DASHBOARD & WEB SOLUTIONS",
      title: "Biznesingiz uchun ishonchli va zamonaviy raqamli mahsulotlar yaratamiz",
      subtitle:
        "Uzbekistan/CIS SMBlar uchun jarayonlarni avtomatlashtiradigan, leadlarni tezlashtiradigan va sotuvni kuchaytiradigan texnik yechimlar.",
      primaryCta: "Strategik qo'ng'iroqni bron qilish",
      secondaryCta: "Case study larni ko'rish",
      trustLine: "Javob muddati: 24 soat ichida • No-template, faqat custom yechim",
    },
    trustBlockTitle: "Nega mijozlar bizga ishonadi",
    trustPoints: [
      "Full-stack execution: frontend, backend, integratsiya va deployment bitta jamoada",
      "Business-first yondashuv: har bir funksionallik ROI bilan bog'lanadi",
      "Process shaffofligi: sprint reja, demo va aniq deliverablelar",
      "Post-launch support: monitoring, bugfix va scaling roadmap",
    ],
    workIntro: "Anonymized case study lar (maxfiylik saqlangan)",
    processTitle: "Qanday ishlaymiz",
    faqTitle: "Ko'p beriladigan savollar",
    aboutTitle: "Texnik hamkor sifatida ishlaymiz, oddiy ijrochi emas",
    aboutBody:
      "Biz sizga faqat chiroyli sahifa emas, balki biznesga real ta'sir beradigan tizim quramiz. Arxitektura, xavfsizlik, performance va maintainability doim ustuvor.",
    contactTitle: "Loyihangizni muhokama qilamiz",
    contactBody:
      "Formani to'ldiring. Biz scope va keyingi qadamlar bilan 24 soat ichida qaytamiz.",
    thanksTitle: "So'rovingiz qabul qilindi",
    thanksBody: "Rahmat. Tez orada siz bilan bog'lanamiz.",
    privacyTitle: "Maxfiylik siyosati",
    termsTitle: "Foydalanish shartlari",
    footerNote: "Axis Labs. Professional digital product agency.",
    ctaBannerTitle: "Yangi tizim qurmoqchimisiz yoki eskisini modernizatsiya qilmoqchimisiz?",
    ctaBannerButton: "Strategik call bron qilish",
  },
  ru: {
    localeName: "Русский",
    otherLocaleName: "O'zbekcha",
    brand: "Axis Labs",
    nav: {
      home: "Главная",
      services: "Услуги",
      work: "Кейсы",
      process: "Процесс",
      about: "О нас",
      contact: "Контакты",
    },
    hero: {
      kicker: "CUSTOM CRM, BOTS, DASHBOARDS & WEBSITES",
      title: "Создаем надежные и технологичные digital-решения для вашего бизнеса",
      subtitle:
        "Для SMB в Узбекистане и СНГ: автоматизация процессов, ускорение обработки лидов и рост эффективности продаж.",
      primaryCta: "Забронировать стратегический звонок",
      secondaryCta: "Посмотреть кейсы",
      trustLine: "Срок ответа: до 24 часов • Без шаблонов, только custom-разработка",
    },
    trustBlockTitle: "Почему нам доверяют",
    trustPoints: [
      "Full-stack команда: frontend, backend, интеграции и deployment",
      "Business-first подход: каждую функцию привязываем к ROI",
      "Прозрачный процесс: sprint-план, демо и фиксированные deliverables",
      "Поддержка после релиза: мониторинг, bugfix и roadmap масштабирования",
    ],
    workIntro: "Анонимизированные кейсы (с учетом конфиденциальности)",
    processTitle: "Как мы работаем",
    faqTitle: "Частые вопросы",
    aboutTitle: "Мы технический партнер, а не просто подрядчик",
    aboutBody:
      "Мы создаем не только красивый интерфейс, но и систему с реальным бизнес-эффектом. Архитектура, безопасность, производительность и поддерживаемость - в приоритете.",
    contactTitle: "Обсудим ваш проект",
    contactBody:
      "Заполните форму. В течение 24 часов вернемся с оценкой scope и следующими шагами.",
    thanksTitle: "Заявка отправлена",
    thanksBody: "Спасибо. Мы свяжемся с вами в ближайшее время.",
    privacyTitle: "Политика конфиденциальности",
    termsTitle: "Условия использования",
    footerNote: "Axis Labs. Professional digital product agency.",
    ctaBannerTitle: "Планируете запуск новой системы или модернизацию текущей?",
    ctaBannerButton: "Забронировать стратегический звонок",
  },
} as const;

export function isLang(value: string): value is Lang {
  return supportedLanguages.includes(value as Lang);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

