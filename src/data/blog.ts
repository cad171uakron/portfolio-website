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
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
