"use client";

import React from "react";
import { Share2, MessageCircle, Play } from "lucide-react";

interface RadioPlayerProps {
  streamUrl?: string;
  whatsappNumber?: string;
}

export default function RadioPlayerFijo({
  streamUrl = "https://solumedia.com/video/play939/index.html",
  whatsappNumber = "5493547577080",
}: RadioPlayerProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "RADIO PLAY 93.9",
          text: "Escucha RADIO PLAY 93.9 en vivo.",
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
    <div className="w-full max-w-4xl mx-auto my-6 bg-[#141622]/95 rounded-[24px] p-4 sm:p-6 shadow-2xl border border-white/10 backdrop-blur-md relative overflow-hidden flex flex-col">
      {/* Glow decorativo de fondo */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-[#ff2a55]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Cabecera del reproductor */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2a55] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2a55]"></span>
          </span>
          <span className="text-sm font-bold tracking-widest text-[#ff2a55] uppercase">
            EN VIVO - PLAY 93.9 FM
          </span>
        </div>
      </div>

      {/* Contenedor del Iframe */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner border border-white/10 relative z-10 mb-4">
        <iframe
          src={streamUrl}
          className="w-full h-full border-0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          title="Reproductor en vivo"
        />
      </div>

      {/* Acciones inferiores */}
      <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/5 relative z-10">
        <button
          onClick={handleShare}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 active:scale-95 cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-slate-300" />
          <span>Compartir Radio</span>
        </button>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#ff2a55] hover:bg-[#ff2a55]/90 text-white font-medium text-sm transition-all shadow-md shadow-[#ff2a55]/25 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}