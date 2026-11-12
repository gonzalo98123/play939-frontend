
const STRAPI_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:1337"
    : "");

export async function fetchAPI(
  path: string,
  options: RequestInit = {}
) {
  if (!STRAPI_URL) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_BACKEND_URL en las variables de entorno."
    );
  }

  const baseUrl = STRAPI_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/api${path.startsWith("/") ? path : `/${path}`}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    const detalle = await response.text();

    console.error("Error en Strapi:", {
      url,
      status: response.status,
      statusText: response.statusText,
      detalle,
    });

    throw new Error(
      `Error en Strapi API: HTTP ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;

  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  if (!STRAPI_URL) {
    console.error("Falta configurar NEXT_PUBLIC_BACKEND_URL.");
    return null;
  }

  return `${STRAPI_URL.replace(/\/+$/, "")}${url}`;
}
