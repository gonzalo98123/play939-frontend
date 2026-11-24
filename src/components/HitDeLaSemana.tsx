// src/components/HitDeLaSemana.tsx
"use client";

import { Flame, Sparkles, Music2 } from "lucide-react";

interface MediaFile {
  url?: string;
  attributes?: {
    url?: string;
  };
  data?: {
    url?: string;
    attributes?: {
      url?: string;
    };
  } | null;
}

export interface HitSemanaData {
  hitTitulo?: string | null;
  hitArtista?: string | null;
  hitDescripcion?: string | null;
  hitVideo?: MediaFile | MediaFile[] | null;
  attributes?: {
    hitTitulo?: string | null;
    hitArtista?: string | null;
    hitDescripcion?: string | null;
    hitVideo?: MediaFile | MediaFile[] | null;
  };
}

interface HitDeLaSemanaProps {
  data?: HitSemanaData | null;
  backendUrl?: string;
}

function extractRawUrl(media: unknown): string | undefined {
  if (!media || typeof media !== "object") return undefined;

  if (Array.isArray(media)) {
    for (const item of media) {
      const found = extractRawUrl(item);
      if (found) return found;
    }
    return undefined;
  }

  const obj = media as Record<string, unknown>;
  if (typeof obj.url === "string") return obj.url;
  if (obj.attributes) {
    const found = extractRawUrl(obj.attributes);
    if (found) return found;
  }
  if (obj.data) {
    const found = extractRawUrl(obj.data);
    if (found) return found;
  }
  return undefined;
}

function resolveVideoUrl(
  media: unknown,
  backendUrl: string
): string | null {
  const rawUrl = extractRawUrl(media);
  if (!rawUrl) return null;

  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }

  const cleanBase = backendUrl.replace(/\/$/, "");
  const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return `${cleanBase}${cleanPath}`;
}

export default function HitDeLaSemana({
  data,
  backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337",
}: HitDeLaSemanaProps) {
  const source = data?.attributes ?? data;
  const videoUrl = resolveVideoUrl(source?.hitVideo, backendUrl);

  if (!videoUrl) return null;

  const artista = source?.hitArtista?.trim() || "Destacado de la semana";
  const cancion = source?.hitTitulo?.trim() || "El Hit de la Semana";
  const descripcion =
    source?.hitDescripcion?.trim() ||
    "Cada 7 días renovamos el tema que está sonando más fuerte en el 93.9 y en la calle. Dale play y sumate a la vibra de Play FM.";

  return (
    <section
      id="hit-de-la-semana"
      className="scroll-mt-24 max-w-5xl mx-auto py-4"
    >
      <div className="bg-[#16161E] rounded-[28px] border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E1005B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1005B]/15 border border-[#E1005B]/30 text-[#FF4B2B] text-xs font-extrabold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-[#E1005B]" />
              <span>El Hit de la Semana</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                {artista}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1005B] to-[#FF4B2B]">
                  {cancion}
                </span>
              </h2>
            </div>

            {/* Solo visible en desktop */}
            <p className="hidden md:block text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              {descripcion}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#E1005B]" />
                Actualización cada 7 días
              </span>

              {/* "Play 93.9 FM" oculto en mobile, visible en desktop */}
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Music2 className="w-3.5 h-3.5 text-[#FF4B2B]" />
                Play 93.9 FM
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[300px] sm:max-w-[330px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <video
                key={videoUrl}
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}