export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'data' | 'software' | 'it' | 'analytics';
  tags: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  results: string[];
  futureWork: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  gradient: string;
  iconEmoji: string;
}

export const projects: Project[] = [
  {
    id: 'azure-retail-pipeline',
    title: 'Azure Retail Data Pipeline',
    slug: 'azure-retail-pipeline',
    tagline: 'End-to-end analytics pipeline on Microsoft Azure',
    description:
      'An end-to-end retail analytics pipeline built with Python, Azure SQL Database, SQL, and Power BI. Imports raw CSV datasets, cleans and transforms data with pandas and SQLAlchemy, loads into Azure SQL, creates SQL reporting views, and surfaces insights in an interactive Power BI dashboard.',
    longDescription:
      'Built a complete data engineering pipeline simulating a retail company analytics workflow. Raw CSV datasets are ingested and cleaned with Python (pandas), loaded into Azure SQL Database via SQLAlchemy, enriched with SQL views (vw_SalesSummary, vw_CustomerLifetimeValue, vw_ProductPerformance), and visualized in a multi-page Power BI dashboard covering Executive Overview, Customer Insights, and Product Performance.',
    category: 'data',
    tags: ['Azure SQL', 'Python', 'pandas', 'SQLAlchemy', 'Power BI', 'DAX', 'ETL', 'SQL'],
    stats: [
      { label: 'Records Processed', value: '360K+' },
      { label: 'Power BI Pages', value: '3' },
      { label: 'SQL Views', value: '3 Named' },
      { label: 'Data Tables', value: '5+' },
    ],
    highlights: [
      'Full ETL pipeline: CSV → pandas → SQLAlchemy → Azure SQL Database',
      'Normalized relational schema across customers, products, orders, stores, and suppliers',
      'Three named SQL reporting views: vw_SalesSummary, vw_CustomerLifetimeValue, vw_ProductPerformance',
      'Executive Overview page: Total Revenue, Orders, Customers, Products, Monthly Trend, Revenue by Category/City',
      'Customer Insights page: Average Order Value, Orders per Customer, Customer Lifetime Revenue, Top Customers',
      'Product Performance page: Average Revenue, Top Products, Revenue by Category',
      'Secure credential management via .env environment variables',
    ],
    problem:
      'Retail businesses generate large volumes of transactional data across multiple entities that is difficult to query and visualize without a structured pipeline and data model.',
    solution:
      'Built a Python ETL pipeline using pandas and SQLAlchemy to load 360K+ raw CSV records into a normalized Azure SQL Database schema, then created SQL reporting views and a multi-page Power BI dashboard for business intelligence consumption.',
    architecture: [
      'Data source: structured CSV files (customers, products, orders, stores, suppliers)',
      'Transformation: Python with pandas for cleaning, validation, and column renaming',
      'Loading: SQLAlchemy connection to Azure SQL Database with environment-variable credentials',
      'Reporting layer: SQL views — vw_SalesSummary, vw_CustomerLifetimeValue, vw_ProductPerformance',
      'Visualization: Power BI Desktop connected to Azure SQL views',
    ],
    challenges: [
      'Handling referential integrity across large datasets during bulk inserts',
      'Designing DAX measures that perform efficiently against Azure SQL',
      'Securing database credentials properly using .env and .gitignore',
      'Managing Azure SQL resource costs during active development',
    ],
    results: [
      'Fully functional analytics pipeline processing 360,000+ retail records',
      '3-page Power BI dashboard: Executive Overview, Customer Insights, Product Performance',
      'Three reusable SQL reporting views simplifying all dashboard queries',
      'Clean Python ETL codebase with reproducible setup via requirements.txt',
    ],
    futureWork: [
      'Add Azure Data Factory for scheduled pipeline orchestration',
      'Integrate Azure Blob Storage for raw file staging',
      'Implement incremental data loading',
      'Add automated data quality validation',
      'Build a fourth Store Performance dashboard page',
    ],
    githubUrl: 'https://github.com/cad171uakron/azure-retail-data-pipeline',
    featured: true,
    gradient: 'from-blue-600 to-cyan-500',
    iconEmoji: '☁️',
  },
  {
    id: 'casino-platform',
    title: 'FullStack Casino Platform',
    slug: 'casino-platform',
    tagline: 'Production-quality 12-game online casino with MVC architecture and security hardening',
    description:
      'A production-quality full-stack online casino platform with 12 games (Blackjack, Roulette, Baccarat, Craps, Texas Hold\'em, Video Poker, Slots, Mines, Keno, and more), MVC + Service Layer architecture, MySQL session persistence, XP/leveling, data-driven achievements, Chart.js statistics dashboard, 5-category leaderboards, 6 UI themes, and 67 unit tests.',
    longDescription:
      'Built as a software engineering portfolio project demonstrating advanced Node.js/Express architecture, MySQL database design, session management, real-time game state persistence, and modern vanilla JavaScript UI patterns. The platform features 12 casino games across table, card, machine, and instant categories — each with correct rule implementations and server-side state. Platform systems include atomic chip transactions with SELECT FOR UPDATE race condition prevention, a data-driven achievement engine (adding achievements = inserting a DB row), quadratic XP leveling, Chart.js bankroll/outcome charts, 5-category leaderboards, streak-based daily rewards, 6 CSS-variable theme system, and a full Blackjack AI coach with 6-deck S17 basic strategy and EV calculator.',
    category: 'software',
    tags: ['Node.js', 'Express.js', 'MySQL', 'JavaScript', 'Chart.js', 'bcrypt', 'helmet', 'MVC'],
    stats: [
      { label: 'Casino Games', value: '12' },
      { label: 'Unit Tests', value: '67' },
      { label: 'API Endpoints', value: '30+' },
      { label: 'UI Themes', value: '6' },
    ],
    highlights: [
      '12 games: Blackjack, European Roulette, Baccarat, Craps, Texas Hold\'em, Video Poker, High/Low, Slots, Mines, Keno, Dice, Coin Flip',
      'MVC + Service Layer: game engines are pure functions with zero DB/HTTP access — fully unit-testable',
      '67 unit tests covering Card, Hand, Deck, and Shoe classes in the game engine core',
      'MySQL session store with session fixation prevention (req.session.regenerate() on login)',
      'Atomic chip operations using SELECT FOR UPDATE inside transactions — no race conditions',
      'Data-driven achievement engine: adding achievements requires inserting a DB row, zero code changes',
      'Blackjack AI coach: full 6-deck S17 basic strategy table + EV calculator + win probability display',
      'Chart.js statistics dashboard: bankroll history, outcome breakdown, win/loss streaks',
      '5-category leaderboards: chips, level, wins, blackjacks, streak',
      '6 UI themes via CSS custom property overrides: Classic, Dark, Las Vegas, Neon, Royal Gold, Minimal',
      'Security: prepared statements, express-validator XSS sanitization, helmet CSP, timing-attack-safe auth, rate limiting',
    ],
    problem:
      'Building a multi-game casino platform requires correct rule implementations per game, secure atomic chip accounting, scalable session management, and meaningful player progression — all without introducing race conditions or security vulnerabilities.',
    solution:
      'Designed an MVC + Service Layer architecture where game engines are pure functions isolated from the database. Instant games use a shared service that atomically handles bet validation, chip deduction, history, stats, XP, and achievements. Session games persist JSON state in game_sessions for mid-hand reconnection. All chip operations use SELECT FOR UPDATE transactions.',
    architecture: [
      'Client: HTML/CSS/Vanilla JS (ES Modules) organized into api/, components/, core/, games/, and pages/ directories',
      'Server: Node.js + Express 4.x with MVC controllers → services → models (MySQL) pattern',
      'Game engines: pure functions under server/game-engine/ — no DB access, no HTTP, easily unit-tested',
      'Database: MySQL 8.0 with mysql2 prepared statements throughout (SQL injection prevention)',
      'Auth: bcrypt + express-session + express-mysql-session; session fixation prevention on login',
      'Security: helmet (CSP), express-rate-limit, express-validator, CORS, multer for uploads',
      'Schema: users, profiles, player_levels, statistics, game_sessions (UUID PK), game_history (immutable ledger), transactions (audit trail), achievements (data-driven catalog), user_achievements',
      'Testing: 67 unit tests on core game engine classes (Card, Hand, Deck, Shoe)',
    ],
    challenges: [
      'Preventing chip race conditions when multiple requests arrive simultaneously — solved with SELECT FOR UPDATE inside MySQL transactions',
      'Implementing timing-attack-safe login (dummy bcrypt hash for non-existent users)',
      'Building a data-driven achievement system that works for any achievement type without code changes',
      'Managing mid-hand reconnection for session-based games (Blackjack, Roulette, Mines, Hold\'em)',
      'Keeping 12 different game rule implementations correct and maintainable',
    ],
    results: [
      '12 fully playable casino games with correct rule sets and server-side state management',
      '67 passing unit tests on the core game engine (Card, Hand, Deck, Shoe)',
      'Security hardened: prepared statements, CSP, rate limiting, session fixation prevention, XSS sanitization',
      'Complete player progression: XP/levels, data-driven achievements, Chart.js dashboard, 5-category leaderboards',
    ],
    futureWork: [
      'Add WebSocket support for live multiplayer Blackjack tables',
      'Implement provably fair RNG with cryptographic verification',
      'Add Texas Hold\'em multiplayer lobby',
      'Build admin dashboard for user management and game analytics',
      'Deploy with Docker + CI/CD pipeline',
    ],
    githubUrl: 'https://github.com/cad171uakron',
    featured: true,
    gradient: 'from-purple-600 to-pink-500',
    iconEmoji: '🃏',
  },
  {
    id: 'hc-it-toolkit',
    title: 'HC Systems Toolkit',
    slug: 'hc-it-toolkit',
    tagline: 'Menu-driven PowerShell support console for Windows diagnostics and repair',
    description:
      'A modular PowerShell toolkit (v2.0.0) designed for help-desk and field technicians. Covers system diagnostics, remote support scripts, network troubleshooting, Windows repair, Office tools, hardware reporting, printer management, and activity logging — all from a single menu-driven interface.',
    longDescription:
      'HC Systems Toolkit is a production-quality, menu-driven Windows support console built in PowerShell. Developed and deployed during my IT internship at Hilscher-Clarke, v2.0.0 includes modules for full system diagnostics, remote support (ScreenConnect-compatible), network analysis, Windows activation and repair (SFC, DISM, BitLocker, Winget), Office and Teams troubleshooting, hardware inventory (CPU, GPU, BIOS, storage, TPM, battery), printer diagnostics, timestamped report ZIP archives, and full activity logging. Includes a validation test suite (Validate-Toolkit.ps1, Smoke-Toolkit.ps1, Test-Launch.ps1).',
    category: 'it',
    tags: ['PowerShell', 'Windows', 'IT Automation', 'Diagnostics', 'Scripting', 'HTML', 'Batch'],
    stats: [
      { label: 'Version', value: 'v2.0.0' },
      { label: 'Module Categories', value: '9' },
      { label: 'Language Split', value: 'PS1 + HTML' },
      { label: 'Test Scripts', value: '3' },
    ],
    highlights: [
      'Menu-driven console UI separating Standard and Administrator action groups',
      'Diagnostics: system inventory, software, drivers, event logs, startup items, health checks, and export',
      'Remote support: connection tests, BIOS checks, remote diagnostics, reboot/shutdown, all-in-one SupportScripts bundle',
      'Networking: IP config, connectivity tests, routes, DNS, TCP connections, adapter resets, network reports',
      'Windows: activation, BitLocker, SFC/DISM repair, updates, service controls, full system update via Winget',
      'Office: Outlook and Teams restart/cache tools, Office version and service checks',
      'Hardware: CPU, memory, BIOS, storage, GPU, TPM, Secure Boot, battery, display, USB, PCI reporting',
      'Timestamped report folders and ZIP archives; structured activity and error logging',
      'Validation test suite: Validate-Toolkit.ps1, Smoke-Toolkit.ps1, Test-Launch.ps1',
      'Compatible with VS Code launch config and remote support tools (ScreenConnect)',
    ],
    problem:
      'IT support teams spend significant time on repetitive diagnostic steps for common issues. Manual processes are inconsistent across technicians and produce no audit trail.',
    solution:
      'Built a modular PowerShell toolkit with a menu-driven interface that packages common diagnostic, repair, and reporting workflows into reproducible scripts. Standard and Administrator actions are clearly separated, with automatic elevation prompts for protected operations.',
    architecture: [
      'Entry point: Start-HC-IT-Toolkit.cmd (double-click or Run as Administrator)',
      'VS Code integration: launch config and Run-HCITToolkit.ps1 wrapper',
      'Remote deployment: Run-Toolkit-Remote.bat for ScreenConnect and remote tools',
      'Modules: Diagnostics, Remote, Networking, Windows, Office, Hardware, Printers, Utilities, Reports',
      'Logging: timestamped entries in Logs\\Toolkit.log',
      'Reports: timestamped folders and ZIP archives under Reports\\',
      'Testing: Validate-Toolkit.ps1 (syntax + function checks), Smoke-Toolkit.ps1, Test-Launch.ps1',
    ],
    challenges: [
      'Cleanly separating Standard vs. Administrator actions with clear elevation messaging',
      'Making the toolkit portable and predictable across different Windows 10/11 environments',
      'Writing defensive error handling for scripts that touch critical system components',
      'Supporting remote deployment via ScreenConnect without interactive prompts',
    ],
    results: [
      'Deployed at v2.0.0 and used by IT team at Hilscher-Clarke internship',
      '9 functional module categories covering the full technician workflow',
      'Validation test suite ensuring syntax correctness and reproducible startup behavior',
      'Compatible with VS Code, command-line, and remote support tools',
    ],
    futureWork: [
      'Add a WPF or Windows Forms GUI wrapper',
      'Integrate with ServiceNow for automatic ticket creation on errors',
      'Add PSRemoting for remote execution across domain machines',
      'Export hardware reports to formatted Excel/CSV',
    ],
    githubUrl: 'https://github.com/cad171uakron/Starter-Toolkit',
    featured: true,
    gradient: 'from-green-600 to-emerald-400',
    iconEmoji: '🔧',
  },
  {
    id: 'construction-analytics',
    title: 'Construction Project Analytics',
    slug: 'construction-analytics',
    tagline: 'Two-page Power BI dashboard for construction portfolio KPIs',
    description:
      'A professional two-page Power BI dashboard analyzing a fictional construction project portfolio. Demonstrates data modeling, DAX calculations, interactive reporting, and BI best practices to help executives and project managers monitor KPIs and identify trends.',
    longDescription:
      'Designed and built a two-page Power BI analytics dashboard for construction project portfolio management. The dashboard gives stakeholders visibility into portfolio KPIs, profitability trends, project health scoring, and performance breakdowns — built to demonstrate data modeling, DAX-driven business logic, and executive-ready reporting design.',
    category: 'analytics',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'Data Visualization', 'Excel', 'Power Query'],
    stats: [
      { label: 'Dashboard Pages', value: '2' },
      { label: 'KPI Metrics', value: '10+' },
      { label: 'Visual Types', value: '8+' },
      { label: 'DAX Measures', value: 'Custom' },
    ],
    highlights: [
      'Professional two-page Power BI dashboard for a construction project portfolio',
      'Executive-level KPI overview with revenue, cost, and margin cards',
      'Project health scoring model using weighted DAX measures',
      'Interactive filtering with cross-visual highlighting',
      'Power Query data preparation with merges and transformations',
      'Star schema data model with project, time, and category dimensions',
      'Business intelligence best practices applied throughout',
    ],
    problem:
      'Construction project portfolios generate data across budgets, actuals, and schedules — making it difficult for leadership to get a consolidated view of portfolio health, profitability, and project risk.',
    solution:
      'Built a normalized Power BI data model combining project budget and actual cost data, authored DAX measures for business KPIs, and designed a two-page dashboard tailored to executive and project manager audiences.',
    architecture: [
      'Data sources: Excel project files with budget and actuals',
      'Data preparation: Power Query transformations and table merges',
      'Data model: star schema with project, time, and category dimensions',
      'Business logic: DAX calculated columns, measures, and KPI scoring',
      'Visualization: Power BI Desktop report published as .pbix',
    ],
    challenges: [
      'Designing a health score formula that accurately reflects project risk',
      'Handling missing or incomplete project records gracefully in DAX',
      'Optimizing measures for report rendering performance',
      'Presenting complex data in a clean, executive-ready layout',
    ],
    results: [
      'Two-page dashboard covering portfolio KPIs and project-level detail',
      'Custom DAX health scoring model identifying at-risk projects',
      'Clean, professional visual design suitable for executive review',
      'Demonstrates end-to-end Power BI workflow from data prep to publishing',
    ],
    futureWork: [
      'Connect to a live project management system via API',
      'Add forecasting and what-if scenario analysis with parameters',
      'Build a mobile-optimized report layout',
      'Expand to additional pages covering regional and subcontractor analysis',
    ],
    githubUrl: 'https://github.com/cad171uakron/Construction_Project_Analytics.pbix',
    featured: true,
    gradient: 'from-orange-500 to-amber-400',
    iconEmoji: '📊',
  },
  {
    id: 'robotics-ecommerce',
    title: 'Robotics E-Commerce Application',
    slug: 'robotics-ecommerce',
    tagline: 'Full-stack e-commerce platform with admin and database integration',
    description:
      'A full-stack Node.js + Express e-commerce platform for robotics products backed by MySQL. Features JWT-based customer authentication, bcryptjs password hashing, persistent product reviews, shopping cart and order management, and admin stock controls.',
    longDescription:
      'Built a complete full-stack e-commerce web application for robotics products using Node.js, Express, and MySQL. The application implements JWT-based customer authentication, bcryptjs password hashing, product catalog with browsing and reviews, shopping cart and order workflow, and an admin interface for stock management protected by an environment-variable admin password.',
    category: 'software',
    tags: ['JavaScript', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'bcryptjs', 'HTML', 'CSS', 'REST APIs'],
    stats: [
      { label: 'JS / CSS / HTML', value: '69/16/13%' },
      { label: 'Auth Method', value: 'JWT' },
      { label: 'Database', value: 'MySQL' },
      { label: 'API Endpoints', value: '15+' },
    ],
    highlights: [
      'Node.js + Express backend with MySQL persistence (db:init and db:seed scripts)',
      'JWT-based customer authentication for secure session management',
      'bcryptjs password hashing for secure credential storage',
      'Product catalog with browsing, filtering, and persistent customer reviews',
      'Shopping cart with quantity management and order tracking',
      'Admin stock updates protected by ADMIN_PASSWORD environment variable',
      'Environment-variable configuration (.env) for all sensitive credentials',
      'Start/stop PowerShell scripts for local development workflow',
    ],
    problem:
      'Demonstrating full-stack e-commerce development requires integrating a frontend UI, backend API, MySQL schema, secure JWT authentication, and an admin layer into a coherent, working application.',
    solution:
      'Built a multi-tier web application with HTML/CSS/JS frontend, a Node.js/Express REST API backend, and a MySQL relational database — implementing the complete customer and admin journeys from product discovery to order completion.',
    architecture: [
      'Frontend: HTML, CSS, JavaScript (68.9% JS / 16.4% CSS / 12.6% HTML)',
      'Backend: Node.js + Express REST API under /server directory',
      'Database: MySQL with normalized schema (users, products, orders, order_items, reviews)',
      'Authentication: JWT tokens for customers; ADMIN_PASSWORD env var for admin routes',
      'Security: bcryptjs for password hashing, JWT_SECRET for token signing',
      'Dev tooling: npm run db:init, db:seed, start; start-local.ps1 / stop-local.ps1',
    ],
    challenges: [
      'Designing JWT token lifecycle management for customer sessions',
      'Implementing role separation between customer and admin routes without a full RBAC system',
      'Building a checkout flow that atomically deducts inventory and records orders',
      'Managing database schema initialization and seeding reproducibly across environments',
    ],
    results: [
      'Fully functional e-commerce application with customer and admin workflows',
      'Secure JWT authentication and bcryptjs-hashed credentials',
      'MySQL-backed schema covering users, products, orders, order items, and reviews',
      'Reproducible setup via db:init and db:seed npm scripts',
    ],
    futureWork: [
      'Add Stripe sandbox for payment processing',
      'Implement product rating aggregation and review moderation',
      'Add inventory low-stock alerts',
      'Deploy to cloud hosting with CI/CD pipeline',
    ],
    githubUrl: 'https://github.com/cad171uakron/Robotics-Ecommerce',
    featured: false,
    gradient: 'from-cyan-600 to-blue-500',
    iconEmoji: '🤖',
  },
  {
    id: 'stratforge-ai',
    title: 'StratForge AI',
    slug: 'stratforge-ai',
    tagline: 'AI-powered Counter-Strike 2 tactical intelligence platform',
    description:
      'An AI-powered CS2 tactical intelligence platform that recommends professional-level strategies in real time using deterministic game-state analysis, economy prediction, and adaptive learning. Built with Next.js, TypeScript, and Prisma. Live on Vercel.',
    longDescription:
      'StratForge AI is a full-stack Next.js application that gives CS2 players access to professional-level tactical intelligence. The platform analyzes game state — map position, economy, round phase — and surfaces optimal strategies using deterministic logic and adaptive recommendation models. Features include CS2 radar maps with precise callout zone overlays (mapped to 1024×1024 radar coordinates), team profile management, round outcome workflow tracking, and a Vitest-driven test suite.',
    category: 'software',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Vercel', 'Vitest', 'AI/Logic', 'CS2'],
    stats: [
      { label: 'Stack', value: 'Next.js + TS' },
      { label: 'Database', value: 'Prisma ORM' },
      { label: 'Deployment', value: 'Vercel' },
      { label: 'Language', value: '99.4% TS' },
    ],
    highlights: [
      'Real-time CS2 strategy recommendations using deterministic game-state analysis',
      'Economy prediction and adaptive learning for round-phase-aware suggestions',
      'CS2 radar maps with precisely remapped callout zone overlays (1024×1024 coordinates)',
      'Team profile management with secure database-backed storage via Prisma',
      'Round outcome workflow tracking and history',
      'Vitest test suite covering round outcome workflows',
      'Deployed and live on Vercel at strat-forge-ai.vercel.app',
      'TypeScript throughout (99.4% of codebase)',
    ],
    problem:
      'CS2 players lack accessible, structured access to professional-level tactical knowledge. Strategies exist in videos and coaching sessions but not in a queryable, real-time format.',
    solution:
      'Built a Next.js platform that encodes professional CS2 tactical logic as deterministic game-state analysis, making professional-level strategy recommendations available in real time based on map, economy, and round phase inputs.',
    architecture: [
      'Frontend: Next.js App Router with TypeScript, shadcn/ui components',
      'Backend: Next.js API routes with middleware-based authentication',
      'Database: Prisma ORM with schema migrations (prisma/)',
      'CS2 maps: radar images with precise callout zone coordinate mappings',
      'Testing: Vitest for round outcome workflow integration tests',
      'Deployment: Vercel with automatic CI/CD on push',
    ],
    challenges: [
      'Precisely remapping callout zones to actual 1024×1024 radar image pixel coordinates',
      'Designing deterministic strategy logic that accounts for economy, map position, and round phase',
      'Building a data model flexible enough to represent all CS2 map callouts and team compositions',
      'Balancing real-time performance with complex tactical analysis logic',
    ],
    results: [
      'Live production deployment on Vercel at strat-forge-ai.vercel.app',
      'CS2 radar maps with accurate callout zone overlays for major maps',
      'Secure team profile system backed by Prisma database migrations',
      'Vitest test suite covering core round outcome workflows',
    ],
    futureWork: [
      'Add AI/ML model trained on professional match data for adaptive recommendations',
      'Integrate CS2 Steam API for live match state ingestion',
      'Add economy tracker with buy/eco/force recommendations',
      'Build community strategy submission and voting system',
      'Add user accounts with match history and strategy bookmarks',
    ],
    githubUrl: 'https://github.com/cad171uakron',
    liveUrl: 'https://strat-forge-ai.vercel.app',
    featured: true,
    gradient: 'from-yellow-500 to-orange-500',
    iconEmoji: '🎯',
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByCategory = (category: string) =>
  category === 'all' ? projects : projects.filter((p) => p.category === category);
