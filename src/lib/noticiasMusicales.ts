
import { XMLParser } from "fast-xml-parser";

const RSS_URL = "https://billboard.ar/feed/";

export interface Noticia {
  titulo: string;
  descripcion: string;
  url: string;
  fecha: string;
  categoria: string;
  imagen: string | null;
}

// Limpieza de textos HTML y entidades
function limpiarTexto(valor: any): string {
  let texto = "";

  if (typeof valor === "string") {
    texto = valor;
  } else if (valor && typeof valor === "object") {
    texto = valor.__cdata || valor["#text"] || "";
  }

  return texto
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

// Obtener URL de imagen
function extraerImagen(item: any): string | null {
  // 1. Imagen adjunta mediante enclosure
  if (item.enclosure?.["@_url"]) {
    return item.enclosure["@_url"];
  }

  // 2. Media content
  const mediaContent = item["media:content"];

  if (mediaContent) {
    const media = Array.isArray(mediaContent)
      ? mediaContent[0]
      : mediaContent;

    if (media?.["@_url"]) {
      return media["@_url"];
    }
  }

  // 3. Media thumbnail
  const mediaThumbnail = item["media:thumbnail"];

  if (mediaThumbnail) {
    const thumbnail = Array.isArray(mediaThumbnail)
      ? mediaThumbnail[0]
      : mediaThumbnail;

    if (thumbnail?.["@_url"]) {
      return thumbnail["@_url"];
    }
  }

  // 4. Imagen dentro del contenido HTML
  const contenidoHTML =
    (typeof item["content:encoded"] === "string"
      ? item["content:encoded"]
      : item["content:encoded"]?.__cdata) ||
    (typeof item.description === "string"
      ? item.description
      : item.description?.__cdata) ||
    "";

  if (contenidoHTML) {
    const match = contenidoHTML.match(
      /<img[^>]+(?:src|data-src)=["']([^"']+)["']/i
    );

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

// Obtener categorías
function extraerCategoria(item: any): string {
  if (!item.category) {
    return "Música";
  }

  const categorias = Array.isArray(item.category)
    ? item.category
    : [item.category];

  const categoria = categorias
    .map((cat: any) => limpiarTexto(cat))
    .find((cat: string) => cat.length > 0);

  return categoria || "Música";
}

// Obtener las últimas 6 noticias
export async function obtenerNoticias(): Promise<Noticia[]> {
  try {
    const response = await fetch(RSS_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept:
          "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) {
      console.error(
        `Error HTTP al consultar Billboard Argentina: ${response.status}`
      );

      return [];
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      cdataPropName: "__cdata",
      parseTagValue: false,
      trimValues: true,
    });

    const resultado = parser.parse(xml);

    const items = resultado?.rss?.channel?.item;

    if (!items) {
      console.error(
        "El RSS de Billboard Argentina no devolvió noticias."
      );

      return [];
    }

    const lista = Array.isArray(items)
      ? items
      : [items];

    return lista.slice(0, 6).map((item: any): Noticia => {
      const enlace =
        typeof item.link === "string"
          ? item.link
          : item.link?.["@_href"] || "#";

      return {
        titulo: limpiarTexto(item.title),

        descripcion: limpiarTexto(item.description),

        url: enlace,

        fecha: limpiarTexto(item.pubDate),

        categoria: extraerCategoria(item),

        imagen: extraerImagen(item),
      };
    });
  } catch (error) {
    console.error(
      "Error al obtener noticias de Billboard Argentina:",
      error
    );

    return [];
  }
}
