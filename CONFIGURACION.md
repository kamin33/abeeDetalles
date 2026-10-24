# Abee Detalles: catálogo administrable

## Probar el panel localmente

Abre `admin.html` y usa:

- Correo: `duena@abee.local`
- Contraseña: `abee-demo`

Este modo guarda datos en `localStorage` y sirve únicamente para probar la interfaz. No debe publicarse como método de autenticación real.

## Activar la nube

1. Crea un proyecto gratuito en Supabase.
2. En SQL Editor, ejecuta [`supabase-schema.sql`](./supabase-schema.sql).
3. Crea un bucket público llamado `catalog-media`.
4. Configura políticas de Storage para que solo usuarios autenticados puedan subir, actualizar o eliminar archivos.
5. Crea la cuenta de la dueña en Authentication > Users.
6. Copia la URL del proyecto y la clave `anon`/pública en [`config.js`](./config.js).
7. No uses la clave `service_role` en el navegador ni la subas al repositorio.

Con una configuración válida, el panel utiliza autenticación por correo y contraseña, PostgreSQL para productos/banners y Storage para imágenes/videos. La tienda pública solo consulta registros activos.

## Activar el asistente de la tienda

El chat de la tienda puede recomendar productos según palabras clave, presupuesto, categoría, color y descripción. También responde con la información de envíos, pagos, horarios, ubicación y personalización que se guarde en Supabase.

- Si acabas de crear las tablas, `supabase-schema.sql` ya incluye `store_info`.
- Si la base de datos ya estaba configurada, ejecuta [`assistant-schema.sql`](./assistant-schema.sql) en SQL Editor.
- Entra a `https://abeedetalles.studio/admin/`, abre la pestaña **Asistente**, completa la información y pulsa **Guardar información**.
- El botón de chat aparece en la esquina inferior de la tienda. Cuando el asistente no encuentra una respuesta, muestra una orientación general para que la clienta contacte por WhatsApp.

Esta primera versión no necesita una API de inteligencia artificial ni una tarjeta bancaria: busca en el catálogo real de Supabase y ordena las coincidencias. Más adelante se puede conectar un modelo de IA sin cambiar la tabla de productos ni la interfaz.

## Importar los productos originales

Después de iniciar sesión en `admin/` con la cuenta de Supabase:

1. Entra a la pestaña **Productos**.
2. Pulsa **Importar catálogo anterior**.
3. Confirma la operación.

Se cargarán los 32 productos originales con nombre, categoría, precio, oferta, descripción, colores e imagen. El botón está pensado para usarse una sola vez; si ya hiciste una prueba creando un producto manual, puedes eliminarla desde el mismo panel antes o después de importar.

Las imágenes originales se conservan como rutas relativas (`imagenes/...`), por lo que seguirán funcionando al publicar la carpeta `imagenes` junto con la tienda. Las nuevas imágenes subidas desde el panel sí se guardan en el bucket `catalog-media`.

## Reparar textos con caracteres extraños

Si después de importar aparecen textos como `PingÃ¼inito`, `CorazÃ³n` o `â€”`, ejecuta una sola vez [`repair-encoding.sql`](./repair-encoding.sql) en Supabase > SQL Editor. La consulta solo modifica filas que contienen esos indicadores de codificación incorrecta y no convierte la base de datos a otra codificación. Después recarga el panel con `Ctrl + F5`. Si ejecutaste la versión anterior y falló, no pasa nada: vuelve a ejecutar únicamente esta versión actualizada.

Si la reparación no deja los textos correctos, usa [`replace-products.sql`](./replace-products.sql) como alternativa definitiva. Esta consulta elimina todos los registros actuales de `products` y vuelve a insertar los 32 productos originales limpios. Exporta la tabla antes de ejecutarla si quieres conservar algún producto creado manualmente.

## Publicar gratis

El proyecto puede publicarse como sitio estático en GitHub Pages. Supabase se usa como servicio externo para autenticación, base de datos y multimedia. Revisa las cuotas vigentes del plan gratuito y del beneficio disponible en GitHub Student Developer Pack antes de subir videos grandes.

## URLs publicadas

- Tienda: `https://abeedetalles.studio/`
- Panel: `https://abeedetalles.studio/admin/`

GitHub Pages sirve `index.html` automáticamente en la raíz y `admin/index.html` automáticamente dentro de `/admin/`, por eso las extensiones `.html` no aparecen en las URLs.

## Cache busting automático

El workflow [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) construye la publicación mediante [`scripts/build-site.mjs`](./scripts/build-site.mjs). En cada despliegue, los archivos CSS y JavaScript locales reciben un hash basado en su contenido y las referencias HTML se actualizan automáticamente. Por ejemplo, `styles.css` puede publicarse como `styles.e65463937ce2.css`.

Así, cuando cambia un recurso, el navegador recibe una URL nueva y no reutiliza el archivo anterior. El HTML debe seguir siendo revalidable; no conviene configurarlo con caché indefinida en un proxy externo porque podría seguir apuntando al hash viejo.

Las imágenes y videos del catálogo no se renombran: son recursos administrados por Supabase y conservan sus URLs remotas.

En GitHub, entra a **Settings > Pages** y selecciona **GitHub Actions** como fuente de publicación. Si continúa seleccionado `Deploy from a branch`, el workflow puede terminar correctamente pero el dominio seguirá sirviendo la versión antigua de la rama.
