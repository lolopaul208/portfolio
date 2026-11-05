/* =========================================================================
   PORTFOLIO CONTENT: edit this file to update the site.
   Everything visible in Projects, Dashboards, Marketing Ops and Experience
   comes from here. See README.md for step-by-step instructions.

   LANGUAGES: each item is written in English (default). Its `fr: { ... }`
   block holds the French version of the text fields; any field missing
   from `fr` stays in English. Tool names, links and ids are shared.
   ========================================================================= */

window.PORTFOLIO = {

  /* ---------------------------------------------------------------- PROJECTS
     type: "Entrepreneurial project" | "Personal project" | "Academic project"
     links: [{ label, url }] , external links open in a new tab            */
  projects: [
    {
      id: "le-pont-etudiant",
      name: "Le Pont Étudiant",
      type: "Entrepreneurial project",
      tagline: "Digital platform for French-speaking African students",
      description:
        "A digital platform supporting French-speaking African students who want to pursue higher education in France, from orientation to the application journey.",
      focus: [
        "Digital project management of the platform",
        "SEO and acquisition strategy to reach prospective students",
        "Privacy-friendly traffic tracking with Plausible Analytics",
        "User-journey work aimed at conversion optimization"
      ],
      skills: ["Digital Project Management", "Digital Marketing", "SEO", "Customer Acquisition", "Web Analytics", "Plausible Analytics", "Conversion Optimization"],
      links: [{ label: "Visit website", url: "https://le-pont-etudiant.fr/" }],
      accent: "cyan",
      fr: {
        type: "Projet entrepreneurial",
        tagline: "Plateforme digitale pour les étudiants africains francophones",
        description:
          "Une plateforme digitale qui accompagne les étudiants africains francophones souhaitant poursuivre leurs études en France, de l'orientation jusqu'à la candidature.",
        focus: [
          "Gestion de projet digital de la plateforme",
          "Stratégie SEO et d'acquisition pour toucher les futurs étudiants",
          "Mesure d'audience respectueuse de la vie privée avec Plausible Analytics",
          "Travail sur le parcours utilisateur pour optimiser la conversion"
        ],
        skills: ["Gestion de projet digital", "Marketing digital", "SEO", "Acquisition client", "Web analytics", "Plausible Analytics", "Optimisation de la conversion"],
        links: [{ label: "Voir le site", url: "https://le-pont-etudiant.fr/" }]
      }
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
      accent: "blue",
      fr: {
        type: "Projet entrepreneurial",
        tagline: "Notation et certification de projets d'investissement africains",
        description:
          "Une plateforme de qualification et de certification de projets africains dans les énergies renouvelables, les mines et l'agriculture. Les dossiers sont évalués par un moteur de notation de type ATS reposant sur 9 piliers et 15 critères bloquants.",
        focus: [
          "Conception du modèle de notation : 9 piliers d'évaluation",
          "Définition de 15 critères bloquants (éliminatoires)",
          "Structuration des données des projets pour comparer les dossiers",
          "Automatisation du processus de qualification"
        ],
        skills: ["Scoring algorithmique", "Analyse de données", "Structuration de données", "Automatisation de processus", "Product Management", "Investment readiness"],
        links: [{ label: "Voir le site", url: "https://summitcapitalfilter.netlify.app/" }]
      }
    },
    {
      id: "akonta-databridge",
      name: "Akonta (DataBridge)",
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
      accent: "violet",
      fr: {
        type: "Projet personnel",
        tagline: "Des indicateurs simples pour les petits commerçants africains",
        description:
          "Une solution numérique pour les petits commerçants africains : suivre les ventes, les créances et les stocks, et comprendre la rentabilité grâce à des indicateurs simples et accessibles.",
        focus: [
          "Suivi des ventes et gestion des créances (crédit client)",
          "Suivi des stocks",
          "Analyse de rentabilité avec des KPI en langage simple",
          "Des indicateurs pensés pour des utilisateurs non spécialistes"
        ],
        skills: ["Data analytics", "Business Intelligence", "Gestion des données", "Product design", "Transformation digitale"],
        links: [{ label: "Voir le site", url: "https://akonta.netlify.app/" }]
      }
    }
  ],

  /* -------------------------------------------------------------- DASHBOARDS
     Each dashboard card can show ONE of these previews:
       demo:  "sales" | "marketing" | "zomato" → built-in interactive demo
       image: "assets/dashboards/file.png"   → your screenshot
     Optional live links: tableauPublicUrl, powerBiUrl, embedUrl (iframe)
     dataStatus (keep the English value, it is translated automatically):
       "Fictitious data" | "Anonymized data" | "Public data (Kaggle)" | "Reconstructed from public data" | "Real data (authorized)"
     Optional: githubUrl (link to the code / notebook)
  */
  dashboards: [
    {
      id: "zomato-delhi-ratings",
      title: "What Drives a Restaurant's Rating? Zomato, Delhi NCR",
      tool: "Python",
      dataStatus: "Public data (Kaggle)",
      demo: "zomato",
      image: null,
      githubUrl: "https://github.com/lolopaul208/zomato-Note-restaurant-",
      tableauPublicUrl: null,
      powerBiUrl: null,
      embedUrl: null,
      problem:
        "For a restaurant owner, an investor or Zomato's sales team: which factors (price, cuisine, location, online delivery, table booking) go with a better rating and more visibility?",
      data:
        "Kaggle Zomato Restaurant Dataset (9,551 restaurants, 15 countries). Scope: Delhi NCR, 7,947 restaurants, 5,808 rated. Cleaned in Python: a rating of 0 means 'not rated' (< 4 votes) and was set to missing, keeping it would drag the average from 3.28 to 2.40.",
      kpis: ["Average rating & share rated 4+", "Share of restaurants with no rating", "Rating by price range", "Online delivery & table booking at equal price", "Price-adjusted rating by cuisine", "Best and worst localities"],
      insights: [
        "Rating rises with price: 3.18 for budget restaurants vs 3.65 for fine dining. Compare restaurants within a price range.",
        "40% of budget restaurants have no rating; 36% of restaurants without online delivery vs 4% with it. For small restaurants, delivery is first a visibility lever.",
        "Table booking seems to add +0.28 point, but the gap disappears within each price range: a confounding effect of price.",
        "Asian, Mexican, Mediterranean cuisines, cafés and desserts beat their price range; North Indian, Chinese and pizza lag behind."
      ],
      fr: {
        title: "Qu'est-ce qui fait la note d'un restaurant ? Zomato, Delhi NCR",
        problem:
          "Pour un restaurateur, un investisseur ou l'équipe commerciale de Zomato : quels facteurs (prix, cuisine, quartier, livraison en ligne, réservation de table) vont de pair avec une meilleure note et plus de visibilité ?",
        data:
          "Jeu de données Kaggle Zomato Restaurant Dataset (9 551 restaurants, 15 pays). Périmètre : Delhi NCR, 7 947 restaurants, dont 5 808 notés. Nettoyage en Python : une note de 0 signifie « non noté » (moins de 4 votes) et a été traitée comme manquante ; la garder ferait chuter la moyenne de 3,28 à 2,40.",
        kpis: ["Note moyenne et part notée 4+", "Part des restaurants sans note", "Note par gamme de prix", "Livraison en ligne et réservation à prix égal", "Note par cuisine, corrigée du prix", "Meilleurs et moins bons quartiers"],
        insights: [
          "La note augmente avec le prix : 3,18 pour les restaurants économiques contre 3,65 en gastronomique. Il faut comparer les restaurants au sein d'une même gamme de prix.",
          "40 % des restaurants économiques n'ont pas de note ; 36 % des restaurants sans livraison en ligne contre 4 % avec. Pour un petit restaurant, la livraison est d'abord un levier de visibilité.",
          "La réservation de table semble ajouter 0,28 point, mais l'écart disparaît à gamme de prix égale : c'est un effet de confusion lié au prix.",
          "Les cuisines asiatique, mexicaine et méditerranéenne, les cafés et les desserts font mieux que leur gamme de prix ; la cuisine nord-indienne, chinoise et la pizza font moins bien."
        ]
      }
    },
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
        "Drill into the weakest category first: that's where a commercial action has the most leverage."
      ],
      fr: {
        title: "Dashboard de performance commerciale",
        problem:
          "Un responsable commercial a besoin d'une vue unique pour suivre le chiffre d'affaires, le volume de commandes et le panier moyen mois par mois, et repérer tôt les régions ou gammes de produits en retrait.",
        data:
          "Jeu de données fictif créé pour la démonstration : 12 mois de commandes (date, région, catégorie de produit, montant). Aucune donnée d'entreprise réelle.",
        kpis: ["Chiffre d'affaires", "Nombre de commandes", "Panier moyen", "Évolution mensuelle du CA", "CA vs objectif", "Ventes par catégorie"],
        insights: [
          "Suivre le panier moyen à côté du nombre de commandes : une croissance portée uniquement par le volume peut cacher des paniers en baisse.",
          "Comparer chaque mois à son objectif plutôt qu'au mois précédent, pour tenir compte de la saisonnalité.",
          "Analyser d'abord la catégorie la plus faible : c'est là qu'une action commerciale a le plus d'effet."
        ]
      }
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
      ],
      fr: {
        title: "Dashboard d'analyse clients & marketing",
        problem:
          "Une équipe marketing veut savoir quels canaux d'acquisition amènent des visiteurs qui deviennent réellement des leads, pour réallouer ses efforts et son budget.",
        data:
          "Jeu de données fictif créé pour la démonstration : sessions du site, leads et conversions par canal et par semaine. Aucune donnée d'entreprise réelle.",
        kpis: ["Visiteurs du site", "Leads générés", "Taux de conversion", "Canaux d'acquisition", "Segments clients", "Performance de l'entonnoir"],
        insights: [
          "Classer les canaux par taux de conversion, pas par trafic : la plus grosse source de visiteurs est rarement la meilleure source de leads.",
          "Surveiller l'étape visite → lead de l'entonnoir : c'est souvent là que le travail sur les pages d'atterrissage paie le plus vite.",
          "Segmenter les leads par profil pour adapter les séquences de relance CRM."
        ]
      }
    }
  ],

  /* ------------------------------------------------- MARKETING OPERATIONS
     Cards shown in the "Marketing Ops" section (below the Dashboards gallery).
     icon: search | ads | console | plausible | tracking | crm | shop | ux
     usedOn: optional list of project names where this was applied        */
  marketingOps: [
    {
      icon: "search",
      title: "SEO Optimization",
      text: "Technical, on-page and local SEO: making sure pages are crawlable, well structured and match what people actually search for.",
      tasks: ["Keyword research & search intent", "On-page: titles, meta, headings, internal links", "Technical audit: indexing, speed, sitemap, structured data", "Local SEO & Google Business Profile"],
      tools: ["Google Search Console", "PageSpeed Insights", "Schema.org"],
      usedOn: ["Le Pont Étudiant"],
      fr: {
        title: "Optimisation SEO",
        text: "SEO technique, on-page et local : des pages explorables, bien structurées et alignées sur ce que les internautes recherchent vraiment.",
        tasks: ["Recherche de mots-clés et intention de recherche", "On-page : titres, balises meta, Hn, maillage interne", "Audit technique : indexation, vitesse, sitemap, données structurées", "SEO local et fiche Google Business Profile"]
      }
    },
    {
      icon: "ads",
      title: "SEA (Paid Search)",
      text: "Structuring paid search campaigns so every euro can be traced back to a lead or a conversion.",
      tasks: ["Campaign & ad-group structure", "Keyword selection and negative keywords", "Ad copy and landing-page alignment", "Conversion tracking and cost-per-lead follow-up"],
      tools: ["Google Ads", "Keyword Planner"],
      fr: {
        title: "SEA (référencement payant)",
        text: "Structurer les campagnes de référencement payant pour relier chaque euro dépensé à un lead ou à une conversion.",
        tasks: ["Structure des campagnes et groupes d'annonces", "Choix des mots-clés et mots-clés négatifs", "Cohérence entre annonces et pages d'atterrissage", "Suivi des conversions et du coût par lead"]
      }
    },
    {
      icon: "console",
      title: "Google Search Analytics",
      text: "Reading search performance data to find quick wins: pages that rank but don't get clicked, queries that deserve their own content.",
      tasks: ["Clicks, impressions, CTR and average position", "Query & page analysis to spot opportunities", "Indexing and coverage monitoring", "SEO reporting for stakeholders"],
      tools: ["Google Search Console", "Google Analytics 4", "Looker Studio"],
      fr: {
        text: "Analyser les performances de recherche pour trouver des gains rapides : pages bien positionnées mais peu cliquées, requêtes qui méritent leur propre contenu.",
        tasks: ["Clics, impressions, CTR et position moyenne", "Analyse des requêtes et des pages pour repérer les opportunités", "Suivi de l'indexation et de la couverture", "Reporting SEO pour les équipes"]
      }
    },
    {
      icon: "plausible",
      title: "Web Analytics",
      text: "Measuring where visitors come from and what they do, with Google Analytics, or cookie-less and GDPR-friendly with Plausible.",
      tasks: ["Traffic sources & referrers", "Goals, conversions and custom events", "Top pages and entry points", "Audience dashboards for the team"],
      tools: ["Google Analytics 4", "Plausible Analytics"],
      usedOn: ["Le Pont Étudiant"],
      fr: {
        text: "Mesurer d'où viennent les visiteurs et ce qu'ils font, avec Google Analytics, ou sans cookies et conforme au RGPD avec Plausible.",
        tasks: ["Sources de trafic et sites référents", "Objectifs, conversions et événements personnalisés", "Pages les plus vues et pages d'entrée", "Dashboards d'audience pour l'équipe"]
      }
    },
    {
      icon: "tracking",
      title: "Tracking & Attribution",
      text: "Clean campaign tagging and event tracking, so acquisition channels can be compared on the same basis.",
      tasks: ["UTM naming conventions", "Event & conversion tracking plan", "Tag management", "Channel attribution reporting"],
      tools: ["UTM", "Google Tag Manager", "GA4"],
      fr: {
        text: "Un balisage propre des campagnes et un suivi des événements, pour comparer les canaux d'acquisition sur la même base.",
        tasks: ["Conventions de nommage UTM", "Plan de taggage des événements et conversions", "Gestion des balises", "Reporting d'attribution par canal"]
      }
    },
    {
      icon: "crm",
      title: "CRM & Conversion Optimization",
      text: "Turning visitors into qualified leads, then into customers, using data to personalise each step.",
      tasks: ["Funnel analysis (visit → lead → customer)", "Landing-page and form optimisation", "Segmentation and lead scoring", "CRM data quality and enrichment"],
      tools: ["CRM", "SQL", "Power BI"],
      fr: {
        title: "CRM & optimisation de la conversion",
        text: "Transformer les visiteurs en leads qualifiés, puis en clients, en s'appuyant sur la donnée pour personnaliser chaque étape.",
        tasks: ["Analyse de l'entonnoir (visite → lead → client)", "Optimisation des pages d'atterrissage et des formulaires", "Segmentation et lead scoring", "Qualité et enrichissement des données CRM"]
      }
    },
    {
      icon: "shop",
      title: "E-commerce Platforms",
      text: "Running the marketing side of online shops: product pages, catalogue data and the sales funnel from visit to order.",
      tasks: ["Product page and catalogue optimisation", "E-commerce tracking (orders, basket, revenue)", "Checkout funnel analysis", "Promotions and campaign follow-up"],
      tools: ["Shopify", "PrestaShop", "Google Analytics 4"],
      fr: {
        title: "Plateformes e-commerce",
        text: "Piloter le volet marketing des boutiques en ligne : fiches produits, données catalogue et tunnel de vente, de la visite à la commande.",
        tasks: ["Optimisation des fiches produits et du catalogue", "Tracking e-commerce (commandes, panier, CA)", "Analyse du tunnel de commande", "Suivi des promotions et des campagnes"]
      }
    },
    {
      icon: "ux",
      title: "UX Research & Testing",
      text: "Understanding users before changing a page, then testing changes instead of guessing.",
      tasks: ["User interviews and journey mapping", "Usability reviews of key pages", "A/A tests to validate the testing setup", "A/B tests on pages, forms and messages"],
      tools: ["UX Research", "A/A Testing", "A/B Testing"],
      fr: {
        title: "Recherche UX & tests",
        text: "Comprendre les utilisateurs avant de modifier une page, puis tester les changements au lieu de deviner.",
        tasks: ["Entretiens utilisateurs et cartographie des parcours", "Revues d'utilisabilité des pages clés", "Tests A/A pour valider le dispositif de test", "Tests A/B sur les pages, formulaires et messages"],
        tools: ["Recherche UX", "Tests A/A", "Tests A/B"]
      }
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
      tags: ["SQL", "PostgreSQL", "Power BI", "Data Quality"],
      fr: {
        role: "Consultant Data Analyst & Marketing Operations",
        period: "janv. 2026 – aujourd'hui",
        missions: [
          "Requêtes SQL sur des bases PostgreSQL",
          "Exploitation de bases de données et extraction",
          "Création de dashboards Power BI",
          "Enrichissement de bases clients et prospects",
          "Nettoyage, normalisation et dédoublonnage des données"
        ],
        tags: ["SQL", "PostgreSQL", "Power BI", "Qualité des données"]
      }
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
      tags: ["CRM", "Customer Analytics", "SQL"],
      fr: {
        role: "Analyse de données & CRM",
        period: "juin 2025 – déc. 2025",
        missions: [
          "Interrogation de bases de données",
          "Extraction d'informations",
          "Analyse des données clients",
          "Personnalisation des offres CRM"
        ],
        tags: ["CRM", "Analyse client", "SQL"]
      }
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
      tags: ["Data Modeling", "SQL", "Dashboards"],
      fr: {
        role: "Analyste gestion de données",
        period: "juil. 2024 – oct. 2024",
        missions: [
          "Modélisation relationnelle des données",
          "Création et maintenance de bases de données",
          "SQL",
          "Conception de dashboards pour le marketing data-driven"
        ],
        tags: ["Modélisation de données", "SQL", "Dashboards"]
      }
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
      tags: ["Sales Support", "Customer Journey"],
      fr: {
        role: "Assistant de soutien aux ventes",
        period: "avr. 2023 – juil. 2023",
        missions: [
          "Soutien administratif et logistique",
          "Accompagnement de l'équipe commerciale",
          "Parcours client"
        ],
        tags: ["Soutien commercial", "Parcours client"]
      }
    }
  ]
};
