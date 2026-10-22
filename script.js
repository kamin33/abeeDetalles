const PHONE_NUMBER = "51944863950"; 
const INSTAGRAM_USER = "abee_detalles";

const colorHexMap = {
  "Azul": "#3b82f6", "Rosado": "#f472b6", "Amarillo": "#eab308", "Rojo": "#dc2626", "Lila": "#c084fc",
  "Rojo clásico": "#b91c1c", "Rosado pastel": "#fbcfe8", "Negro": "#171717", "Gris": "#9ca3af",
  "Blanco y Negro": "#333333", "Verde tradicional": "#15803d", "Azul mar": "#0284c7", "Guinda": "#831843",
  "Morado": "#9333ea", "Blanco": "#ffffff", "Amarillo y Morado": "#a855f7", "Azul Real": "#1d4ed8",
  "Rojo y Azul": "#b91c1c", "Marrón": "#78350f", "Vino": "#831843", "Amarillo y Rojo": "#eab308",
  "Multicolor": "#ec4899", "Celeste": "#38bdf8", "Blanco con flores rosadas": "#fbcfe8",
  "Verde con flores rosadas": "#15803d", "Mezcla Fantasía": "#a855f7", "Tulipán": "#f472b6",
  "Lirio": "#fb7185", "Girasol": "#eab308", "Gerbera": "#f97316", "Amarillo con papel rojo": "#dc2626",
  "Amarillo con papel crema": "#fef08a", "Tonos Rosados": "#f472b6", "Tonos Pastel": "#fed7aa",
  "Lirios Rosados": "#fda4af", "Lirios Blancos": "#ffffff", "Amarillo intenso": "#ca8a04",
  "Flores Rosadas con papel Kraft": "#d9777f"
};

