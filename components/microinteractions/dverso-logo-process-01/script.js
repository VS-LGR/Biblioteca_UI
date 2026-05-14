/**
 * DVERSO logo process 01 — desktop: aria-expanded / aria-hidden nos painéis.
 * Mobile: acordeão simples. Escape: fecha painel mobile aberto ou retira foco.
 */
(function () {
  "use strict";

  const mqDesktop = window.matchMedia("(min-width: 720px)");

  function setDesktopHotspotOpen(hotspot, open) {
    const btn = hotspot.querySelector(".dlp-hotspot__trigger");
    const panel = hotspot.querySelector(".dlp-panel");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function initDesktopHotspots() {
    const hotspots = document.querySelectorAll(".dlp-hotspot");
    hotspots.forEach((hotspot) => {
      const leave = () => setDesktopHotspotOpen(hotspot, false);
      hotspot.addEventListener("pointerenter", () => {
        if (!mqDesktop.matches) return;
        setDesktopHotspotOpen(hotspot, true);
      });
      hotspot.addEventListener("pointerleave", () => {
        if (!mqDesktop.matches) return;
        leave();
      });
      hotspot.addEventListener("focusin", () => {
        if (!mqDesktop.matches) return;
        setDesktopHotspotOpen(hotspot, true);
      });
      hotspot.addEventListener("focusout", (ev) => {
        if (!mqDesktop.matches) return;
        const next = ev.relatedTarget;
        if (next && hotspot.contains(next)) return;
        requestAnimationFrame(() => {
          if (!hotspot.contains(document.activeElement)) leave();
        });
      });
    });
  }

  function closeMobileItem(item) {
    const btn = item.querySelector(".dlp-mobile__toggle");
    const panel = item.querySelector(".dlp-mobile__panel");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    item.classList.remove("is-open");
  }

  function openMobileItem(item) {
    const btn = item.querySelector(".dlp-mobile__toggle");
    const panel = item.querySelector(".dlp-mobile__panel");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    item.classList.add("is-open");
  }

  function toggleMobileItem(item) {
    const open = item.classList.contains("is-open");
    if (open) closeMobileItem(item);
    else openMobileItem(item);
  }

  function initMobileAccordion() {
    const items = document.querySelectorAll(".dlp-mobile__item");
    items.forEach((item) => {
      const btn = item.querySelector(".dlp-mobile__toggle");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((other) => {
          if (other !== item) closeMobileItem(other);
        });
        if (willOpen) openMobileItem(item);
        else closeMobileItem(item);
      });
    });
  }

  function initEscape() {
    document.addEventListener("keydown", (ev) => {
      if (ev.key !== "Escape") return;
      const active = document.activeElement;

      const mobileItem = active && active.closest(".dlp-mobile__item");
      if (mobileItem && mobileItem.classList.contains("is-open")) {
        ev.preventDefault();
        closeMobileItem(mobileItem);
        const btn = mobileItem.querySelector(".dlp-mobile__toggle");
        btn && btn.focus();
        return;
      }

      if (active && active.classList.contains("dlp-hotspot__trigger")) {
        ev.preventDefault();
        active.blur();
      }
    });
  }

  function syncDesktopAriaOnResize() {
    mqDesktop.addEventListener("change", () => {
      document.querySelectorAll(".dlp-hotspot").forEach((h) => {
        setDesktopHotspotOpen(h, false);
      });
    });
  }

  initDesktopHotspots();
  initMobileAccordion();
  initEscape();
  syncDesktopAriaOnResize();
})();
