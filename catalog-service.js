(function () {
  const PRODUCTS_KEY = "abee_products";
  const BANNERS_KEY = "abee_banners";
  const config = window.ABEE_CONFIG || {};

  function hasRemoteConfig() {
    return Boolean(config.supabaseUrl && config.supabaseAnonKey);
  }

  function localRead(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
      console.error(`No se pudo leer ${key} desde el almacenamiento local.`, error);
      return fallback;
    }
  }

  function localWrite(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function normalizeProduct(product) {
    return {
      ...product,
      id: product.id,
      price: Number(product.price),
      promoTier: product.promoTier || product.promo_tier || "individual",
      offerText: product.offerText || product.offer_text || "",
      colors: Array.isArray(product.colors) ? product.colors : [],
      active: product.active !== false
    };
  }

  async function remoteRequest(path, options = {}) {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
      ...options,
      headers: {
        apikey: config.supabaseAnonKey,
        Authorization: `Bearer ${options.accessToken || config.supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Supabase respondió ${response.status}: ${detail}`);
    }

    return response.status === 204 ? null : response.json();
  }

  async function loadProducts(fallback) {
    const localProducts = localRead(PRODUCTS_KEY, null);
    if (localProducts) return localProducts.filter(product => product.active !== false).map(normalizeProduct);
    if (!hasRemoteConfig()) return fallback;

    const remoteProducts = await remoteRequest("products?select=*&active=eq.true&order=created_at.asc");
    return remoteProducts.map(normalizeProduct);
  }

  async function loadBanners(fallback) {
    const localBanners = localRead(BANNERS_KEY, null);
    if (localBanners) return localBanners.filter(banner => banner.active !== false);
    if (!hasRemoteConfig()) return fallback;
    return remoteRequest("banners?select=*&active=eq.true&order=sort_order.asc");
  }

  async function saveProducts(products) {
    const normalized = products.map(normalizeProduct);
    localWrite(PRODUCTS_KEY, normalized);
    return normalized;
  }

  async function saveBanners(banners) {
    localWrite(BANNERS_KEY, banners);
    return banners;
  }

  window.catalogService = {
    hasRemoteConfig,
    loadProducts,
    loadBanners,
    saveProducts,
    saveBanners,
    remoteRequest,
    getConfig: () => ({ ...config })
  };
})();
