/* =========================================================================
   Built-in dashboard demos — lightweight SVG charts, no library.
   ALL FIGURES BELOW ARE FICTITIOUS and only illustrate dashboard design.
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
  function fmtNum(n, dec) { return n.toLocaleString("en-US", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }); }

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

  /* ------------------------------------------------------ horizontal bars */
  function hBars(panel, opts, tip) {
    var rowH = 22, W = 200, lw = 74, H = opts.items.length * rowH;
    var max = Math.max.apply(null, opts.items.map(function (d) { return d.v; }));
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.aria });
    opts.items.forEach(function (d, i) {
      var y = i * rowH, bw = ((W - lw - 34) * d.v) / max;
      el("text", { x: 0, y: y + 14, class: "chart-axis" }, svg).textContent = d.k;
      var bar = el("rect", { x: lw, y: y + 5, width: Math.max(bw, 2), height: 12, rx: 3, fill: d.c || opts.color }, svg);
      el("text", { x: lw + bw + 5, y: y + 14, class: "chart-axis", style: "fill:#9aa8c4" }, svg).textContent = opts.fmt(d.v);
      bar.addEventListener("mousemove", function (e) { bar.setAttribute("opacity", .8); tip.show(d.k + ": <b>" + opts.fmtLong(d.v) + "</b>", e); });
      bar.addEventListener("mouseleave", function () { bar.setAttribute("opacity", 1); tip.hide(); });
    });
    panel.appendChild(svg);
  }

  function kpi(label, value, delta, up) {
    return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value">' + value +
      '</div><div class="kpi-delta ' + (up ? "up" : "down") + '">' + (up ? "▲ " : "▼ ") + delta + ' <span class="muted">vs prev. year</span></div></div>';
  }

  /* ===================================================== DEMO: SALES (Power BI) */
  function salesDemo(root) {
    // FICTITIOUS DATA
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var revenue = [182, 175, 198, 206, 221, 214, 189, 176, 232, 248, 261, 295];   // k€
    var target  = [190, 185, 195, 200, 210, 215, 200, 185, 225, 240, 255, 280];   // k€
    var orders = 29380;
    var total = revenue.reduce(function (a, b) { return a + b; }, 0);             // 2,597 k€
    var aov = (total * 1000) / orders;
    var cats = [
      { k: "Equipment", v: 862 }, { k: "Services", v: 695 },
      { k: "Accessories", v: 538 }, { k: "Software", v: 502 }
    ];

    root.innerHTML =
      '<div class="md-head"><span class="md-title">Commercial Performance · FY demo</span><span class="md-flag">FICTITIOUS DATA</span></div>' +
      '<div class="kpis">' +
        kpi("Revenue", "€" + (total / 1000).toFixed(2) + "M", "8.4%", true) +
        kpi("Orders", fmtNum(orders), "5.1%", true) +
        kpi("Avg. order value", "€" + aov.toFixed(1), "3.2%", true) +
      "</div>" +
      '<div class="md-row"><div class="md-panel" data-p="trend"><div class="md-panel-title">Monthly revenue vs target (k€)</div></div>' +
      '<div class="md-panel" data-p="cat"><div class="md-panel-title">Revenue by category (k€)</div></div></div>';

    var tip = tooltip(root);
    lineChart(root.querySelector('[data-p="trend"]'), {
      labels: months, area: true, zero: false,
      series: [{ name: "Revenue", values: revenue, color: C.cyan }, { name: "Target", values: target, color: C.muted, dash: true }],
      tick: function (v) { return Math.round(v); }, fmt: function (v) { return "€" + v + "k"; },
      aria: "Line chart of fictitious monthly revenue against target, January to December"
    }, tip);
    hBars(root.querySelector('[data-p="cat"]'), {
      items: cats, color: C.blue,
      fmt: function (v) { return v; }, fmtLong: function (v) { return "€" + v + "k"; },
      aria: "Bar chart of fictitious revenue by product category"
    }, tip);
  }

  /* ================================================== DEMO: MARKETING (Tableau) */
  function marketingDemo(root) {
    // FICTITIOUS DATA
    var weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];
    var visitors = [8.2, 8.9, 9.4, 9.1, 10.3, 11.0, 10.6, 11.8, 12.4, 12.1, 13.5, 14.2]; // thousands
    var totalVisitors = visitors.reduce(function (a, b) { return a + b; }, 0) * 1000;   // 131,500
    var leads = 3945;
    var cr = (leads / totalVisitors) * 100;
    var channels = [
      { k: "Email", v: 6.8, c: C.cyan }, { k: "Organic search", v: 4.1, c: C.blue },
      { k: "Referral", v: 3.6, c: C.blue }, { k: "Paid search", v: 3.2, c: C.blue },
      { k: "Social", v: 1.4, c: C.muted }
    ];

    root.innerHTML =
      '<div class="md-head"><span class="md-title">Customer &amp; Marketing Analytics · Q demo</span><span class="md-flag">FICTITIOUS DATA</span></div>' +
      '<div class="kpis">' +
        kpi("Website visitors", fmtNum(totalVisitors / 1000, 1) + "k", "12.6%", true) +
        kpi("Leads generated", fmtNum(leads), "9.8%", true) +
        kpi("Conversion rate", cr.toFixed(1) + "%", "0.1 pt", false) +
      "</div>" +
      '<div class="md-row"><div class="md-panel" data-p="trend"><div class="md-panel-title">Weekly website visitors (k)</div></div>' +
      '<div class="md-panel" data-p="ch"><div class="md-panel-title">Conversion rate by channel (%)</div></div></div>';

    var tip = tooltip(root);
    lineChart(root.querySelector('[data-p="trend"]'), {
      labels: weeks, area: true, zero: false,
      series: [{ name: "Visitors", values: visitors, color: C.blue }],
      tick: function (v) { return v.toFixed(0) + "k"; }, fmt: function (v) { return fmtNum(v * 1000); },
      aria: "Line chart of fictitious weekly website visitors over 12 weeks"
    }, tip);
    hBars(root.querySelector('[data-p="ch"]'), {
      items: channels,
      fmt: function (v) { return v.toFixed(1); }, fmtLong: function (v) { return v.toFixed(1) + "% conversion"; },
      aria: "Bar chart of fictitious conversion rate by acquisition channel"
    }, tip);
  }

  /* ============================================ ZOMATO (real public data, Kaggle) */
  function kpiPlain(label, value, note) {
    return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value">' + value +
      '</div><div class="kpi-delta muted">' + note + "</div></div>";
  }
  function zomatoDemo(root) {
    // Source: analysis.ipynb in github.com/lolopaul208/zomato-Note-restaurant- (Delhi NCR)
    root.innerHTML =
      '<div class="md-head"><span class="md-title">Zomato restaurants · Delhi NCR</span><span class="md-flag md-flag-real">PUBLIC DATA · KAGGLE</span></div>' +
      '<div class="kpis">' +
        kpiPlain("Restaurants", "7,947", "Delhi NCR") +
        kpiPlain("Rated", "73%", "4+ votes") +
        kpiPlain("Avg. rating", "3.28", "out of 5") +
      "</div>" +
      '<div class="md-row md-row-even"><div class="md-panel" data-p="rating"><div class="md-panel-title">Average rating by price range</div></div>' +
      '<div class="md-panel" data-p="unrated"><div class="md-panel-title">Share with no rating (&lt; 4 votes)</div></div></div>';
    var tip = tooltip(root);
    hBars(root.querySelector('[data-p="rating"]'), {
      items: [{ k: "Budget", v: 3.18 }, { k: "Mid-range", v: 3.25 }, { k: "Upscale", v: 3.57 }, { k: "Fine dining", v: 3.65 }],
      color: C.blue, fmt: function (v) { return v.toFixed(2); }, fmtLong: function (v) { return v.toFixed(2) + " / 5"; },
      aria: "Bar chart: average rating by price range, 3.18 budget to 3.65 fine dining"
    }, tip);
    hBars(root.querySelector('[data-p="unrated"]'), {
      items: [{ k: "Budget", v: 40 }, { k: "Mid-range", v: 15 }, { k: "Upscale", v: 4 }, { k: "Fine dining", v: 4 },
              { k: "No delivery", v: 36, c: C.amber }, { k: "Delivery", v: 4, c: C.amber }],
      color: C.cyan, fmt: function (v) { return v + "%"; }, fmtLong: function (v) { return v + "% not rated"; },
      aria: "Bar chart: share of restaurants with no rating, 40% budget to 4% fine dining; 36% without online delivery vs 4% with"
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
