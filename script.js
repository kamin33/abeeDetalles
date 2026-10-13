const PHONE_NUMBER = "51999999999"; 
const INSTAGRAM_USER = "abee_detalles";

const colorHexMap = {
  "Azul": "#3b82f6",
  "Rosado": "#f472b6",
  "Amarillo": "#eab308",
  "Rojo": "#dc2626",
  "Lila": "#c084fc",
  "Rojo clásico": "#b91c1c",
  "Rosado pastel": "#fbcfe8",
  "Negro": "#171717",
  "Gris": "#9ca3af",
  "Blanco y Negro": "#333333",
  "Verde tradicional": "#15803d",
  "Azul mar": "#0284c7",
  "Guinda": "#831843",
  "Morado": "#9333ea",
  "Blanco": "#ffffff",
  "Amarillo y Morado": "#a855f7",
  "Azul Real": "#1d4ed8",
  "Rojo y Azul": "#b91c1c",
  "Marrón": "#78350f",
  "Vino": "#831843",
  "Amarillo y Rojo": "#eab308",
  "Multicolor": "#ec4899",
  "Celeste": "#38bdf8",
  "Blanco con flores rosadas": "#fbcfe8",
  "Verde con flores rosadas": "#15803d",
  "Mezcla Fantasía": "#a855f7",
  "Tulipán": "#f472b6",
  "Lirio": "#fb7185",
  "Girasol": "#eab308",
  "Gerbera": "#f97316",
  "Amarillo con papel rojo": "#dc2626",
  "Amarillo con papel crema": "#fef08a",
  "Tonos Rosados": "#f472b6",
  "Tonos Pastel": "#fed7aa",
  "Lirios Rosados": "#fda4af",
  "Lirios Blancos": "#ffffff",
  "Amarillo intenso": "#ca8a04",
  "Flores Rosadas con papel Kraft": "#d9777f"
};

