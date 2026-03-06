// adventure-data.ts — All 17 situations, 5 levels, 8 endings for "CIO Survival" game

export interface LocalizedText {
  ru: string;
  en: string;
}

export interface ChoiceEffects {
  energy?: number;
  reputation?: number;
  budget?: number;
  karma?: number;
}

export interface Choice {
  label: LocalizedText;
  effects: ChoiceEffects;
  feedback: LocalizedText;
  weight: number; // 0-10 quality
  random?: number; // probability of alt outcome (0-1)
  altEffects?: ChoiceEffects;
  altFeedback?: LocalizedText;
}

export interface SituationStep {
  description: LocalizedText;
  choices: Choice[];
  scene: string[];
}

export interface Situation {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  scene: string[];
  choices: Choice[];
  pavelComment: LocalizedText;
  steps?: SituationStep[]; // for multi-step situations (level 5)
}

export interface Level {
  name: LocalizedText;
  subtitle: LocalizedText;
  situations: Situation[];
}

export interface Ending {
  rank: string;
  emoji: string;
  title: LocalizedText;
  description: LocalizedText;
  pavelAdvice: LocalizedText;
}

export interface AdventureMetrics {
  energy: number;
  reputation: number;
  budget: number;
  karma: number;
}

export const INITIAL_METRICS: AdventureMetrics = {
  energy: 100,
  reputation: 100,
  budget: 30,
  karma: 50,
};

export const ROLE_INFO = {
  cio: {
    title: { ru: "CIO", en: "CIO" },
    subtitle: { ru: "Chief Information Officer", en: "Chief Information Officer" },
    description: {
      ru: "Больше ресурсов, но и больше ответственности. Все проблемы — твои.",
      en: "More resources, but more responsibility. Every problem is yours.",
    },
    emoji: "👔",
  },
  caio: {
    title: { ru: "CAIO", en: "CAIO" },
    subtitle: { ru: "Chief AI Officer", en: "Chief AI Officer" },
    description: {
      ru: "Меньше людей, но есть AI-карта — подсвечивает лучший ответ раз в уровень.",
      en: "Fewer people, but you have an AI card — highlights the best answer once per level.",
    },
    emoji: "🤖",
  },
};

