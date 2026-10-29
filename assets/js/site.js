(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs";
  var dark = window.matchMedia("(prefers-color-scheme: dark)");

  function effectiveTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return dark.matches ? "dark" : "light";
  }

  /* Theme toggle: Auto -> opposite of system -> system -> ... The choice is stored. */
  function storedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function setTheme(t) {
    if (t) root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
    try { if (t) localStorage.setItem("theme", t); else localStorage.removeItem("theme"); } catch (e) {}
    updateThemeLabel();
    renderDiagrams();
  }
  function updateThemeLabel() {
    var label = document.querySelector("[data-theme-label]");
    if (!label) return;
    var t = storedTheme();
    label.textContent = t ? (t === "dark" ? "Dark" : "Light") : "Auto (" + (dark.matches ? "dark" : "light") + ")";
  }

  /* Mobile menu */
  function initMenu() {
    var btn = document.querySelector(".menu-button");
    var bar = document.querySelector(".sidebar");
    if (!btn || !bar) return;
    btn.addEventListener("click", function () {
      var open = bar.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
    bar.addEventListener("click", function (e) {
      if (e.target.closest(".subnav a") && bar.classList.contains("is-open")) btn.click();
    });
  }

  /* Section navigation built from the page's h2 headings, highlighted on scroll */
  function initSubnav() {
    var list = document.querySelector("[data-subnav]");
    var heads = Array.prototype.slice.call(document.querySelectorAll("main h2[id]"));
    if (!list || heads.length < 2) return;
    var links = heads.map(function (h, i) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      var n = String(i + 1);
      a.textContent = (n.length < 2 ? "0" + n : n) + "  " + h.textContent.trim();
      li.appendChild(a);
      list.appendChild(li);
      return a;
    });
    list.hidden = false;

    function update() {
      var y = window.scrollY + window.innerHeight * 0.3;
      var current = 0;
      heads.forEach(function (h, i) { if (h.getBoundingClientRect().top + window.scrollY <= y) current = i; });
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = heads.length - 1;
      links.forEach(function (a, i) {
        a.classList.toggle("is-active", i === current);
        if (i === current) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
      });
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    update();
  }

  /* Mermaid: fenced ```mermaid blocks and card sources become diagrams */
  var mermaidPromise = null;
  var diagrams = [];
  function collectDiagrams() {
    document.querySelectorAll("pre > code.language-mermaid").forEach(function (code) {
      var div = document.createElement("div");
      div.className = "diagram";
      div.setAttribute("data-src", code.textContent);
      code.parentNode.replaceWith(div);
    });
    document.querySelectorAll("pre.mermaid-src").forEach(function (pre) {
      var div = document.createElement("div");
      div.className = "card-diagram";
      div.setAttribute("data-src", pre.textContent);
      pre.replaceWith(div);
    });
    diagrams = Array.prototype.slice.call(document.querySelectorAll("[data-src]"));
  }
  function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  var renderSeq = 0;
  function renderDiagrams() {
    if (!diagrams.length) return;
    if (!mermaidPromise) mermaidPromise = import(MERMAID_URL).then(function (m) { return m.default; });
    var seq = ++renderSeq;
    mermaidPromise.then(function (mermaid) {
      var base = {
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: cssVar("--font-sans"),
        flowchart: { htmlLabels: false, curve: "basis", useMaxWidth: true },
        themeVariables: {
          darkMode: effectiveTheme() === "dark",
          background: cssVar("--surface"),
          primaryColor: cssVar("--surface"),
          primaryTextColor: cssVar("--text"),
          primaryBorderColor: cssVar("--accent"),
          secondaryColor: cssVar("--surface-2"),
          tertiaryColor: cssVar("--surface-2"),
          lineColor: cssVar("--muted"),
          textColor: cssVar("--text"),
          clusterBkg: cssVar("--surface-2"),
          clusterBorder: cssVar("--border"),
          edgeLabelBackground: cssVar("--surface"),
          fontSize: "15px"
        }
      };
      diagrams.reduce(function (p, el, i) {
        return p.then(function () {
          if (seq !== renderSeq) return;
          var small = el.classList.contains("card-diagram");
          mermaid.initialize(Object.assign({}, base, { flowchart: small
            ? { htmlLabels: false, curve: "basis", useMaxWidth: true, nodeSpacing: 18, rankSpacing: 22, padding: 6, diagramPadding: 2 }
            : { htmlLabels: false, curve: "basis", useMaxWidth: true } }));
          return mermaid.render("mmd-" + seq + "-" + i, el.getAttribute("data-src")).then(function (out) {
            if (seq === renderSeq) el.innerHTML = out.svg;
          }).catch(function () { el.textContent = ""; });
        });
      }, Promise.resolve());
    }).catch(function () { /* Diagrams are an enhancement; the text still reads without them. */ });
  }

  /* Card filters: one active value per group, cards must match every group */
  function initFilters() {
    var box = document.querySelector("[data-filters]");
    if (!box) return;
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-filter-item]"));
    var count = document.querySelector("[data-filter-count]");
    var state = {};
    box.hidden = false;
    function apply() {
      var shown = 0;
      items.forEach(function (it) {
        var ok = Object.keys(state).every(function (g) {
          return state[g] === "all" || (it.getAttribute("data-" + g) || "").split("|").indexOf(state[g]) !== -1;
        });
        it.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown + " of " + items.length + " projects";
    }
    box.querySelectorAll("[data-filter-group]").forEach(function (group) {
      var g = group.getAttribute("data-filter-group");
      state[g] = "all";
      group.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-value]");
        if (!b) return;
        state[g] = b.getAttribute("data-value");
        group.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) toggle.addEventListener("click", function () {
      setTheme(effectiveTheme() === "dark" ? "light" : "dark");
    });
    updateThemeLabel();
    var onSystemChange = function () { updateThemeLabel(); if (!storedTheme()) renderDiagrams(); };
    if (dark.addEventListener) dark.addEventListener("change", onSystemChange); else if (dark.addListener) dark.addListener(onSystemChange);
    initMenu();
    initSubnav();
    initFilters();
    collectDiagrams();
    renderDiagrams();
  });
})();
