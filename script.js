const PHONE_NUMBER = "51999999999"; // Cambiar por tu numero real de WhatsApp
const INSTAGRAM_USER = "abee_detalles";

// Catálogo completo con descripciones oficiales del PDF
const products = [
  // Llaveros
  { id: 1, category: "llaveros", name: "Cerezas Coquette", price: 4.00, desc: "Dulces, coquetas y coloridas. Hechos a mano en chenille super suave y liviano.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 2, category: "llaveros", name: "Ramo De Tulipanes", price: 4.00, desc: "Un toque primaveral que no se marchita.", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 3, category: "llaveros", name: "Osito Panda", price: 4.00, desc: "Un tierno y esponjoso companero.", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 4, category: "llaveros", name: "Pingüinito", price: 4.00, desc: "Un simbolo de lealtad para compartir con alguien.", img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },
  { id: 5, category: "llaveros", name: "Conchita De Mar", price: 6.00, desc: "Un pedacito de mar y brisa marina siempre contigo.", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 6, category: "llaveros", name: "Paltita Cute", price: 6.00, desc: "La mitad perfecta para acompanarte a todos lados.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 7, category: "llaveros", name: "Pelota De Fútbol", price: 6.00, desc: "Para llevar la pasion del futbol a donde vayas.", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 8, category: "llaveros", name: "Letra Inicial", price: 6.00, desc: "Tu inicial preferida hecha un detalle.", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 9, category: "llaveros", name: "Fresa Dulce", price: 6.00, desc: "Tierna y llena de color. Un accesorio bonito y liviano.", img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },
  { id: 10, category: "llaveros", name: "Buhito", price: 10.00, desc: "Un companero lleno de ternura. Tamano aprox: 5cm x 8cm.", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 11, category: "llaveros", name: "Spidey", price: 10.00, desc: "Colgando de su telarana. Tamano aprox: 5cm x 9cm.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 12, category: "llaveros", name: "Pollito", price: 15.00, desc: "Un companero super divertido. Tamano aprox: 6cm x 11cm.", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },

  // Macetas
  { id: 13, category: "macetas", name: "Mini Jardín", price: 15.00, desc: "Un ramito de flores que no se marchita.", img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },
  { id: 14, category: "macetas", name: "Macetita Lirio", price: 15.00, desc: "Elegancia y color para alegrar cualquier rincon.", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 15, category: "macetas", name: "Canastita Tulipanes", price: 16.00, desc: "Frescura, calma y delicadeza en una dulce canasta primaveral.", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 16, category: "macetas", name: "Macetita Girasol", price: 16.00, desc: "Un rayito de sol para llenar de luz y energia tu escritorio.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 17, category: "macetas", name: "Maceta De Conejito", price: 17.00, desc: "Un detalle tierno para decorar tu lugar favorito.", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 18, category: "macetas", name: "Jardín De Honguitos", price: 17.00, desc: "Un rincon magico y lleno de fantasia para tu hogar.", img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },

  // Ramos
  { id: 19, category: "ramos", name: "Flor Individual", price: 10.00, desc: "Un detalle sutil y delicado. Eleccion: Tulipan, Lirio, Girasol o Gerbera.", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 20, category: "ramos", name: "Ramo Girasol", price: 22.00, desc: "Incluye: 1 girasol grande, 5 margaritas, 1 rama de eucalipto, papel coreano y lazo.", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 21, category: "ramos", name: "Ramo Lirios", price: 25.00, desc: "Incluye: 3 lirios, 2 ramitas de follaje, papel coreano y lazo.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 22, category: "ramos", name: "Ramo Sol Radiante", price: 39.00, desc: "Incluye: 1 girasol grande, 3 girasoles medianos, 2 ramas de follaje, papel coreano y lazo.", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 23, category: "ramos", name: "Ramo Encanto", price: 40.00, desc: "Incluye: 3 lirios, 2 tulipanes, 2 ramitas de follaje, papel coreano y lazo.", img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" }
];

let cart = [];
let currentFilter = "todos";
let selectedProductForModal = null;

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
  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-title").innerText = product.name;
  document.getElementById("modal-price").innerText = `S/ ${product.price.toFixed(2)}`;
  document.getElementById("modal-desc").innerText = product.desc;
  document.getElementById("modal-color-input").value = "";

  document.getElementById("product-modal").classList.add("open");
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("open");
  selectedProductForModal = null;
}

document.getElementById("modal-add-btn").addEventListener("click", () => {
  if (!selectedProductForModal) return;

  const colorInput = document.getElementById("modal-color-input").value.trim();
  if (!colorInput) {
    alert("Por favor indica el color o combinación deseada.");
    return;
  }

  const uniqueId = `${selectedProductForModal.id}-${colorInput}`;
  const existing = cart.find(item => item.uniqueId === uniqueId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...selectedProductForModal,
      uniqueId: uniqueId,
      chosenColor: colorInput,
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

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("mobile-badge").innerText = totalCount;

  const htmlContent = cart.length === 0 
    ? `<p class="empty-text">Tu carrito esta vacio.</p>`
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
  let msg = "Hola Abee Detalles, me gustaria realizar el siguiente pedido:\n\n";
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
    alert("El resumen de tu pedido ha sido copiado al portapapeles. Seras dirigido al perfil de Instagram @abee_detalles para enviarlo por mensaje directo.");
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  }).catch(() => {
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  });
}

renderCatalog();