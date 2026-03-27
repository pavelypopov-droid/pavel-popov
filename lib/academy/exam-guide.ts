export interface ExamGuideData {
  title: string;
  subtitle: string;
  format: { questions: number; time: number; passing: number; maxScore: number; price: string; scenarios: number; totalScenarios: number };
  labels: {
    questions: string; time: string; passing: string; price: string;
    multipleChoice: string; noPenalty: string; scenarioInfo: string;
    domains: string; scenarios: string; tipsTitle: string;
  };
  domains: { id: number; name: string; weight: number; taskStatements: string[] }[];
  scenarios: { id: number; title: string; description: string; domains: string[] }[];
  tips: string[];
}

const format = { questions: 60, time: 120, passing: 720, maxScore: 1000, price: "$99", scenarios: 4, totalScenarios: 6 };

export const examGuide: Record<'en' | 'ru', ExamGuideData> = {
  en: {
    title: "CCA-F Certification Exam Guide",
    subtitle: "Claude Certified Architect — Foundations",
    format,
    labels: {
      questions: "Questions", time: "Time (min)", passing: "Passing score", price: "Price",
      multipleChoice: "All questions are multiple choice with one correct answer and three distractors",
      noPenalty: "No penalty for guessing — always answer every question",
      scenarioInfo: "{picked} scenarios picked at random from {total} possible",
      domains: "Content Domains", scenarios: "Exam Scenarios", tipsTitle: "Preparation Tips",
    },
    domains: [
      { id: 1, name: "Agentic Architecture & Orchestration", weight: 27, taskStatements: [
        "Design and implement agentic loops for autonomous task execution",
        "Orchestrate multi-agent systems with coordinator-subagent patterns",
        "Configure subagent invocation, context passing, and spawning",
        "Implement multi-step workflows with enforcement and handoff patterns",
        "Apply Agent SDK hooks for tool call interception and data normalization",
        "Design task decomposition strategies for complex workflows",
        "Manage session state, resumption, and forking",
      ]},
      { id: 2, name: "Tool Design & MCP Integration", weight: 18, taskStatements: [
        "Design effective tool interfaces with clear descriptions and boundaries",
        "Implement structured error responses for MCP tools",
        "Distribute tools appropriately across agents and configure tool choice",
        "Integrate MCP servers into Claude Code and agent workflows",
        "Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively",
      ]},
      { id: 3, name: "Claude Code Configuration & Workflows", weight: 20, taskStatements: [
        "Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization",
        "Create and configure custom slash commands and skills",
        "Apply path-specific rules for conditional convention loading",
        "Determine when to use plan mode vs direct execution",
        "Apply iterative refinement techniques for progressive improvement",
        "Integrate Claude Code into CI/CD pipelines",
      ]},
      { id: 4, name: "Prompt Engineering & Structured Output", weight: 20, taskStatements: [
        "Design prompts with explicit criteria to improve precision and reduce false positives",
        "Apply few-shot prompting to improve output consistency and quality",
        "Enforce structured output using tool use and JSON schemas",
        "Implement validation, retry, and feedback loops for extraction quality",
        "Design efficient batch processing strategies",
        "Design multi-instance and multi-pass review architectures",
      ]},
      { id: 5, name: "Context Management & Reliability", weight: 15, taskStatements: [
        "Apply prompt caching strategies to optimize cost and latency",
        "Configure and leverage extended thinking for complex reasoning",
        "Manage context window limits across long documents and multi-turn conversations",
        "Design escalation and human-in-the-loop patterns for reliability",
      ]},
    ],
    scenarios: [
      { id: 1, title: "Customer Support Resolution Agent", description: "Build a customer support resolution agent using the Claude Agent SDK. It handles returns, billing disputes, and account issues through custom MCP tools (get_customer, lookup_order, process_refund, escalate_to_human). Target: 80%+ first-contact resolution.", domains: ["Agentic Architecture", "Tool Design & MCP", "Context Management"] },
      { id: 2, title: "Code Generation with Claude Code", description: "Use Claude Code for software development — code generation, refactoring, debugging, and documentation. Integrate into your workflow with custom slash commands, CLAUDE.md configurations, and plan mode.", domains: ["Claude Code", "Context Management"] },
      { id: 3, title: "Multi-Agent Research System", description: "Build a multi-agent research system using the Claude Agent SDK. A coordinator delegates to specialized subagents: web search, document analysis, and report synthesis. Produce comprehensive, cited reports.", domains: ["Agentic Architecture", "Tool Design & MCP", "Context Management"] },
      { id: 4, title: "Developer Productivity with Claude", description: "Build developer productivity tools using the Claude Agent SDK. Help engineers explore codebases, understand legacy systems, generate boilerplate. Uses built-in tools (Read, Write, Bash, Grep, Glob) and MCP servers.", domains: ["Tool Design & MCP", "Claude Code", "Agentic Architecture"] },
      { id: 5, title: "Claude Code for Continuous Integration", description: "Integrate Claude Code into CI/CD pipelines for automated code reviews, test generation, and PR feedback. Design prompts that provide actionable feedback and minimize false positives.", domains: ["Claude Code", "Prompt Engineering"] },
      { id: 6, title: "Structured Data Extraction", description: "Build a structured data extraction system using Claude. Extract information from unstructured documents, validate output using JSON schemas, maintain high accuracy. Handle edge cases and integrate with downstream systems.", domains: ["Prompt Engineering", "Context Management"] },
    ],
    tips: [
      "Focus on the heaviest domain first: Agentic Architecture (27%) — understand agentic loops, coordinator-subagent patterns, and hooks inside out.",
      "Know the exact tool_choice options and when to use each: \"auto\", \"any\", and forced tool selection with {\"type\": \"tool\", \"name\": \"...\"}.",
      "Understand CLAUDE.md hierarchy: user-level (~/.claude/CLAUDE.md), project-level (.claude/CLAUDE.md), directory-level, and .claude/rules/ with path scoping.",
      "Practice scenario-based thinking: the exam presents 4 realistic production scenarios. Each question has a specific correct answer based on best practices.",
      "Know the difference between programmatic enforcement (hooks) and prompt-based guidance — when deterministic compliance is required, use hooks.",
      "Understand prompt caching: 1024 token minimum, cache_control breakpoints, processing order matters, and how it interacts with extended thinking.",
      "Review session management: --resume for continuation, fork_session for branching, and when to start fresh vs resume.",
    ],
  },
  ru: {
    title: "Гайд по экзамену CCA-F",
    subtitle: "Claude Certified Architect — Foundations",
    format,
    labels: {
      questions: "Вопросов", time: "Время (мин)", passing: "Проходной балл", price: "Стоимость",
      multipleChoice: "Все вопросы — множественный выбор с одним правильным ответом и тремя дистракторами",
      noPenalty: "Штрафа за угадывание нет — всегда отвечайте на все вопросы",
      scenarioInfo: "{picked} сценария выбираются случайно из {total} возможных",
      domains: "Домены контента", scenarios: "Сценарии экзамена", tipsTitle: "Советы по подготовке",
    },
    domains: [
      { id: 1, name: "Агентная архитектура и оркестрация", weight: 27, taskStatements: [
        "Проектирование и реализация агентных циклов для автономного выполнения задач",
        "Оркестрация мультиагентных систем с паттерном координатор-субагент",
        "Настройка вызова субагентов, передачи контекста и порождения",
        "Реализация многошаговых рабочих процессов с принудительным исполнением и передачей управления",
        "Применение хуков Agent SDK для перехвата вызовов инструментов и нормализации данных",
        "Проектирование стратегий декомпозиции задач для сложных рабочих процессов",
        "Управление состоянием сессии, возобновление и форкинг",
      ]},
      { id: 2, name: "Проектирование инструментов и интеграция MCP", weight: 18, taskStatements: [
        "Проектирование эффективных интерфейсов инструментов с чёткими описаниями и границами",
        "Реализация структурированных ответов об ошибках для MCP-инструментов",
        "Распределение инструментов между агентами и настройка tool choice",
        "Интеграция MCP-серверов в Claude Code и агентные рабочие процессы",
        "Выбор и применение встроенных инструментов (Read, Write, Edit, Bash, Grep, Glob)",
      ]},
      { id: 3, name: "Конфигурация Claude Code и рабочие процессы", weight: 20, taskStatements: [
        "Настройка файлов CLAUDE.md с правильной иерархией, областью действия и модульной организацией",
        "Создание и настройка пользовательских команд и навыков (Skills)",
        "Применение path-specific правил для условной загрузки конвенций",
        "Выбор между режимом плана и прямым выполнением",
        "Применение итеративного уточнения для прогрессивного улучшения",
        "Интеграция Claude Code в CI/CD пайплайны",
      ]},
      { id: 4, name: "Промпт-инженерия и структурированный вывод", weight: 20, taskStatements: [
        "Проектирование промптов с явными критериями для повышения точности",
        "Применение few-shot промптинга для улучшения консистентности",
        "Гарантирование структурированного вывода через tool use и JSON-схемы",
        "Реализация валидации, повторных попыток и циклов обратной связи",
        "Проектирование эффективных стратегий пакетной обработки",
        "Проектирование архитектур многопроходного ревью",
      ]},
      { id: 5, name: "Управление контекстом и надёжность", weight: 15, taskStatements: [
        "Применение стратегий кэширования промптов для оптимизации стоимости и задержки",
        "Настройка и использование расширенного мышления (extended thinking)",
        "Управление лимитами контекстного окна в длинных документах и мультитерновых диалогах",
        "Проектирование паттернов эскалации и human-in-the-loop для надёжности",
      ]},
    ],
    scenarios: [
      { id: 1, title: "Агент поддержки клиентов", description: "Агент для разрешения обращений клиентов на Claude Agent SDK. Обрабатывает возвраты, споры по счетам и проблемы с аккаунтами через MCP-инструменты (get_customer, lookup_order, process_refund, escalate_to_human). Цель: 80%+ решение с первого обращения.", domains: ["Агентная архитектура", "Инструменты и MCP", "Контекст и надёжность"] },
      { id: 2, title: "Генерация кода в Claude Code", description: "Claude Code для разработки — генерация кода, рефакторинг, отладка и документация. Интеграция через пользовательские команды, CLAUDE.md и режим плана.", domains: ["Claude Code", "Контекст и надёжность"] },
      { id: 3, title: "Мультиагентная исследовательская система", description: "Мультиагентная система на Claude Agent SDK. Координатор делегирует специализированным субагентам: поиск в вебе, анализ документов, синтез отчётов. Результат — обоснованные отчёты с цитатами.", domains: ["Агентная архитектура", "Инструменты и MCP", "Контекст и надёжность"] },
      { id: 4, title: "Инструменты продуктивности разработчика", description: "Инструменты продуктивности на Claude Agent SDK. Помощь инженерам: исследование кодовой базы, работа с легаси, генерация шаблонного кода. Встроенные инструменты (Read, Write, Bash, Grep, Glob) и MCP-серверы.", domains: ["Инструменты и MCP", "Claude Code", "Агентная архитектура"] },
      { id: 5, title: "Claude Code в CI/CD", description: "Интеграция Claude Code в CI/CD пайплайны для автоматического ревью кода, генерации тестов и обратной связи по PR. Промпты с конкретной обратной связью и минимумом ложных срабатываний.", domains: ["Claude Code", "Промпт-инженерия"] },
      { id: 6, title: "Извлечение структурированных данных", description: "Система извлечения структурированных данных на Claude. Извлечение информации из неструктурированных документов, валидация через JSON-схемы, высокая точность. Обработка краевых случаев и интеграция с системами.", domains: ["Промпт-инженерия", "Контекст и надёжность"] },
    ],
    tips: [
      "Начните с самого весомого домена: Агентная архитектура (27%) — разберите агентные циклы, паттерн координатор-субагент и хуки досконально.",
      "Знайте точные варианты tool_choice и когда их использовать: \"auto\", \"any\" и принудительный выбор {\"type\": \"tool\", \"name\": \"...\"}.",
      "Разберите иерархию CLAUDE.md: пользовательский (~/.claude/CLAUDE.md), проектный (.claude/CLAUDE.md), директорный, и .claude/rules/ с path-scoping.",
      "Практикуйте сценарное мышление: на экзамене 4 реалистичных production-сценария. У каждого вопроса — конкретный правильный ответ на основе best practices.",
      "Различайте программное обеспечение (хуки) и промпт-инструкции — когда нужна детерминированная гарантия, используйте хуки.",
      "Разберите кэширование промптов: минимум 1024 токена, cache_control breakpoints, порядок обработки, взаимодействие с extended thinking.",
      "Изучите управление сессиями: --resume для продолжения, fork_session для ветвления, и когда начинать заново vs возобновлять.",
    ],
  },
};