// Catálogo sin ninguna marca de citación
const products = [
  // LLAVEROS
  { id: 1, category: "llaveros", name: "Ramo De Tulipanes", price: 4.00, desc: "Un toque primaveral que no se marchita.", colors: ["Azul", "Rosado", "Amarillo", "Rojo", "Lila"], img: "imagenes/img1322.jpg" },
  { id: 2, category: "llaveros", name: "Cerezas Coquette", price: 4.00, desc: "Dulces, coquetas y coloridas.", colors: ["Rojo clásico", "Rosado pastel"], img: "imagenes/img1325.jpg" },
  { id: 3, category: "llaveros", name: "Pingüinito", price: 4.00, desc: "Un símbolo de lealtad para compartir con alguien.", colors: ["Azul", "Negro", "Gris"], img: "imagenes/img1337.jpg" },
  { id: 4, category: "llaveros", name: "Osito Panda", price: 4.00, desc: "Un tierno y esponjoso compañero.", colors: ["Blanco y Negro"], img: "imagenes/img1340.jpg" },
  { id: 5, category: "llaveros", name: "Paltita Cute", price: 6.00, desc: "La mitad perfecta para acompañarte a todos lados.", colors: ["Verde tradicional"], img: "imagenes/img1352.jpg" },
  { id: 6, category: "llaveros", name: "Conchita De Mar", price: 6.00, desc: "Un pedacito de mar y brisa marina siempre contigo.", colors: ["Lila", "Rosado", "Azul mar"], img: "imagenes/conchita_de_mar.jpg" },
  { id: 7, category: "llaveros", name: "Pelota De Fútbol", price: 6.00, desc: "Para llevar la pasión del fútbol a donde vayas.", colors: ["Blanco y Negro"], img: "imagenes/pelota_de_futbol.jpg" },
  { id: 8, category: "llaveros", name: "Letra", price: 6.00, desc: "Tu inicial preferida hecha un detalle.", colors: ["Guinda", "Rosado", "Azul", "Negro"], img: "imagenes/letra.jpg" },
  { id: 9, category: "llaveros", name: "Mini Maceta", price: 6.00, desc: "Toda la ternura de una maceta en versión mini.", colors: ["Morado", "Amarillo", "Rosado"], img: "imagenes/mini_maceta.jpg" },
  { id: 10, category: "llaveros", name: "Fresa Dulce", price: 6.00, desc: "Tierna y llena de color. Un accesorio bonito y liviano.", colors: ["Rojo", "Rosado"], img: "imagenes/fresa_dulce.jpg" },
  { id: 11, category: "llaveros", name: "Aro Primavera", price: 6.00, desc: "Un toque floral para llenar de color tu bolso.", colors: ["Amarillo", "Rosado", "Blanco"], img: "imagenes/aro_primavera.jpg" },
  { id: 12, category: "llaveros", name: "Corazón", price: 6.00, desc: "El detalle perfecto para expresar algo especial.", colors: ["Rosado", "Rojo", "Blanco"], img: "imagenes/corazon.jpg" },
  { id: 13, category: "llaveros", name: "Flor Fulgor", price: 6.00, desc: "«Flor que da fulgor, con tu brillo fiel...» Lleva la magia, la luz y el poder de sanar siempre contigo.", colors: ["Amarillo y Morado"], img: "imagenes/flor_fulgor.jpg" },
  { id: 14, category: "llaveros", name: "Ojo Turco", price: 6.00, desc: "Un amuleto floral hecho a mano para llenar tu día de buenas energías y protección.", colors: ["Azul Real"], img: "imagenes/ojo_turco.jpg" },
  { id: 15, category: "llaveros", name: "Spidey", price: 10.00, desc: "Colgando de su telaraña para acompañarte en cada aventura. Tamaño aprox: 5cm x 9cm.", colors: ["Rojo y Azul"], img: "imagenes/spidey.jpg" },
  { id: 16, category: "llaveros", name: "Buhito", price: 10.00, desc: "Un compañero lleno de ternura para acompañar tus días. Tamaño aprox: 5cm x 8cm.", colors: ["Marrón", "Gris", "Vino"], img: "imagenes/buhito.jpg" },
  { id: 17, category: "llaveros", name: "Pollito", price: 15.00, desc: "Un compañero súper divertido preparado a tu gusto. Tamaño aprox: 6cm x 11cm.", colors: ["Amarillo y Rojo"], img: "imagenes/pollito.jpg" },

  // MACETAS
  { id: 18, category: "macetas", name: "Macetita Lirio", price: 15.00, desc: "Elegancia y color para alegrar cualquier rincón.", colors: ["Rojo", "Rosado", "Blanco", "Amarillo"], img: "imagenes/macetita_lirio.jpg" },
  { id: 19, category: "macetas", name: "Mini Jardín", price: 15.00, desc: "Un ramito de flores que no se marchita.", colors: ["Amarillo", "Rosado", "Multicolor"], img: "imagenes/mini_jardin.jpg" },
  { id: 20, category: "macetas", name: "Canastita Tulipanes", price: 16.00, desc: "Frescura, calma y delicadeza reunidas en una dulce canasta primaveral.", colors: ["Celeste", "Rosado", "Lila"], img: "imagenes/canastita_tulipanes.jpg" },
  { id: 21, category: "macetas", name: "Macetita Girasol", price: 16.00, desc: "Un rayito de sol para llenar de luz y energía tu escritorio.", colors: ["Amarillo clásico"], img: "imagenes/macetita_girasol.jpg" },
  { id: 22, category: "macetas", name: "Maceta De Conejito", price: 17.00, desc: "Un detalle tierno para decorar tu lugar favorito.", colors: ["Blanco con flores rosadas"], img: "imagenes/maceta_de_conejito.jpg" },
  { id: 23, category: "macetas", name: "Macetita Cactus", price: 17.00, desc: "El compañero perfecto que llena de vida tu escritorio.", colors: ["Verde con flores rosadas"], img: "imagenes/macetita_cactus.jpg" },
  { id: 24, category: "macetas", name: "Jardín De Conejitos", price: 17.00, desc: "Pequeños conejitos que alegran cualquier espacio.", colors: ["Blanco"], img: "imagenes/jardin_de_conejitos.jpg" },
  { id: 25, category: "macetas", name: "Macetita Spidey", price: 17.00, desc: "Un gran detalle para un gran héroe.", colors: ["Rojo y Verde"], img: "imagenes/macetita_spidey.jpg" },
  { id: 26, category: "macetas", name: "Jardín De Honguitos", price: 17.00, desc: "Un rincón mágico y lleno de fantasía para tu hogar.", colors: ["Mezcla Fantasía"], img: "imagenes/jardin_de_honguitos.jpg" },

  // RAMOS
  { id: 27, category: "ramos", name: "Flor Individual", price: 10.00, desc: "Un detalle sutil y delicado para alegrar el día. Flor a elección: Tulipán, Lirio, Girasol o Gerbera.", colors: ["Tulipán", "Lirio", "Girasol", "Gerbera"], img: "imagenes/flor_individual.jpg" },
  { id: 28, category: "ramos", name: "Ramo Girasol", price: 22.00, desc: "Luz y alegría que duran para siempre. Incluye: 1 girasol grande, 5 margaritas, 1 rama de eucalipto, papel coreano y lazo.", colors: ["Amarillo con papel rojo", "Amarillo con papel crema"], img: "imagenes/ramo_girasol.jpg" },
  { id: 29, category: "ramos", name: "Ramo Dulzura", price: 25.00, desc: "Tonos suaves y detalles delicados para expresar el cariño más sincero. Incluye: 1 tulipán, 1 lirio, 3 margaritas, 1 rama de follaje, papel coreano y lazo.", colors: ["Tonos Rosados", "Tonos Pastel"], img: "imagenes/ramo_dulzura.jpg" },
  { id: 30, category: "ramos", name: "Ramo Lirios", price: 25.00, desc: "Sofisticación y delicadeza que perduran en el tiempo. Incluye: 3 lirios, 2 ramitas de follaje, papel coreano y lazo.", colors: ["Lirios Rosados", "Lirios Blancos"], img: "imagenes/ramo_lirios.jpg" },
  { id: 31, category: "ramos", name: "Ramo Sol Radiante", price: 39.00, desc: "Luz, calidez y la mejor energía para regalar. Incluye: 1 girasol grande, 3 girasoles medianos, 2 ramas de follaje, papel coreano y lazo.", colors: ["Amarillo intenso"], img: "imagenes/ramo_sol_radiante.jpg" },
  { id: 32, category: "ramos", name: "Ramo Encanto", price: 40.00, desc: "Una combinación elegante y llena de ternura. Incluye: 3 lirios, 2 tulipanes, 2 ramitas de follaje, papel coreano y lazo.", colors: ["Flores Rosadas con papel Kraft"], img: "imagenes/ramo_encanto.jpg" }
];

