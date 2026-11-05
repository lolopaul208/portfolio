/* =========================================================================
   Built-in dashboard demos, lightweight SVG charts, no library.
   Sales & marketing demos use FICTITIOUS figures; the Zomato demo uses real
   public data (Kaggle). Labels follow the EN / FR switch.
   ========================================================================= */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var C = { blue: "#3b82f6", cyan: "#22d3ee", violet: "#8b7cf6", muted: "#4b5a7a", amber: "#fbbf24" };

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function h(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  /* ------------------------------------------------------------- tooltip */
  function tooltip(root) {
    var t = h('<div class="chart-tip" role="status" aria-live="polite"></div>');
    root.appendChild(t);
    return {
      show: function (html, evt) {
        t.innerHTML = html; t.style.opacity = 1;
        var r = root.getBoundingClientRect();
        var x = evt.clientX - r.left + 12, y = evt.clientY - r.top - 36;
        if (x + t.offsetWidth > r.width) x = evt.clientX - r.left - t.offsetWidth - 12;
        t.style.left = Math.max(0, x) + "px"; t.style.top = Math.max(0, y) + "px";
      },
      hide: function () { t.style.opacity = 0; }
    };
  }

  /* ---------------------------------------------------------- line chart */
  function lineChart(panel, opts, tip) {
    var W = 360, H = 150, m = { t: 8, r: 6, b: 18, l: 30 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var all = [];
    opts.series.forEach(function (s) { all = all.concat(s.values); });
    var hi = Math.max.apply(null, all), lo = opts.zero ? 0 : Math.min.apply(null, all);
    var raw = (hi - lo) / 3, mag = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / mag;
    var step = (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * mag;
    var min = Math.floor(lo / step) * step, max = Math.ceil(hi / step) * step;
    var ticks = Math.round((max - min) / step);
    var n = opts.labels.length;
    var x = function (i) { return m.l + (i / (n - 1)) * iw; };
    var y = function (v) { return m.t + ih - ((v - min) / (max - min)) * ih; };

    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.aria });
    // grid + y ticks
    for (var g = 0; g <= ticks; g++) {
      var v = min + step * g, yy = y(v);
      el("line", { x1: m.l, x2: W - m.r, y1: yy, y2: yy, class: "chart-grid" }, svg);
      el("text", { x: m.l - 6, y: yy + 3, "text-anchor": "end", class: "chart-axis" }, svg).textContent = opts.tick(v);
    }
    // x labels
    opts.labels.forEach(function (l, i) {
      if (n > 8 && i % 2 === 1) return;
      el("text", { x: x(i), y: H - 4, "text-anchor": "middle", class: "chart-axis" }, svg).textContent = l;
    });
    // gradient for area
    var defs = el("defs", {}, svg);
    var gid = "g" + Math.random().toString(36).slice(2, 8);
    var lg = el("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el("stop", { offset: "0%", "stop-color": opts.series[0].color, "stop-opacity": 0.28 }, lg);
    el("stop", { offset: "100%", "stop-color": opts.series[0].color, "stop-opacity": 0 }, lg);

    opts.series.forEach(function (s, si) {
      var d = s.values.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
      if (si === 0 && opts.area) {
        el("path", { d: d + " L" + x(n - 1) + " " + (m.t + ih) + " L" + x(0) + " " + (m.t + ih) + " Z", fill: "url(#" + gid + ")" }, svg);
      }
      el("path", {
        d: d, fill: "none", stroke: s.color, "stroke-width": s.dash ? 1.5 : 2.2,
        "stroke-dasharray": s.dash ? "4 4" : "none", "stroke-linejoin": "round", "stroke-linecap": "round"
      }, svg);
    });

    // hover layer
    var cross = el("line", { y1: m.t, y2: m.t + ih, stroke: "rgba(230,236,248,.25)", "stroke-width": 1, opacity: 0 }, svg);
    var dots = opts.series.map(function (s) {
      return el("circle", { r: 3.5, fill: "#0a1226", stroke: s.color, "stroke-width": 2, opacity: 0 }, svg);
    });
    var hit = el("rect", { x: m.l, y: m.t, width: iw, height: ih, fill: "transparent" }, svg);
    function move(evt) {
      var r = svg.getBoundingClientRect();
      var px = ((evt.clientX - r.left) / r.width) * W;
      var i = Math.round(((px - m.l) / iw) * (n - 1));
      i = Math.max(0, Math.min(n - 1, i));
      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i)); cross.setAttribute("opacity", 1);
      dots.forEach(function (d, si) { d.setAttribute("cx", x(i)); d.setAttribute("cy", y(opts.series[si].values[i])); d.setAttribute("opacity", 1); });
      tip.show("<span class='muted'>" + opts.labels[i] + "</span><br>" + opts.series.map(function (s) {
        return s.name + ": <b>" + opts.fmt(s.values[i]) + "</b>";
      }).join("<br>"), evt);
    }
    function leave() { cross.setAttribute("opacity", 0); dots.forEach(function (d) { d.setAttribute("opacity", 0); }); tip.hide(); }
    hit.addEventListener("mousemove", move);
    hit.addEventListener("mouseleave", leave);
    panel.appendChild(svg);

    if (opts.series.length > 1) {
      panel.appendChild(h('<div class="legend">' + opts.series.map(function (s) {
        return '<span><i style="background:' + s.color + (s.dash ? ";opacity:.7" : "") + '"></i>' + s.name + "</span>";
      }).join("") + "</div>"));
    }
  }

  /* ------------------------------------------------------ language helpers */
  var L = function () { return window.I18N && window.I18N.lang() === "fr" ? "fr" : "en"; };
  var fr = function () { return L() === "fr"; };
  var tr = function (en, frText) { return fr() ? frText : en; };
  var num = function (v, dec) {
    return v.toLocaleString(fr() ? "fr-FR" : "en-US", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  };
  var keur = function (v) { return fr() ? num(v) + " k€" : "€" + num(v) + "k"; };

  /* ------------------------------------------------------ horizontal bars */
  function hBars(panel, opts, tip) {
    var rowH = 22, W = 200, H = opts.items.length * rowH;
    var longest = Math.max.apply(null, opts.items.map(function (d) { return d.k.length; }));
    var lw = Math.max(74, Math.round(longest * 5.4) + 8);
    var max = Math.max.apply(null, opts.items.map(function (d) { return d.v; }));
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.aria });
    opts.items.forEach(function (d, i) {
      var y = i * rowH, bw = ((W - lw - 34) * d.v) / max;
      el("text", { x: 0, y: y + 14, class: "chart-axis" }, svg).textContent = d.k;
      var bar = el("rect", { x: lw, y: y + 5, width: Math.max(bw, 2), height: 12, rx: 3, fill: d.c || opts.color }, svg);
      el("text", { x: lw + bw + 5, y: y + 14, class: "chart-axis", style: "fill:#9aa8c4" }, svg).textContent = opts.fmt(d.v);
      bar.addEventListener("mousemove", function (e) { bar.setAttribute("opacity", .8); tip.show(d.k + (fr() ? " : " : ": ") + "<b>" + opts.fmtLong(d.v) + "</b>", e); });
      bar.addEventListener("mouseleave", function () { bar.setAttribute("opacity", 1); tip.hide(); });
    });
    panel.appendChild(svg);
  }

  function kpi(label, value, delta, up) {
    return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value">' + value +
      '</div><div class="kpi-delta ' + (up ? "up" : "down") + '">' + (up ? "▲ " : "▼ ") + delta + ' <span class="muted">' + tr("vs prev. year", "vs N-1") + "</span></div></div>";
  }
  var flagFict = function () { return '<span class="md-flag">' + tr("FICTITIOUS DATA", "DONNÉES FICTIVES") + "</span>"; };

  /* ===================================================== DEMO: SALES (Power BI) */
  function salesDemo(root) {
    // FICTITIOUS DATA
    var months = fr() ? ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
                      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var revenue = [182, 175, 198, 206, 221, 214, 189, 176, 232, 248, 261, 295];   // k€
    var target  = [190, 185, 195, 200, 210, 215, 200, 185, 225, 240, 255, 280];   // k€
    var orders = 29380;
    var total = revenue.reduce(function (a, b) { return a + b; }, 0);             // 2,597 k€
    var aov = (total * 1000) / orders;
    var cats = [
      { k: tr("Equipment", "Équipement"), v: 862 }, { k: "Services", v: 695 },
      { k: tr("Accessories", "Accessoires"), v: 538 }, { k: tr("Software", "Logiciels"), v: 502 }
    ];
    var revenueTxt = fr() ? num(total / 1000, 2) + " M€" : "€" + num(total / 1000, 2) + "M";
    var aovTxt = fr() ? num(aov, 1) + " €" : "€" + num(aov, 1);

    root.innerHTML =
      '<div class="md-head"><span class="md-title">' + tr("Commercial Performance · FY demo", "Performance commerciale · démo annuelle") + "</span>" + flagFict() + "</div>" +
      '<div class="kpis">' +
        kpi(tr("Revenue", "Chiffre d'affaires"), revenueTxt, num(8.4, 1) + (fr() ? " %" : "%"), true) +
        kpi(tr("Orders", "Commandes"), num(orders), num(5.1, 1) + (fr() ? " %" : "%"), true) +
        kpi(tr("Avg. order value", "Panier moyen"), aovTxt, num(3.2, 1) + (fr() ? " %" : "%"), true) +
      "</div>" +
      '<div class="md-row"><div class="md-panel" data-p="trend"><div class="md-panel-title">' + tr("Monthly revenue vs target (k€)", "CA mensuel vs objectif (k€)") + "</div></div>" +
      '<div class="md-panel" data-p="cat"><div class="md-panel-title">' + tr("Revenue by category (k€)", "CA par catégorie (k€)") + "</div></div></div>";

    var tip = tooltip(root);
    lineChart(root.querySelector('[data-p="trend"]'), {
      labels: months, area: true, zero: false,
      series: [{ name: tr("Revenue", "CA"), values: revenue, color: C.cyan }, { name: tr("Target", "Objectif"), values: target, color: C.muted, dash: true }],
      tick: function (v) { return num(Math.round(v)); }, fmt: keur,
      aria: tr("Line chart of fictitious monthly revenue against target, January to December", "Courbe fictive du CA mensuel comparé à l'objectif, de janvier à décembre")
    }, tip);
    hBars(root.querySelector('[data-p="cat"]'), {
      items: cats, color: C.blue,
      fmt: function (v) { return num(v); }, fmtLong: keur,
      aria: tr("Bar chart of fictitious revenue by product category", "Barres fictives du CA par catégorie de produits")
    }, tip);
  }

  /* ================================================== DEMO: MARKETING (Tableau) */
  function marketingDemo(root) {
    // FICTITIOUS DATA
    var weeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(function (w) { return tr("W", "S") + w; });
    var visitors = [8.2, 8.9, 9.4, 9.1, 10.3, 11.0, 10.6, 11.8, 12.4, 12.1, 13.5, 14.2]; // thousands
    var totalVisitors = visitors.reduce(function (a, b) { return a + b; }, 0) * 1000;   // 131,500
    var leads = 3945;
    var cr = (leads / totalVisitors) * 100;
    var pct = function (v, d) { return num(v, d) + (fr() ? " %" : "%"); };
    var channels = [
      { k: "E-mail", v: 6.8, c: C.cyan }, { k: tr("Organic search", "SEO"), v: 4.1, c: C.blue },
      { k: tr("Referral", "Référents"), v: 3.6, c: C.blue }, { k: tr("Paid search", "SEA"), v: 3.2, c: C.blue },
      { k: tr("Social", "Réseaux sociaux"), v: 1.4, c: C.muted }
    ];

    root.innerHTML =
      '<div class="md-head"><span class="md-title">' + tr("Customer &amp; Marketing Analytics · Q demo", "Clients &amp; marketing · démo trimestrielle") + "</span>" + flagFict() + "</div>" +
      '<div class="kpis">' +
        kpi(tr("Website visitors", "Visiteurs du site"), num(totalVisitors / 1000, 1) + (fr() ? " k" : "k"), pct(12.6, 1), true) +
        kpi(tr("Leads generated", "Leads générés"), num(leads), pct(9.8, 1), true) +
        kpi(tr("Conversion rate", "Taux de conversion"), pct(cr, 1), num(0.1, 1) + " pt", false) +
      "</div>" +
      '<div class="md-row"><div class="md-panel" data-p="trend"><div class="md-panel-title">' + tr("Weekly website visitors (k)", "Visiteurs par semaine (k)") + "</div></div>" +
      '<div class="md-panel" data-p="ch"><div class="md-panel-title">' + tr("Conversion rate by channel (%)", "Taux de conversion par canal (%)") + "</div></div></div>";

    var tip = tooltip(root);
    lineChart(root.querySelector('[data-p="trend"]'), {
      labels: weeks, area: true, zero: false,
      series: [{ name: tr("Visitors", "Visiteurs"), values: visitors, color: C.blue }],
      tick: function (v) { return num(v) + (fr() ? " k" : "k"); }, fmt: function (v) { return num(v * 1000); },
      aria: tr("Line chart of fictitious weekly website visitors over 12 weeks", "Courbe fictive des visiteurs hebdomadaires sur 12 semaines")
    }, tip);
    hBars(root.querySelector('[data-p="ch"]'), {
      items: channels,
      fmt: function (v) { return num(v, 1); }, fmtLong: function (v) { return pct(v, 1) + tr(" conversion", " de conversion"); },
      aria: tr("Bar chart of fictitious conversion rate by acquisition channel", "Barres fictives du taux de conversion par canal d'acquisition")
    }, tip);
  }

  /* ============================================ ZOMATO (real public data, Kaggle) */
  function kpiPlain(label, value, note) {
    return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value">' + value +
      '</div><div class="kpi-delta muted">' + note + "</div></div>";
  }
  function zomatoDemo(root) {
    // Source: analysis.ipynb in github.com/lolopaul208/zomato-Note-restaurant- (Delhi NCR)
    var pct = function (v) { return v + (fr() ? " %" : "%"); };
    var price = [tr("Budget", "Économique"), tr("Mid-range", "Milieu de gamme"), tr("Upscale", "Haut de gamme"), tr("Fine dining", "Gastronomique")];
    root.innerHTML =
      '<div class="md-head"><span class="md-title">' + tr("Zomato restaurants · Delhi NCR", "Restaurants Zomato · Delhi NCR") + '</span><span class="md-flag md-flag-real">' + tr("PUBLIC DATA · KAGGLE", "DONNÉES PUBLIQUES · KAGGLE") + "</span></div>" +
      '<div class="kpis">' +
        kpiPlain("Restaurants", num(7947), "Delhi NCR") +
        kpiPlain(tr("Rated", "Notés"), pct(73), tr("4+ votes", "4 votes et +")) +
        kpiPlain(tr("Avg. rating", "Note moyenne"), num(3.28, 2), tr("out of 5", "sur 5")) +
      "</div>" +
      '<div class="md-row md-row-even"><div class="md-panel" data-p="rating"><div class="md-panel-title">' + tr("Average rating by price range", "Note moyenne par gamme de prix") + "</div></div>" +
      '<div class="md-panel" data-p="unrated"><div class="md-panel-title">' + tr("Share with no rating (&lt; 4 votes)", "Part sans note (&lt; 4 votes)") + "</div></div></div>";
    var tip = tooltip(root);
    hBars(root.querySelector('[data-p="rating"]'), {
      items: [{ k: price[0], v: 3.18 }, { k: price[1], v: 3.25 }, { k: price[2], v: 3.57 }, { k: price[3], v: 3.65 }],
      color: C.blue, fmt: function (v) { return num(v, 2); }, fmtLong: function (v) { return num(v, 2) + " / 5"; },
      aria: tr("Bar chart: average rating by price range, 3.18 budget to 3.65 fine dining", "Barres : note moyenne par gamme de prix, de 3,18 en économique à 3,65 en gastronomique")
    }, tip);
    hBars(root.querySelector('[data-p="unrated"]'), {
      items: [{ k: price[0], v: 40 }, { k: price[1], v: 15 }, { k: price[2], v: 4 }, { k: price[3], v: 4 },
              { k: tr("No delivery", "Sans livraison"), v: 36, c: C.amber }, { k: tr("Delivery", "Livraison"), v: 4, c: C.amber }],
      color: C.cyan, fmt: pct, fmtLong: function (v) { return pct(v) + tr(" not rated", " non notés"); },
      aria: tr("Bar chart: share of restaurants with no rating, 40% budget to 4% fine dining; 36% without online delivery vs 4% with",
               "Barres : part des restaurants sans note, de 40 % en économique à 4 % en gastronomique ; 36 % sans livraison en ligne contre 4 % avec")
    }, tip);
  }

  window.DashboardDemos = { sales: salesDemo, marketing: marketingDemo, zomato: zomatoDemo };

  /* --------------------------------------------- small decorative project art */
  window.ProjectArt = function (accent) {
    var col = { cyan: C.cyan, blue: C.blue, violet: C.violet }[accent] || C.cyan;
    var pts = [], bars = "", i;
    for (i = 0; i < 14; i++) {
      var hgt = 22 + ((i * 37) % 60) + i * 2.4;
      bars += '<rect x="' + (18 + i * 26) + '" y="' + (140 - hgt) + '" width="14" height="' + hgt + '" rx="3" fill="' + col + '" opacity="' + (0.12 + i * 0.03).toFixed(2) + '"/>';
      pts.push((25 + i * 26) + "," + (110 - i * 4.5 - ((i * 13) % 18)));
    }
    return '<svg viewBox="0 0 380 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><radialGradient id="pa-' + accent + '" cx="80%" cy="0%" r="90%"><stop offset="0" stop-color="' + col + '" stop-opacity=".35"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="380" height="150" fill="url(#pa-' + accent + ')"/>' + bars +
      '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>";
  };
})();
