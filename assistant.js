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
    if (state.open) $("assistant-input").focus();
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && state.open) toggle(false);
  });

  async function initialize() {
    if (!window.catalogService) return;
    $("assistant-form").addEventListener("submit", submit);
    $("assistant-toggle").addEventListener("click", () => toggle());
    $("assistant-close").addEventListener("click", () => toggle(false));
    $("assistant-messages").addEventListener("click", event => {
      const button = event.target.closest("[data-assistant-product]");
      if (button && typeof window.openProductModal === "function") {
        window.openProductModal(Number(button.dataset.assistantProduct));
        toggle(false);
      }
    });
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
