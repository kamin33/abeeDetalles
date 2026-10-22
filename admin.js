(function () {
  const config = window.catalogService.getConfig();
  const state = { products: [], banners: [], type: "product", editingId: null, accessToken: null };
  const $ = id => document.getElementById(id);

  function setMessage(id, text, success = false) {
    const element = $(id);
    element.textContent = text;
    element.classList.toggle("success", success);
  }

  function isRemote() {
    return window.catalogService.hasRemoteConfig();
  }

  async function remoteAuth(email, password) {
    const response = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: config.supabaseAnonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error("Correo o contraseña incorrectos.");
    return response.json();
  }

  async function api(path, options = {}) {
    return window.catalogService.remoteRequest(path, { ...options, accessToken: state.accessToken });
  }

  async function loadData() {
    if (isRemote()) {
      [state.products, state.banners] = await Promise.all([
        api("products?select=*&order=created_at.asc"),
        api("banners?select=*&order=sort_order.asc")
      ]);
    } else {
      state.products = JSON.parse(localStorage.getItem("abee_products") || "[]");
      state.banners = JSON.parse(localStorage.getItem("abee_banners") || "[]");
    }
    renderProducts();
    renderBanners();
  }

  function showDashboard() {
    $("login-view").hidden = true;
    $("dashboard-view").hidden = false;
  }

  function renderProducts() {
    $("products-list").innerHTML = state.products.length ? state.products.map(product => `
      <article class="admin-list-item">
        <img src="${escapeAttribute(product.img || "imagenes/logo.png")}" alt="">
        <div><h3>${escapeHtml(product.name)}</h3><p>S/ ${Number(product.price).toFixed(2)} · ${escapeHtml(product.category)} · ${product.active === false ? "Oculto" : "Visible"}</p><p>${escapeHtml(product.offer_text || product.offerText || "Sin oferta")}</p></div>
        <div class="admin-item-actions"><button data-edit-product="${product.id}">Editar</button><button data-delete-product="${product.id}">Eliminar</button></div>
      </article>`).join("") : `<p class="admin-muted">No hay productos guardados. Crea el primero para probar el panel.</p>`;
  }

  function renderBanners() {
    $("banners-list").innerHTML = state.banners.length ? state.banners.map(banner => `
      <article class="admin-list-item">
        ${banner.media_type === "video" ? `<video src="${escapeAttribute(banner.media_url)}" muted></video>` : `<img src="${escapeAttribute(banner.media_url || "imagenes/logo.png")}" alt="">`}
        <div><h3>${escapeHtml(banner.title)}</h3><p>${escapeHtml(banner.tag || "")} · Orden ${Number(banner.sort_order || 0)} · ${banner.active === false ? "Oculto" : "Visible"}</p></div>
        <div class="admin-item-actions"><button data-edit-banner="${banner.id}">Editar</button><button data-delete-banner="${banner.id}">Eliminar</button></div>
      </article>`).join("") : `<p class="admin-muted">No hay banners guardados.</p>`;
  }

  function escapeHtml(value) {
    return decodeMojibake(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
  }

  function decodeMojibake(value) {
    let text = String(value || "");
    for (let pass = 0; pass < 2 && /[ÃÂâð]/.test(text); pass += 1) {
      try {
        const bytes = Uint8Array.from(text, character => character.charCodeAt(0));
        const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        if (decoded === text) break;
        text = decoded;
      } catch {
        break;
      }
    }
    return text;
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function openEditor(type, id = null) {
    state.type = type;
    state.editingId = id;
    const entry = (type === "product" ? state.products : state.banners).find(item => String(item.id) === String(id));
    $("editor-title").textContent = `${id ? "Editar" : "Nuevo"} ${type === "product" ? "producto" : "banner"}`;
    $("product-fields").hidden = type !== "product";
    $("banner-fields").hidden = type !== "banner";
    $("editor-message").textContent = "";
    if (type === "product") {
      $("product-name").value = entry?.name || "";
      $("product-category").value = entry?.category || "";
      $("product-price").value = entry?.price ?? "";
      $("product-offer").value = entry?.offer_text || entry?.offerText || "";
      $("product-desc").value = entry?.desc || "";
      $("product-colors").value = (entry?.colors || []).join(", ");
      $("product-image").value = "";
    } else {
      $("banner-tag").value = entry?.tag || "";
      $("banner-title").value = entry?.title || "";
      $("banner-description").value = entry?.description || "";
      $("banner-order").value = entry?.sort_order || 0;
      $("entry-active").checked = entry?.active !== false;
      $("banner-media").value = "";
    }
    $("editor-dialog").showModal();
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      if (!isRemote() && file.size > 3 * 1024 * 1024) return reject(new Error("En modo local el archivo no puede superar 3 MB."));
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("No se pudo leer el archivo seleccionado."));
      reader.readAsDataURL(file);
    });
  }

  async function uploadRemote(file) {
    const extension = file.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `catalog/${crypto.randomUUID()}.${extension}`;
    const response = await fetch(`${config.supabaseUrl}/storage/v1/object/${config.storageBucket}/${path}`, {
      method: "POST",
      headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${state.accessToken}`, "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
      body: file
    });
    if (!response.ok) throw new Error("No se pudo subir el archivo multimedia.");
    return `${config.supabaseUrl}/storage/v1/object/public/${config.storageBucket}/${path}`;
  }

  async function saveEntry(event) {
    event.preventDefault();
    const submitButton = event.currentTarget.querySelector("button[type=submit]");
    submitButton.disabled = true;
    setMessage("editor-message", "");
    try {
      if (state.type === "product") await saveProduct();
      else await saveBanner();
      $("editor-dialog").close();
      await loadData();
      setMessage("dashboard-message", "Cambios guardados correctamente.", true);
    } catch (error) {
      console.error(error);
      setMessage("editor-message", error.message || "No se pudieron guardar los cambios.");
    } finally {
      submitButton.disabled = false;
    }
  }

  async function saveProduct() {
    const name = $("product-name").value.trim();
    const category = $("product-category").value.trim();
    const price = Number($("product-price").value);
    if (!name || !category || !Number.isFinite(price) || price < 0) throw new Error("Completa nombre, categoría y un precio válido.");
    const current = state.products.find(item => String(item.id) === String(state.editingId));
    const file = $("product-image").files[0];
    const image = file ? (isRemote() ? await uploadRemote(file) : await readFile(file)) : current?.img || "imagenes/logo.png";
    const entry = {
      ...(current || {}),
      category, name, price,
      promo_tier: current?.promo_tier || current?.promoTier || "individual",
      offer_text: $("product-offer").value.trim(),
      desc: $("product-desc").value.trim(),
      colors: $("product-colors").value.split(",").map(color => color.trim()).filter(Boolean),
      img: image, active: current?.active !== false
    };
    if (isRemote()) {
      if (current) await api(`products?id=eq.${encodeURIComponent(current.id)}`, { method: "PATCH", body: JSON.stringify(entry) });
      else await api("products", { method: "POST", body: JSON.stringify(entry) });
    } else {
      entry.id = current?.id || Date.now();
      state.products = current ? state.products.map(item => item.id === current.id ? entry : item) : [...state.products, entry];
      await window.catalogService.saveProducts(state.products);
    }
  }

  async function saveBanner() {
    const title = $("banner-title").value.trim();
    if (!title) throw new Error("El banner necesita un título.");
    const current = state.banners.find(item => String(item.id) === String(state.editingId));
    const file = $("banner-media").files[0];
    const mediaUrl = file ? (isRemote() ? await uploadRemote(file) : await readFile(file)) : current?.media_url || "imagenes/banner.gif";
    const entry = {
      ...(current || {}), tag: $("banner-tag").value.trim(), title,
      description: $("banner-description").value.trim(), media_url: mediaUrl,
      media_type: file ? (file.type.startsWith("video/") ? "video" : "image") : current?.media_type || "image",
      sort_order: Number($("banner-order").value) || 0, active: $("entry-active").checked
    };
    if (isRemote()) {
      if (current) await api(`banners?id=eq.${encodeURIComponent(current.id)}`, { method: "PATCH", body: JSON.stringify(entry) });
      else await api("banners", { method: "POST", body: JSON.stringify(entry) });
    } else {
      entry.id = current?.id || Date.now();
      state.banners = current ? state.banners.map(item => item.id === current.id ? entry : item) : [...state.banners, entry];
      await window.catalogService.saveBanners(state.banners);
    }
  }

  async function deleteEntry(type, id) {
    if (!window.confirm("¿Eliminar este elemento? Esta acción no se puede deshacer.")) return;
    try {
      const collection = type === "product" ? state.products : state.banners;
      if (isRemote()) await api(`${type === "product" ? "products" : "banners"}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
      else if (type === "product") await window.catalogService.saveProducts(collection.filter(item => item.id !== id));
      else await window.catalogService.saveBanners(collection.filter(item => item.id !== id));
      await loadData();
      setMessage("dashboard-message", "Elemento eliminado.", true);
    } catch (error) {
      setMessage("dashboard-message", error.message || "No se pudo eliminar el elemento.");
    }
  }

  async function importLegacyCatalog() {
      const legacyProducts = Array.isArray(window.ABEE_LEGACY_PRODUCTS) ? window.ABEE_LEGACY_PRODUCTS : [];
      if (!legacyProducts.length) {
        setMessage("dashboard-message", "No se encontró el catálogo anterior.");
        return;
      }
      if (!window.confirm(`Se importarán ${legacyProducts.length} productos del catálogo original. Úsalo una sola vez para evitar duplicados. ¿Continuar?`)) return;

      const button = $("import-legacy");
      button.disabled = true;
      setMessage("dashboard-message", "Importando catálogo anterior...");
      try {
        const entries = legacyProducts.map(product => ({
          category: product.category,
          name: product.name,
          price: Number(product.price),
          promo_tier: product.promoTier || "individual",
          offer_text: product.offerText || "",
          desc: product.desc || "",
          colors: Array.isArray(product.colors) ? product.colors : [],
          img: product.img,
          active: true
        }));

        if (isRemote()) {
          await api("products", { method: "POST", body: JSON.stringify(entries) });
        } else {
          state.products = [...state.products, ...entries.map(entry => ({ ...entry, id: Date.now() + Math.random() }))];
          await window.catalogService.saveProducts(state.products);
        }
        await loadData();
        setMessage("dashboard-message", `Se importaron ${entries.length} productos correctamente.`, true);
      } catch (error) {
        console.error(error);
        setMessage("dashboard-message", error.message || "No se pudo importar el catálogo anterior.");
      } finally {
        button.disabled = false;
    }
  }

  $("login-form").addEventListener("submit", async event => {
    event.preventDefault();
    setMessage("login-message", "");
    try {
      if (isRemote()) {
        const session = await remoteAuth($("login-email").value.trim(), $("login-password").value);
        state.accessToken = session.access_token;
      } else if ($("login-email").value.trim() !== "duena@abee.local" || $("login-password").value !== "abee-demo") {
        throw new Error("Modo local: usa duena@abee.local y abee-demo. Configura Supabase antes de publicar.");
      }
      showDashboard();
      await loadData();
    } catch (error) {
      setMessage("login-message", error.message || "No se pudo iniciar sesión.");
    }
  });
  $("logout-button").addEventListener("click", () => location.reload());
  $("new-product").addEventListener("click", () => openEditor("product"));
  // La importación histórica queda desactivada en la interfaz después de la migración inicial.
  $("new-banner").addEventListener("click", () => openEditor("banner"));
  $("close-editor").addEventListener("click", () => $("editor-dialog").close());
  $("editor-form").addEventListener("submit", saveEntry);
  document.querySelectorAll(".admin-tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab").forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".admin-panel").forEach(panel => { panel.hidden = panel.id !== tab.dataset.section; });
  }));
  $("products-list").addEventListener("click", event => {
    const edit = event.target.closest("[data-edit-product]");
    const remove = event.target.closest("[data-delete-product]");
    if (edit) openEditor("product", edit.dataset.editProduct);
    if (remove) deleteEntry("product", remove.dataset.deleteProduct);
  });
  $("banners-list").addEventListener("click", event => {
    const edit = event.target.closest("[data-edit-banner]");
    const remove = event.target.closest("[data-delete-banner]");
    if (edit) openEditor("banner", edit.dataset.editBanner);
    if (remove) deleteEntry("banner", remove.dataset.deleteBanner);
  });
  $("local-mode-note").hidden = isRemote();
})();
