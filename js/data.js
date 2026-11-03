/* =========================================================================
   PORTFOLIO CONTENT — edit this file to update the site.
   Everything visible in Projects, Dashboards and Experience comes from here.
   See README.md for step-by-step instructions.
   ========================================================================= */

window.PORTFOLIO = {

  /* ---------------------------------------------------------------- PROJECTS
     type: "Entrepreneurial project" | "Personal project" | "Academic project"
     links: [{ label, url }]  — external links open in a new tab            */
  projects: [
    {
      id: "le-pont-etudiant",
      name: "Le Pont Étudiant",
      type: "Entrepreneurial project",
      tagline: "Digital platform for French-speaking African students",
      description:
        "A digital platform supporting French-speaking African students who want to pursue higher education in France — from orientation to the application journey.",
      focus: [
        "Digital project management of the platform",
        "SEO and acquisition strategy to reach prospective students",
        "Privacy-friendly traffic tracking with Plausible Analytics",
        "User-journey work aimed at conversion optimization"
      ],
      skills: ["Digital Project Management", "Digital Marketing", "SEO", "Customer Acquisition", "Web Analytics", "Plausible Analytics", "Conversion Optimization"],
      links: [{ label: "Visit website", url: "https://le-pont-etudiant.fr/" }],
      accent: "cyan"
    },
    {
      id: "summit-capital-filter",
      name: "Summit Capital Filter",
      type: "Entrepreneurial project",
      tagline: "Scoring & certification of African investment projects",
      description:
        "A qualification and certification platform for African projects in renewable energy, mining and agriculture. Applications are assessed by an ATS-style scoring engine built on 9 pillars and 15 blocking criteria.",
      focus: [
        "Designed the scoring model: 9 assessment pillars",
        "Defined 15 blocking (knock-out) criteria",
        "Structured project data so applications can be compared",
        "Automated the qualification workflow"
      ],
      skills: ["Algorithmic Scoring", "Data Analysis", "Data Structuring", "Process Automation", "Product Management", "Investment Readiness"],
      links: [{ label: "Visit website", url: "https://summitcapitalfilter.netlify.app/" }],
      accent: "blue"
    },
    {
      id: "akonta-databridge",
      name: "Akonta — DataBridge",
      type: "Personal project",
      tagline: "Simple business analytics for small African retailers",
      description:
        "A digital solution for small African shopkeepers: track sales, receivables and stock, and understand profitability through simple, accessible indicators.",
      focus: [
        "Sales tracking and receivables (credit) management",
        "Stock monitoring",
        "Profitability analysis with plain-language KPIs",
        "Indicators kept simple for non-specialist users"
      ],
      skills: ["Data Analytics", "Business Intelligence", "Data Management", "Product Design", "Digital Transformation"],
      links: [{ label: "Visit website", url: "https://akonta.netlify.app/" }],
      accent: "violet"
    }
  ],

  /* -------------------------------------------------------------- DASHBOARDS
     Each dashboard card can show ONE of these previews:
       demo:  "sales" | "marketing"          → built-in interactive demo (fictitious data)
       image: "assets/dashboards/file.png"   → your screenshot
     Optional live links: tableauPublicUrl, powerBiUrl, embedUrl (iframe)
     dataStatus: "Fictitious data" | "Anonymized data" | "Reconstructed from public data" | "Real data (authorized)"
  */
  dashboards: [
    {
      id: "pbi-commercial-performance",
      title: "Commercial Performance Dashboard",
      tool: "Power BI",
      dataStatus: "Fictitious data",
      demo: "sales",
      image: null,
      tableauPublicUrl: null,
      powerBiUrl: null,
      embedUrl: null,
      problem:
        "A sales manager needs a single view to follow revenue, order volume and basket value month by month, and to spot under-performing regions or product lines early.",
      data:
        "Fictitious dataset generated for demonstration: 12 months of orders (date, region, product category, amount). No real company data.",
      kpis: ["Revenue", "Number of orders", "Average order value (AOV)", "Monthly revenue trend", "Revenue vs target", "Sales by category"],
      insights: [
        "Track AOV next to order count: revenue growth driven only by volume can hide shrinking baskets.",
        "Compare each month to its target rather than to the previous month to account for seasonality.",
        "Drill into the weakest category first — that's where a commercial action has the most leverage."
      ]
    },
    {
      id: "tableau-customer-marketing",
      title: "Customer & Marketing Analytics Dashboard",
      tool: "Tableau",
      dataStatus: "Fictitious data",
      demo: "marketing",
      image: null,
      tableauPublicUrl: null,
      powerBiUrl: null,
      embedUrl: null,
      problem:
        "A marketing team wants to know which acquisition channels bring visitors who actually convert into leads, to reallocate effort and budget.",
      data:
        "Fictitious dataset generated for demonstration: website sessions, leads and conversions by channel and by week. No real company data.",
      kpis: ["Website visitors", "Leads generated", "Conversion rate", "Acquisition channels", "Customer segments", "Funnel performance"],
      insights: [
        "Rank channels by conversion rate, not by traffic: the biggest source of visitors is rarely the best source of leads.",
        "Watch the visit → lead step of the funnel; it is usually where landing-page work pays off fastest.",
        "Segment leads by profile to tailor CRM follow-up sequences."
      ]
    }
  ],

  /* ------------------------------------------------- MARKETING OPERATIONS
     Cards shown in the "Marketing Ops" section (below the Dashboards gallery).
     icon: search | ads | console | plausible | tracking | crm
     usedOn: optional list of project names where this was applied        */
  marketingOps: [
    {
      icon: "search",
      title: "SEO Optimization",
      text: "Technical, on-page and local SEO: making sure pages are crawlable, well structured and match what people actually search for.",
      tasks: ["Keyword research & search intent", "On-page: titles, meta, headings, internal links", "Technical audit: indexing, speed, sitemap, structured data", "Local SEO & Google Business Profile"],
      tools: ["Google Search Console", "PageSpeed Insights", "Schema.org"],
      usedOn: ["Le Pont Étudiant"]
    },
    {
      icon: "ads",
      title: "SEA — Paid Search",
      text: "Structuring paid search campaigns so every euro can be traced back to a lead or a conversion.",
      tasks: ["Campaign & ad-group structure", "Keyword selection and negative keywords", "Ad copy and landing-page alignment", "Conversion tracking and cost-per-lead follow-up"],
      tools: ["Google Ads", "Keyword Planner"]
    },
    {
      icon: "console",
      title: "Google Search Analytics",
      text: "Reading search performance data to find quick wins: pages that rank but don't get clicked, queries that deserve their own content.",
      tasks: ["Clicks, impressions, CTR and average position", "Query & page analysis to spot opportunities", "Indexing and coverage monitoring", "SEO reporting for stakeholders"],
      tools: ["Google Search Console", "Google Analytics 4", "Looker Studio"]
    },
    {
      icon: "plausible",
      title: "Web Analytics",
      text: "Measuring where visitors come from and what they do — with Google Analytics, or cookie-less and GDPR-friendly with Plausible.",
      tasks: ["Traffic sources & referrers", "Goals, conversions and custom events", "Top pages and entry points", "Audience dashboards for the team"],
      tools: ["Google Analytics 4", "Plausible Analytics"],
      usedOn: ["Le Pont Étudiant"]
    },
    {
      icon: "tracking",
      title: "Tracking & Attribution",
      text: "Clean campaign tagging and event tracking, so acquisition channels can be compared on the same basis.",
      tasks: ["UTM naming conventions", "Event & conversion tracking plan", "Tag management", "Channel attribution reporting"],
      tools: ["UTM", "Google Tag Manager", "GA4"]
    },
    {
      icon: "crm",
      title: "CRM & Conversion Optimization",
      text: "Turning visitors into qualified leads, then into customers — and using data to personalise each step.",
      tasks: ["Funnel analysis (visit → lead → customer)", "Landing-page and form optimisation", "Segmentation and lead scoring", "CRM data quality and enrichment"],
      tools: ["CRM", "SQL", "Power BI"]
    },
    {
      icon: "shop",
      title: "E-commerce Platforms",
      text: "Running the marketing side of online shops: product pages, catalogue data and the sales funnel from visit to order.",
      tasks: ["Product page and catalogue optimisation", "E-commerce tracking (orders, basket, revenue)", "Checkout funnel analysis", "Promotions and campaign follow-up"],
      tools: ["Shopify", "PrestaShop", "Google Analytics 4"]
    },
    {
      icon: "ux",
      title: "UX Research & Testing",
      text: "Understanding users before changing a page, then testing changes instead of guessing.",
      tasks: ["User interviews and journey mapping", "Usability reviews of key pages", "A/A tests to validate the testing setup", "A/B tests on pages, forms and messages"],
      tools: ["UX Research", "A/A Testing", "A/B Testing"]
    }
  ],

  /* -------------------------------------------------------------- EXPERIENCE */
  experience: [
    {
      role: "Data Analyst & Marketing Operations Consultant",
      company: "Freelance",
      period: "Jan 2026 – Present",
      current: true,
      missions: [
        "SQL queries on PostgreSQL databases",
        "Database exploitation and data extraction",
        "Power BI dashboard creation",
        "Enrichment of customer and prospect databases",
        "Data cleaning, normalization and deduplication"
      ],
      tags: ["SQL", "PostgreSQL", "Power BI", "Data Quality"]
    },
    {
      role: "Data Analysis & CRM",
      company: "Danone",
      period: "Jun 2025 – Dec 2025",
      missions: [
        "Querying databases",
        "Information extraction",
        "Customer data analysis",
        "Personalization of CRM offers"
      ],
      tags: ["CRM", "Customer Analytics", "SQL"]
    },
    {
      role: "Data Management Analyst",
      company: "Keyrus",
      period: "Jul 2024 – Oct 2024",
      missions: [
        "Relational data modeling",
        "Database creation and maintenance",
        "SQL",
        "Dashboard design for data-driven marketing"
      ],
      tags: ["Data Modeling", "SQL", "Dashboards"]
    },
    {
      role: "Sales Support Assistant",
      company: "La Poste Groupe",
      period: "Apr 2023 – Jul 2023",
      missions: [
        "Administrative and logistics support",
        "Supporting the sales team",
        "Customer journey"
      ],
      tags: ["Sales Support", "Customer Journey"]
    }
  ]
};