let cart = [];
let currentFilter = "todos";
let selectedProductForModal = null;
let activeSelectedColor = "";

function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  const filtered = currentFilter === "todos" 
    ? products 
    : products.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="product-img" onclick="openProductModal(${p.id})">
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
  activeSelectedColor = "";

  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-title").innerText = product.name;
  document.getElementById("modal-price").innerText = `S/ ${product.price.toFixed(2)}`;
  document.getElementById("modal-desc").innerText = product.desc;
  document.getElementById("modal-custom-color").value = "";

  // Renderizar opciones de color como botones estilo píldora con puntito de color
  const colorContainer = document.getElementById("color-options-container");
  colorContainer.innerHTML = product.colors.map(colorName => {
    const hex = colorHexMap[colorName] || "#d9777f";
    return `
      <button class="color-pill-btn" onclick="selectColorPill(this, '${colorName}')">
        <span class="color-dot" style="background-color: ${hex};"></span>
        <span>${colorName}</span>
      </button>
    `;
  }).join("");

  document.getElementById("product-modal").classList.add("open");
}

function selectColorPill(buttonEl, colorName) {
  document.querySelectorAll(".color-pill-btn").forEach(btn => btn.classList.remove("selected"));
  buttonEl.classList.add("selected");
  activeSelectedColor = colorName;
  document.getElementById("modal-custom-color").value = "";
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("open");
  selectedProductForModal = null;
  activeSelectedColor = "";
}