let products = [
  // LLAVEROS S/ 4.00
  { id: 1, category: "llaveros", name: "Ramo De Tulipanes", price: 4.00, promoTier: "tier4", offerText: "1 por S/ 4.00 — 2 por S/ 7.00 ¡Combínalos como quieras!", desc: "Un toque primaveral que no se marchita.", colors: ["Azul", "Rosado", "Amarillo", "Rojo", "Lila"], img: "imagenes/img1322.jpg" },
  { id: 2, category: "llaveros", name: "Cerezas Coquette", price: 4.00, promoTier: "tier4", offerText: "1 por S/ 4.00 — 2 por S/ 7.00 ¡Combínalos como quieras!", desc: "Dulces, coquetas y coloridas.", colors: ["Rojo clásico", "Rosado pastel"], img: "imagenes/img1325.jpg" },
  { id: 3, category: "llaveros", name: "Pingüinito", price: 4.00, promoTier: "tier4", offerText: "1 por S/ 4.00 — 2 por S/ 7.00 ¡Combínalos como quieras!", desc: "Un símbolo de lealtad para compartir con alguien.", colors: ["Azul", "Negro", "Gris"], img: "imagenes/img1337.jpg" },
  { id: 4, category: "llaveros", name: "Osito Panda", price: 4.00, promoTier: "tier4", offerText: "1 por S/ 4.00 — 2 por S/ 7.00 ¡Combínalos como quieras!", desc: "Un tierno y esponjoso compañero.", colors: ["Blanco y Negro"], img: "imagenes/img1340.jpg" },

  // LLAVEROS S/ 6.00
  { id: 5, category: "llaveros", name: "Paltita Cute", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "La mitad perfecta para acompañarte a todos lados.", colors: ["Verde tradicional"], img: "imagenes/img1352.jpg" },
  { id: 6, category: "llaveros", name: "Conchita De Mar", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Un pedacito de mar y brisa marina siempre contigo.", colors: ["Lila", "Rosado", "Azul mar"], img: "imagenes/conchita_de_mar.jpg" },
  { id: 7, category: "llaveros", name: "Pelota De Fútbol", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Para llevar la pasión del fútbol a donde vayas.", colors: ["Blanco y Negro"], img: "imagenes/pelota_de_futbol.jpg" },
  { id: 8, category: "llaveros", name: "Letra", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Tu inicial preferida hecha un detalle.", colors: ["Guinda", "Rosado", "Azul", "Negro"], img: "imagenes/letra.jpg" },
  { id: 9, category: "llaveros", name: "Mini Maceta", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Toda la ternura de una maceta en versión mini.", colors: ["Morado", "Amarillo", "Rosado"], img: "imagenes/mini_maceta.jpg" },
  { id: 10, category: "llaveros", name: "Fresa Dulce", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Tierna y llena de color. Un accesorio bonito y liviano.", colors: ["Rojo", "Rosado"], img: "imagenes/fresa_dulce.jpg" },
  { id: 11, category: "llaveros", name: "Aro Primavera", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Un toque floral para llenar de color tu bolso.", colors: ["Amarillo", "Rosado", "Blanco"], img: "imagenes/aro_primavera.jpg" },
  { id: 12, category: "llaveros", name: "Corazón", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "El detalle perfecto para expresar algo especial.", colors: ["Rosado", "Rojo", "Blanco"], img: "imagenes/corazon.jpg" },
  { id: 13, category: "llaveros", name: "Flor Fulgor", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "«Flor que da fulgor, con tu brillo fiel...» Lleva la magia, la luz y el poder de sanar siempre contigo.", colors: ["Amarillo y Morado"], img: "imagenes/flor_fulgor.jpg" },
  { id: 14, category: "llaveros", name: "Ojo Turco", price: 6.00, promoTier: "tier6", offerText: "1 por S/ 6.00 — 2 por S/ 10.00 — 3 por S/ 15.00 ¡Combínalos!", desc: "Un amuleto floral hecho a mano para llenar tu día de buenas energías y protección.", colors: ["Azul Real"], img: "imagenes/ojo_turco.jpg" },

  // LLAVEROS S/ 10.00
  { id: 15, category: "llaveros", name: "Spidey", price: 10.00, promoTier: "tier10", offerText: "1 por S/ 10.00 — 2 por S/ 18.00 ¡Combínalos!", desc: "Colgando de su telaraña para acompañarte en cada aventura. Tamaño aprox: 5cm x 9cm.", colors: ["Rojo y Azul"], img: "imagenes/spidey.jpg" },
  { id: 16, category: "llaveros", name: "Buhito", price: 10.00, promoTier: "tier10", offerText: "1 por S/ 10.00 — 2 por S/ 18.00 ¡Combínalos!", desc: "Un compañero lleno de ternura para acompañar tus días. Tamaño aprox: 5cm x 8cm.", colors: ["Marrón", "Gris", "Vino"], img: "imagenes/buhito.jpg" },

  // LLAVERO POLLITO
  { id: 17, category: "llaveros", name: "Pollito", price: 15.00, promoTier: "tier15_pollito", offerText: "1 por S/ 15.00 — 2 por S/ 28.00 — 3 por S/ 39.00", desc: "Un compañero súper divertido preparado a tu gusto. Tamaño aprox: 6cm x 11cm.", colors: ["Amarillo y Rojo"], img: "imagenes/pollito.jpg" },

  // MACETAS S/ 15.00
  { id: 18, category: "macetas", name: "Macetita Lirio", price: 15.00, promoTier: "tier15_macetas", offerText: "1 por S/ 15.00 — 2 por S/ 27.00 — 3 por S/ 36.00", desc: "Elegancia y color para alegrar cualquier rincón.", colors: ["Rojo", "Rosado", "Blanco", "Amarillo"], img: "imagenes/macetita_lirio.jpg" },
  { id: 19, category: "macetas", name: "Mini Jardín", price: 15.00, promoTier: "tier15_macetas", offerText: "1 por S/ 15.00 — 2 por S/ 27.00 — 3 por S/ 36.00", desc: "Un ramito de flores que no se marchita.", colors: ["Amarillo", "Rosado", "Multicolor"], img: "imagenes/mini_jardin.jpg" },

  // MACETAS ALTAS
  { id: 20, category: "macetas", name: "Canastita Tulipanes", price: 16.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 16.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "Frescura, calma y delicadeza reunidas en una dulce canasta primaveral.", colors: ["Celeste", "Rosado", "Lila"], img: "imagenes/canastita_tulipanes.jpg" },
  { id: 21, category: "macetas", name: "Macetita Girasol", price: 16.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 16.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "Un rayito de sol para llenar de luz y energía tu escritorio.", colors: ["Amarillo clásico"], img: "imagenes/macetita_girasol.jpg" },
  { id: 22, category: "macetas", name: "Maceta De Conejito", price: 17.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 17.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "Un detalle tierno para decorar tu lugar favorito.", colors: ["Blanco con flores rosadas"], img: "imagenes/maceta_de_conejito.jpg" },
  { id: 23, category: "macetas", name: "Macetita Cactus", price: 17.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 17.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "El compañero perfecto que llena de vida tu escritorio.", colors: ["Verde con flores rosadas"], img: "imagenes/macetita_cactus.jpg" },
  { id: 24, category: "macetas", name: "Jardín De Conejitos", price: 17.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 17.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "Pequeños conejitos que alegran cualquier espacio.", colors: ["Blanco"], img: "imagenes/jardin_de_conejitos.jpg" },
  { id: 25, category: "macetas", name: "Macetita Spidey", price: 17.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 17.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "Un gran detalle para un gran héroe.", colors: ["Rojo y Verde"], img: "imagenes/macetita_spidey.jpg" },
  { id: 26, category: "macetas", name: "Jardín De Honguitos", price: 17.00, promoTier: "tier_macetas_altas", offerText: "1 por S/ 17.00 — 2 por S/ 30.00 — 3 por S/ 42.00", desc: "Un rincón mágico y lleno de fantasía para tu hogar.", colors: ["Mezcla Fantasía"], img: "imagenes/jardin_de_honguitos.jpg" },

  // RAMOS
  { id: 27, category: "ramos", name: "Flor Individual", price: 10.00, promoTier: "individual", offerText: "Precio regular de catálogo", desc: "Un detalle sutil y delicado para alegrar el día. Flor a elección: Tulipán, Lirio, Girasol o Gerbera.", colors: ["Tulipán", "Lirio", "Girasol", "Gerbera"], img: "imagenes/flor_individual.jpg" },
  { id: 28, category: "ramos", name: "Ramo Girasol", price: 22.00, promoTier: "individual", offerText: "Precio regular de catálogo", desc: "Luz y alegría que duran para siempre. Incluye: 1 girasol grande, 5 margaritas, 1 rama de eucalipto, papel coreano y lazo.", colors: ["Amarillo con papel rojo", "Amarillo con papel crema"], img: "imagenes/ramo_girasol.jpg" },
  { id: 29, category: "ramos", name: "Ramo Dulzura", price: 25.00, promoTier: "individual", offerText: "Precio regular de catálogo", desc: "Tonos suaves y detalles delicados para expresar el cariño más sincero. Incluye: 1 tulipán, 1 lirio, 3 margaritas, 1 rama de follaje, papel coreano y lazo.", colors: ["Tonos Rosados", "Tonos Pastel"], img: "imagenes/ramo_dulzura.jpg" },
  { id: 30, category: "ramos", name: "Ramo Lirios", price: 25.00, promoTier: "individual", offerText: "Precio regular de catálogo", desc: "Sofisticación y delicadeza que perduran en el tiempo. Incluye: 3 lirios, 2 ramitas de follaje, papel coreano y lazo.", colors: ["Lirios Rosados", "Lirios Blancos"], img: "imagenes/ramo_lirios.jpg" },
  { id: 31, category: "ramos", name: "Ramo Sol Radiante", price: 39.00, promoTier: "individual", offerText: "Precio regular de catálogo", desc: "Luz, calidez y la mejor energía para regalar. Incluye: 1 girasol grande, 3 girasoles medianos, 2 ramas de follaje, papel coreano y lazo.", colors: ["Amarillo intenso"], img: "imagenes/ramo_sol_radiante.jpg" },
  { id: 32, category: "ramos", name: "Ramo Encanto", price: 40.00, promoTier: "individual", offerText: "Precio regular de catálogo", desc: "Una combinación elegante y llena de ternura. Incluye: 3 lirios, 2 tulipanes, 2 ramitas de follaje, papel coreano y lazo.", colors: ["Flores Rosadas con papel Kraft"], img: "imagenes/ramo_encanto.jpg" }
];

let cart = loadCartFromStorage();
let currentFilter = "todos";
let selectedProductForModal = null;
let modalColorQuantities = {};
let instagramTimerInterval = null; // Control de la cuenta regresiva de IG

/* =====================================================
   BANNER: GIF cada 11000 ms, texto cada 5500 ms
   (contadores independientes). Un click o arrastre sobre
   el banner reinicia ambos contadores; un arrastre además
   avanza/retrocede texto y video.
   ===================================================== */
function initBanner() {
  const BG_LIST = [
    { webm: 'imagenes/banner.webm', mp4: 'imagenes/banner.mp4' },
    { webm: 'imagenes/banner-02.webm', mp4: 'imagenes/banner-02.mp4' },
    { webm: 'imagenes/banner-03.webm', mp4: 'imagenes/banner-03.mp4' }
  ];
  const BG_DELAY = 11000;
  const TEXT_DELAY = 5500;
  const SWIPE_MIN = 40; // px mínimos para considerar un arrastre

  const hero = document.getElementById('inicio');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('#carousel-dots .dot');
  const backgrounds = [...document.querySelectorAll('.hero-bg')];
  if (!hero || slides.length === 0 || backgrounds.length < BG_LIST.length) return;

  let bgIndex = 0, textIndex = 0, bgTimer = null, textTimer = null;
  let currentBg = backgrounds[0];

  const mod = (n, m) => ((n % m) + m) % m;

  function showBg(i) {
    bgIndex = mod(i, BG_LIST.length);
    const nextBg = backgrounds[bgIndex];
    if (nextBg === currentBg) return;

    nextBg.currentTime = 0;
    nextBg.play().catch(() => {});
    nextBg.classList.add('is-visible');
    currentBg.classList.remove('is-visible');
    currentBg.pause();
    currentBg = nextBg;
  }

  function showText(i) {
    textIndex = mod(i, slides.length);
    slides.forEach((s, k) => s.classList.toggle('active', k === textIndex));
    dots.forEach((d, k) => d.classList.toggle('active', k === textIndex));
  }

  function startBgTimer() {
    clearInterval(bgTimer);
    bgTimer = setInterval(() => showBg(bgIndex + 1), BG_DELAY);
  }

  function startTextTimer() {
    clearInterval(textTimer);
    textTimer = setInterval(() => showText(textIndex + 1), TEXT_DELAY);
  }

  function resetTimers() {
    startBgTimer();
    startTextTimer();
  }

  // Los puntos (onclick="setSlide(n)") cambian el texto y reinician solo su contador
  window.setSlide = function (i) {
    showText(i);
    startTextTimer();
  };

  let startX = null;

  hero.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.hero-controls, .dot')) return;
    startX = e.clientX;
  });

  window.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;

    if (Math.abs(dx) >= SWIPE_MIN) {
      const dir = dx < 0 ? 1 : -1; // arrastrar a la izquierda = siguiente
      showText(textIndex + dir);
      showBg(bgIndex + dir);
    }
    resetTimers();
  });

  window.addEventListener('pointercancel', () => { startX = null; });

  showText(0);
  resetTimers();
}

function applyManagedBanners(banners) {
  if (!Array.isArray(banners) || banners.length === 0) return;

  const activeBanners = banners.filter(banner => banner.active !== false).sort((a, b) => {
    return Number(a.sort_order || 0) - Number(b.sort_order || 0);
  }).slice(0, 3);
  const slides = [...document.querySelectorAll(".carousel-slide")];
  activeBanners.forEach((banner, index) => {
    const slide = slides[index];
    if (!slide) return;
    slide.dataset.bg = banner.media_url || slide.dataset.bg;
    slide.innerHTML = `
      <div class="slide-content">
        <span class="slide-tag">${banner.tag || ""}</span>
        <h2>${banner.title || ""}</h2>
        <p>${banner.description || ""}</p>
      </div>
    `;
    if (banner.media_type === "image" && banner.media_url) {
      slide.style.backgroundImage = `url("${banner.media_url.replace(/"/g, '\\"')}")`;
      slide.style.backgroundSize = "cover";
      slide.style.backgroundPosition = "center";
    }
  });
}

/* ===================== CARRITO ===================== */

function saveCartToStorage() {
  try {
    localStorage.setItem("abee_cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Error guardando carrito", e);
  }
}

function loadCartFromStorage() {
  try {
    const data = localStorage.getItem("abee_cart");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error cargando carrito", e);
    return [];
  }
}

function preloadCriticalAssets() {
  const firstBanner = document.getElementById("hero-bg-a");
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    hidePreloader();
  };

  if (!firstBanner) {
    finish();
    return;
  }

  firstBanner.addEventListener("canplay", finish, { once: true });
  firstBanner.addEventListener("error", finish, { once: true });
  setTimeout(finish, 1200);
}

function hidePreloader() {
  const preloader = document.getElementById("app-preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
  }
}

function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  const filtered = currentFilter === "todos" 
    ? products 
    : products.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy" decoding="async" onclick="openProductModal(${p.id})">
      <div class="product-details">
        <div>
          <span class="product-category">${p.category}</span>
          <h4 class="product-name" onclick="openProductModal(${p.id})">${p.name}</h4>
          <p class="product-price">S/ ${p.price.toFixed(2)}</p>
        </div>
        <button class="btn-add-item" onclick="openProductModal(${p.id})">Ver y elegir color</button>
      </div>
    </div>
  `).join("");
}

function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
  event.target.classList.add("active");
  renderCatalog();
}

function openProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  selectedProductForModal = product;
  modalColorQuantities = {};
  product.colors.forEach(c => modalColorQuantities[c] = 0);

  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-title").innerText = product.name;
  document.getElementById("modal-price").innerText = `S/ ${product.price.toFixed(2)}`;
  
  const offerBadge = document.getElementById("modal-offer-badge");
  
  if (product.promoTier !== "individual" && product.offerText) {
    let cleanOffer = product.offerText
      .replace(/1 por S\/\s*[\d.]+\s*—?\s*/i, "")
      .replace(/1 por S\/\s*[\d.]+\s*\|?\s*/i, "");
      
    offerBadge.innerHTML = `✨ ${cleanOffer}`;
  } else {
    offerBadge.innerHTML = "";
  }

  document.getElementById("modal-desc").innerText = product.desc;
  document.getElementById("modal-custom-color").value = "";

  const colorContainer = document.getElementById("color-options-container");
  colorContainer.innerHTML = product.colors.map(colorName => {
    const hex = colorHexMap[colorName] || "#d9777f";
    return `
      <div class="modal-color-row">
        <div class="color-info-left">
          <span class="color-dot" style="background-color: ${hex};"></span>
          <span class="color-name-text">${colorName}</span>
        </div>
        <div class="qty-selector-mini">
          <button type="button" class="qty-btn-mini" onclick="updateModalColorQty('${colorName}', -1)">-</button>
          <span id="qty-val-${colorName}" class="qty-val-num">0</span>
          <button type="button" class="qty-btn-mini" onclick="updateModalColorQty('${colorName}', 1)">+</button>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("product-modal").classList.add("open");
}

