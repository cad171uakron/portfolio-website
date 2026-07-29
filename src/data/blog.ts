export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'bullets' | 'code' | 'callout';
  content?: string;
  items?: string[];
  language?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  projectSlug?: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'azure-retail-etl-pipeline',
    title: 'Processing 360K+ Records: Building a Retail Analytics Pipeline on Azure',
    excerpt: 'How I designed and built a production-grade ETL pipeline using Python, Azure SQL, and Power BI to turn raw retail data into business intelligence.',
    date: '2025-11-15',
    readTime: 6,
    category: 'Data Engineering',
    tags: ['Azure', 'Python', 'ETL', 'SQL', 'Power BI'],
    projectSlug: 'azure-retail-pipeline',
    sections: [
      {
        type: 'paragraph',
        content: 'When I started the Azure Retail Analytics Pipeline project, the core challenge was clear: take hundreds of thousands of raw retail transaction records spanning multiple categories, clean and normalize them, load them into a cloud database, and surface meaningful KPIs through an executive-facing dashboard — all in a repeatable, automated way.',
      },
      {
        type: 'heading',
        content: 'The Problem with Raw Retail Data',
      },
      {
        type: 'paragraph',
        content: 'Raw retail exports are messy by nature. Fields are inconsistently formatted, categories overlap, null values are mixed with sentinel values like "N/A" or "0", and date formats vary across source systems. Before any analysis can happen, the data needs to be trustworthy.',
      },
      {
        type: 'paragraph',
        content: 'With 360,000+ records across product categories, the first decision was whether to clean in-database (SQL transforms) or pre-process in Python. I chose Python with pandas for the extraction and transformation phase — the flexibility to inspect data mid-pipeline is invaluable for debugging edge cases.',
      },
      {
        type: 'heading',
        content: 'Pipeline Architecture',
      },
      {
        type: 'bullets',
        items: [
          'Extract: pandas reads raw CSV/Excel exports from the retail source system',
          'Transform: normalize categories, cast types, flag anomalies, compute derived columns (margin, YoY change)',
          'Load: SQLAlchemy bulk-inserts cleaned records into Azure SQL Database',
          'Visualize: Power BI connects via DirectQuery to Azure SQL, refreshing dashboards automatically',
        ],
      },
      {
        type: 'paragraph',
        content: 'The key technical challenge was performance. Loading 360K rows one by one is prohibitively slow. SQLAlchemy\'s `execute_many` with batched chunking (5,000 rows per commit) reduced load time from ~12 minutes to under 90 seconds. Combined with proper indexing on the date and category columns, Power BI queries that previously timed out now return in milliseconds.',
      },
      {
        type: 'code',
        language: 'python',
        content: `# Chunked bulk insert with SQLAlchemy
CHUNK_SIZE = 5000

def load_to_azure(df: pd.DataFrame, table: str, engine) -> None:
    total = len(df)
    for i in range(0, total, CHUNK_SIZE):
        chunk = df.iloc[i:i + CHUNK_SIZE]
        chunk.to_sql(table, engine, if_exists='append', index=False, method='multi')
        print(f"Loaded {min(i + CHUNK_SIZE, total)}/{total} rows")`,
      },
      {
        type: 'heading',
        content: 'Data Modeling for Power BI',
      },
      {
        type: 'paragraph',
        content: 'The schema follows a star model: a central fact table of transactions surrounded by dimension tables for products, categories, dates, and stores. This is critical for Power BI performance — DAX measures calculate much faster against a well-modeled star schema than a flat denormalized table.',
      },
      {
        type: 'paragraph',
        content: 'The final Power BI dashboard surfaces four key metric areas: revenue trends (MoM, YoY), category performance (margin by segment), store comparison (same-store sales), and inventory velocity. Each visual is backed by a DAX measure rather than hardcoded values, making the report fully dynamic as new data loads.',
      },
      {
        type: 'callout',
        content: 'Takeaway: The most impactful work in data engineering isn\'t writing clever code — it\'s building pipelines that stakeholders can trust. Consistent schema, automated validation, and clear documentation matter more than algorithmic elegance.',
      },
    ],
  },
  {
    slug: 'casino-platform-architecture',
    title: 'Architecting a Full-Stack Casino Platform: 12 Games, 67 Tests, One Codebase',
    excerpt: 'A deep dive into the MVC + Service Layer architecture, test strategy, and frontend theming system behind a complete multi-game casino web application.',
    date: '2025-09-08',
    readTime: 7,
    category: 'Software Development',
    tags: ['Node.js', 'JavaScript', 'Testing', 'Architecture', 'MySQL'],
    projectSlug: 'casino-platform',
    sections: [
      {
        type: 'paragraph',
        content: 'Building a casino platform sounds fun — and it is — but it\'s also a surprisingly rigorous software engineering challenge. You\'re managing real-time game state, financial transactions (chips), user sessions, and a complex rule engine for each game type, all within a single application. Getting the architecture wrong early means exponential pain later.',
      },
      {
        type: 'heading',
        content: 'Why MVC + Service Layer?',
      },
      {
        type: 'paragraph',
        content: 'Pure MVC works for simple CRUD apps, but casino games are business-logic-heavy. A controller that directly handles blackjack hand evaluation, bet validation, chip ledger updates, and database writes would be impossible to test and maintain. The Service Layer pattern solves this by placing all business logic in dedicated service classes that controllers merely orchestrate.',
      },
      {
        type: 'bullets',
        items: [
          'Controllers: handle HTTP request/response, validate input shape, call service methods',
          'Services: encapsulate game logic, chip transactions, win/loss calculations — no HTTP concerns',
          'Models: ORM-style data access only — no business logic lives here',
          'Routes: thin wiring layer, middleware application',
        ],
      },
      {
        type: 'paragraph',
        content: 'This separation is what made 67 unit tests viable. Each service method is a pure function of its inputs — no HTTP context, no database calls (mocked) — which means tests are fast, isolated, and reliable. A blackjack `evaluateHand()` function just takes cards and returns a result; it doesn\'t care about Express or MySQL.',
      },
      {
        type: 'heading',
        content: 'Testing Strategy',
      },
      {
        type: 'paragraph',
        content: 'The test suite focuses on the game engine — the highest-risk code where a bug means players win or lose unfairly. Edge cases like blackjack natural wins, split aces, dealer soft-17 rules, and bust conditions are each covered by dedicated test cases.',
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// Example: testing blackjack bust detection
describe('BlackjackService.evaluateHand', () => {
  it('should detect player bust when hand value exceeds 21', () => {
    const hand = [
      { suit: 'hearts', value: 'K' },   // 10
      { suit: 'clubs',  value: '9' },   // 9
      { suit: 'spades', value: '5' },   // 5  → total: 24
    ];
    const result = BlackjackService.evaluateHand(hand);
    expect(result.total).toBe(24);
    expect(result.bust).toBe(true);
  });
});`,
      },
      {
        type: 'heading',
        content: 'The 6-Theme Frontend System',
      },
      {
        type: 'paragraph',
        content: 'Rather than building six separate UIs, I implemented a CSS custom property system where a single theme class on the `<body>` element cascades through the entire UI. Each theme defines overrides for background, card felt color, chip palette, and accent highlights. JavaScript theme-switching updates the class and persists the preference in localStorage.',
      },
      {
        type: 'paragraph',
        content: 'Chart.js powers the analytics dashboard, showing chip balance history, win/loss trends, and game-specific stats. The charts dynamically re-color their datasets when the theme changes by reading the current CSS custom property values.',
      },
      {
        type: 'callout',
        content: 'Takeaway: When building a complex application, invest in architecture before features. The Service Layer decision made testing straightforward and new game implementations (roulette, craps) easy to add without touching existing game code.',
      },
    ],
  },
  {
    slug: 'powershell-it-automation',
    title: 'PowerShell IT Automation: Building a 9-Module Healthcare Toolkit',
    excerpt: 'How structured PowerShell automation reduced repetitive IT tasks at a healthcare organization, from Active Directory management to device provisioning.',
    date: '2025-07-22',
    readTime: 5,
    category: 'IT & Automation',
    tags: ['PowerShell', 'Active Directory', 'IT Automation', 'Windows', 'Healthcare'],
    projectSlug: 'hc-it-toolkit',
    sections: [
      {
        type: 'paragraph',
        content: 'Healthcare IT environments have a particular set of challenges: strict compliance requirements, a mix of legacy and modern systems, high turnover in clinical roles, and an IT team that\'s constantly stretched thin. Repetitive tasks — onboarding new hires, resetting passwords, provisioning devices, managing licenses — consume hours that should go toward higher-value work.',
      },
      {
        type: 'paragraph',
        content: 'The HC Systems Toolkit v2.0.0 is a PowerShell-based automation suite I built and maintained that addresses exactly these pain points. What started as a few one-off scripts grew into a structured, menu-driven toolset spanning 9 modules.',
      },
      {
        type: 'heading',
        content: 'Module Breakdown',
      },
      {
        type: 'bullets',
        items: [
          'User Lifecycle: AD account creation, modification, and offboarding with automated group assignment',
          'Password Management: bulk resets, expiry reporting, and self-service unlock workflows',
          'Device Provisioning: workstation naming convention enforcement, domain join automation',
          'License Auditing: Microsoft 365 license inventory and unused-seat reporting',
          'VPN Diagnostics: automated connectivity tests and certificate validation checks',
          'Software Deployment: silent installs via scheduled tasks with rollback capability',
          'Group Policy Audit: drift detection comparing policy states across OUs',
          'Network Utilities: port scanning, DNS resolution testing, share connectivity checks',
          'Reporting: scheduled HTML reports for management on account status and license utilization',
        ],
      },
      {
        type: 'heading',
        content: 'Design Decisions',
      },
      {
        type: 'paragraph',
        content: 'The toolkit uses a central menu launcher (`Launch-Toolkit.ps1`) that imports modules on demand. This keeps startup time fast — you don\'t load the device provisioning module if you\'re just doing a password reset. Each module exports a single entry-point function that handles its own input validation and error handling.',
      },
      {
        type: 'code',
        language: 'powershell',
        content: `# Module entry pattern used across all 9 modules
function Invoke-UserLifecycle {
    param(
        [ValidateSet('Create','Modify','Offboard')]
        [string]$Action,
        [string]$SamAccountName
    )
    
    # Validate AD connectivity before proceeding
    if (-not (Test-ADConnection)) {
        Write-Error "Cannot reach domain controller. Check network connectivity."
        return
    }
    
    switch ($Action) {
        'Create'    { New-ManagedADUser -SamAccountName $SamAccountName }
        'Modify'    { Set-ManagedADUser -SamAccountName $SamAccountName }
        'Offboard'  { Remove-ManagedADUser -SamAccountName $SamAccountName }
    }
}`,
      },
      {
        type: 'heading',
        content: 'Working in a Regulated Environment',
      },
      {
        type: 'paragraph',
        content: 'Healthcare IT adds compliance constraints that general IT environments don\'t have. HIPAA requires audit trails for account access changes. Every automation that touches user accounts logs the operator, timestamp, action taken, and before/after state to a centralized log share. This also proved invaluable during internal audits — instead of manually reconstructing change history, we could query the logs directly.',
      },
      {
        type: 'callout',
        content: 'Takeaway: Good automation isn\'t just about saving time — it\'s about consistency and auditability. A manual process done correctly 95% of the time is a liability. Automation done correctly 100% of the time (with proper error handling) is an asset.',
      },
    ],
  },
  {
    slug: 'construction-analytics-power-bi',
    title: 'Building an Executive Power BI Dashboard for Construction Portfolio Management',
    excerpt: 'How I designed a two-page Power BI dashboard — with a custom DAX health scoring model — to give construction executives real-time visibility into portfolio KPIs.',
    date: '2025-08-10',
    readTime: 5,
    category: 'Data Engineering',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'Power Query', 'Excel'],
    projectSlug: 'construction-analytics',
    sections: [
      {
        type: 'paragraph',
        content: 'Construction project portfolios generate data constantly — budgets, actual costs, schedules, subcontractor status — but that data is almost always scattered across spreadsheets, project management tools, and email threads. Executives end up making decisions based on incomplete, stale information. The goal of this project was to change that.',
      },
      {
        type: 'heading',
        content: 'The Reporting Gap in Construction',
      },
      {
        type: 'paragraph',
        content: 'Most construction companies have the data. What they lack is a consistent, trustworthy way to surface it. A portfolio manager shouldn\'t need to manually compile a status report every Monday morning — that process introduces errors, takes time, and produces a snapshot that\'s already outdated by the time it\'s reviewed.',
      },
      {
        type: 'paragraph',
        content: 'The dashboard I built addresses this with two pages: an executive KPI overview and a project-level detail drilldown. The executive page gives leadership the 10,000-foot view — portfolio revenue, cost variance, and margin — while the detail page lets project managers drill into individual project health, schedule status, and cost breakdown.',
      },
      {
        type: 'heading',
        content: 'Data Modeling: Why Star Schema Matters',
      },
      {
        type: 'paragraph',
        content: 'Power BI performance lives and dies by the data model. A flat, denormalized table might seem simpler at first, but it leads to slow DAX calculations, ambiguous relationships, and reports that take seconds to filter. The star schema approach — a central fact table surrounded by dimension tables — solves all of this.',
      },
      {
        type: 'bullets',
        items: [
          'Fact table: one row per project-month with budget, actual cost, and variance figures',
          'Project dimension: project name, category, region, project manager, start/end dates',
          'Time dimension: full calendar table enabling YoY, MoM, and quarter comparisons',
          'Category dimension: project type, trade, and subcontractor classification',
        ],
      },
      {
        type: 'paragraph',
        content: 'Power Query handled the data preparation: merging budget and actuals from separate Excel tabs, standardizing column names, casting date fields, and computing derived columns like cost variance percentage and days remaining. Keeping transformation logic in Power Query (M code) rather than DAX keeps the model clean and the queries fast.',
      },
      {
        type: 'heading',
        content: 'The DAX Health Scoring Model',
      },
      {
        type: 'paragraph',
        content: 'The most technically interesting part of this project was designing the project health score — a single number from 0–100 that reflects the overall status of a project. The challenge is that "health" is multidimensional: a project can be on budget but behind schedule, or ahead of schedule with a cost overrun. A naive average of these factors obscures critical signals.',
      },
      {
        type: 'code',
        language: 'text',
        content: `-- Weighted DAX health score (simplified)
Project Health Score =
VAR CostScore =
    SWITCH(
        TRUE(),
        [Cost Variance %] >= 0,          100,  -- under or on budget
        [Cost Variance %] >= -0.05,       80,  -- within 5% over
        [Cost Variance %] >= -0.10,       60,  -- within 10% over
        [Cost Variance %] >= -0.20,       40,  -- within 20% over
        20                                     -- >20% over budget
    )
VAR ScheduleScore =
    SWITCH(
        TRUE(),
        [Days Behind Schedule] <= 0,     100,
        [Days Behind Schedule] <= 7,      75,
        [Days Behind Schedule] <= 14,     50,
        25
    )
RETURN
    CostScore * 0.6 + ScheduleScore * 0.4`,
      },
      {
        type: 'paragraph',
        content: 'Cost variance carries 60% of the weight because budget overruns directly impact project profitability and client contracts. Schedule score carries 40%. The resulting score populates a KPI card with conditional formatting — green above 80, amber 60–80, red below 60 — giving leadership instant visual triage across the portfolio.',
      },
      {
        type: 'heading',
        content: 'Visual Design for Executive Audiences',
      },
      {
        type: 'paragraph',
        content: 'Executive dashboards fail for the same reason most reports fail: too much information, not enough hierarchy. The rule I followed was that the most important number on each page should be readable in under two seconds. KPI cards sit at the top with large typography. Supporting charts — cost trend lines, margin by category, project health scatter — fill the lower half.',
      },
      {
        type: 'bullets',
        items: [
          'KPI cards: portfolio revenue, total cost, gross margin, project count — top row',
          'Trend chart: monthly revenue and cost actuals vs. budget over rolling 12 months',
          'Category breakdown: margin by project type as a horizontal bar chart',
          'Health matrix: scatter plot of cost variance vs. schedule variance, colored by health score',
          'Slicers: region, project manager, project category — all cross-filter every visual',
        ],
      },
      {
        type: 'callout',
        content: 'Takeaway: A Power BI dashboard is only as good as its data model. Spend the extra time on star schema design and Power Query transformations up front — it pays dividends in every DAX measure you write afterward.',
      },
    ],
  },
  {
    slug: 'robotics-ecommerce-full-stack',
    title: 'Building a Full-Stack E-Commerce App: JWT Auth, MySQL, and Secure Admin Flows',
    excerpt: 'A walkthrough of the architecture decisions behind a Node.js + Express e-commerce platform — covering JWT authentication, bcryptjs security, MySQL schema design, and atomic checkout.',
    date: '2025-06-05',
    readTime: 6,
    category: 'Software Development',
    tags: ['Node.js', 'Express.js', 'MySQL', 'JWT', 'bcryptjs', 'REST APIs'],
    projectSlug: 'robotics-ecommerce',
    sections: [
      {
        type: 'paragraph',
        content: 'Building an e-commerce application from scratch is one of the best exercises in full-stack engineering. You\'re integrating authentication, a product catalog, a relational database, a shopping cart, order management, and an admin layer — all of which have to work together reliably. The Robotics E-Commerce project was my implementation of that full problem.',
      },
      {
        type: 'heading',
        content: 'Architecture Overview',
      },
      {
        type: 'paragraph',
        content: 'The application is a multi-tier web app: HTML/CSS/JavaScript frontend (no framework, which was intentional — I wanted to understand the fundamentals without abstraction), a Node.js + Express REST API backend, and a MySQL relational database. The 69% JavaScript / 16% CSS / 13% HTML split reflects a fairly rich frontend interaction layer.',
      },
      {
        type: 'bullets',
        items: [
          'Frontend: vanilla JS with fetch-based API calls, localStorage for cart state, dynamic DOM updates',
          'Backend: Express REST API under /server — routes, middleware, controllers, and db layer',
          'Database: MySQL with normalized schema — users, products, orders, order_items, reviews',
          'Auth: JWT tokens for customers, ADMIN_PASSWORD env var for admin routes',
          'Dev setup: npm run db:init and db:seed for reproducible environments',
        ],
      },
      {
        type: 'heading',
        content: 'JWT Authentication Design',
      },
      {
        type: 'paragraph',
        content: 'JWT was the right choice for customer authentication here: stateless, easy to validate on every route, and simple to implement without a session store. When a customer logs in, the API signs a token with JWT_SECRET (from .env) and returns it to the client, which stores it in localStorage and sends it as an Authorization header on subsequent requests.',
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// Auth middleware — applied to all protected routes
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;    // { id, email, username }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };`,
      },
      {
        type: 'paragraph',
        content: 'Passwords are hashed with bcryptjs before storage — bcrypt\'s cost factor default (10 rounds) provides strong resistance to brute-force attacks while keeping login response times acceptable. The admin interface uses a simpler approach: a request header value is compared against ADMIN_PASSWORD from the environment. This avoids the complexity of a separate admin account system for a project of this scope.',
      },
      {
        type: 'heading',
        content: 'MySQL Schema and Atomic Checkout',
      },
      {
        type: 'paragraph',
        content: 'The schema design was driven by two requirements: support all customer workflows (browse, review, cart, order) and ensure checkout is atomic — meaning inventory is decremented and the order is recorded in the same transaction, or neither happens.',
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// Atomic checkout transaction
async function placeOrder(userId, cartItems, connection) {
  await connection.beginTransaction();
  try {
    // 1. Insert order record
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
      [userId, calculateTotal(cartItems), 'pending']
    );
    const orderId = orderResult.insertId;

    // 2. Insert order line items + decrement stock
    for (const item of cartItems) {
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, item.price]
      );
      await connection.execute(
        'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
        [item.quantity, item.productId, item.quantity]
      );
    }

    await connection.commit();
    return orderId;
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}`,
      },
      {
        type: 'paragraph',
        content: 'The stock decrement uses a conditional `WHERE stock >= quantity` to prevent overselling — if stock is insufficient for any item, the UPDATE affects 0 rows and the application rolls back the entire transaction. This prevents the classic race condition where two simultaneous orders both succeed against the same inventory.',
      },
      {
        type: 'heading',
        content: 'Reproducible Dev Environment',
      },
      {
        type: 'paragraph',
        content: 'One of the most practical decisions was investing in proper db:init and db:seed scripts. Any developer can clone the repo, run `npm run db:init` to create the schema and `npm run db:seed` to populate test data, and have a fully functional local instance in under a minute. Start-local.ps1 / Stop-local.ps1 PowerShell scripts handle the MySQL service and Node server together.',
      },
      {
        type: 'callout',
        content: 'Takeaway: Atomic database transactions aren\'t optional in e-commerce — they\'re the boundary between a trustworthy application and one that silently corrupts data under load. Design for transaction safety from the start, not as an afterthought.',
      },
    ],
  },
  {
    slug: 'stratforge-ai-cs2-tactics',
    title: 'StratForge AI: Building a Real-Time CS2 Tactical Intelligence Platform',
    excerpt: 'How I built a Next.js platform that encodes professional Counter-Strike 2 strategy as deterministic game-state analysis — including radar map callout overlays, economy prediction, and Prisma-backed team profiles.',
    date: '2025-12-01',
    readTime: 7,
    category: 'Software Development',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'CS2', 'AI/Logic', 'Vercel'],
    projectSlug: 'stratforge-ai',
    sections: [
      {
        type: 'paragraph',
        content: 'Professional Counter-Strike 2 strategy is deep, structured knowledge — but it exists almost entirely in coach VOD reviews, Discord servers, and player intuition. There\'s no queryable, real-time format for "given that I\'m on CT side, it\'s a force buy, and we\'re playing Mirage A site, what is the optimal setup?" StratForge AI is my answer to that question.',
      },
      {
        type: 'heading',
        content: 'Why Deterministic Logic, Not a Machine Learning Model',
      },
      {
        type: 'paragraph',
        content: 'The first architectural decision was the most important: how does the recommendation engine actually work? The obvious answer is "train a model on pro match data." The practical answer is that labeled professional match data at the granularity needed (round phase, buy state, exact positions, team composition, time remaining) is expensive to acquire, and an ML model without it would produce generic, untrustworthy recommendations.',
      },
      {
        type: 'paragraph',
        content: 'Deterministic rule-based logic was the right call for v1. Professional CS2 strategy is already codified — the fundamentals of T-side default executes, CT holding positions, eco round behavior, and pistol round aggression are well-understood. Encoding these as explicit decision trees produces reliable, explainable recommendations that players can trust and understand.',
      },
      {
        type: 'bullets',
        items: [
          'Game state inputs: map, side (CT/T), round phase (pistol/eco/force/full buy), time remaining',
          'Economy engine: tracks team and individual buy states, predicts opponent economy',
          'Strategy engine: matches game state to optimal strategy from a curated tactic library',
          'Adaptive layer: weights strategy suggestions based on round history and win/loss patterns',
        ],
      },
      {
        type: 'heading',
        content: 'Radar Map Callout Overlays',
      },
      {
        type: 'paragraph',
        content: 'One of the most technically challenging features was rendering accurate callout zones on CS2 radar maps. The problem: CS2 radar images are 1024×1024 PNG files, but the in-game world coordinates are on a completely different scale and origin. Simply overlaying a callout div at "A site coordinates" doesn\'t work — you need to remap world coordinates to pixel coordinates using the map-specific scale and translation values.',
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Mirage coordinate remapping (pos_x, pos_y, scale from radar.txt)
const MIRAGE_MAP_CONFIG = {
  pos_x: -3230,
  pos_y: 1713,
  scale: 5.00,
};

function worldToRadar(
  worldX: number,
  worldY: number,
  config: MapConfig,
  imageSize = 1024
): { x: number; y: number } {
  const x = (worldX - config.pos_x) / config.scale;
  const y = (config.pos_y - worldY) / config.scale;
  // Clamp to image bounds
  return {
    x: Math.max(0, Math.min(imageSize, x)),
    y: Math.max(0, Math.min(imageSize, y)),
  };
}`,
      },
      {
        type: 'paragraph',
        content: 'Each major map has a config object pulled from the game files containing the radar origin (pos_x, pos_y) and scale factor. Once the remapping function was accurate, I manually verified each callout zone by cross-referencing in-game screenshots against the computed overlay positions. The precision matters — a misaligned callout zone that puts "A ramp" on the wrong pixel is worse than no overlay at all.',
      },
      {
        type: 'heading',
        content: 'Data Model and Team Profiles',
      },
      {
        type: 'paragraph',
        content: 'Team profiles are backed by Prisma ORM with a PostgreSQL-compatible schema. The model tracks team composition, preferred strategies per map, round history, and win/loss records. Prisma\'s type-safe client made the database layer a joy to work with — zero runtime type errors from database queries because the TypeScript types are generated directly from the schema.',
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Prisma schema excerpt
model Team {
  id          String   @id @default(cuid())
  name        String
  createdAt   DateTime @default(now())
  rounds      Round[]
  preferences MapPreference[]
}

model Round {
  id         String     @id @default(cuid())
  teamId     String
  map        String
  side       Side       // CT | T
  buyState   BuyState   // FULL | FORCE | ECO | PISTOL
  outcome    Outcome    // WIN | LOSS
  stratUsed  String?
  timestamp  DateTime   @default(now())
  team       Team       @relation(fields: [teamId], references: [id])
}`,
      },
      {
        type: 'heading',
        content: 'Testing and Deployment',
      },
      {
        type: 'paragraph',
        content: 'Vitest covers the round outcome workflow — the highest-stakes code path where a bug would corrupt team history. Tests verify that round records are correctly persisted, win/loss counts update properly, and the adaptive recommendation weights shift appropriately after a sequence of round outcomes. The suite runs in milliseconds due to Vitest\'s native ESM support and Prisma mock injection.',
      },
      {
        type: 'paragraph',
        content: 'Deployment on Vercel is automatic on push to main. The live application is at strat-forge-ai.vercel.app — the full stack runs on Vercel\'s serverless infrastructure with a managed Postgres database. Cold start times are acceptable for a tactical intelligence tool; this isn\'t a latency-critical real-time system.',
      },
      {
        type: 'callout',
        content: 'Takeaway: Domain-specific applications benefit enormously from encoding expert knowledge explicitly before reaching for ML. Deterministic logic is debuggable, explainable, and trustworthy in ways that a black-box model isn\'t — and for CS2 tactics, those properties matter.',
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
