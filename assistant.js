(function () {
  const PHONE_NUMBER = "51944863950";
  const DEFAULT_INFO = {
    shipping: "Consulta las zonas y el costo de entrega por WhatsApp.",
    payment: "Coordinamos el pago y el adelanto por WhatsApp.",
    hours: "Atendemos consultas por WhatsApp e Instagram.",
    location: "",
    customization: "Algunos detalles pueden personalizarse. Escríbenos para confirmar.",
    whatsapp: PHONE_NUMBER
  };
  const state = { products: [], info: DEFAULT_INFO, open: false };
  const $ = id => document.getElementById(id);
  const PANEL_POSITION_KEY = "abee_assistant_panel_position_v4";
  const BUTTON_POSITION_KEY = "abee_assistant_button_position_v1";
  let restorePanelPosition = () => {};

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[character]));
  }

  function formatPrice(price) {
    return `S/ ${Number(price).toFixed(2)}`;
  }

  function productText(product) {
    return normalize([
      product.name, product.category, product.desc,
      product.offerText || product.offer_text, ...(product.colors || [])
    ].join(" "));
  }

  function extractBudget(query) {
    const match = normalize(query).match(/(?:s\/|soles?|menos de|hasta)\s*(\d+(?:[.,]\d+)?)/i);
    return match ? Number(match[1].replace(",", ".")) : null;
  }

  function recommend(query) {
    const terms = normalize(query).split(/\s+/).filter(term => term.length > 2);
    const budget = extractBudget(query);
    const scored = state.products
      .filter(product => product.active !== false)
      .map(product => {
        const text = productText(product);
        let score = terms.reduce((total, term) => total + (text.includes(term) ? 2 : 0), 0);
        if (budget !== null) score += Number(product.price) <= budget ? 3 : -2;
        if (/\bbarat|econom|presupuesto|menos|hasta\b/.test(normalize(query)) && Number(product.price) <= 10) score += 2;
        if (/\bregalo|detalle|sorpresa\b/.test(normalize(query))) score += product.desc ? 1 : 0;
        return { product, score };
      })
      .sort((a, b) => b.score - a.score || Number(a.product.price) - Number(b.product.price));

    const relevant = scored.filter(item => item.score > 0);
    return (relevant.length ? relevant : scored).slice(0, 3).map(item => item.product);
  }

  function answer(query) {
    const text = normalize(query);
    const info = state.info;
    if (/\b(envio|entrega|delivery|zona|llega)\b/.test(text)) return { text: info.shipping || DEFAULT_INFO.shipping };
    if (/\b(pago|pagar|yape|plin|adelanto|transferencia)\b/.test(text)) return { text: info.payment || DEFAULT_INFO.payment };
    if (/\b(horario|atienden|atencion|abierto)\b/.test(text)) return { text: info.hours || DEFAULT_INFO.hours };
    if (/\b(donde|ubicacion|direccion|recoger)\b/.test(text) && info.location) return { text: info.location };
    if (/\b(personaliz|nombre|color|medida)\b/.test(text) && info.customization) return { text: info.customization };
    const products = recommend(query);
    const asksForProduct = /\b(producto|recomiend|busco|quiero|regalo|detalle|llavero|maceta|flor|color|precio|cuesta|s\/)\b/.test(text);
    if (asksForProduct || products.length) return { text: "Estas opciones podrían gustarte:", products };
    return {
      text: "Puedo ayudarte con productos, precios, ofertas, colores, envíos, pagos y personalización. ¿Qué detalle estás buscando?",
      contact: true
    };
  }

  function renderMessage(message, type) {
    const container = $("assistant-messages");
    const content = document.createElement("div");
    content.className = `assistant-message ${type}`;
    content.innerHTML = `<p>${escapeHtml(message.text)}</p>`;
    if (message.products?.length) {
      content.insertAdjacentHTML("beforeend", `<div class="assistant-products">${message.products.map(product => `
        <article class="assistant-product">
          <img src="${escapeHtml(product.img)}" alt="${escapeHtml(product.name)}">
          <div><strong>${escapeHtml(product.name)}</strong><span>${formatPrice(product.price)}</span><small>${escapeHtml(product.offerText || product.offer_text || "")}</small></div>
          <button type="button" data-assistant-product="${escapeHtml(product.id)}">Ver</button>
        </article>`).join("")}</div>`);
    }
    if (message.contact) {
        const phone = String(state.info.whatsapp || PHONE_NUMBER).replace(/\D/g, "");
        content.insertAdjacentHTML("beforeend", `<a class="assistant-contact" href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>`);
    }
    container.appendChild(content);
    container.scrollTop = container.scrollHeight;
  }

  function submit(event) {
    event.preventDefault();
    const input = $("assistant-input");
    const query = input.value.trim();
    if (!query) return;
    renderMessage({ text: query }, "user");
    input.value = "";
    renderMessage(answer(query), "bot");
  }

  function toggle(force) {
    state.open = typeof force === "boolean" ? force : !state.open;
    $("assistant-panel").hidden = !state.open;
    $("assistant-toggle").setAttribute("aria-expanded", String(state.open));
    if (state.open) {
      restorePanelPosition();
    }
  }

  window.closeAssistant = function () {
    state.open = false;
    const panel = $("assistant-panel");
    const toggleButton = $("assistant-toggle");
    if (panel) panel.setAttribute("hidden", "");
    if (toggleButton) toggleButton.setAttribute("aria-expanded", "false");
  };

  window.openAssistant = function () {
    state.open = true;
    const panel = $("assistant-panel");
    const toggleButton = $("assistant-toggle");
    if (panel) panel.removeAttribute("hidden");
    if (toggleButton) toggleButton.setAttribute("aria-expanded", "true");
    restorePanelPosition();
  };

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && state.open) toggle(false);
  });

  function setupDragging() {
    const panel = document.querySelector(".assistant-panel");
    const header = document.querySelector(".assistant-header");
    const button = document.querySelector(".assistant-toggle");
    if (!panel || !header || !button) return;

    const viewport = () => {
      const visual = window.visualViewport;
      return {
        width: visual?.width || window.innerWidth,
        height: visual?.height || window.innerHeight,
        offsetTop: visual?.offsetTop || 0,
        offsetLeft: visual?.offsetLeft || 0
      };
    };

    function clampPosition(element, left, top, minimumTop = 8) {
      const view = viewport();
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return {
        left: Math.max(view.offsetLeft + 8, Math.min(left, view.offsetLeft + view.width - width - 8)),
        top: Math.max(view.offsetTop + minimumTop, Math.min(top, view.offsetTop + view.height - height - 8))
      };
    }

    function applyPosition(element, key, left, top, minimumTop = 8, persist = true) {
      const position = clampPosition(element, left, top, minimumTop);
      element.style.left = `${position.left}px`;
      element.style.top = `${position.top}px`;
      element.style.right = "auto";
      element.style.bottom = "auto";
      if (persist) localStorage.setItem(key, JSON.stringify(position));
    }

    function readPosition(key) {
      try {
        return JSON.parse(localStorage.getItem(key) || "null");
      } catch (error) {
        console.warn("No se pudo recuperar la posición del asistente.", error);
        return null;
      }
    }

    const savedPanel = readPosition(PANEL_POSITION_KEY);
    const savedButton = readPosition(BUTTON_POSITION_KEY);
    restorePanelPosition = () => {
      if (savedPanel && Number.isFinite(savedPanel.left) && Number.isFinite(savedPanel.top)) {
        applyPosition(panel, PANEL_POSITION_KEY, savedPanel.left, savedPanel.top, 8, false);
      }
    };
    if (savedButton && Number.isFinite(savedButton.left) && Number.isFinite(savedButton.top)) {
      applyPosition(button, BUTTON_POSITION_KEY, savedButton.left, savedButton.top, 8, false);
    }

    function makeDraggable(element, handle, key, minimumTop) {
      let dragging = false;
      let moved = false;
      let offsetX = 0;
      let offsetY = 0;
      handle.addEventListener("pointerdown", event => {
        if (event.target.closest("button") && element === panel) return;
        const bounds = element.getBoundingClientRect();
        dragging = true;
        moved = false;
        offsetX = event.clientX - bounds.left;
        offsetY = event.clientY - bounds.top;
        handle.setPointerCapture(event.pointerId);
        handle.classList.add("is-dragging");
      });
      handle.addEventListener("pointermove", event => {
        if (!dragging) return;
        moved = true;
        applyPosition(element, key, event.clientX - offsetX, event.clientY - offsetY, minimumTop);
      });
      handle.addEventListener("pointerup", event => {
        if (!dragging) return;
        dragging = false;
        handle.releasePointerCapture(event.pointerId);
        handle.classList.remove("is-dragging");
        if (element === button) {
          button.dataset.dragged = moved ? "true" : "false";
        }
      });
      handle.addEventListener("pointercancel", () => {
        dragging = false;
        handle.classList.remove("is-dragging");
      });
    }

    makeDraggable(panel, header, PANEL_POSITION_KEY, 8);
    makeDraggable(button, button, BUTTON_POSITION_KEY, 8);

    const keepVisible = () => {
      if (panel.style.left && panel.style.top && !panel.hidden) {
        const bounds = panel.getBoundingClientRect();
        applyPosition(panel, PANEL_POSITION_KEY, bounds.left, bounds.top, 8, false);
      }
      if (button.style.left && button.style.top) {
        const bounds = button.getBoundingClientRect();
        applyPosition(button, BUTTON_POSITION_KEY, bounds.left, bounds.top, 8, false);
      }
    };
    window.addEventListener("resize", keepVisible);
    window.visualViewport?.addEventListener("resize", keepVisible);
  }

  async function initialize() {
    if (!window.catalogService) return;
    $("assistant-form").addEventListener("submit", submit);
    $("assistant-toggle").addEventListener("click", event => {
      if (event.currentTarget.dataset.dragged === "true") {
        event.currentTarget.dataset.dragged = "";
        return;
      }
      event.currentTarget.dataset.dragged = "";
      toggle();
    });
    $("assistant-close").addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      window.closeAssistant();
    });
    $("assistant-messages").addEventListener("click", event => {
      const button = event.target.closest("[data-assistant-product]");
      if (button && typeof window.openProductModal === "function") {
        window.openProductModal(Number(button.dataset.assistantProduct));
        toggle(false);
      }
    });
    setupDragging();
    try {
      state.products = await window.catalogService.loadProducts([]);
    } catch (error) {
      console.error("No se pudo cargar el catálogo del asistente.", error);
    }
    try {
      state.info = { ...DEFAULT_INFO, ...(await window.catalogService.loadStoreInfo(DEFAULT_INFO)) };
    } catch (error) {
      console.warn("No se encontró store_info; se usarán respuestas generales.", error);
    }
  }

  initialize();
})();