function updateModalColorQty(colorName, change) {
  let current = modalColorQuantities[colorName] || 0;
  current += change;
  if (current < 0) current = 0;
  modalColorQuantities[colorName] = current;
  document.getElementById(`qty-val-${colorName}`).innerText = current;
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("open");
  selectedProductForModal = null;
  modalColorQuantities = {};
}

document.getElementById("product-modal").addEventListener("click", (e) => {
  if (e.target.id === "product-modal") {
    closeProductModal();
  }
});

document.getElementById("modal-add-btn").addEventListener("click", () => {
  if (!selectedProductForModal) return;

  let addedAny = false;

  Object.keys(modalColorQuantities).forEach(colorName => {
    let qty = modalColorQuantities[colorName];
    if (qty > 0) {
      addedAny = true;
      const uniqueId = `${selectedProductForModal.id}-${colorName}`;
      const existing = cart.find(item => item.uniqueId === uniqueId);

      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({
          ...selectedProductForModal,
          uniqueId: uniqueId,
          chosenColor: colorName,
          quantity: qty
        });
      }
    }
  });

  const customText = document.getElementById("modal-custom-color").value.trim();
  if (customText) {
    addedAny = true;
    const uniqueId = `${selectedProductForModal.id}-${customText}`;
    const existing = cart.find(item => item.uniqueId === uniqueId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...selectedProductForModal,
        uniqueId: uniqueId,
        chosenColor: customText,
        quantity: 1
      });
    }
  }

  if (!addedAny) {
    showCoquetteToast("Por favor elige la cantidad de al menos un color.");
    return;
  }

  saveCartToStorage();
  closeProductModal();
  updateCartUI();
  showCoquetteToast("✨ ¡Agregado a tu pedido!");
});

