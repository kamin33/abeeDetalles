/* Presentación del panel Abee Detalles. No realiza solicitudes ni guarda datos.
 * Los filtros conservan sus select originales y notifican al admin.js existente.
 * Los avisos leen los mensajes originales sin cambiar su contenido ni sus resultados.
 */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  let activeQuickFilter = null;
  let filterMenu;
  let filterOptions;
  let filterHighlight = 0;
  let filterSearch = "";
  let filterSearchTime = 0;
  let toastTimer;
  let progressAnimation;
  let lastAction = "info";
  let pendingAction = null;
  let returnFocus;
  const toast = $("admin-toast");
  const toastRegion = toast.parentElement;
  const progress = $("toast-progress");
  const dashboardMessage = $("dashboard-message");
    const toastIcons = {
    save: '<path d="M4 3h10l3 3v11H3V3z"/><path d="M6 3v5h7V3M6 17v-6h8v6"/>',
    delete: '<path d="M3.5 5.5h13M8 3h4l1 2.5H7L8 3zM5.5 5.5l1 11h7l1-11M8.5 8.5v5M11.5 8.5v5"/>',
    activate: '<path d="m7 4 9 6-9 6V4z"/>',
    pause: '<rect x="5" y="4" width="3" height="12" rx=".5"/><rect x="12" y="4" width="3" height="12" rx=".5"/>',
    login: '<path d="M12 3h5v14h-5M3 10h10M9 6l4 4-4 4"/>',
    load: '<path d="M16 7A6.5 6.5 0 1 0 16.5 12M16 3v4h-4"/>',
    import: '<path d="M10 3v9M6.5 8.5 10 12l3.5-3.5M4 13v4h12v-4"/>',
    info: '<circle cx="10" cy="10" r="7"/><path d="M10 9v4M10 6.5h.01"/>',
    error: '<circle cx="10" cy="10" r="7"/><path d="M10 5.5v5M10 14h.01"/>'
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
  }

  function syncQuickFilters() {
    document.querySelectorAll(".quick-filter").forEach(control => {
      const select = control.querySelector("select");
      const text = control.querySelector(".filter-value-text");
      const selected = select.selectedOptions[0]?.textContent || "";
      const isDefault = select.value === control.dataset.defaultValue;
      const label = isDefault ? control.dataset.defaultLabel : selected;
      if (text.textContent !== label) {
        text.classList.remove("is-overflowing");
        text.textContent = label;
      }
      control.classList.toggle("is-selected", !isDefault);
      control.title = `${select.getAttribute("aria-label")}: ${selected}`;
      control.querySelector(".quick-filter-display").setAttribute("aria-label", control.title);
    });
    measureQuickFilters();
  }

  function measureQuickFilters() {
    document.querySelectorAll(".filter-value-text").forEach(text => {
      const overflow = Math.max(0, Math.ceil(text.scrollWidth - text.parentElement.clientWidth));
      text.style.setProperty("--filter-travel", `${-overflow}px`);
      text.classList.toggle("is-overflowing", overflow > 1);
    });
  }

    function closeQuickFilter() {
    if (!activeQuickFilter) return;
    activeQuickFilter.button.setAttribute("aria-expanded", "false");
    activeQuickFilter.button.removeAttribute("aria-activedescendant");
    filterMenu.hidden = true;
    activeQuickFilter = null;
    filterSearch = "";
  }

  function highlightFilterOption(index, scroll = true) {
    const options = [...filterOptions.querySelectorAll('[role="option"]')];
    filterHighlight = Math.max(0, Math.min(index, options.length - 1));
    options.forEach((option, i) => option.classList.toggle("is-highlighted", i === filterHighlight));
    const option = options[filterHighlight];
    if (!option) return;
    activeQuickFilter.button.setAttribute("aria-activedescendant", option.id);
    if (scroll) option.scrollIntoView({ block: "nearest" });
  }

  function openQuickFilter(control) {
    closeQuickFilter();
    const button = control.querySelector(".quick-filter-display");
    const select = control.querySelector("select");
    activeQuickFilter = { control, button, select };
    $("product-filter-menu-title").textContent = select.getAttribute("aria-label");
    let previousGroup = null;
    filterOptions.innerHTML = [...select.options].map((option, index) => {
      const group = option.parentElement.tagName === "OPTGROUP" ? option.parentElement.label : null;
      const heading = group && group !== previousGroup ? `<div class="filter-menu-group" aria-hidden="true">${escapeHtml(group)}</div>` : "";
      previousGroup = group;
      return `${heading}<div id="product-filter-option-${index}" class="filter-menu-option" role="option" aria-selected="${option.selected}" data-option-index="${index}"><span>${escapeHtml(select.id === "product-category-filter" && option.value === "all" ? "Todas las categorías" : option.textContent)}</span><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
    }).join("");
    button.setAttribute("aria-expanded", "true");
    filterMenu.hidden = false;
    const bounds = button.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(264, document.documentElement.clientWidth - margin * 2);
    const below = window.innerHeight - bounds.bottom - margin - 8;
    const above = bounds.top - margin - 8;
    const openAbove = below < 240 && above > below;
    const available = openAbove ? above : below;
    filterOptions.style.setProperty("--filter-menu-space", `${Math.max(46, available - 54)}px`);
    filterMenu.style.width = `${width}px`;
    filterMenu.style.left = `${Math.max(margin, Math.min(bounds.left, document.documentElement.clientWidth - width - margin))}px`;
    filterMenu.style.top = `${openAbove ? bounds.top - filterMenu.offsetHeight - 8 : bounds.bottom + 8}px`;
    highlightFilterOption(select.selectedIndex);
  }

  function chooseFilterOption(index) {
    if (!activeQuickFilter) return;
    const { select, button } = activeQuickFilter;
    select.selectedIndex = index;
    closeQuickFilter();
    select.dispatchEvent(new Event("change", { bubbles: true }));
    button.focus({ preventScroll: true });
  }

  function initializeQuickFilters() {
    filterMenu = document.createElement("div");
    filterMenu.className = "filter-menu";
    filterMenu.hidden = true;
    filterMenu.innerHTML = '<p id="product-filter-menu-title" class="filter-menu-title"></p><div id="product-filter-options" class="filter-menu-options" role="listbox" aria-labelledby="product-filter-menu-title"></div>';
    document.body.appendChild(filterMenu);
    filterOptions = $("product-filter-options");
    document.querySelectorAll(".quick-filter").forEach(control => {
      const select = control.querySelector("select");
      const button = control.querySelector(".quick-filter-display");
      select.hidden = true;
      button.removeAttribute("tabindex");
      button.removeAttribute("aria-hidden");
      button.setAttribute("role", "combobox");
      button.setAttribute("aria-haspopup", "listbox");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", "product-filter-options");
      button.setAttribute("aria-label", select.getAttribute("aria-label"));
      button.addEventListener("click", () => {
        if (activeQuickFilter?.control === control) closeQuickFilter();
        else openQuickFilter(control);
      });
      button.addEventListener("keydown", event => {
        const isOpen = activeQuickFilter?.control === control;
        if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          if (!isOpen) {
            openQuickFilter(control);
            if (event.key === "Home") highlightFilterOption(0);
            if (event.key === "End") highlightFilterOption(select.options.length - 1);
          } else if (event.altKey && event.key === "ArrowUp") closeQuickFilter();
          else if (event.key === "Enter" || event.key === " ") chooseFilterOption(filterHighlight);
          else highlightFilterOption(event.key === "Home" ? 0 : event.key === "End" ? select.options.length - 1 : filterHighlight + (event.key === "ArrowDown" ? 1 : -1));
        } else if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          event.stopPropagation();
          closeQuickFilter();
        } else if (event.key === "Tab") closeQuickFilter();
        else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          if (!isOpen) openQuickFilter(control);
          const now = Date.now();
          filterSearch = now - filterSearchTime > 700 ? event.key : filterSearch + event.key;
          filterSearchTime = now;
          const normalize = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
          const index = [...select.options].findIndex(option => normalize(option.textContent).startsWith(normalize(filterSearch)));
          if (index >= 0) highlightFilterOption(index);
        }
      });
    });
    filterOptions.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse") event.preventDefault();
    });
    filterOptions.addEventListener("pointermove", event => {
      if (event.pointerType !== "mouse") return;
      const option = event.target.closest("[data-option-index]");
      if (option && activeQuickFilter) highlightFilterOption(Number(option.dataset.optionIndex), false);
    });
    filterOptions.addEventListener("click", event => {
      const option = event.target.closest("[data-option-index]");
      if (option) chooseFilterOption(Number(option.dataset.optionIndex));
    });
    document.addEventListener("pointerdown", event => {
      if (activeQuickFilter && !activeQuickFilter.control.contains(event.target) && !filterMenu.contains(event.target)) closeQuickFilter();
    });
    document.addEventListener("focusin", event => {
      if (activeQuickFilter && !activeQuickFilter.control.contains(event.target) && !filterMenu.contains(event.target)) closeQuickFilter();
    });
    document.addEventListener("scroll", event => {
      if (activeQuickFilter && !filterMenu.contains(event.target)) closeQuickFilter();
    }, true);
    window.addEventListener("resize", closeQuickFilter, { passive: true });
  }



  function dismissToast() {
    clearTimeout(toastTimer);
    progressAnimation?.cancel();
    const restore = toast.contains(document.activeElement);
    toast.hidden = true;
    if (restore && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  }

  function notify(text, variant = "success", action = lastAction) {
    clearTimeout(toastTimer);
    progressAnimation?.cancel();
    if (!text.trim()) return;
    if (!toast.contains(document.activeElement)) returnFocus = document.activeElement;
    toast.dataset.variant = variant;
    toast.dataset.action = action;
    $("toast-action-icon").innerHTML = toastIcons[variant === "error" ? "error" : action] || toastIcons.info;
    $("toast-copy").textContent = text;
    const host = document.querySelector("dialog[open]") || document.body;
    if (toastRegion.parentElement !== host) host.appendChild(toastRegion);
    toast.hidden = false;
    if (variant === "loading") {
      progressAnimation = progress.animate([
        { transform: "translateX(-35%) scaleX(.35)" },
        { transform: "translateX(100%) scaleX(.35)" }
      ], { duration: 1200, iterations: Infinity, easing: "linear" });
    } else {
      pendingAction = null;
      progressAnimation = progress.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], { duration: 3000, easing: "linear", fill: "forwards" });
      toastTimer = setTimeout(dismissToast, 3000);
    }
  }

  function readMessage(element) {
    const text = element.textContent.trim();
    if (!text) return;
    const success = element.classList.contains("success");
    if (element.id === "info-message") {
      element.hidden = success;
      if (!success && pendingAction !== "save") return;
    }
    if (element.id === "editor-message" && pendingAction !== "save") return;
    if (element.id === "login-message" && pendingAction !== "login") return;
    const loading = /^Importando catálogo/.test(text);
    let action = element.id === "info-message" ? "save" : lastAction;
    if (/^Producto activado/.test(text)) action = "activate";
    if (/^Producto puesto como inactivo/.test(text)) action = "pause";
    if (/^Elemento eliminado/.test(text)) action = "delete";
    if (/^Cambios guardados/.test(text)) action = "save";
    if (/^Se importaron|^Importando catálogo/.test(text)) action = "import";
    notify(text, loading ? "loading" : success ? "success" : "error", action);
  }

  // Solo se registra el contexto visual. Los manejadores originales ejecutan las acciones.
  document.addEventListener("click", event => {
    const toggle = event.target.closest("[data-toggle-product]");
    if (toggle && !toggle.disabled) {
      lastAction = toggle.getAttribute("aria-pressed") === "true" ? "pause" : "activate";
      pendingAction = lastAction;
      notify(lastAction === "pause" ? "Pausando producto…" : "Activando producto…", "loading", lastAction);
    } else if (event.target.closest("[data-delete-product], [data-delete-banner]")) lastAction = "delete";
    else if (event.target.closest("#import-legacy")) lastAction = "import";
  }, true);
  document.addEventListener("submit", event => {
    if (!["login-form", "editor-form", "store-info-form"].includes(event.target.id)) return;
    lastAction = event.target.id === "login-form" ? "login" : "save";
    pendingAction = lastAction;
    notify(lastAction === "login" ? "Iniciando sesión…" : "Guardando cambios…", "loading", lastAction);
  }, true);
  ["dashboard-message", "info-message", "editor-message", "login-message"].forEach(id => {
    const element = $(id);
    new MutationObserver(() => readMessage(element)).observe(element, { childList: true, characterData: true, subtree: true });
  });
  new MutationObserver(() => {
    if (pendingAction === "login" && !$("dashboard-view").hidden) notify("Sesión iniciada correctamente.", "success", "login");
  }).observe($("products-list"), { childList: true });
  $("dismiss-toast").addEventListener("click", dismissToast);
  $("editor-dialog").addEventListener("close", () => {
    if (toastRegion.parentElement !== document.body) document.body.appendChild(toastRegion);
  });

  document.querySelectorAll(".quick-filter").forEach(control => {
    const select = control.querySelector("select");
    control.dataset.defaultValue = select.value;
    select.addEventListener("change", syncQuickFilters);
  });
  initializeQuickFilters();
  new MutationObserver(syncQuickFilters).observe($("product-category-filter"), { childList: true });
  window.addEventListener("resize", measureQuickFilters, { passive: true });
  dashboardMessage.hidden = true;
  syncQuickFilters();
})();
