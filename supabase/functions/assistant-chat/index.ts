const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type Product = {
  id: string | number;
  name: string;
  category?: string;
  price: number;
  desc?: string;
  colors?: string[];
  offerText?: string;
  offer_text?: string;
};

type RequestBody = {
  query?: string;
  products?: Product[];
  storeInfo?: Record<string, string>;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function compactProducts(products: Product[]) {
  return products.slice(0, 100).map(product => ({
    id: String(product.id),
    name: String(product.name || "").slice(0, 100),
    category: String(product.category || "").slice(0, 60),
    price: Number(product.price),
    description: String(product.desc || "").slice(0, 300),
    colors: Array.isArray(product.colors) ? product.colors.slice(0, 12) : [],
    offer: String(product.offerText || product.offer_text || "").slice(0, 180)
  }));
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método no permitido." }, 405);

  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) return json({ error: "GEMINI_API_KEY no está configurada." }, 503);

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: "La solicitud no contiene JSON válido." }, 400);
  }

  const query = String(body.query || "").trim().slice(0, 240);
  if (!query) return json({ error: "La consulta está vacía." }, 400);

  const products = Array.isArray(body.products) ? compactProducts(body.products) : [];
  const storeInfo = body.storeInfo && typeof body.storeInfo === "object" ? body.storeInfo : {};
  const prompt = `Eres el asistente de ventas de Abee Detalles, una tienda artesanal en Perú.
Responde en español, con amabilidad y de forma breve. Usa únicamente el catálogo y la información entregados.
No inventes productos, precios, ofertas, colores, horarios, envíos ni formas de pago.
Si la información no alcanza, dilo claramente y recomienda consultar por WhatsApp.
Elige como máximo 3 productos cuyos id aparezcan en el catálogo. Si la pregunta no pide productos, devuelve productIds como [].
Devuelve exclusivamente JSON válido con esta forma:
{"text":"respuesta para la clienta","productIds":["id"],"contact":false}

Información de la tienda:
${JSON.stringify(storeInfo)}

Catálogo:
${JSON.stringify(products)}

Pregunta:
${query}`;

  const geminiResponse = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
          maxOutputTokens: 500
        }
      })
    }
  );

  if (!geminiResponse.ok) {
    const detail = await geminiResponse.text();
    console.error("Gemini rechazó la solicitud.", geminiResponse.status, detail);
    return json({ error: "Gemini no pudo responder en este momento." }, 502);
  }

  const result = await geminiResponse.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string") return json({ error: "Gemini devolvió una respuesta vacía." }, 502);

  try {
    const parsed = JSON.parse(text);
    const validIds = new Set(products.map(product => product.id));
    const productIds = Array.isArray(parsed.productIds)
      ? parsed.productIds.map(String).filter((id: string) => validIds.has(id)).slice(0, 3)
      : [];
    return json({
      text: String(parsed.text || "No pude encontrar una recomendación confiable."),
      productIds,
      contact: parsed.contact === true
    });
  } catch (error) {
    console.error("Gemini devolvió JSON inválido.", error);
    return json({ error: "La respuesta de Gemini no tuvo el formato esperado." }, 502);
  }
});