function addCustomIdea() {
  const input = document.getElementById("custom-idea-input");
  const text = input.value.trim();

  if (!text) {
    showCoquetteToast("Por favor escribe tu idea personalizada.");
    return;
  }

  cart.push({
    id: "custom-" + Date.now(),
    uniqueId: "custom-" + Date.now(),
    name: `Diseño personalizado: ${text}`,
    price: 0,
    quantity: 1,
    isCustom: true,
    promoTier: "custom",
    chosenColor: "A cotizar"
  });

  input.value = "";
  saveCartToStorage();
  updateCartUI();
  showCoquetteToast("✨ ¡Idea personalizada agregada!");
}

function removeFromCart(uniqueId) {
  cart = cart.filter(item => item.uniqueId !== uniqueId);
  saveCartToStorage();
  updateCartUI();
}

function toggleMobileCart(open) {
  const modal = document.getElementById("mobile-cart-modal");
  if (open) {
    modal.classList.add("open");
  } else {
    modal.classList.remove("open");
  }
}

document.getElementById("mobile-cart-modal").addEventListener("click", (e) => {
  if (e.target.id === "mobile-cart-modal") {
    toggleMobileCart(false);
  }
});

function showCoquetteToast(message) {
  const toast = document.getElementById("coquette-toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function calculateCartTotals() {
  let tierCounts = {};
  cart.forEach(item => {
    if (item.isCustom) return;
    let tier = item.promoTier || "individual";
    tierCounts[tier] = (tierCounts[tier] || 0) + item.quantity;
  });

  let calculatedSubtotals = {};
  
  if (tierCounts["tier4"]) {
    let q = tierCounts["tier4"];
    let pairs = Math.floor(q / 2);
    let rem = q % 2;
    calculatedSubtotals["tier4"] = (pairs * 7.00) + (rem * 4.00);
  }

  if (tierCounts["tier6"]) {
    let q = tierCounts["tier6"];
    let trios = Math.floor(q / 3);
    let rem1 = q % 3;
    let pairs = Math.floor(rem1 / 2);
    let rem2 = rem1 % 2;
    calculatedSubtotals["tier6"] = (trios * 15.00) + (pairs * 10.00) + (rem2 * 6.00);
  }

  if (tierCounts["tier10"]) {
    let q = tierCounts["tier10"];
    let pairs = Math.floor(q / 2);
    let rem = q % 2;
    calculatedSubtotals["tier10"] = (pairs * 18.00) + (rem * 10.00);
  }

  if (tierCounts["tier15_pollito"]) {
    let q = tierCounts["tier15_pollito"];
    let trios = Math.floor(q / 3);
    let rem1 = q % 3;
    let pairs = Math.floor(rem1 / 2);
    let rem2 = rem1 % 2;
    calculatedSubtotals["tier15_pollito"] = (trios * 39.00) + (pairs * 28.00) + (rem2 * 15.00);
  }

  if (tierCounts["tier15_macetas"]) {
    let q = tierCounts["tier15_macetas"];
    let trios = Math.floor(q / 3);
    let rem1 = q % 3;
    let pairs = Math.floor(rem1 / 2);
    let rem2 = rem1 % 2;
    calculatedSubtotals["tier15_macetas"] = (trios * 36.00) + (pairs * 27.00) + (rem2 * 15.00);
  }

  if (tierCounts["tier_macetas_altas"]) {
    let q = tierCounts["tier_macetas_altas"];
    let trios = Math.floor(q / 3);
    let rem1 = q % 3;
    let pairs = Math.floor(rem1 / 2);
    let rem2 = rem1 % 2;
    calculatedSubtotals["tier_macetas_altas"] = (trios * 42.00) + (pairs * 30.00) + (rem2 * 17.00);
  }

  let grandTotal = 0;
  cart.forEach(item => {
    if (item.isCustom) return;
    let tier = item.promoTier || "individual";
    if (tier === "individual") {
      grandTotal += item.price * item.quantity;
    }
  });

  Object.keys(calculatedSubtotals).forEach(tier => {
    grandTotal += calculatedSubtotals[tier];
  });

  return grandTotal;
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("mobile-badge").innerText = totalCount;
  document.getElementById("nav-cart-count").innerText = totalCount;

  const htmlContent = cart.length === 0 
    ? `<p class="empty-text">Tu carrito está vacío.</p>`
    : cart.map(item => {
        const thumbImg = item.isCustom ? 'imagenes/logo.png' : item.img;
        const isClickable = !item.isCustom;

        return `
          <div class="cart-item-row">
            <div class="cart-item-thumb-box" ${isClickable ? `onclick="openProductModal(${item.id})"` : ''}>
              <img src="${thumbImg}" alt="${item.name}" class="cart-item-thumb">
            </div>
            <div class="item-info">
              <span class="item-title" ${isClickable ? `onclick="openProductModal(${item.id})"` : ''}>${item.name}</span>
              <span class="item-sub">Color: ${item.chosenColor}</span>
              <span class="item-sub">Cant: ${item.quantity} | P.U: S/ ${item.price.toFixed(2)}</span>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart('${item.uniqueId}')">Quitar</button>
          </div>
        `;
      }).join("");

  document.getElementById("cart-items-desktop").innerHTML = htmlContent;
  document.getElementById("cart-items-mobile").innerHTML = htmlContent;

  const total = calculateCartTotals();
  const totalFormatted = `S/ ${total.toFixed(2)}`;
  
  document.getElementById("cart-total-desktop").innerText = totalFormatted;
  document.getElementById("cart-total-mobile").innerText = totalFormatted;

  const hasItems = cart.length > 0;
  document.getElementById("btn-wsp-d").disabled = !hasItems;
  document.getElementById("btn-ig-d").disabled = !hasItems;
  document.getElementById("btn-wsp-m").disabled = !hasItems;
  document.getElementById("btn-ig-m").disabled = !hasItems;
}

function buildOrderMessage() {
  let msg = "Hola Abee Detalles, me gustaría realizar el siguiente pedido:\n\n";
  cart.forEach(item => {
    if (item.isCustom) {
      msg += `- [PERSONALIZADO] ${item.name}\n`;
    } else {
      msg += `- ${item.name} (Cantidad: ${item.quantity}) | Color: ${item.chosenColor}\n`;
    }
  });

  const total = calculateCartTotals();
  if (total > 0) {
    msg += `\nTotal estimado con ofertas aplicadas: S/ ${total.toFixed(2)}\n`;
  }
  msg += "\nCondiciones:\n- Adelanto requerido: 50%\n- Tiempo de anticipación: Al menos 2 días\n\nQuedo atento(a) para coordinar la entrega.";
  return msg;
}

/* ===================== WHATSAPP ===================== */
function checkoutWhatsApp() {
  if (cart.length === 0) return;
  const msg = buildOrderMessage();
  toggleMobileCart(false);

  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;

  // assign para que el navegador lo tome como navegación legítima en la misma pestaña
  window.location.assign(url);
}

/* ===================== INSTAGRAM ===================== */
function checkoutInstagram() {
  if (cart.length === 0) return;
  const msg = buildOrderMessage();

  toggleMobileCart(false);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(msg).catch(err => {
      console.warn("No se pudo copiar automáticamente:", err);
    });
  }

  const overlay = document.getElementById("center-toast-overlay");
  const countdownEl = document.getElementById("countdown-timer");
  let timeLeft = 5;
  
  if (countdownEl) countdownEl.innerText = timeLeft;
  if (overlay) overlay.classList.add("show");

  // Limpiar temporizador previo por si acaso
  if (instagramTimerInterval) clearInterval(instagramTimerInterval);

  instagramTimerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0 && countdownEl) {
      countdownEl.innerText = timeLeft;
    }
    if (timeLeft <= 0) {
      clearInterval(instagramTimerInterval);
      if (overlay) overlay.classList.remove("show");
      window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
    }
  }, 1000);
}

