/**
 * Livro de projetos 01 — constrói UI a partir do JSON embutido, spreads,
 * hotspots ↔ destaque no texto, teclado e modo mobile (uma face).
 */
(function () {
  "use strict";

  var rootMount = document.getElementById("project-book-root");
  var dataEl = document.getElementById("project-book-data");
  if (!rootMount || !dataEl || !dataEl.textContent) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch (e) {
    rootMount.innerHTML =
      "<p>Erro ao ler dados do livro. Verifique o JSON em #project-book-data.</p>";
    return;
  }

  var spreads = data.spreads || [];
  var lang =
    document.documentElement.lang && document.documentElement.lang.indexOf("en") === 0
      ? "en"
      : "pt";

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function buildMock(variant) {
    var wrap = document.createElement("div");
    wrap.className = "pb-mock" + (variant === "data" ? " pb-mock--data" : "");
    wrap.innerHTML =
      '<div class="pb-mock__hud" aria-hidden="true"></div>' +
      '<div class="pb-mock__panel" aria-hidden="true"></div>' +
      '<div class="pb-mock__dock" aria-hidden="true"></div>' +
      '<div class="pb-mock__chart" aria-hidden="true"></div>' +
      '<div class="pb-mock__table" aria-hidden="true"></div>';
    return wrap;
  }

  function buildHotspots(container, list) {
    (list || []).forEach(function (h) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pb-hotspot";
      btn.dataset.target = h.id;
      btn.textContent = h.label;
      btn.style.top = h.topPct + "%";
      btn.style.left = h.leftPct + "%";
      btn.style.width = h.widthPct + "%";
      btn.style.height = h.heightPct + "%";
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute(
        "aria-label",
        (lang === "en" ? "Highlight: " : "Destacar: ") + h.label
      );
      container.appendChild(btn);
    });
  }

  function buildTextColumn(spread) {
    var col = document.createElement("div");
    col.className = "pb-page pb-page--right";
    col.setAttribute("data-page", "right");

    var h2 = document.createElement("h2");
    h2.className = "pb-page__heading";
    h2.textContent = spread.rightHeadingPt || "Notas";
    col.appendChild(h2);

    var text = document.createElement("div");
    text.className = "pb-text";

    (spread.blocks || []).forEach(function (b) {
      var ref = b.ref;
      var title = lang === "en" && b.titleEn ? b.titleEn : b.titlePt;
      var body = lang === "en" && b.bodyEn ? b.bodyEn : b.bodyPt;
      var block = document.createElement("article");
      block.className = "pb-block";
      block.dataset.ref = ref;
      block.innerHTML =
        "<h3 class=\"pb-block__title\">" +
        esc(title) +
        "</h3><p class=\"pb-block__body\">" +
        esc(body) +
        "</p>";
      text.appendChild(block);
    });

    col.appendChild(text);
    return col;
  }

  function buildLeftColumn(spread, variant) {
    var col = document.createElement("div");
    col.className = "pb-page pb-page--left";
    col.setAttribute("data-page", "left");

    var h2 = document.createElement("h2");
    h2.className = "pb-page__heading";
    h2.textContent = spread.leftHeadingPt || "Vista do projeto";
    col.appendChild(h2);

    var t = document.createElement("h3");
    t.className = "pb-page__title";
    t.textContent = spread.projectTitle || "";
    col.appendChild(t);

    var mock = buildMock(variant);
    buildHotspots(mock, spread.hotspots);
    col.appendChild(mock);
    return col;
  }

  function buildSpreadArticle(spread, index, variant) {
    var art = document.createElement("article");
    art.className = "pb-spread";
    art.dataset.spreadIndex = String(index);
    if (index === 0) art.classList.add("is-active");
    art.setAttribute("aria-hidden", index === 0 ? "false" : "true");
    art.id = "pb-spread-" + index;

    art.appendChild(buildLeftColumn(spread, variant));
    art.appendChild(buildTextColumn(spread));

    return art;
  }

  var book = document.createElement("section");
  book.className = "project-book";
  book.id = "project-book";
  book.dataset.mobileFace = "left";
  book.setAttribute(
    "aria-label",
    lang === "en" ? data.bookLabelEn || "Project book" : data.bookLabelPt || "Livro de projetos"
  );

  var live = document.createElement("div");
  live.className = "pb-live";
  live.setAttribute("aria-live", "polite");
  live.id = "pb-announcer";

  var frame = document.createElement("div");
  frame.className = "pb-frame";

  var controlsTop = document.createElement("div");
  controlsTop.className = "pb-controls";

  var btnPrev = document.createElement("button");
  btnPrev.type = "button";
  btnPrev.className = "pb-btn";
  btnPrev.id = "pb-prev";
  btnPrev.textContent = lang === "en" ? "Previous" : "Anterior";

  var indicator = document.createElement("span");
  indicator.className = "pb-controls__indicator";
  indicator.id = "pb-indicator";

  var btnNext = document.createElement("button");
  btnNext.type = "button";
  btnNext.className = "pb-btn";
  btnNext.id = "pb-next";
  btnNext.textContent = lang === "en" ? "Next" : "Seguinte";

  controlsTop.appendChild(btnPrev);
  controlsTop.appendChild(indicator);
  controlsTop.appendChild(btnNext);

  var outer = document.createElement("div");
  outer.className = "pb-spreads-outer";
  var spreadsEl = document.createElement("div");
  spreadsEl.className = "pb-spreads";
  spreadsEl.id = "pb-spreads";

  spreads.forEach(function (sp, i) {
    var variant = i === 1 ? "data" : "console";
    spreadsEl.appendChild(buildSpreadArticle(sp, i, variant));
  });

  outer.appendChild(spreadsEl);

  var mobileRow = document.createElement("div");
  mobileRow.className = "pb-mobile-toggles";
  var btnFaceL = document.createElement("button");
  btnFaceL.type = "button";
  btnFaceL.className = "pb-btn";
  btnFaceL.dataset.face = "left";
  btnFaceL.textContent = lang === "en" ? "Project view" : "Vista do projeto";
  var btnFaceR = document.createElement("button");
  btnFaceR.type = "button";
  btnFaceR.className = "pb-btn";
  btnFaceR.dataset.face = "right";
  btnFaceR.textContent = lang === "en" ? "Notes" : "Texto";
  mobileRow.appendChild(btnFaceL);
  mobileRow.appendChild(btnFaceR);

  frame.appendChild(controlsTop);
  frame.appendChild(outer);
  frame.appendChild(mobileRow);

  book.appendChild(live);
  book.appendChild(frame);
  rootMount.appendChild(book);

  var current = 0;
  var total = spreads.length;
  var activeHotspot = null;

  function announce(msg) {
    live.textContent = "";
    window.requestAnimationFrame(function () {
      live.textContent = msg;
    });
  }

  function updateIndicator() {
    indicator.textContent =
      lang === "en"
        ? "Spread " + (current + 1) + " / " + total
        : "Página " + (current + 1) + " de " + total;
    btnPrev.disabled = current <= 0;
    btnNext.disabled = current >= total - 1;
  }

  function setSpread(next) {
    if (next < 0 || next >= total) return;
    current = next;
    var nodes = spreadsEl.querySelectorAll(".pb-spread");
    nodes.forEach(function (node, i) {
      var on = i === current;
      node.classList.toggle("is-active", on);
      node.setAttribute("aria-hidden", on ? "false" : "true");
    });
    clearHotspotHighlight();
    var sp = spreads[current];
    var msg = lang === "en" ? sp.announcerEn || sp.announcerPt : sp.announcerPt;
    announce(msg || "");
    updateIndicator();
  }

  function clearHotspotHighlight() {
    activeHotspot = null;
    spreadsEl.querySelectorAll(".pb-hotspot.is-active").forEach(function (b) {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    spreadsEl.querySelectorAll(".pb-block.is-highlighted").forEach(function (el) {
      el.classList.remove("is-highlighted");
    });
  }

  function applyHighlight(targetId) {
    spreadsEl.querySelectorAll(".pb-block").forEach(function (block) {
      block.classList.toggle("is-highlighted", block.dataset.ref === targetId);
    });
  }

  function onHotspotClick(ev) {
    var btn = ev.target.closest(".pb-hotspot");
    if (!btn || !spreadsEl.contains(btn)) return;
    var id = btn.dataset.target;
    if (activeHotspot === btn) {
      clearHotspotHighlight();
      return;
    }
    activeHotspot = btn;
    spreadsEl.querySelectorAll(".pb-hotspot").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    applyHighlight(id);
  }

  spreadsEl.addEventListener("click", onHotspotClick);

  btnPrev.addEventListener("click", function () {
    setSpread(current - 1);
  });
  btnNext.addEventListener("click", function () {
    setSpread(current + 1);
  });

  mobileRow.addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-face]");
    if (!b) return;
    book.dataset.mobileFace = b.dataset.face;
    mobileRow.querySelectorAll("button[data-face]").forEach(function (x) {
      x.classList.toggle("is-active", x.dataset.face === b.dataset.face);
    });
  });
  btnFaceL.classList.add("is-active");

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      clearHotspotHighlight();
      return;
    }
    if (ev.key === "ArrowLeft") {
      setSpread(current - 1);
    } else if (ev.key === "ArrowRight") {
      setSpread(current + 1);
    }
  });

  updateIndicator();
  announce(
    lang === "en"
      ? spreads[0] && spreads[0].announcerEn
      : spreads[0] && spreads[0].announcerPt
  );
})();
