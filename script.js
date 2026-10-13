const PHONE_NUMBER = "51999999999"; // Reemplazar con el número real de WhatsApp de Abee Detalles
const INSTAGRAM_USER = "abee_detalles";

// Catálogo completo basado en el PDF de Abee Detalles
const products = [
  // Llaveros
  { id: 1, category: "llaveros", name: "Cerezas Coquette", price: 4.00, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 2, category: "llaveros", name: "Ramo De Tulipanes", price: 4.00, img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 3, category: "llaveros", name: "Osito Panda", price: 4.00, img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 4, category: "llaveros", name: "Pingüinito", price: 4.00, img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },
  { id: 5, category: "llaveros", name: "Conchita De Mar", price: 6.00, img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 6, category: "llaveros", name: "Paltita Cute", price: 6.00, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 7, category: "llaveros", name: "Pelota De Fútbol", price: 6.00, img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 8, category: "llaveros", name: "Letra Inicial", price: 6.00, img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 9, category: "llaveros", name: "Fresa Dulce", price: 6.00, img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },
  { id: 10, category: "llaveros", name: "Buhito", price: 10.00, img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 11, category: "llaveros", name: "Spidey", price: 10.00, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 12, category: "llaveros", name: "Pollito", price: 15.00, img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },

  // Macetas
  { id: 13, category: "macetas", name: "Mini Jardín", price: 15.00, img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },
  { id: 14, category: "macetas", name: "Macetita Lirio", price: 15.00, img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 15, category: "macetas", name: "Canastita Tulipanes", price: 16.00, img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 16, category: "macetas", name: "Macetita Girasol", price: 16.00, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 17, category: "macetas", name: "Maceta De Conejito", price: 17.00, img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 18, category: "macetas", name: "Jardín De Honguitos", price: 17.00, img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" },

  // Ramos
  { id: 19, category: "ramos", name: "Flor Individual", price: 10.00, img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80" },
  { id: 20, category: "ramos", name: "Ramo Girasol", price: 22.00, img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80" },
  { id: 21, category: "ramos", name: "Ramo Lirios", price: 25.00, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { id: 22, category: "ramos", name: "Ramo Sol Radiante", price: 39.00, img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80" },
  { id: 23, category: "ramos", name: "Ramo Encanto", price: 40.00, img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80" }
];

let cart = [];
let currentFilter = "todos";

function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  const filtered = currentFilter === "todos" 
    ? products 
    : products.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <div class="product-info">
        <div>
          <span class="product-category">${p.category}</span>
          <h4 class="product-name">${p.name}</h4>
          <p class="product-price">S/ ${p.price.toFixed(2)}</p>
        </div>
        <button class="btn-add" onclick="addToCart(${p.id})">Agregar</button>
      </div>
    </div>
  `).join("");
}

function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  renderCatalog();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function addCustomIdea() {
  const input = document.getElementById("custom-idea-input");
  const text = input.value.trim();

  if (!text) {
    alert("Por favor describe tu idea de diseño personalizado.");
    return;
  }

  cart.push({
    id: "custom-" + Date.now(),
    name: `Diseño personalizado: ${text}`,
    price: 0,
    quantity: 1,
    isCustom: true
  });

  input.value = "";
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById("cart-items-container");
  const totalPriceEl = document.getElementById("cart-total-price");
  const btnWsp = document.getElementById("btn-whatsapp");
  const btnIg = document.getElementById("btn-instagram");

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty-msg">Tu carrito está vacío.</p>`;
    totalPriceEl.innerText = "S/ 0.00";
    btnWsp.disabled = true;
    btnIg.disabled = true;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="item-details">
        <span class="item-name">${item.name}</span>
        <span class="item-price">
          ${item.isCustom ? "A cotizar" : `${item.quantity} x S/ ${item.price.toFixed(2)} = S/ ${(item.price * item.quantity).toFixed(2)}`}
        </span>
      </div>
      <button class="btn-remove" onclick="removeFromCart('${item.id}')">Quitar</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalPriceEl.innerText = `S/ ${total.toFixed(2)}`;
  btnWsp.disabled = false;
  btnIg.disabled = false;
}

function buildOrderMessage() {
  let msg = "Hola Abee Detalles, me gustaria realizar el siguiente pedido:\n\n";
  cart.forEach(item => {
    if (item.isCustom) {
      msg += `- [PERSONALIZADO] ${item.name}\n`;
    } else {
      msg += `- ${item.name} (Cantidad: ${item.quantity}) - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
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
  
  // Copiar al portapapeles para facilitar pegar en Instagram DM
  navigator.clipboard.writeText(msg).then(() => {
    alert("El resumen de tu pedido ha sido copiado al portapapeles. Seras dirigido al perfil de Instagram @abee_detalles para enviarlo por mensaje directo.");
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  }).catch(() => {
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  });
}

renderCatalog();