// Cancelar la redirección a Instagram
function cancelInstagramCheckout() {
  if (instagramTimerInterval) {
    clearInterval(instagramTimerInterval);
  }
  const overlay = document.getElementById("center-toast-overlay");
  if (overlay) {
    overlay.classList.remove("show");
  }
  showCoquetteToast("✨ Redirección cancelada");
}

// Botón "Ir ahora": detiene el temporizador y abre Instagram una sola vez
function openInstagramNow() {
  if (instagramTimerInterval) {
    clearInterval(instagramTimerInterval);
  }
  const overlay = document.getElementById("center-toast-overlay");
  if (overlay) {
    overlay.classList.remove("show");
  }
  window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
}

/* ===================== INICIO ===================== */
async function initializeStorefront() {
  if (window.catalogService) {
    try {
      products = await window.catalogService.loadProducts(products);
      const banners = await window.catalogService.loadBanners([]);
      applyManagedBanners(banners);
    } catch (error) {
      console.error("No se pudo cargar el catálogo remoto. Se usará el catálogo local.", error);
      showCoquetteToast("No se pudo actualizar el catálogo. Mostrando la versión guardada.");
    }
  }

  renderCatalog();
  updateCartUI();
  preloadCriticalAssets();
  initBanner();
}

initializeStorefront();