// Cerrar modal al hacer clic en el fondo oscuro exterior
document.getElementById("product-modal").addEventListener("click", (e) => {
  if (e.target.id === "product-modal") {
    closeProductModal();
  }
});

document.getElementById("modal-add-btn").addEventListener("click", () => {
  if (!selectedProductForModal) return;

  const customText = document.getElementById("modal-custom-color").value.trim();
  const finalColor = customText || activeSelectedColor;

  if (!finalColor) {
    alert("Por favor selecciona un color o escribe uno personalizado.");
    return;
  }

  const uniqueId = `${selectedProductForModal.id}-${finalColor}`;
  const existing = cart.find(item => item.uniqueId === uniqueId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...selectedProductForModal,
      uniqueId: uniqueId,
      chosenColor: finalColor,
      quantity: 1
    });
  }

  closeProductModal();
  updateCartUI();
});

function addCustomIdea() {
  const input = document.getElementById("custom-idea-input");
  const text = input.value.trim();

  if (!text) {
    alert("Por favor describe tu idea de diseño personalizado.");
    return;
  }

  cart.push({
    id: "custom-" + Date.now(),
    uniqueId: "custom-" + Date.now(),
    name: `Diseño personalizado: ${text}`,
    price: 0,
    quantity: 1,
    isCustom: true,
    chosenColor: "A cotizar"
  });

  input.value = "";
  updateCartUI();
}

function removeFromCart(uniqueId) {
  cart = cart.filter(item => item.uniqueId !== uniqueId);
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

// Cerrar carrito móvil al hacer clic afuera
document.getElementById("mobile-cart-modal").addEventListener("click", (e) => {
  if (e.target.id === "mobile-cart-modal") {
    toggleMobileCart(false);
  }
});

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("mobile-badge").innerText = totalCount;

  const htmlContent = cart.length === 0 
    ? `<p class="empty-text">Tu carrito está vacío.</p>`
    : cart.map(item => `
        <div class="cart-item-row">
          <div class="item-info">
            <span class="item-title">${item.name}</span>
            <span class="item-sub">Color: ${item.chosenColor}</span>
            <span class="item-sub">
              ${item.isCustom ? "A cotizar" : `${item.quantity} x S/ ${item.price.toFixed(2)} = S/ ${(item.price * item.quantity).toFixed(2)}`}
            </span>
          </div>
          <button class="btn-remove-item" onclick="removeFromCart('${item.uniqueId}')">Quitar</button>
        </div>
      `).join("");

  document.getElementById("cart-items-desktop").innerHTML = htmlContent;
  document.getElementById("cart-items-mobile").innerHTML = htmlContent;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
      msg += `- ${item.name} (Cantidad: ${item.quantity}) | Color: ${item.chosenColor} - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    }
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (total > 0) {
    msg += `\nTotal estimado: S/ ${total.toFixed(2)}\n`;
  }
  msg += "\nQuedo atento(a) para coordinar el adelanto del 50%, la disponibilidad y los puntos de entrega.";
  return msg;
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;
  const msg = encodeURIComponent(buildOrderMessage());
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${msg}`, "_blank");
}

function checkoutInstagram() {
  if (cart.length === 0) return;
  const msg = buildOrderMessage();
  
  navigator.clipboard.writeText(msg).then(() => {
    alert("El resumen de tu pedido ha sido copiado al portapapeles. Serás dirigido al perfil de Instagram @abee_detalles para enviarlo por mensaje directo.");
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  }).catch(() => {
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  });
}

renderCatalog();