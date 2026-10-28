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
  history?: { role?: string; content?: string }[];
  products?: Product[];
  storeInfo?: Record<string, string>;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
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

function parseAssistantPayload(text: unknown, products: ReturnType<typeof compactProducts>) {
  if (typeof text !== "string") return null;
  try {
    const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, "").trim());
    const validIds = new Set(products.map(product => product.id));
    const productIds = Array.isArray(parsed.productIds)
      ? parsed.productIds.map(String).filter((id: string) => validIds.has(id)).slice(0, 3)
      : [];
    return {
      text: String(parsed.text || "No pude encontrar una recomendaciÃ³n confiable."),
      productIds,
      contact: parsed.contact === true
    };
  } catch (error) {
    console.error("El proveedor devolviÃ³ JSON invÃ¡lido.", error);
    return null;
  }
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "MÃ©todo no permitido." }, 405);

  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) return json({ error: "GEMINI_API_KEY no estÃ¡ configurada." }, 503);

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: "La solicitud no contiene JSON vÃ¡lido." }, 400);
  }

  const query = String(body.query || "").trim().slice(0, 240);
  if (!query) return json({ error: "La consulta estÃ¡ vacÃ­a." }, 400);

  const products = Array.isArray(body.products) ? compactProducts(body.products) : [];
  const storeInfo = body.storeInfo && typeof body.storeInfo === "object" ? body.storeInfo : {};
  const history = Array.isArray(body.history)
    ? body.history
        .filter(message => (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
        .slice(-8)
        .map(message => ({
          role: message.role,
          content: String(message.content).slice(0, 500)
        }))
    : [];
  const prompt = `Eres el asistente de ventas de Abee Detalles, una tienda artesanal de detalles y regalos para cualquier persona.
PresÃ©ntate como el asistente de Abee Detalles, sin decir que la tienda vende solo a estudiantes,
que pertenece al PedagÃ³gico de Monterrico o que atiende exclusivamente dentro de esa instituciÃ³n.
Responde en espaÃ±ol, con amabilidad y de forma breve. Usa Ãºnicamente el catÃ¡logo y la informaciÃ³n entregados.
Contexto opcional para interpretar consultas: en algunas comunidades estudiantiles,
como la del PedagÃ³gico de Monterrico, cada estudiante nuevo puede tener una madrina o padrino,
que suele ser un estudiante de un aÃ±o superior. Esa madrina o padrino tambiÃ©n puede tener
sus propios padrinos o madrinas, llamados abuelos o abuelas dentro de esa tradiciÃ³n.
Usa esta aclaraciÃ³n Ãºnicamente si la persona menciona ahijado, ahijada, padrino, madrina,
abuelo o abuela, o pregunta explÃ­citamente por ese tipo de vÃ­nculo. En ese caso, interpreta
primero que podrÃ­a hablar de un vÃ­nculo estudiantil y recomienda el regalo de forma natural.
No menciones Monterrico si la persona no lo menciona o si no es necesario para responder.
No asumas que se trata de un familiar biolÃ³gico ni inventes nombres o relaciones especÃ­ficas.
No inventes productos, precios, ofertas, colores, horarios, envÃ­os ni formas de pago.
Si la informaciÃ³n no alcanza, dilo claramente y recomienda consultar por WhatsApp.
Elige como mÃ¡ximo 3 productos cuyos id aparezcan en el catÃ¡logo. Si la pregunta no pide productos, devuelve productIds como [].
Devuelve exclusivamente JSON vÃ¡lido con esta forma:
{"text":"respuesta para la clienta","productIds":["id"],"contact":false}

InformaciÃ³n de la tienda:
${JSON.stringify(storeInfo)}

CatÃ¡logo:
${JSON.stringify(products)}

Historial reciente de la conversaciÃ³n (puede estar vacÃ­o):
${JSON.stringify(history)}

La Ãºltima pregunta de la clienta es la consulta que debes responder:
Pregunta:
${query}`;

  const configuredModel = Deno.env.get("GEMINI_MODEL");
  const models = configuredModel
    ? [configuredModel]
    : ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
  let geminiResponse: Response | null = null;
  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
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
          }),
          signal: controller.signal
        }
      );
    } catch (error) {
      console.error("Gemini agotÃ³ el tiempo de respuesta.", model, error);
      geminiResponse = null;
    } finally {
      clearTimeout(timeout);
    }
    if (!geminiResponse) break;
    if (geminiResponse.ok || geminiResponse.status !== 404) break;
  }

  if (!geminiResponse || !geminiResponse.ok) {
    const providerStatus = geminiResponse?.status;
    const detail = geminiResponse ? await geminiResponse.text() : "timeout";
    console.error("Gemini rechazÃ³ o agotÃ³ el tiempo de la solicitud.", providerStatus, detail);
    const status = providerStatus && [401, 403, 404, 429].includes(providerStatus) ? 502 : 503;
    let availableModels: string[] | undefined;
    if (providerStatus === 404) {
      const modelsResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models",
        { headers: { "x-goog-api-key": apiKey } }
      );
      if (modelsResponse.ok) {
        const modelsResult = await modelsResponse.json();
        availableModels = Array.isArray(modelsResult.models)
          ? modelsResult.models
              .filter((item: { supportedGenerationMethods?: string[] }) =>
                item.supportedGenerationMethods?.includes("generateContent"))
              .map((item: { name?: string }) => item.name?.replace("models/", ""))
              .filter(Boolean)
              .slice(0, 20)
          : undefined;
      }
    }
    const groqKey = Deno.env.get("GROQ_API_KEY");
    if (groqKey) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + groqKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: Deno.env.get("GROQ_MODEL") || "openai/gpt-oss-20b",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
            max_tokens: 500,
            response_format: { type: "json_object" }
          }),
          signal: controller.signal
        });
        if (groqResponse.ok) {
          const groqResult = await groqResponse.json();
          const fallback = parseAssistantPayload(groqResult.choices?.[0]?.message?.content, products);
          if (fallback) return json(fallback);
        } else {
          console.error("El proveedor secundario rechazÃ³ la solicitud.", groqResponse.status);
        }
      } catch (error) {
        console.error("El proveedor secundario agotÃ³ el tiempo de respuesta.", error);
      } finally {
        clearTimeout(timeout);
      }
    }
    return json({
      error: "Gemini no pudo responder en este momento.",
      providerStatus,
      availableModels
    }, status);
  }

  const result = await geminiResponse.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string") return json({ error: "Gemini devolviÃ³ una respuesta vacÃ­a." }, 502);
  const response = parseAssistantPayload(text, products);
  return response
    ? json(response)
    : json({ error: "La respuesta del proveedor no tuvo el formato esperado." }, 502);
});