export const LEVELS: Level[] = [
  // ===== LEVEL 1: First Day =====
  {
    name: { ru: "Первый день", en: "First Day" },
    subtitle: { ru: "Обучающий уровень — 3 ситуации", en: "Tutorial level — 3 situations" },
    situations: [
      {
        id: "1.1",
        title: {
          ru: "Пароль от продакшена",
          en: "Production Password",
        },
        description: {
          ru: "Сисадмин Вася ушёл в отпуск и забыл передать пароль от продакшн-базы. В Slack написал: «лол, пароль qwerty123, не говори никому». Через час нужен отчёт для ЦБ.",
          en: "Sysadmin Vasya went on vacation and forgot to hand over the production database password. He wrote in Slack: 'lol, password is qwerty123, don't tell anyone.' The Central Bank report is due in an hour.",
        },
        scene: ["server_blink", "phone_red", "person_beach"],
        choices: [
          {
            label: { ru: "Зайти под qwerty123 и сделать отчёт", en: "Log in with qwerty123 and make the report" },
            effects: { energy: -5, reputation: -10 },
            feedback: {
              ru: "Отчёт сдан, но вы использовали пароль из публичного чата. ИБ-шник в ужасе.",
              en: "Report submitted, but you used a password from a public chat. The security team is horrified.",
            },
            weight: 3,
            random: 0.3,
            altEffects: { energy: -5, reputation: -20 },
            altFeedback: {
              ru: "Об этом узнал аудитор. Теперь у вас инцидент ИБ в первый же день.",
              en: "The auditor found out. Now you have a security incident on day one.",
            },
          },
          {
            label: { ru: "Позвонить Васе на пляж в Анталию", en: "Call Vasya at the beach in Antalya" },
            effects: { energy: -10, karma: -5 },
            feedback: {
              ru: "Вася недоволен, но продиктовал правильный пароль. Отчёт сдан.",
              en: "Vasya is annoyed, but gave you the correct password. Report submitted.",
            },
            weight: 5,
          },
          {
            label: { ru: "Эскалировать на ИБ и запросить reset", en: "Escalate to security and request a reset" },
            effects: { energy: -15, reputation: 5 },
            feedback: {
              ru: "Правильный подход! ИБ оценили. Отчёт задержится на час, но всё по правилам.",
              en: "Right approach! Security appreciated it. Report delayed by an hour, but everything is by the book.",
            },
            weight: 9,
          },
          {
            label: { ru: "Написать CEO: «У нас пароль qwerty123»", en: "Write to CEO: 'Our password is qwerty123'" },
            effects: { reputation: -20, karma: 10 },
            feedback: {
              ru: "CEO в шоке от уровня безопасности. Честно, но карьерно рискованно.",
              en: "CEO is shocked by the security level. Honest, but career-risky.",
            },
            weight: 4,
          },
        ],
        pavelComment: {
          ru: "Всегда эскалируй на ИБ. Это не медленность — это профессионализм. Час задержки лучше, чем инцидент в первый день.",
          en: "Always escalate to security. This isn't being slow — it's professionalism. An hour's delay is better than a day-one incident.",
        },
      },
      {
        id: "1.2",
        title: {
          ru: "Кофемашина или сервер?",
          en: "Coffee Machine or Server?",
        },
        description: {
          ru: "В бюджете осталось $5K. Разработчики написали петицию: нужна нормальная кофемашина. Одновременно мониторинг показывает, что тестовый сервер на последнем издыхании.",
          en: "You have $5K left in the budget. Developers petitioned for a proper coffee machine. Meanwhile, monitoring shows the test server is on its last legs.",
        },
        scene: ["people_protest", "server_smoke"],
        choices: [
          {
            label: { ru: "Купить кофемашину", en: "Buy the coffee machine" },
            effects: { karma: 15, energy: -5 },
            feedback: {
              ru: "Команда счастлива! Но через 2 хода сервер умрёт...",
              en: "Team is happy! But the server will die in 2 turns...",
            },
            weight: 4,
          },
          {
            label: { ru: "Обновить сервер", en: "Upgrade the server" },
            effects: { karma: -5, budget: -5 },
            feedback: {
              ru: "Правильно технически, но команда бурчит: «и так работает».",
              en: "Technically correct, but the team grumbles: 'it was fine.'",
            },
            weight: 7,
          },
          {
            label: { ru: "Купить кофемашину и написать в LinkedIn", en: "Buy coffee machine and post on LinkedIn" },
            effects: { karma: 10, reputation: 5, energy: -5 },
            feedback: {
              ru: "«Инвестиции в команду» — звучит красиво. Но сервер всё равно умрёт.",
              en: "'Investing in the team' — sounds great. But the server will still die.",
            },
            weight: 3,
          },
          {
            label: { ru: "Ничего не делать, деньги на чёрный день", en: "Do nothing, save for a rainy day" },
            effects: { karma: -10 },
            feedback: {
              ru: "Бюджет сохранён, но команда теряет веру в нового CIO.",
              en: "Budget saved, but the team loses faith in the new CIO.",
            },
            weight: 2,
          },
        ],
        pavelComment: {
          ru: "Сервер важнее, но объяснить команде почему — ещё важнее. Я бы обновил сервер и пообещал кофемашину в следующем месяце.",
          en: "The server is more important, but explaining why to the team is even more important. I'd upgrade the server and promise the coffee machine next month.",
        },
      },
      {
        id: "1.3",
        title: {
          ru: "Первое совещание",
          en: "First Meeting",
        },
        description: {
          ru: "CEO пригласил на стратегическую сессию. На столе — 147-слайдовая презентация от McKinsey. CEO: «Нам нужна цифровая трансформация. Что скажешь?»",
          en: "CEO invited you to a strategy session. On the table — a 147-slide McKinsey presentation. CEO: 'We need digital transformation. What do you think?'",
        },
        scene: ["meeting_room", "ceo", "presentation"],
        choices: [
          {
            label: { ru: "«Отличная презентация, начнём в понедельник!»", en: "'Great presentation, let\\'s start Monday!'" },
            effects: { reputation: 5, energy: -30, budget: -5 },
            feedback: {
              ru: "CEO доволен, но вы только что взяли обязательство на $5M без анализа.",
              en: "CEO is pleased, but you just committed to $5M without analysis.",
            },
            weight: 3,
          },
          {
            label: { ru: "«Давайте сначала проведём IT-аудит за 2 недели»", en: "'Let\\'s do an IT audit first, 2 weeks'" },
            effects: { energy: -10, reputation: 10 },
            feedback: {
              ru: "Профессиональный подход. CEO уважает обоснованность.",
              en: "Professional approach. CEO respects the thoroughness.",
            },
            weight: 9,
          },
          {
            label: { ru: "«McKinsey молодцы, но я предложу свой подход»", en: "'McKinsey is great, but I\\'d suggest my own approach'" },
            effects: { reputation: 15, energy: -20 },
            feedback: {
              ru: "Смело! CEO заинтригован, но ожидания теперь очень высокие.",
              en: "Bold! CEO is intrigued, but expectations are now very high.",
            },
            weight: 6,
          },
          {
            label: { ru: "«Посмотрю и вернусь с комментариями»", en: "'I\\'ll review and get back with comments'" },
            effects: { energy: -5, reputation: -5 },
            feedback: {
              ru: "Осторожно, но CEO считает это нерешительностью.",
              en: "Cautious, but CEO sees this as indecisiveness.",
            },
            weight: 4,
          },
        ],
        pavelComment: {
          ru: "IT-аудит — всегда первый шаг. Без диагностики нельзя лечить. Даже McKinsey это подтвердит.",
          en: "IT audit is always the first step. You can't treat without a diagnosis. Even McKinsey would confirm this.",
        },
      },
    ],
  },

  // ===== LEVEL 2: Baptism by Fire =====
  {
    name: { ru: "Боевое крещение", en: "Baptism by Fire" },
    subtitle: { ru: "4 серьёзные ситуации", en: "4 serious situations" },
    situations: [
      {
        id: "2.1",
        title: { ru: "DDoS в чёрную пятницу", en: "DDoS on Black Friday" },
        description: {
          ru: "Пятница, 18:00. Интернет-банк лежит. 50 000 клиентов не могут перевести деньги. Twitter горит. CEO звонит каждые 3 минуты.",
          en: "Friday, 6 PM. Internet banking is down. 50,000 customers can't transfer money. Twitter is on fire. CEO calls every 3 minutes.",
        },
        scene: ["server_fire", "phone_red", "people_panic", "chaos"],
        choices: [
          {
            label: { ru: "War room, отключить телефон CEO", en: "War room, mute CEO's calls" },
            effects: { energy: -20, reputation: 10 },
            feedback: {
              ru: "Собрали команду, нашли проблему, починили за 2 часа. CEO оценил результат.",
              en: "Assembled the team, found the issue, fixed in 2 hours. CEO appreciated the result.",
            },
            weight: 8,
            random: 0.3,
            altEffects: { energy: -20, reputation: -20 },
            altFeedback: {
              ru: "Починить не удалось — проблема глубже. 4 часа даунтайма. CEO в ярости.",
              en: "Couldn't fix it — the issue was deeper. 4 hours of downtime. CEO is furious.",
            },
          },
          {
            label: { ru: "Заглушка «ведутся работы»", en: "Put up 'maintenance' page" },
            effects: { energy: -10, reputation: -5 },
            feedback: {
              ru: "Клиенты раздражены, но хотя бы видят сообщение. Разбираетесь спокойно.",
              en: "Customers are annoyed but at least see a message. You troubleshoot calmly.",
            },
            weight: 5,
          },
          {
            label: { ru: "Позвонить вендору WAF: «У нас SLA!»", en: "Call WAF vendor: 'We have an SLA!'" },
            effects: { budget: -2, energy: -5 },
            feedback: {
              ru: "Вендор подключился и помог отфильтровать атаку.",
              en: "Vendor connected and helped filter the attack.",
            },
            weight: 7,
            random: 0.3,
            altEffects: { budget: -2, energy: -5, reputation: -10 },
            altFeedback: {
              ru: "Вендор не смог помочь — SLA не покрывает DDoS такого масштаба.",
              en: "Vendor couldn't help — SLA doesn't cover DDoS of this scale.",
            },
          },
          {
            label: { ru: "Пост в соцсетях: «Нас атакуют, мы держимся»", en: "Post on social media: 'We're under attack, holding strong'" },
            effects: { energy: -5 },
            feedback: {
              ru: "Героически! Пост завирусился, клиенты поддержали.",
              en: "Heroic! The post went viral, customers showed support.",
            },
            weight: 4,
            random: 0.5,
            altEffects: { reputation: -10 },
            altFeedback: {
              ru: "Клиенты не оценили бравурный тон. «Лучше бы чинили, а не писали».",
              en: "Customers didn't appreciate the bravado. 'Fix it instead of posting.'",
            },
          },
        ],
        pavelComment: {
          ru: "War room — золотой стандарт. Собираем всех, отсекаем шум, фокусируемся на проблеме. CEO подождёт.",
          en: "War room is the gold standard. Gather everyone, cut the noise, focus on the problem. CEO can wait.",
        },
      },
      {
        id: "2.2",
        title: { ru: "Вендор исчез", en: "Vendor Vanished" },
        description: {
          ru: "Компания, которая делала вам CRM за $2M, перестала отвечать. Офис закрыт. В LinkedIn основатель написал «new chapter 🌴». Проект сдан на 30%.",
          en: "The company building your $2M CRM stopped answering calls. Office is closed. Founder posted 'new chapter 🌴' on LinkedIn. Project is 30% done.",
        },
        scene: ["empty_office", "tumbleweed"],
        choices: [
          {
            label: { ru: "Судиться", en: "Sue them" },
            effects: { budget: -5, energy: -15 },
            feedback: {
              ru: "Юристы работают, но деньги и нервы уходят. Результат через 2 года.",
              en: "Lawyers are working, but money and nerves are draining. Results in 2 years.",
            },
            weight: 3,
          },
          {
            label: { ru: "Забрать исходники и допилить самим", en: "Take the source code and finish in-house" },
            effects: { energy: -25, karma: 5 },
            feedback: {
              ru: "Героический путь. Команда уважает, но устанет.",
              en: "Heroic path. Team respects it, but will get tired.",
            },
            weight: 7,
          },
          {
            label: { ru: "Найти другого вендора", en: "Find another vendor" },
            effects: { budget: -15, energy: -10 },
            feedback: {
              ru: "Дорого, но предсказуемо. Новый вендор начнёт не с нуля.",
              en: "Expensive, but predictable. New vendor won't start from scratch.",
            },
            weight: 5,
          },
          {
            label: { ru: "«CRM не нужна, переходим на Excel»", en: "'We don\\'t need CRM, switching to Excel'" },
            effects: { reputation: -25, budget: 2 },
            feedback: {
              ru: "Бюджет вернулся, но репутация CIO на дне. CEO сомневается в вашей компетенции.",
              en: "Budget returned, but CIO's reputation is at rock bottom. CEO doubts your competence.",
            },
            weight: 1,
          },
        ],
        pavelComment: {
          ru: "Забрать исходники — лучший вариант. Параллельно подать иск. Свои люди сделают лучше, если дать им время.",
          en: "Taking the source code is the best option. File a lawsuit in parallel. Your people will do better if given time.",
        },
      },
      {
        id: "2.3",
        title: { ru: "Хакатон или аудит?", en: "Hackathon or Audit?" },
        description: {
          ru: "Регулятор: аудит ИБ через 3 недели. Одновременно CEO объявил хакатон «AI для банка» с призовым фондом $50K. Ваша команда — 8 человек. На оба нужно минимум 6.",
          en: "Regulator: security audit in 3 weeks. Meanwhile, CEO announced 'AI for Banking' hackathon with $50K prize. Your team is 8 people. Both need at least 6.",
        },
        scene: ["split_office", "auditors", "hackathon"],
        choices: [
          {
            label: { ru: "Все на аудит, хакатон отменить", en: "Everyone on audit, cancel hackathon" },
            effects: { energy: -10, reputation: -10, karma: -5 },
            feedback: {
              ru: "Аудит пройден, но CEO разочарован. «Не командный игрок».",
              en: "Audit passed, but CEO is disappointed. 'Not a team player.'",
            },
            weight: 5,
          },
          {
            label: { ru: "Разделить: 4 + 4", en: "Split: 4 + 4" },
            effects: { energy: -20 },
            feedback: {
              ru: "Оба мероприятия прошли средне. Никто не доволен.",
              en: "Both events were mediocre. Nobody is happy.",
            },
            weight: 3,
          },
          {
            label: { ru: "Аутсорс на аудит, команда на хакатон", en: "Outsource audit, team on hackathon" },
            effects: { budget: -2, energy: -10 },
            feedback: {
              ru: "Умное решение! Аудит пройден, хакатон выигран.",
              en: "Smart decision! Audit passed, hackathon won.",
            },
            weight: 9,
          },
          {
            label: { ru: "Попросить перенести аудит", en: "Ask to postpone the audit" },
            effects: { energy: -5 },
            feedback: {
              ru: "Регулятор согласился перенести на месяц.",
              en: "Regulator agreed to postpone by a month.",
            },
            weight: 5,
            random: 0.5,
            altEffects: { budget: -1, reputation: -5 },
            altFeedback: {
              ru: "Регулятор отказал и добавил штраф за попытку.",
              en: "Regulator refused and added a fine for the attempt.",
            },
          },
        ],
        pavelComment: {
          ru: "Аутсорс на комплаенс — нормальная практика. Команду нужно беречь для стратегических задач.",
          en: "Outsourcing compliance is standard practice. Save the team for strategic tasks.",
        },
      },
      {
        id: "2.4",
        title: { ru: "Революция снизу", en: "Revolution from Below" },
        description: {
          ru: "Тимлид бэкенда: «Мы 2 года на Java 8, в 2026 это позор. Если не переходим на Kotlin — я ухожу. И 4 человека со мной». 47 лайков.",
          en: "Backend tech lead: 'We've been on Java 8 for 2 years, in 2026 this is embarrassing. If we don\\'t switch to Kotlin — I\\'m leaving. And 4 people with me.' 47 likes.",
        },
        scene: ["slack_chat", "person_leaving"],
        choices: [
          {
            label: { ru: "«Ок, переходим на Kotlin»", en: "'OK, switching to Kotlin'" },
            effects: { budget: -3, karma: 15, energy: -10 },
            feedback: {
              ru: "Команда в восторге! Но бюджет на обучение — немаленький.",
              en: "Team is thrilled! But the training budget is significant.",
            },
            weight: 6,
          },
          {
            label: { ru: "Поговорить с тимлидом лично", en: "Talk to the tech lead privately" },
            effects: { energy: -10, karma: 5 },
            feedback: {
              ru: "Нашли компромисс. Тимлид остался, но наблюдает.",
              en: "Found a compromise. Tech lead stayed, but is watching.",
            },
            weight: 6,
            random: 0.4,
            altEffects: { energy: -10, karma: -10 },
            altFeedback: {
              ru: "Тимлид не убеждён и ушёл. С ним ушли 2 человека.",
              en: "Tech lead wasn't convinced and left. 2 people followed.",
            },
          },
          {
            label: { ru: "«Java 8 стабильна и проверена»", en: "'Java 8 is stable and proven'" },
            effects: { karma: -20 },
            feedback: {
              ru: "Три человека написали заявления. Мораль на дне.",
              en: "Three people submitted resignations. Morale is rock bottom.",
            },
            weight: 1,
          },
          {
            label: { ru: "«Пилот на Kotlin для нового сервиса»", en: "'Kotlin pilot for a new service'" },
            effects: { energy: -5, karma: 10, budget: -1 },
            feedback: {
              ru: "Идеальный компромисс! Тимлид доволен, риски минимальны.",
              en: "Perfect compromise! Tech lead is happy, risks are minimal.",
            },
            weight: 9,
          },
        ],
        pavelComment: {
          ru: "Пилот — всегда лучший ответ на «давайте всё переписать». Доказываете ценность без рисков.",
          en: "A pilot is always the best answer to 'let\\'s rewrite everything.' Prove the value without the risks.",
        },
      },
    ],
  },

  // ===== LEVEL 3: Turbulence =====
  {
    name: { ru: "Турбулентность", en: "Turbulence" },
    subtitle: { ru: "4 неожиданные ситуации", en: "4 unexpected situations" },
    situations: [
      {
        id: "3.1",
        title: { ru: "AI галлюцинирует", en: "AI Hallucinating" },
        description: {
          ru: "Ваш AI-чатбот для клиентов: «Процент по вкладу — 150% годовых» и «Кредиты без залога». Скриншоты уже в Telegram-каналах. Юристы в панике.",
          en: "Your AI chatbot tells customers: '150% annual deposit rate' and 'Loans without collateral.' Screenshots are already in Telegram channels. Lawyers are panicking.",
        },
        scene: ["bot_crazy", "phone_red", "people_panic"],
        choices: [
          {
            label: { ru: "Немедленно выключить бота", en: "Immediately shut down the bot" },
            effects: { energy: -5, reputation: -10 },
            feedback: {
              ru: "Правильно по безопасности, но CEO разочарован — это был его любимый проект.",
              en: "Right for safety, but CEO is disappointed — this was his pet project.",
            },
            weight: 6,
          },
          {
            label: { ru: "Добавить дисклеймер «бот может ошибаться»", en: "Add disclaimer 'bot may make mistakes'" },
            effects: { reputation: -15 },
            feedback: {
              ru: "Юристы в обмороке. Это не дисклеймер спасёт от регулятора.",
              en: "Lawyers fainted. A disclaimer won't save you from the regulator.",
            },
            weight: 2,
          },
          {
            label: { ru: "Откатить на rule-based, параллельно фиксить", en: "Roll back to rule-based, fix in parallel" },
            effects: { energy: -20, reputation: -5 },
            feedback: {
              ru: "Грамотный подход! Бот работает предсказуемо, AI фиксится в фоне.",
              en: "Smart approach! Bot works predictably, AI gets fixed in the background.",
            },
            weight: 9,
          },
          {
            label: { ru: "Пресс-релиз: «Это был стресс-тест»", en: "Press release: 'It was a stress test'" },
            effects: { energy: -5 },
            feedback: {
              ru: "Гениально! Все поверили, PR-отдел аплодирует.",
              en: "Genius! Everyone bought it, PR department applauds.",
            },
            weight: 4,
            random: 0.5,
            altEffects: { reputation: -20 },
            altFeedback: {
              ru: "Никто не поверил. Стало только хуже. Регулятор заинтересовался.",
              en: "Nobody bought it. Made things worse. Regulator is now interested.",
            },
          },
        ],
        pavelComment: {
          ru: "Откат + фикс — единственный правильный путь. AI в банке должен проходить через rule-based фильтр. Всегда.",
          en: "Rollback + fix is the only right path. AI in banking must go through a rule-based filter. Always.",
        },
      },
      {
        id: "3.2",
        title: { ru: "Делегация из ЦБ", en: "Central Bank Delegation" },
        description: {
          ru: "Центральный банк с «плановой проверкой». 8 человек. Им нужен AML-модуль. Ваш AML — это Excel-файл Марины из комплаенса.",
          en: "Central Bank with a 'routine inspection.' 8 people. They need to see the AML module. Your AML is Marina's Excel spreadsheet from compliance.",
        },
        scene: ["auditors", "person_hiding", "server_clean"],
        choices: [
          {
            label: { ru: "Показать Excel и честно сказать «мы в процессе»", en: "Show Excel and honestly say 'we're working on it'" },
            effects: { reputation: -10, karma: 10, budget: -1 },
            feedback: {
              ru: "Штраф $50K, но регулятор оценил честность. Дали 6 месяцев на исправление.",
              en: "$50K fine, but the regulator appreciated the honesty. Gave 6 months to fix.",
            },
            weight: 6,
          },
          {
            label: { ru: "Срочно развернуть демо AML за ночь", en: "Urgently deploy AML demo overnight" },
            effects: { energy: -30, budget: -1 },
            feedback: {
              ru: "Команда не спала. Демо выглядит убедительно!",
              en: "Team didn't sleep. Demo looks convincing!",
            },
            weight: 4,
            random: 0.4,
            altEffects: { energy: -30, budget: -1, reputation: -20 },
            altFeedback: {
              ru: "Проверяющие заметили подделку. Штраф удвоился.",
              en: "Inspectors spotted the fake. Fine doubled.",
            },
          },
          {
            label: { ru: "Отвлечь делегацию обедом и экскурсией", en: "Distract delegation with lunch and a tour" },
            effects: { energy: -10, budget: -1, reputation: -5 },
            feedback: {
              ru: "Работает в Центральной Азии, но опасная тактика.",
              en: "Works in Central Asia, but risky tactic.",
            },
            weight: 3,
          },
          {
            label: { ru: "Показать roadmap автоматизации AML на 6 мес", en: "Present 6-month AML automation roadmap" },
            effects: { energy: -15, reputation: 5, budget: -1 },
            feedback: {
              ru: "Профессиональный подход. Штраф уменьшен, дали отсрочку.",
              en: "Professional approach. Fine reduced, given a grace period.",
            },
            weight: 8,
          },
        ],
        pavelComment: {
          ru: "Roadmap + честность. Регулятор уважает план больше, чем демо-подделки. Проверено лично.",
          en: "Roadmap + honesty. The regulator respects a plan more than demo fakes. Personally verified.",
        },
      },
      {
        id: "3.3",
        title: { ru: "Стажёр в продакшене", en: "Intern in Production" },
        description: {
          ru: "Стажёр Тимур запустил DELETE FROM transactions WHERE amount > 0 в продакшн-базе. Бэкап — позавчерашний. Потеряны данные за 2 дня. Тимур плачет.",
          en: "Intern Timur ran DELETE FROM transactions WHERE amount > 0 on the production database. Backup is from 2 days ago. 2 days of data lost. Timur is crying.",
        },
        scene: ["terminal_red", "person_crying", "server_blink"],
        choices: [
          {
            label: { ru: "Уволить Тимура и того, кто дал доступ", en: "Fire Timur and whoever gave access" },
            effects: { karma: -15, energy: -10 },
            feedback: {
              ru: "Виновные наказаны, но данные не восстановлены. Проблема не решена.",
              en: "Guilty punished, but data not restored. Problem not solved.",
            },
            weight: 2,
          },
          {
            label: { ru: "Восстановить из бэкапа + ручная сверка", en: "Restore from backup + manual reconciliation" },
            effects: { energy: -25, budget: -1 },
            feedback: {
              ru: "2 бессонные ночи, но данные восстановлены на 95%. Потом — разбор полётов.",
              en: "2 sleepless nights, but 95% of data recovered. Then — post-mortem.",
            },
            weight: 9,
          },
          {
            label: { ru: "Позвонить Oracle: «У вас же есть flashback?»", en: "Call Oracle: 'You have flashback, right?'" },
            effects: { budget: -2, energy: -5 },
            feedback: {
              ru: "Oracle помог! Flashback спас большую часть данных.",
              en: "Oracle helped! Flashback saved most of the data.",
            },
            weight: 6,
            random: 0.3,
            altEffects: { budget: -2, energy: -5, reputation: -5 },
            altFeedback: {
              ru: "Oracle говорит: flashback не настроен. $200K за срочный саппорт впустую.",
              en: "Oracle says: flashback isn't configured. $200K for emergency support wasted.",
            },
          },
          {
            label: { ru: "CEO: «Данные не потеряны, они в другом месте»", en: "CEO: 'Data isn\\'t lost, it\\'s just... elsewhere'" },
            effects: { reputation: -20, karma: 5 },
            feedback: {
              ru: "CEO не оценил юмор. HR-отдел уже готовит ваши документы.",
              en: "CEO didn't appreciate the humor. HR is already preparing your paperwork.",
            },
            weight: 1,
          },
        ],
        pavelComment: {
          ru: "Бэкап + сверка. Потом — разбор: кто дал доступ, почему нет RBAC, где бэкап-политика? Тимура не увольнять — систему чинить.",
          en: "Backup + reconciliation. Then — post-mortem: who gave access, why no RBAC, where's the backup policy? Don't fire Timur — fix the system.",
        },
      },
      {
        id: "3.4",
        title: { ru: "Жена CEO хочет приложение", en: "CEO's Wife Wants an App" },
        description: {
          ru: "CEO: «Моя жена открывает магазин цветов. Ей нужно мобильное приложение. Вашим ребятам на выходных. С корзиной, доставкой, и чтобы красиво». Дедлайн — 2 недели.",
          en: "CEO: 'My wife is opening a flower shop. She needs a mobile app. Your guys can do it over the weekend. With cart, delivery, and make it pretty.' Deadline: 2 weeks.",
        },
        scene: ["ceo_whisper", "flowers", "team_no"],
        choices: [
          {
            label: { ru: "Команда поработает на выходных", en: "Team will work weekends" },
            effects: { energy: -20, karma: -15, reputation: 10 },
            feedback: {
              ru: "CEO счастлив, но команда ненавидит вас. Трое обновили LinkedIn.",
              en: "CEO is happy, but the team hates you. Three updated their LinkedIn.",
            },
            weight: 2,
          },
          {
            label: { ru: "«Я знаю отличного фрилансера»", en: "'I know a great freelancer'" },
            effects: { budget: -1, energy: -5 },
            feedback: {
              ru: "Все довольны! Фрилансер сделал, CEO рад, команда не пострадала.",
              en: "Everyone's happy! Freelancer delivered, CEO is pleased, team unaffected.",
            },
            weight: 9,
          },
          {
            label: { ru: "«Это конфликт интересов»", en: "'This is a conflict of interest'" },
            effects: { reputation: -20, karma: 10 },
            feedback: {
              ru: "Принципиально! Но CEO запомнит этот разговор...",
              en: "Principled! But CEO will remember this conversation...",
            },
            weight: 4,
            random: 0.3,
            altEffects: { reputation: -30 },
            altFeedback: {
              ru: "CEO очень обижен. Через месяц ваш контракт на пересмотре.",
              en: "CEO is very offended. Your contract is up for review next month.",
            },
          },
          {
            label: { ru: "«Tilda / Shopify за 2 дня»", en: "'Tilda / Shopify in 2 days'" },
            effects: { energy: -5, budget: -1 },
            feedback: {
              ru: "CEO: «Это не уровень». Но работает и дёшево.",
              en: "CEO: 'This is beneath us.' But it works and it's cheap.",
            },
            weight: 5,
          },
        ],
        pavelComment: {
          ru: "Фрилансер — и все счастливы. Команда для бизнес-задач банка, а не для цветочных магазинов.",
          en: "Freelancer — and everyone's happy. The team is for bank business tasks, not flower shops.",
        },
      },
    ],
  },

  // ===== LEVEL 4: Storm =====
  {
    name: { ru: "Шторм", en: "The Storm" },
    subtitle: { ru: "4 критические ситуации", en: "4 critical situations" },
    situations: [
      {
        id: "4.1",
        title: { ru: "Утечка зарплат", en: "Salary Leak" },
        description: {
          ru: "Кто-то слил в общий чат Excel с зарплатами IT-отдела. Джуниор из отдела CEO-шного племянника получает больше сеньоров. Офис гудит.",
          en: "Someone leaked the IT department salary spreadsheet to the general chat. A junior from the CEO's nephew's team earns more than seniors. The office is buzzing.",
        },
        scene: ["spreadsheet", "people_angry", "chaos"],
        choices: [
          {
            label: { ru: "Выравнивание зарплат", en: "Level all salaries" },
            effects: { budget: -5, karma: 20, reputation: -10 },
            feedback: {
              ru: "Справедливо! Но CEO недоволен — его племянник теперь получает меньше.",
              en: "Fair! But CEO is unhappy — his nephew now earns less.",
            },
            weight: 5,
          },
          {
            label: { ru: "«Это фейк, не обращайте внимания»", en: "'It's fake, ignore it'" },
            effects: { karma: -20, energy: -5 },
            feedback: {
              ru: "Никто не поверил. Доверие к CIO потеряно.",
              en: "Nobody believed it. Trust in the CIO is lost.",
            },
            weight: 1,
          },
          {
            label: { ru: "Найти и наказать слившего", en: "Find and punish the leaker" },
            effects: { karma: -15, energy: -10 },
            feedback: {
              ru: "Мстительно. Проблема зарплат осталась, а атмосфера стала ещё хуже.",
              en: "Vindictive. The salary problem remains, and the atmosphere got worse.",
            },
            weight: 2,
          },
          {
            label: { ru: "Ввести грейды и прозрачную систему", en: "Introduce grades and transparent system" },
            effects: { energy: -20, budget: -2, karma: 15 },
            feedback: {
              ru: "Долгосрочное решение. Через 3 месяца все понимают, как формируется ЗП.",
              en: "Long-term solution. In 3 months, everyone understands how salary is formed.",
            },
            weight: 9,
          },
        ],
        pavelComment: {
          ru: "Грейды — единственное системное решение. Прозрачность убивает сплетни и обиды.",
          en: "Grades are the only systemic solution. Transparency kills gossip and resentment.",
        },
      },
      {
        id: "4.2",
        title: { ru: "Конкурент переманивает", en: "Competitor Poaching" },
        description: {
          ru: "Хедхантер: конкурент предлагает x2 зарплату и Tesla. Одновременно ваш CEO: «Бюджет урезаем на 40%».",
          en: "Headhunter: competitor offers 2x salary and a Tesla. Meanwhile, your CEO: 'Budget cut by 40%.'",
        },
        scene: ["angel_devil", "tesla", "two_offices"],
        choices: [
          {
            label: { ru: "Принять оффер", en: "Accept the offer" },
            effects: { energy: 100, reputation: 0, budget: 0, karma: 0 },
            feedback: {
              ru: "Новая глава! Но эта история закончена. Tesla красивая.",
              en: "New chapter! But this story is over. The Tesla is nice.",
            },
            weight: 5,
          },
          {
            label: { ru: "Использовать как рычаг для переговоров", en: "Use as leverage for negotiations" },
            effects: { energy: -10 },
            feedback: {
              ru: "CEO повысил зарплату и бюджет! Рискованно, но сработало.",
              en: "CEO raised salary and budget! Risky, but it worked.",
            },
            weight: 5,
            random: 0.5,
            altEffects: { energy: -10, reputation: -15 },
            altFeedback: {
              ru: "CEO обиделся: «Шантажировать меня?» Отношения испорчены.",
              en: "CEO took offense: 'Blackmailing me?' Relationship damaged.",
            },
          },
          {
            label: { ru: "Остаться из лояльности", en: "Stay out of loyalty" },
            effects: { karma: 10, budget: -12, energy: -10 },
            feedback: {
              ru: "Благородно, но бюджет урезан. Придётся работать за двоих.",
              en: "Noble, but budget is cut. You'll have to work for two.",
            },
            weight: 4,
          },
          {
            label: { ru: "«Обсудим, что можно с урезанным бюджетом»", en: "'Let\\'s discuss what we can do with the cut budget'" },
            effects: { energy: -15, reputation: 10 },
            feedback: {
              ru: "Конструктивный подход! CEO уважает. Нашли способ оптимизировать.",
              en: "Constructive approach! CEO respects it. Found ways to optimize.",
            },
            weight: 9,
          },
        ],
        pavelComment: {
          ru: "Конструктивный диалог — всегда лучше ультиматумов. Покажите CEO, что вы партнёр, а не наёмник.",
          en: "Constructive dialogue is always better than ultimatums. Show the CEO you're a partner, not a hired gun.",
        },
      },
      {
        id: "4.3",
        title: { ru: "AI заменяет людей", en: "AI Replaces People" },
        description: {
          ru: "AI-система обработки заявок работает в 10 раз быстрее людей. HR: «Сократим 30 человек?» Профсоюз уже слышал слухи.",
          en: "AI application processing works 10x faster than humans. HR: 'Shall we lay off 30 people?' The union has already heard rumors.",
        },
        scene: ["robots", "people_protest", "hr_calculator"],
        choices: [
          {
            label: { ru: "Сократить 30 человек", en: "Lay off 30 people" },
            effects: { budget: 2, karma: -25, reputation: -15 },
            feedback: {
              ru: "Бюджет подрос, но протест на входе, статьи в СМИ, и HR увольняется тоже.",
              en: "Budget improved, but protests at the entrance, media articles, and HR quits too.",
            },
            weight: 1,
          },
          {
            label: { ru: "Переучить людей на другие роли", en: "Retrain people for other roles" },
            effects: { budget: -5, energy: -20, karma: 15 },
            feedback: {
              ru: "Дорого и долго, но люди благодарны. Компания получает лояльных сотрудников с новыми навыками.",
              en: "Expensive and slow, but people are grateful. Company gets loyal employees with new skills.",
            },
            weight: 9,
          },
          {
            label: { ru: "«AI пока в пилоте, никого не сокращаем»", en: "'AI is still in pilot, no layoffs'" },
            effects: { budget: -1, energy: -5 },
            feedback: {
              ru: "Статус-кво. Но через полгода вопрос вернётся.",
              en: "Status quo. But in 6 months the question will return.",
            },
            weight: 4,
          },
          {
            label: { ru: "Сократить 15, переучить 15", en: "Lay off 15, retrain 15" },
            effects: { budget: 1, karma: -10 },
            feedback: {
              ru: "Компромисс. Не идеально, но терпимо для всех сторон.",
              en: "Compromise. Not ideal, but tolerable for all sides.",
            },
            weight: 5,
          },
        ],
        pavelComment: {
          ru: "Переучивание — единственный устойчивый путь. AI создаёт новые роли, а не убивает рабочие места.",
          en: "Retraining is the only sustainable path. AI creates new roles, it doesn't kill jobs.",
        },
      },
      {
        id: "4.4",
        title: { ru: "Бесконечный проект", en: "The Never-Ending Project" },
        description: {
          ru: "«Новый интернет-банк» идёт 3-й год (планировали 1). Потрачено $8M из $5M. Работает только логин-страница. PM уволился. CEO: «Когда?»",
          en: "'New Internet Banking' is in year 3 (planned for 1). Spent $8M of $5M budget. Only the login page works. PM quit. CEO: 'When?'",
        },
        scene: ["spaghetti_code", "calendar_long", "login_page"],
        choices: [
          {
            label: { ru: "Закрыть и начать заново с MVP", en: "Shut down and start over with MVP" },
            effects: { budget: -1, energy: -15, reputation: -10 },
            feedback: {
              ru: "Больно, но правильно. MVP за 6 месяцев вместо бесконечного проекта.",
              en: "Painful, but right. MVP in 6 months instead of an endless project.",
            },
            weight: 8,
          },
          {
            label: { ru: "«Ещё 6 месяцев и $2M»", en: "'Just 6 more months and $2M'" },
            effects: { budget: -2, energy: -10 },
            feedback: {
              ru: "Ещё $2M потрачено, прогресс минимальный.",
              en: "Another $2M spent, minimal progress.",
            },
            weight: 2,
            random: 0.8,
            altEffects: { budget: -2, reputation: 5 },
            altFeedback: {
              ru: "Чудо — новый разработчик нашёл ключевой баг и проект сдвинулся!",
              en: "Miracle — a new developer found the key bug and the project moved forward!",
            },
          },
          {
            label: { ru: "Новый PM + аудит кода", en: "New PM + code audit" },
            effects: { energy: -10, budget: -1 },
            feedback: {
              ru: "PM нашёл критические проблемы в архитектуре. Есть шанс спасти.",
              en: "PM found critical architecture issues. There's a chance to save it.",
            },
            weight: 7,
            random: 0.4,
            altEffects: { energy: -10, budget: -1, reputation: -5 },
            altFeedback: {
              ru: "PM посмотрел код и сказал: «Тут нечего спасать». Вы потеряли ещё $200K.",
              en: "PM looked at the code and said: 'Nothing to save here.' You lost another $200K.",
            },
          },
          {
            label: { ru: "White-label + свой логотип", en: "White-label + our logo" },
            effects: { budget: -1, energy: -5, karma: -10 },
            feedback: {
              ru: "Работает! Но все знают, что это не ваше. Карма страдает.",
              en: "It works! But everyone knows it's not yours. Karma suffers.",
            },
            weight: 5,
          },
        ],
        pavelComment: {
          ru: "MVP с нуля. Sunk cost fallacy — худший враг CIO. Лучше потерять $8M, чем $16M.",
          en: "MVP from scratch. Sunk cost fallacy is the CIO's worst enemy. Better to lose $8M than $16M.",
        },
      },
    ],
  },

  // ===== LEVEL 5: Final Boss =====
  {
    name: { ru: "Финальный босс", en: "Final Boss" },
    subtitle: { ru: "2 пошаговые ситуации", en: "2 multi-step situations" },
    situations: [
      {
        id: "5.1",
        title: { ru: "Полный блэкаут", en: "Total Blackout" },
        description: {
          ru: "Воскресенье, 3 часа ночи. Дата-центр обесточен. Генератор не завёлся. Всё лежит.",
          en: "Sunday, 3 AM. Data center has no power. Generator won't start. Everything is down.",
        },
        scene: ["dark_datacenter", "phone_red"],
        choices: [], // uses steps
        pavelComment: {
          ru: "RCA + план предотвращения — вот что отличает профессионала от пожарного. Тушить — любой может, предотвращать — единицы.",
          en: "RCA + prevention plan — that's what separates a professional from a firefighter. Anyone can extinguish fires, few can prevent them.",
        },
        steps: [
          {
            description: {
              ru: "Воскресенье, 3 часа ночи. Звонит дежурный: «Дата-центр обесточен. Генератор не завёлся. Всё лежит.»",
              en: "Sunday, 3 AM. On-call engineer calls: 'Data center has no power. Generator won't start. Everything is down.'",
            },
            scene: ["dark_datacenter", "phone_red"],
            choices: [
              {
                label: { ru: "Ехать в дата-центр лично", en: "Go to the data center personally" },
                effects: { energy: -15 },
                feedback: { ru: "Вы на месте. Теперь нужно решить проблему с генератором.", en: "You're on site. Now you need to solve the generator issue." },
                weight: 7,
              },
              {
                label: { ru: "Координировать удалённо из кровати", en: "Coordinate remotely from bed" },
                effects: { energy: -5, reputation: -5 },
                feedback: { ru: "Удобно, но команда заметила, что вас нет на месте.", en: "Convenient, but the team noticed you're not on site." },
                weight: 4,
              },
              {
                label: { ru: "Позвонить в DR-сайт и переключить", en: "Call DR site and failover" },
                effects: { energy: -10 },
                feedback: { ru: "DR-сайт активирован! Часть сервисов восстановлена.", en: "DR site activated! Some services restored." },
                weight: 8,
                random: 0.3,
                altEffects: { energy: -10, reputation: -10 },
                altFeedback: { ru: "DR-сайт тоже не готов — последний тест был год назад.", en: "DR site isn't ready either — last test was a year ago." },
              },
            ],
          },
          {
            description: {
              ru: "В дата-центре темно. Охранник: «Генератор не заправлен. Тендер на дизель завернула закупка — дорого». Банкоматы не работают по всей стране.",
              en: "Data center is dark. Guard: 'Generator has no fuel. Procurement rejected the diesel tender — too expensive.' ATMs are down nationwide.",
            },
            scene: ["dark_datacenter", "atm_error"],
            choices: [
              {
                label: { ru: "Купить дизель за свои и выставить счёт", en: "Buy diesel with own money, invoice later" },
                effects: { energy: -10, reputation: 10 },
                feedback: { ru: "Героически! Генератор заработал. Бухгалтерия в шоке от чека.", en: "Heroic! Generator started. Accounting is shocked by the receipt." },
                weight: 7,
              },
              {
                label: { ru: "Звонить зампреду банка", en: "Call the bank's deputy chairman" },
                effects: { energy: -5 },
                feedback: { ru: "Зампред ответил и решил вопрос за час.", en: "Deputy chairman answered and resolved it in an hour." },
                weight: 6,
                random: 0.5,
                altEffects: { energy: -5, reputation: -5 },
                altFeedback: { ru: "Зампред не ответил. Потеряли ещё 2 часа.", en: "Deputy chairman didn't answer. Lost 2 more hours." },
              },
              {
                label: { ru: "Звонить подрядчику — срочная доставка", en: "Call contractor — emergency delivery" },
                effects: { energy: -10, budget: -1 },
                feedback: { ru: "Подрядчик приехал за час. Дорого, но работает.", en: "Contractor arrived in an hour. Expensive, but it works." },
                weight: 8,
              },
            ],
          },
          {
            description: {
              ru: "Утро. Свет дали, системы поднимаются. Но 15 банкоматов не подключились. Очереди в отделениях. Telegram-канал «IT-позор банков» опубликовал ваше фото.",
              en: "Morning. Power restored, systems coming up. But 15 ATMs won't reconnect. Lines at branches. Telegram channel 'Bank IT Shame' published your photo.",
            },
            scene: ["server_blink", "people_queue", "phone_red"],
            choices: [
              {
                label: { ru: "Пресс-конференция: «Форс-мажор, мы справились»", en: "Press conference: 'Force majeure, we handled it'" },
                effects: { energy: -10, reputation: 5 },
                feedback: { ru: "Уверенный тон. Журналисты оценили открытость.", en: "Confident tone. Journalists appreciated the openness." },
                weight: 5,
                random: 0.4,
                altEffects: { energy: -10, reputation: -10 },
                altFeedback: { ru: "Журналисты засыпали неудобными вопросами. Стало хуже.", en: "Journalists bombarded with awkward questions. Made things worse." },
              },
              {
                label: { ru: "Тихо починить и не комментировать", en: "Quietly fix and no comments" },
                effects: { energy: -5, reputation: -5 },
                feedback: { ru: "Проблема решена, но инфополе заполнили другие.", en: "Problem solved, but others filled the information space." },
                weight: 4,
              },
              {
                label: { ru: "RCA-отчёт + план предотвращения", en: "RCA report + prevention plan" },
                effects: { energy: -15, reputation: 15 },
                feedback: { ru: "Профессиональный подход! Совет директоров впечатлён системностью.", en: "Professional approach! Board is impressed by the systematic response." },
                weight: 9,
              },
            ],
          },
        ],
      },
      {
        id: "5.2",
        title: { ru: "Совет директоров", en: "Board Meeting" },
        description: {
          ru: "Годовой отчёт. 12 человек в дорогих костюмах. Ваша презентация на 40 слайдов. Первый вопрос: «Где результат?»",
          en: "Annual report. 12 people in expensive suits. Your 40-slide presentation. First question: 'Where are the results?'",
        },
        scene: ["meeting_room", "presentation", "auditors"],
        choices: [],
        pavelComment: {
          ru: "Демо > слайды. Показывайте работающий продукт, а не обещания. И всегда готовьте ответ на неудобный вопрос.",
          en: "Demo > slides. Show a working product, not promises. And always prepare for the tough questions.",
        },
        steps: [
          {
            description: {
              ru: "Председатель: «Вы потратили $25M. Где результат? Приложение выглядит как в 2018 году.»",
              en: "Chairman: 'You spent $25M. Where are the results? The app looks like it's from 2018.'",
            },
            scene: ["meeting_room", "ceo", "presentation"],
            choices: [
              {
                label: { ru: "Показать метрики: uptime, скорость, безопасность", en: "Show metrics: uptime, speed, security" },
                effects: { energy: -10 },
                feedback: { ru: "Цифры убедительны, но совет хочет видеть бизнес-результат.", en: "Numbers are convincing, but the board wants business results." },
                weight: 6,
                random: 0.5,
                altEffects: { energy: -10, reputation: 5 },
                altFeedback: { ru: "Бывший IT-шник в совете оценил технические метрики.", en: "Former IT person on the board appreciated the technical metrics." },
              },
              {
                label: { ru: "«Результат — что мы НЕ упали, когда конкуренты упали»", en: "'The result is we DIDN\\'T go down when competitors did'" },
                effects: { energy: -5, reputation: 10 },
                feedback: { ru: "Мощный аргумент! Совет кивает.", en: "Powerful argument! The board nods." },
                weight: 7,
                random: 0.3,
                altEffects: { energy: -5 },
                altFeedback: { ru: "«Это не заслуга, это минимум», — ответил председатель.", en: "'That's not an achievement, that's the minimum,' the chairman replied." },
              },
              {
                label: { ru: "Показать демо нового продукта", en: "Show demo of the new product" },
                effects: { energy: -15, reputation: 15 },
                feedback: { ru: "Демо сработало! Совет впечатлён.", en: "Demo worked! Board is impressed." },
                weight: 8,
                random: 0.3,
                altEffects: { energy: -15, reputation: -20 },
                altFeedback: { ru: "Демо зависло на глазах у всего совета. Тишина в зале.", en: "Demo froze in front of the entire board. Silence in the room." },
              },
            ],
          },
          {
            description: {
              ru: "Член совета (бывший IT-шник): «А правда, что у вас бэкенд на Java 8 и бэкапы вручную?»",
              en: "Board member (ex-IT person): 'Is it true your backend is on Java 8 and backups are manual?'",
            },
            scene: ["meeting_room", "auditors"],
            choices: [
              {
                label: { ru: "«Запланировано в roadmap на Q2»", en: "'Planned in the Q2 roadmap'" },
                effects: { energy: -5, reputation: -5 },
                feedback: { ru: "Стандартный ответ. Не впечатлило, но не критично.", en: "Standard answer. Not impressive, but not critical." },
                weight: 5,
              },
              {
                label: { ru: "«Расскажу, что мы сделали вместо этого»", en: "'Let me tell you what we did instead'" },
                effects: { energy: -10, reputation: 5 },
                feedback: { ru: "Переключение фокуса сработало. Показали приоритеты.", en: "Focus shift worked. Showed priorities." },
                weight: 8,
              },
              {
                label: { ru: "«Кто вам это сказал?»", en: "'Who told you that?'" },
                effects: { reputation: -15, karma: -10 },
                feedback: { ru: "Защитная реакция. Совет потерял доверие.", en: "Defensive reaction. Board lost trust." },
                weight: 1,
              },
            ],
          },
          {
            description: {
              ru: "Финальный вердикт зависит от ваших накопленных метрик. Председатель встаёт и произносит...",
              en: "The final verdict depends on your accumulated metrics. The chairman stands and says...",
            },
            scene: ["meeting_room", "confetti"],
            choices: [
              {
                label: { ru: "Ждать вердикт...", en: "Await the verdict..." },
                effects: {},
                feedback: { ru: "Судьба решена.", en: "Fate is sealed." },
                weight: 5,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const ENDINGS: Ending[] = [
  {
    rank: "S",
    emoji: "🏆",
    title: { ru: "CIO года", en: "CIO of the Year" },
    description: {
      ru: "Все метрики в зелёной зоне, большинство решений оптимальны. Вы — легенда банковского IT. Совет продлил контракт и дал бонус $100K.",
      en: "All metrics in the green zone, most decisions optimal. You're a legend of banking IT. Board extended your contract with a $100K bonus.",
    },
    pavelAdvice: {
      ru: "Именно так и надо! Но помните — в реальности «год CIO» никогда не кончается 😄",
      en: "That's exactly how it's done! But remember — in reality, the 'CIO year' never ends 😄",
    },
  },
  {
    rank: "A",
    emoji: "🥇",
    title: { ru: "Крепкий профессионал", en: "Solid Professional" },
    description: {
      ru: "Дожили до конца с хорошими показателями. Не идеально, но стабильно. CEO уважает, команда доверяет.",
      en: "Made it to the end with good metrics. Not perfect, but stable. CEO respects you, team trusts you.",
    },
    pavelAdvice: {
      ru: "Отличный результат. В реальном банке это уже top-10% CIO. Главное — не останавливаться.",
      en: "Great result. In a real bank, this is already top-10% of CIOs. The key is not to stop.",
    },
  },
  {
    rank: "B",
    emoji: "🥈",
    title: { ru: "Выжил, но еле", en: "Barely Survived" },
    description: {
      ru: "Дожили до конца, но есть красные метрики. Испытательный срок не грозит, но и бонуса не будет.",
      en: "Made it to the end, but some metrics are red. No probation, but no bonus either.",
    },
    pavelAdvice: {
      ru: "Выживание — уже достижение. Но стоит подумать, где вы теряли ресурсы.",
      en: "Survival is already an achievement. But consider where you were losing resources.",
    },
  },
  {
    rank: "C",
    emoji: "🥉",
    title: { ru: "Испытательный срок", en: "Probation" },
    description: {
      ru: "Дожили, но две метрики критичны. Совет даёт 6 месяцев на исправление. Нервы на пределе.",
      en: "Survived, but two metrics are critical. Board gives 6 months to improve. Nerves are shot.",
    },
    pavelAdvice: {
      ru: "Бывает. Главное — понять системные ошибки и не повторять. Попробуйте ещё раз!",
      en: "It happens. The key is to understand systemic mistakes and not repeat them. Try again!",
    },
  },
  {
    rank: "D",
    emoji: "💀",
    title: { ru: "Уволен", en: "Fired" },
    description: {
      ru: "Репутация упала до нуля. Совет директоров попросил на выход. Охрана проводит до двери. LinkedIn обновлён.",
      en: "Reputation dropped to zero. Board asked you to leave. Security escorts you out. LinkedIn updated.",
    },
    pavelAdvice: {
      ru: "Репутация — главный актив CIO. Без неё никакие навыки не спасут. Берегите доверие.",
      en: "Reputation is a CIO's main asset. Without it, no skills will save you. Guard trust carefully.",
    },
  },
  {
    rank: "E",
    emoji: "🔥",
    title: { ru: "Burnout", en: "Burnout" },
    description: {
      ru: "Энергия на нуле. Вы засыпаете на совещаниях, путаете имена, и врач настоятельно рекомендует отпуск. Длинный.",
      en: "Energy at zero. You fall asleep in meetings, mix up names, and the doctor strongly recommends a vacation. A long one.",
    },
    pavelAdvice: {
      ru: "Work-life balance — не слабость, а стратегия. Выгоревший CIO опаснее, чем отсутствующий.",
      en: "Work-life balance isn't weakness, it's strategy. A burned-out CIO is more dangerous than an absent one.",
    },
  },
  {
    rank: "F",
    emoji: "⛓️",
    title: { ru: "Под следствием", en: "Under Investigation" },
    description: {
      ru: "Бюджет ушёл в минус. Финансовая полиция заинтересовалась. Адвокат дорогой, но необходимый.",
      en: "Budget went negative. Financial police are interested. Lawyer is expensive, but necessary.",
    },
    pavelAdvice: {
      ru: "Бюджет — это доверие. Каждый перерасход — удар по вашей свободе. Считайте дважды.",
      en: "Budget is trust. Every overspend is a hit to your freedom. Count twice.",
    },
  },
  {
    rank: "G",
    emoji: "🪧",
    title: { ru: "Коллективная жалоба", en: "Collective Complaint" },
    description: {
      ru: "Карма на нуле. Коллектив написал письмо в совет директоров. 47 подписей. Вас просят «пересмотреть стиль управления».",
      en: "Karma at zero. Staff wrote a letter to the board. 47 signatures. You're asked to 'reconsider your management style.'",
    },
    pavelAdvice: {
      ru: "Люди — главный ресурс CIO. Технологии можно купить, доверие команды — нет.",
      en: "People are a CIO's main resource. Technology can be bought, team trust cannot.",
    },
  },
];

export function getEnding(metrics: AdventureMetrics, totalWeight: number, maxWeight: number): Ending {
  const { energy, reputation, budget, karma } = metrics;

  // Game over endings (if reached end with critical metrics)
  if (reputation <= 0) return ENDINGS[4]; // D - Fired
  if (energy <= 0) return ENDINGS[5]; // E - Burnout
  if (budget <= 0) return ENDINGS[6]; // F - Under Investigation
  if (karma <= 0) return ENDINGS[7]; // G - Collective Complaint

  const criticalCount = [
    energy < 20,
    reputation < 30,
    budget < 5,
    karma < 15,
  ].filter(Boolean).length;

  const qualityRatio = totalWeight / maxWeight;

  if (criticalCount === 0 && qualityRatio >= 0.75) return ENDINGS[0]; // S
  if (criticalCount === 0) return ENDINGS[1]; // A
  if (criticalCount <= 1) return ENDINGS[2]; // B
  return ENDINGS[3]; // C
}
