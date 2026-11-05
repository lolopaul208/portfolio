/* =========================================================================
   Site behaviour: navigation, terminal, rendering of projects / dashboards /
   marketing ops / experience from js/data.js, detail dialog, filters,
   scroll reveal. Texts follow the EN / FR switch (js/i18n.js).
   ========================================================================= */
(function () {
  "use strict";

  var D = window.PORTFOLIO || { projects: [], dashboards: [], marketingOps: [], experience: [] };
  var I = window.I18N || { t: function (k, f) { return f || k; }, pick: function (o, f) { return o[f]; }, status: function (s) { return s; }, lang: function () { return "en"; } };
  var t = I.t, pick = I.pick;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EXT = '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
  var newTab = function () { return '<span class="sr-only">' + esc(t("ui.newTab")) + "</span>"; };
  var revealed = false;   // after first paint, re-rendered cards appear without animation

  /* --------------------------------------------------------------- header */
  var header = $(".site-header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var toggle = $(".nav-toggle"), links = $("#nav-links");
  var setToggleLabel = function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", t(open ? "ui.closeMenu" : "ui.openMenu"));
  };
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    links.classList.toggle("open", !open);
    setToggleLabel();
  });
  $$("#nav-links a").forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false"); links.classList.remove("open"); setToggleLabel();
    });
  });
  setToggleLabel();

  // active link on scroll
  var navMap = {};
  $$("#nav-links a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && navMap[e.target.id]) {
          $$("#nav-links a").forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
          navMap[e.target.id].classList.add("active");
          navMap[e.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { secObs.observe(s); });
  }

  /* ------------------------------------------------------------- terminal (code, stays in English) */
  var script = [
    ['<span class="p">paul@data</span>:<span class="f">~</span>$ ', "psql -d marketing_db\n", true],
    ['<span class="k">SELECT</span> channel,\n', "", false],
    ['       <span class="f">COUNT</span>(*) <span class="k">AS</span> leads,\n', "", false],
    ['       <span class="f">ROUND</span>(<span class="f">AVG</span>(converted::<span class="k">int</span>)*<span class="n">100</span>,<span class="n">1</span>) <span class="k">AS</span> cr\n', "", false],
    ['<span class="k">FROM</span>   leads\n', "", false],
    ['<span class="k">WHERE</span>  created_at >= <span class="s">\'2026-01-01\'</span>\n', "", false],
    ['<span class="k">GROUP BY</span> channel <span class="k">ORDER BY</span> cr <span class="k">DESC</span>;\n\n', "", false],
    ['<span class="o"> channel   | leads | cr\n-----------+-------+-----\n email     |   ··· | ···\n organic   |   ··· | ···\n</span>', "", false],
    ['<span class="c">(sample query, illustrative)</span>\n\n', "", false],
    ['<span class="p">paul@data</span>:<span class="f">~</span>$ ', "echo $MISSION\n", true],
    ['<span class="s">Turning Data into Business Impact.</span>\n', "", false]
  ];
  var code = $("#terminal-code");
  if (code) {
    if (reduced) {
      code.innerHTML = script.map(function (s) { return s[0] + esc(s[1]); }).join("");
    } else {
      var i = 0, html = "";
      var next = function () {
        if (i >= script.length) return;
        var step = script[i++];
        html += step[0]; code.innerHTML = html;
        if (step[2]) {
          var txt = step[1], j = 0;
          var type = function () {
            if (j <= txt.length) { code.innerHTML = html + esc(txt.slice(0, j++)); setTimeout(type, 38); }
            else { html += esc(txt); setTimeout(next, 260); }
          };
          setTimeout(type, 350);
        } else { setTimeout(next, 110); }
      };
      setTimeout(next, 600);
    }
  }

  var revealClass = function (base) { return base + " reveal" + (revealed ? " in" : ""); };
  var chips = function (arr) { return arr.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join(""); };

  /* ------------------------------------------------------------- projects */
  var grid = $("#projects-grid");
  function renderProjects() {
    grid.innerHTML = "";
    D.projects.forEach(function (p) {
      var skills = pick(p, "skills"), linksP = pick(p, "links") || [], link = linksP[0];
      var card = document.createElement("article");
      card.className = revealClass("project-card");
      card.innerHTML =
        '<div class="project-visual">' + window.ProjectArt(p.accent) + "</div>" +
        '<div class="project-body">' +
          '<span class="badge badge-project">' + esc(pick(p, "type")) + "</span>" +
          "<h3>" + esc(pick(p, "name")) + "</h3>" +
          '<p class="project-tagline">' + esc(pick(p, "tagline")) + "</p>" +
          '<p class="project-desc">' + esc(pick(p, "description")) + "</p>" +
          '<ul class="chips">' + chips(skills.slice(0, 4)) + (skills.length > 4 ? "<li>+" + (skills.length - 4) + "</li>" : "") + "</ul>" +
          '<div class="card-foot">' +
            '<button class="more linklike" data-project="' + esc(p.id) + '" aria-haspopup="dialog">' + esc(t("ui.details")) + "</button>" +
            (link ? '<a class="ext" href="' + esc(link.url) + '" target="_blank" rel="noopener">' + esc(link.label) + " " + EXT + newTab() + "</a>" : "") +
          "</div>" +
        "</div>";
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        openProject(p);
      });
      grid.appendChild(card);
    });
  }

  /* ----------------------------------------------------------- dashboards */
  var toolClass = function (x) { return x === "Tableau" ? "tableau" : x === "Power BI" ? "powerbi" : x === "Python" ? "python" : ""; };
  var dataBadge = function (d) {
    return '<span class="badge badge-data' + (/^Public|^Real/.test(d.dataStatus) ? " badge-data-real" : "") + '">' + esc(I.status(d.dataStatus)) + "</span>";
  };

  function preview(d, container) {
    if (d.image) {
      container.innerHTML = '<img src="' + esc(d.image) + '" alt="' + esc(t("ui.screenshot")) + " " + esc(pick(d, "title")) + " (" + esc(I.status(d.dataStatus)) + ')" loading="lazy">';
    } else if (d.demo && window.DashboardDemos[d.demo]) {
      var m = document.createElement("div"); m.className = "mini-dash";
      container.appendChild(m); window.DashboardDemos[d.demo](m);
    } else {
      container.innerHTML = '<div class="dash-placeholder"><div><strong>' + esc(t("ui.soon")) + "</strong><p>" + esc(t("ui.soonSub")) + "</p></div></div>";
    }
  }
  function dashLinks(d, cls) {
    var out = "";
    if (d.githubUrl) out += '<a class="btn btn-ghost ' + cls + '" href="' + esc(d.githubUrl) + '" target="_blank" rel="noopener">' + t("ui.code") + " " + EXT + newTab() + "</a>";
    if (d.tableauPublicUrl) out += '<a class="btn btn-ghost ' + cls + '" href="' + esc(d.tableauPublicUrl) + '" target="_blank" rel="noopener">Tableau Public ' + EXT + newTab() + "</a>";
    if (d.powerBiUrl) out += '<a class="btn btn-ghost ' + cls + '" href="' + esc(d.powerBiUrl) + '" target="_blank" rel="noopener">Power BI Service ' + EXT + newTab() + "</a>";
    return out;
  }

  var dgrid = $("#dash-grid"), currentFilter = "all";
  function applyFilter() {
    $$(".dash-card").forEach(function (c) { c.hidden = !(currentFilter === "all" || c.dataset.tool === currentFilter); });
  }
  function renderDashboards() {
    dgrid.innerHTML = "";
    D.dashboards.forEach(function (d) {
      var card = document.createElement("article");
      card.className = revealClass("dash-card");
      card.dataset.tool = d.tool;
      card.innerHTML =
        '<div class="dash-preview"></div>' +
        '<div class="dash-body">' +
          '<div class="dash-badges"><span class="badge badge-tool ' + toolClass(d.tool) + '">' + esc(d.tool) + "</span>" + dataBadge(d) + "</div>" +
          "<h3>" + esc(pick(d, "title")) + "</h3>" +
          '<p class="problem">' + esc(pick(d, "problem")) + "</p>" +
          '<div class="dash-actions"><button class="btn btn-primary btn-sm" data-dash="' + esc(d.id) + '" aria-haspopup="dialog">' + esc(t("ui.caseStudy")) + "</button>" + dashLinks(d, "btn-sm") + "</div>" +
        "</div>";
      preview(d, $(".dash-preview", card));
      $("[data-dash]", card).addEventListener("click", function () { openDashboard(d); });
      dgrid.appendChild(card);
    });
    applyFilter();
  }

  $$(".filter").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".filter").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true");
      currentFilter = b.dataset.filter;
      applyFilter();
    });
  });

  /* --------------------------------------------------------- marketing ops */
  var ICONS = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M8.5 11h5M11 8.5v5"/>',
    ads: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M7 13l2.2-5 2.3 5M7.8 11.5h2.9M15 8v5h1.5a2.5 2.5 0 0 0 0-5z"/><path d="M9 21h6"/>',
    console: '<path d="M3 20h18"/><path d="M5 16l4-5 3 3 6-8"/><circle cx="18" cy="6" r="1.5"/>',
    plausible: '<path d="M4 18c3-1 4-9 8-9s4 6 8 3"/><path d="M4 21h16M4 3v18"/>',
    tracking: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    crm: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    shop: '<path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.8h-9a2 2 0 0 1-2-1.8z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
    ux: '<circle cx="9" cy="9" r="5"/><path d="M13 13l3 3"/><path d="M15 19l2 2 4-4"/>'
  };
  var mg = $("#mops-grid");
  function renderMops() {
    if (!mg || !D.marketingOps) return;
    mg.innerHTML = "";
    D.marketingOps.forEach(function (m) {
      var c = document.createElement("article");
      c.className = revealClass("mops-card");
      c.innerHTML =
        '<div class="mops-top"><div class="skill-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + (ICONS[m.icon] || ICONS.search) + "</svg></div>" +
        "<h3>" + esc(pick(m, "title")) + "</h3></div>" +
        '<p class="mops-text">' + esc(pick(m, "text")) + "</p>" +
        '<ul class="detail-list">' + chips(pick(m, "tasks")) + "</ul>" +
        '<div class="mops-foot"><ul class="chips">' + chips(pick(m, "tools")) + "</ul>" +
        (m.usedOn && m.usedOn.length ? '<p class="mops-used">' + esc(t("ui.appliedOn")) + " <strong>" + m.usedOn.map(esc).join(", ") + "</strong></p>" : "") +
        "</div>";
      mg.appendChild(c);
    });
  }

  /* ----------------------------------------------------------- experience */
  var tl = $("#timeline");
  function renderExperience() {
    tl.innerHTML = "";
    D.experience.forEach(function (x) {
      var li = document.createElement("li");
      li.className = revealClass("tl-item") + (x.current ? " current" : "");
      var tags = pick(x, "tags");
      li.innerHTML =
        '<span class="tl-dot" aria-hidden="true"></span>' +
        '<div class="tl-card">' +
          '<div class="tl-side"><span class="tl-period">' + esc(pick(x, "period")) + "</span>" + (x.current ? '<span class="tl-now">' + esc(t("ui.current")) + "</span>" : "") + "</div>" +
          '<div class="tl-main"><h3 class="tl-role">' + esc(pick(x, "role")) + '</h3><p class="tl-company">' + esc(pick(x, "company")) + "</p>" +
          '<ul class="tl-missions">' + chips(pick(x, "missions")) + "</ul>" +
          (tags ? '<ul class="chips">' + chips(tags) + "</ul>" : "") +
        "</div></div>";
      tl.appendChild(li);
    });
  }

  /* --------------------------------------------------------------- dialog */
  var modal = $("#modal"), mc = $("#modal-content"), lastFocus = null, openItem = null;
  function openModal() {
    lastFocus = document.activeElement;
    if (!modal.open) {
      if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    }
    modal.scrollTop = 0;
  }
  function closeModal() {
    if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
  }
  modal.addEventListener("close", function () { mc.innerHTML = ""; openItem = null; if (lastFocus) lastFocus.focus(); });
  modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest("[data-close]")) closeModal(); });

  var list = function (arr) { return '<ul class="detail-list">' + chips(arr || []) + "</ul>"; };

  function openProject(p) {
    openItem = { kind: "project", item: p };
    mc.innerHTML =
      '<span class="badge badge-project">' + esc(pick(p, "type")) + "</span>" +
      '<h3 id="modal-title">' + esc(pick(p, "name")) + "</h3>" +
      '<p class="project-tagline">' + esc(pick(p, "tagline")) + "</p>" +
      "<p>" + esc(pick(p, "description")) + "</p>" +
      "<h4>" + esc(t("ui.workedOn")) + "</h4>" + list(pick(p, "focus")) +
      "<h4>" + esc(t("ui.skillsApplied")) + '</h4><ul class="chips">' + chips(pick(p, "skills")) + "</ul>" +
      '<div class="modal-actions">' + (pick(p, "links") || []).map(function (l) {
        return '<a class="btn btn-primary" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " " + EXT + newTab() + "</a>";
      }).join("") + "</div>";
    openModal();
  }

  function openDashboard(d) {
    openItem = { kind: "dash", item: d };
    mc.innerHTML =
      '<div class="dash-badges"><span class="badge badge-tool ' + toolClass(d.tool) + '">' + esc(d.tool) + "</span>" + dataBadge(d) + "</div>" +
      '<h3 id="modal-title">' + esc(pick(d, "title")) + "</h3>" +
      '<div class="dash-preview" id="modal-preview"></div>' +
      '<div class="detail-grid">' +
        "<div><h4>" + t("ui.q1") + "</h4><p>" + esc(pick(d, "problem")) + "</p></div>" +
        "<div><h4>" + t("ui.q2") + "</h4><p>" + esc(pick(d, "data")) + "</p></div>" +
        "<div><h4>" + t("ui.q3") + "</h4>" + list(pick(d, "kpis")) + "</div>" +
        "<div><h4>" + t("ui.q4") + "</h4>" + list(pick(d, "insights")) + "</div>" +
      "</div>" +
      (d.dataStatus === "Fictitious data" ? '<p class="muted modal-note">' + esc(t("ui.fictNote")) + "</p>" : "") +
      '<div class="modal-actions">' + dashLinks(d, "") + "</div>";
    var pv = $("#modal-preview");
    if (d.embedUrl) {
      pv.innerHTML = '<iframe src="' + esc(d.embedUrl) + '" title="' + esc(pick(d, "title")) + '" class="dash-embed" loading="lazy" allowfullscreen></iframe>';
    } else { preview(d, pv); }
    openModal();
  }

  /* --------------------------------------------------------------- render + language */
  function renderAll() {
    renderProjects();
    renderDashboards();
    renderMops();
    renderExperience();
  }
  renderAll();

  document.addEventListener("langchange", function () {
    renderAll();
    setToggleLabel();
    $$(".copy-btn").forEach(function (b) { b.textContent = t("ui.copy"); });
    if (openItem) {   // re-draw an open detail dialog in the new language
      var o = openItem;
      if (o.kind === "project") openProject(o.item); else openDashboard(o.item);
    }
  });

  /* --------------------------------------------------------------- reveal */
  if ("IntersectionObserver" in window && !reduced) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el, n) { el.style.transitionDelay = (n % 3) * 70 + "ms"; ro.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
  revealed = true;

  /* ------------------------------------------------------------ misc */
  $$(".copy-btn").forEach(function (b) {
    b.textContent = t("ui.copy");
    b.addEventListener("click", function () {
      var v = b.dataset.copy;
      var done = function () { b.textContent = t("ui.copied"); setTimeout(function () { b.textContent = t("ui.copy"); }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, function () {}); else done();
    });
  });
  /* back to top: always scroll to the very top */
  $$(".back-to-top").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    });
  });
  $("#year").textContent = new Date().getFullYear();
})();
