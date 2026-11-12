// src/lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Le indicamos a Next.js 15 que revalide los datos cada 60 segundos
    next: { revalidate: 60 },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${STRAPI_URL}/api${path}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`Error en Strapi API: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}