/* =========================================================================
   LANGUAGE SWITCH (EN / FR)
   - English is the default and lives directly in index.html and data.js.
   - French texts for the page live in FR below (key -> HTML).
   - French texts for projects, dashboards, marketing ops and experience live
     in js/data.js, in the `fr: { ... }` block of each item.
   - A visitor's choice is remembered; ?lang=fr in the URL forces French
     (handy to send a French link to a recruiter).
   ========================================================================= */
(function () {
  "use strict";

  var FR = {
    /* ---- navigation & header */
    "nav.about": "À propos", "nav.skills": "Compétences", "nav.certs": "Certifications",
    "nav.projects": "Projets", "nav.dashboards": "Dashboards", "nav.mops": "Marketing Ops",
    "nav.experience": "Expérience", "nav.contact": "Contact",

    /* ---- hero */
    "hero.eyebrow": '<span class="status-dot" aria-hidden="true"></span> Ouvert à de nouvelles opportunités',
    "hero.role": "Data Analyst <i>·</i> Marketing Operations <i>·</i> Data Marketing <i>·</i> Chef de projet digital",
    "hero.tagline": 'Transformer la donnée en <span class="grad">impact business.</span>',
    "hero.lead": "J'interroge, nettoie et modélise les données, je construis des dashboards réellement utilisés par les décideurs, et je relie les chiffres aux enjeux marketing et business.",
    "hero.facts": "<li><span>Disponible</span><strong>Janvier 2027</strong></li><li><span>Basé en</span><strong>France</strong></li><li><span>Langues</span><strong>Français · Anglais (B2)</strong></li>",
    "hero.cta": 'Voir mes projets <span aria-hidden="true">→</span>',

    /* ---- about */
    "about.kicker": "01. À propos",
    "about.title": "Entre data, marketing<br>et business.",
    "about.p1": "Je suis <strong>étudiant en Master spécialisé Data Marketing à l'INSEEC</strong>, avec un parcours en analyse de données, intelligence artificielle et marketing data-driven.",
    "about.p2": "Mon travail se situe au croisement de trois questions : <em>que disent les données</em>, <em>de quoi le business a besoin</em>, et <em>quel outil digital y répond</em>. Je l'ai appliqué en entreprise, sur des données CRM, des bases relationnelles et du reporting BI, et dans mes propres projets entrepreneuriaux, où j'ai conçu des plateformes, des modèles de scoring et des stratégies d'acquisition.",
    "about.p3": "Je suis <strong>ouvert à de nouvelles opportunités</strong>, y compris en alternance, en Data Analysis, Data Marketing, CRM, Marketing Operations ou Business Intelligence, <strong>à partir de janvier 2027</strong>, en France ou à l'international.",
    "about.interests": "<li>Analyse de données</li><li>Business Intelligence</li><li>Marketing Operations</li><li>Analyse CRM</li><li>Marketing digital</li><li>Product Management</li>",

    /* ---- skills */
    "skills.kicker": "02. Compétences",
    "skills.title": "Boîte à outils",
    "skills.sub": "De la table brute à la décision : cinq domaines dans lesquels je travaille.",
    "skills.growth": "Croissance digitale",
    "skills.product": "Gestion de produit &amp; de projet",
    "skills.c1": "<li>SQL</li><li>PostgreSQL</li><li>Python</li><li>Excel</li><li>Nettoyage de données</li><li>Enrichissement de données</li><li>Qualité des données</li>",
    "skills.c2": "<li>Power BI</li><li>Tableau</li><li>Conception de dashboards</li><li>Reporting</li><li>Suivi des KPI</li><li>Data visualisation</li>",
    "skills.c3": "<li>CRM</li><li>Analyse client</li><li>Performance marketing</li><li>Segmentation</li><li>Reporting</li>",
    "skills.c4": "<li>SEO</li><li>SEO local</li><li>Stratégie d'acquisition</li><li>Web analytics</li><li>Google Analytics</li><li>Shopify</li><li>PrestaShop</li><li>Optimisation de la conversion</li>",
    "skills.c5": "<li>Gestion de projet digital</li><li>Product thinking</li><li>Parcours utilisateur</li><li>Recherche UX</li><li>Tests A/A &amp; A/B</li><li>Conception de processus</li>",

    /* ---- certifications */
    "certs.kicker": "03. Certifications",
    "certs.sub": "Certifications Microsoft en cours de préparation, pour valider mes compétences Power BI et Microsoft Fabric.",
    "certs.status": '<span class="cert-dot" aria-hidden="true"></span>En cours',
    "certs.pl300": "Préparer, modéliser, visualiser et analyser les données avec Power BI, puis administrer et sécuriser les contenus Power BI.",
    "certs.dp600": "Lakehouses, entrepôts de données, pipelines et modèles sémantiques dans Microsoft Fabric, avec SQL, DAX et PySpark.",
    "certs.link": 'En savoir plus ↗<span class="sr-only"> (s\'ouvre dans un nouvel onglet)</span>',

    /* ---- projects */
    "projects.kicker": "04. Projets",
    "projects.title": "Ce que j'ai construit",
    "projects.sub": "Projets entrepreneuriaux et personnels, conçus et menés en dehors de mes emplois. Cliquez sur une carte pour plus de détails.",

    /* ---- dashboards */
    "dash.kicker": "05. Dashboards",
    "dash.title": "Galerie de data visualisation",
    "dash.sub": "Analyses et dashboards réalisés avec Python, Power BI et Tableau. Chacun présente sa question métier, les données utilisées, les KPI et les enseignements.",
    "dash.privacy": "<strong>Confidentialité.</strong> Les travaux réalisés pour des employeurs et des clients ne sont jamais publiés avec de vrais chiffres. Les dashboards présentés ici reposent sur des données <strong>publiques</strong>, <strong>fictives</strong>, <strong>anonymisées</strong> ou <strong>reconstituées</strong> ; chaque carte indique lesquelles.",
    "dash.all": "Tous",

    /* ---- marketing ops */
    "mops.kicker": "06. Marketing Operations",
    "mops.sub": "SEO, analytics et tracking : la couche opérationnelle qui rend l'acquisition mesurable et transforme le trafic en leads qualifiés.",
    "mops.workflow":
      '<li><p class="wf-head"><span class="wf-n">01.</span> <strong>Audit</strong></p> <span class="wf-desc">D\'où vient le trafic ? Qu\'est-ce qui bloque la conversion ?</span></li>' +
      '<li><p class="wf-head"><span class="wf-n">02.</span> <strong>Tracking</strong></p> <span class="wf-desc">UTM, événements et objectifs, pour mesurer chaque canal de la même façon.</span></li>' +
      '<li><p class="wf-head"><span class="wf-n">03.</span> <strong>Optimisation</strong></p> <span class="wf-desc">SEO, SEA et pages d\'atterrissage, priorisés selon leur impact.</span></li>' +
      '<li><p class="wf-head"><span class="wf-n">04.</span> <strong>Reporting</strong></p> <span class="wf-desc">Des KPI clairs et des dashboards qui mènent à la décision suivante.</span></li>',

    /* ---- experience */
    "exp.kicker": "07. Expérience",
    "exp.title": "Expérience professionnelle",

    /* ---- languages & interests */
    "beyond.kicker": "08. Langues &amp; centres d'intérêt",
    "beyond.title": "Au-delà de la data.",
    "beyond.languages": "Langues",
    "beyond.langlist":
      '<li><span class="lang-name">Français</span><span class="lang-level">Langue maternelle</span><span class="lang-bar" aria-hidden="true"><i style="width:100%"></i></span></li>' +
      '<li><span class="lang-name">Anglais</span><span class="lang-level">Technique, B2</span><span class="lang-bar" aria-hidden="true"><i style="width:66%"></i></span></li>',
    "beyond.interests": "Centres d'intérêt",
    "beyond.int.ai": "Intelligence artificielle",
    "beyond.int.energy": "Énergies renouvelables",

    /* ---- contact & footer */
    "contact.kicker": "09. Contact",
    "contact.title": "Travaillons ensemble.",
    "contact.msg": "Ouvert à de nouvelles opportunités en <strong>Data Analysis, Data Marketing, CRM, Marketing Operations</strong> et <strong>Business Intelligence</strong>.",
    "contact.email": "M'écrire",
    "footer.note": "Certaines démos de dashboards utilisent des données fictives, signalées comme telles.",
    "footer.top": "Retour en haut ↑",

    /* ---- attributes (alt / aria-label) */
    "attr.brand": "Atsou Paul LOLO, accueil",
    "attr.facts": "Infos clés",
    "attr.interests": "Domaines d'intérêt",
    "attr.aboutPhoto": "Portrait d'Atsou Paul LOLO",
    "attr.suitPhoto": "Atsou Paul LOLO en costume bleu marine",
    "attr.filters": "Filtrer les dashboards par outil",
    "attr.workflow": "Ma méthode sur l'acquisition",
    "attr.copy": "Copier l'adresse e-mail",
    "attr.close": "Fermer",
    "attr.scroll": "Aller à la section À propos",
    "attr.nav": "Navigation principale",

    /* ---- texts generated by the scripts */
    "ui.openMenu": "Ouvrir le menu", "ui.closeMenu": "Fermer le menu",
    "ui.newTab": " (s'ouvre dans un nouvel onglet)",
    "ui.details": "Détails →",
    "ui.caseStudy": "Étude de cas",
    "ui.code": "Code &amp; notebook",
    "ui.workedOn": "Ce que j'ai réalisé",
    "ui.skillsApplied": "Compétences mobilisées",
    "ui.q1": "1 · Question métier", "ui.q2": "2 · Données utilisées",
    "ui.q3": "3 · KPI analysés", "ui.q4": "4 · Enseignements &amp; recommandations",
    "ui.fictNote": "Tous les chiffres de cette démo sont fictifs et servent uniquement à illustrer la conception du dashboard et la démarche d'analyse.",
    "ui.soon": "Aperçu bientôt disponible", "ui.soonSub": "Capture d'écran ou lien à venir.",
    "ui.screenshot": "Capture d'écran de",
    "ui.appliedOn": "Mis en pratique sur :",
    "ui.current": "En cours",
    "ui.copy": "Copier", "ui.copied": "Copié ✓",
    "status.Public data (Kaggle)": "Données publiques (Kaggle)",
    "status.Fictitious data": "Données fictives",
    "status.Anonymized data": "Données anonymisées",
    "status.Reconstructed from public data": "Reconstitué à partir de données publiques",
    "status.Real data (authorized)": "Données réelles (autorisées)"
  };

  var EN = {
    "ui.openMenu": "Open menu", "ui.closeMenu": "Close menu",
    "ui.newTab": " (opens in a new tab)",
    "ui.details": "Details →",
    "ui.caseStudy": "Case study",
    "ui.code": "Code &amp; notebook",
    "ui.workedOn": "What I worked on",
    "ui.skillsApplied": "Skills applied",
    "ui.q1": "1 · Business question", "ui.q2": "2 · Data used",
    "ui.q3": "3 · KPIs analysed", "ui.q4": "4 · Takeaways &amp; recommendations",
    "ui.fictNote": "All figures in this demo are fictitious and only illustrate the dashboard design and analysis approach.",
    "ui.soon": "Preview coming soon", "ui.soonSub": "Screenshot or live link to be added.",
    "ui.screenshot": "Screenshot of the",
    "ui.appliedOn": "Applied on:",
    "ui.current": "Current",
    "ui.copy": "Copy", "ui.copied": "Copied ✓"
  };

  var TITLES = {
    en: "Atsou Paul LOLO | Data Analyst | Marketing Operations | Data Marketing",
    fr: "Atsou Paul LOLO | Data Analyst | Marketing Operations | Data Marketing"
  };

  function readLang() {
    var q = /[?&]lang=(fr|en)\b/i.exec(location.search);
    if (q) return q[1].toLowerCase();
    try { var s = localStorage.getItem("lang"); if (s === "fr" || s === "en") return s; } catch (e) {}
    return "en";
  }

  var lang = readLang();

  var I18N = {
    lang: function () { return lang; },
    locale: function () { return lang === "fr" ? "fr-FR" : "en-US"; },
    /* UI string by key; English fallback = EN table, then the key's own default */
    t: function (key, fallback) {
      if (lang === "fr" && FR[key] != null) return FR[key];
      if (EN[key] != null) return EN[key];
      return fallback != null ? fallback : key;
    },
    /* data.js item field, using item.fr[field] when French is on */
    pick: function (item, field) {
      if (lang === "fr" && item.fr && item.fr[field] != null) return item.fr[field];
      return item[field];
    },
    status: function (s) { return lang === "fr" && FR["status." + s] ? FR["status." + s] : s; },
    set: function (l) {
      if (l !== "fr" && l !== "en") return;
      lang = l;
      try { localStorage.setItem("lang", l); } catch (e) {}
      if (history.replaceState) {
        var url = location.pathname + (l === "fr" ? "?lang=fr" : "") + location.hash;
        history.replaceState(null, "", url);
      }
      apply();
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
    }
  };
  window.I18N = I18N;

  /* Static page texts: elements with data-i18n="key" (innerHTML) and
     data-i18n-attr="attr:key;attr:key". English originals are kept on first switch. */
  function apply() {
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      if (el.__en == null) el.__en = el.innerHTML;
      var k = el.getAttribute("data-i18n");
      el.innerHTML = lang === "fr" && FR[k] != null ? FR[k] : el.__en;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-attr]"), function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"), attr = p[0], k = p[1];
        var store = "__en_" + attr;
        if (el[store] == null) el[store] = el.getAttribute(attr);
        el.setAttribute(attr, lang === "fr" && FR[k] != null ? FR[k] : el[store]);
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".lang-switch button"), function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function init() {
    apply();
    Array.prototype.forEach.call(document.querySelectorAll(".lang-switch button"), function (b) {
      b.addEventListener("click", function () { I18N.set(b.getAttribute("data-lang")); });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
