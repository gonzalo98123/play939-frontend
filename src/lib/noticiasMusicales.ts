
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

function limpiarTexto(valor: unknown): string {
  let texto = "";

  if (typeof valor === "string") {
    texto = valor;
  } else if (valor && typeof valor === "object") {
    const objeto = valor as Record<string, unknown>;
    const contenido = objeto.__cdata ?? objeto["#text"];
    if (typeof contenido === "string") {
      texto = contenido;
    }
  }

  return texto
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

type RSSItem = Record<string, any>;

function extraerImagen(item: RSSItem): string | null {
  const enclosure = item.enclosure?.["@_url"];
  if (typeof enclosure === "string") return enclosure;

  const mediaContent = item["media:content"];
  const media = Array.isArray(mediaContent)
    ? mediaContent[0]
    : mediaContent;

  if (typeof media?.["@_url"] === "string") {
    return media["@_url"];
  }

  const thumbnailContent = item["media:thumbnail"];
  const thumbnail = Array.isArray(thumbnailContent)
    ? thumbnailContent[0]
    : thumbnailContent;

  if (typeof thumbnail?.["@_url"] === "string") {
    return thumbnail["@_url"];
  }

  const contenido =
    item["content:encoded"]?.__cdata ??
    item["content:encoded"] ??
    item.description?.__cdata ??
    item.description ??
    "";

  if (typeof contenido === "string") {
    const match = contenido.match(
      /<img\b[^>]*?\b(?:src|data-src)=["']([^"']+)["']/i
    );

    if (match?.[1]) return match[1];
  }

  return null;
}

function extraerCategoria(item: RSSItem): string {
  if (!item.category) return "Música";

  const categorias = Array.isArray(item.category)
    ? item.category
    : [item.category];

  const categoria = categorias
    .map((cat: unknown) => limpiarTexto(cat))
    .find((cat: string) => cat.length > 0);

  return categoria || "Música";
}

export async function obtenerNoticias(): Promise<Noticia[]> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const response = await fetch(RSS_URL, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
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

    const lista = Array.isArray(items) ? items : [items];

    return lista.slice(0, 6).map(
      (item: RSSItem): Noticia => ({
        titulo: limpiarTexto(item.title),
        descripcion: limpiarTexto(item.description),
        url:
          typeof item.link === "string"
            ? item.link
            : item.link?.["@_href"] || "#",
        fecha: limpiarTexto(item.pubDate),
        categoria: extraerCategoria(item),
        imagen: extraerImagen(item),
      })
    );
  } catch (error) {
    console.error(
      "Error al obtener noticias de Billboard Argentina:",
      error
    );
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}
