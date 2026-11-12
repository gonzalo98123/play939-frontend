
import { connection } from "next/server";

// Evita que Next.js intente pre-renderizar esta ruta durante el build
export const dynamic = 'force-dynamic';

interface Noticia {
  id?: string;
  titulo?: string;
  descripcion?: string;
  url?: string;
  link?: string;
  fecha?: string | null;
  imagen?: string | null;
  categoria?: string;
}

async function getNoticias(): Promise<Noticia[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/noticias`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error API Billboard:", res.status);
      return [];
    }

    const data = await res.json();

    if (!data.success) {
      console.error("Error RSS Billboard:", data.error);
      return [];
    }

    const noticiasOriginales: Noticia[] = data.noticias || [];

    // Ordenar de la más reciente a la más antigua
    const noticiasOrdenadas = [...noticiasOriginales].sort(
      (a, b) => {
        const fechaA = a.fecha
          ? new Date(a.fecha).getTime()
          : 0;

        const fechaB = b.fecha
          ? new Date(b.fecha).getTime()
          : 0;

        return fechaB - fechaA;
      }
    );

    // Mostrar solamente las últimas 6 noticias
    return noticiasOrdenadas.slice(0, 6);

  } catch (error) {
    console.error("Error cargando noticias Billboard:", error);
    return [];
  }
}

function formatFecha(fecha: string | null | undefined) {
  if (!fecha) return "";

  const date = new Date(fecha);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsSection() {
  await connection();

  const noticias = await getNoticias();

  return (
    <section className="space-y-6">

      {/* ENCABEZADO */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[#E1005B] text-xs font-bold uppercase tracking-widest">
            Música, charts y actualidad
          </span>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Novedades Musicales
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Las últimas novedades de Billboard Argentina y Latinoamérica.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-red-400 font-bold">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          ACTUALIDAD
        </div>
      </div>

      {/* SIN NOTICIAS */}
      {noticias.length === 0 ? (
        <div className="bg-[#16161E] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-gray-400">
            En este momento no hay noticias disponibles.
          </p>
        </div>
      ) : (

        /* GRILLA DE NOTICIAS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {noticias.map((noticia, index) => {
            const titulo =
              noticia.titulo?.trim() ||
              noticia.descripcion?.slice(0, 100) ||
              "Últimas noticias";

            const enlace = noticia.url || noticia.link;

            return (
              <article
                key={noticia.id || enlace || index}
                className="bg-[#16161E] rounded-2xl overflow-hidden border border-white/5 hover:border-[#E1005B]/50 transition-all duration-300 group flex flex-col"
              >

                {/* IMAGEN */}
                <div className="h-48 bg-gradient-to-br from-[#E1005B]/20 to-[#16161E] overflow-hidden relative">

                  {noticia.imagen && (
                    <img
                      src={noticia.imagen}
                      alt={titulo}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#E1005B] text-white px-3 py-1 rounded-full shadow-lg">
                      {noticia.categoria || "Billboard"}
                    </span>
                  </div>

                </div>

                {/* CONTENIDO */}
                <div className="p-5 space-y-3 flex flex-col flex-1">

                  <span className="text-xs text-gray-500">
                    {formatFecha(noticia.fecha)}
                  </span>

                  <h3 className="text-lg font-bold text-white leading-snug line-clamp-3">
                    {titulo}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {noticia.descripcion}
                  </p>

                  <div className="pt-3 mt-auto">

                    {enlace && (
                      <a
                        href={enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF4B2B] hover:text-[#E1005B] transition-colors"
                      >
                        Leer nota completa
                        <span>→</span>
                      </a>
                    )}

                  </div>

                </div>

              </article>
            );
          })}

        </div>
      )}

    </section>
  );
}
