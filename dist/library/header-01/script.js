/**
 * Header 01 — menu mobile, scroll e acessibilidade
 * Vanilla JS, sem dependências.
 */
(function () {
  "use strict";

  const BREAKPOINT = 768;
  const header = document.querySelector(".ui-header");
  const toggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#primary-menu");
  const backdrop = document.querySelector("#menu-backdrop");
  const drawerClose = document.querySelector("#drawer-close");

  if (!header || !toggle || !nav || !backdrop) return;

  let menuOpen = false;

  function isMobileLayout() {
    return window.innerWidth < BREAKPOINT;
  }

  function syncHeaderHeight() {
    const h = header.offsetHeight;
    document.documentElement.style.setProperty("--ui-header-h", `${h}px`);
  }

  function getNavFocusables() {
    return Array.from(nav.querySelectorAll("a[href], button:not([disabled])"));
  }

  function updateNavTabindex(open) {
    const controls = getNavFocusables();
    if (!isMobileLayout()) {
      controls.forEach((el) => el.removeAttribute("tabindex"));
      return;
    }
    if (open) {
      controls.forEach((el) => el.removeAttribute("tabindex"));
    } else {
      controls.forEach((el) => el.setAttribute("tabindex", "-1"));
    }
  }

  function trapFocus(e) {
    if (!menuOpen || !isMobileLayout()) return;
    if (e.key !== "Tab") return;
    const nodes = getNavFocusables();
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /**
   * @param {boolean} open
   * @param {{ restoreFocusToToggle?: boolean }} [options]
   */
  function setMenuOpen(open, options) {
    const restoreFocusToToggle = options && options.restoreFocusToToggle;
    const wasOpen = menuOpen;
    menuOpen = open;

    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-visible", open);
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");

    toggle.setAttribute(
      "aria-label",
      open ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );

    if (isMobileLayout()) {
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    } else {
      nav.removeAttribute("aria-hidden");
      document.body.style.overflow = "";
      backdrop.classList.remove("is-visible");
      backdrop.setAttribute("aria-hidden", "true");
    }

    updateNavTabindex(open);

    if (open && isMobileLayout()) {
      const first = getNavFocusables()[0];
      if (first) window.requestAnimationFrame(() => first.focus());
    }

    if (wasOpen && !open && restoreFocusToToggle) {
      window.requestAnimationFrame(() => toggle.focus());
    }
  }

  function closeMenuIfNeeded() {
    if (menuOpen && !isMobileLayout()) {
      setMenuOpen(false, { restoreFocusToToggle: true });
    }
    if (!isMobileLayout()) {
      nav.removeAttribute("aria-hidden");
      document.body.style.overflow = "";
      backdrop.classList.remove("is-visible");
      backdrop.setAttribute("aria-hidden", "true");
      updateNavTabindex(false);
    }
  }

  function toggleMenu() {
    if (!isMobileLayout()) return;
    setMenuOpen(!menuOpen);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    });
  }

  toggle.addEventListener("click", toggleMenu);

  if (drawerClose) {
    drawerClose.addEventListener("click", () => {
      if (menuOpen) setMenuOpen(false, { restoreFocusToToggle: true });
    });
  }

  backdrop.addEventListener("click", () => {
    if (menuOpen) setMenuOpen(false, { restoreFocusToToggle: true });
  });

  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || !isMobileLayout() || !menuOpen) return;
    setMenuOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) {
      setMenuOpen(false, { restoreFocusToToggle: true });
    }
    trapFocus(e);
  });

  window.addEventListener("resize", () => {
    syncHeaderHeight();
    closeMenuIfNeeded();
  });

  window.addEventListener("scroll", onScroll, { passive: true });

  syncHeaderHeight();
  onScroll();

  if (isMobileLayout()) {
    nav.setAttribute("aria-hidden", "true");
    updateNavTabindex(false);
  }
})();
