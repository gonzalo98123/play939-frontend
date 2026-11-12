"use client";

import React from "react";
import { Radio, Share2, MessageCircle } from "lucide-react";

interface RadioPlayerProps {
  streamUrl?: string;
  whatsappNumber?: string;
  stationName?: string;
  frequency?: string;
  location?: string;
}

export default function RadioPlayer({
  streamUrl = "https://solumedia.com/video/play939/index.html",
  whatsappNumber = "5493547577080", // Puedes cambiarlo por tu número de WhatsApp
  stationName = "RADIO PLAY",
  frequency = "93.9 FM",
  location = "ALTA GRACIA, CÓRDOBA",
}: RadioPlayerProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${stationName} ${frequency}`,
          text: `Escucha ${stationName} ${frequency} en vivo.`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 font-sans text-white">
      <div className="relative bg-[#141622] rounded-[32px] p-4 md:p-8 shadow-2xl border border-white/5 backdrop-blur-sm overflow-hidden">
        
        {/* Glow decorativo de fondo */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#ff2a55]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado del reproductor */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 bg-[#ff2a55]/10 text-[#ff2a55] font-semibold text-xs rounded-full uppercase tracking-wider mb-1">
              {location}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {stationName} <span className="text-[#ff2a55]">{frequency}</span>
            </h2>
          </div>

          {/* Indicador EN VIVO */}
          <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-black/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2a55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2a55]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-[#ff2a55] uppercase">
              EN VIVO
            </span>
          </div>
        </div>

        {/* Contenedor del Iframe con relación de aspecto 16:9 responsive */}
        <div className="relative w-full aspect-video md:aspect-[16/9] max-h-[420px] bg-black rounded-2xl overflow-hidden shadow-inner border border-white/10 relative z-10">
          <iframe
            src={streamUrl}
            className="w-full h-full border-0"
            scrolling="no"
            allowFullScreen
            title={`Reproductor ${stationName}`}
          />
        </div>

        {/* Barra de acciones e información inferior */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-9 h-9 rounded-full bg-[#ff2a55]/10 flex items-center justify-center text-[#ff2a55]">
              <Radio className="w-5 h-5" />
            </div>
            <span>Transmisión HD Digital</span>
          </div>

          {/* Botones de interacción */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 active:scale-95"
            >
              <Share2 className="w-4 h-4 text-slate-300" />
              <span>Compartir</span>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ff2a55] hover:bg-[#ff2a55]/90 text-white font-medium text-sm transition-all shadow-lg shadow-[#ff2a55]/25 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Escribinos</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}