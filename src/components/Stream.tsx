"use client";

import React, { useState, useRef, useEffect } from "react";
import { Share2, MessageCircle, Minimize2, Play, GripHorizontal } from "lucide-react";

interface RadioPlayerProps {
  streamUrl?: string;
  whatsappNumber?: string;
}

export default function RadioPlayerFlotante({
  streamUrl = "https://solumedia.com/video/play939/index.html",
  whatsappNumber = "5493547577080",
}: RadioPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(true);

  // Estados para manejar la posición en pantalla al arrastrar
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.initialX - dx,
        y: dragRef.current.initialY - dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

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
    <div
      className="fixed z-50 font-sans text-white select-none"
      style={{
        right: `${position.x}px`,
        bottom: `${position.y}px`,
      }}
    >
      {/* ================= VISTA MINIMIZADA ================= */}
      <div
        className={`bg-[#141622]/95 border border-white/10 backdrop-blur-md p-3 rounded-full shadow-2xl flex items-center gap-3 ${
          isMinimized ? "flex" : "hidden"
        }`}
      >
        <div className="relative flex h-3 w-3 ml-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2a55] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff2a55]"></span>
        </div>
        <span className="text-xs font-bold tracking-widest text-[#ff2a55] uppercase pr-2">
          EN VIVO
        </span>
        <button
          onClick={() => setIsMinimized(false)}
          className="w-9 h-9 rounded-full bg-[#ff2a55] hover:bg-[#ff2a55]/90 flex items-center justify-center text-white transition-transform active:scale-95 shadow-lg shadow-[#ff2a55]/30 cursor-pointer"
          title="Maximizar reproductor"
        >
          <Play className="w-4 h-4 fill-white ml-0.5" />
        </button>
      </div>

      {/* ================= VISTA EXPANDIDA (Movible sin barras feas) ================= */}
      <div
        className={`w-[350px] md:w-[380px] bg-[#141622]/95 rounded-[24px] p-4 shadow-2xl border border-white/10 backdrop-blur-md relative overflow-hidden flex flex-col ${
          isMinimized ? "hidden" : "flex"
        }`}
      >
        {/* Glow decorativo de fondo */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-[#ff2a55]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Barra superior para ARRASTRAR */}
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between mb-3 relative z-10 cursor-grab active:cursor-grabbing py-1"
          title="Hacé clic y arrastrá para mover"
        >
          <div className="flex items-center gap-2">
            <GripHorizontal className="w-4 h-4 text-slate-500" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2a55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff2a55]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-[#ff2a55] uppercase">
              EN VIVO
            </span>
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            title="Minimizar reproductor"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Contenedor del Iframe */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner border border-white/10 relative z-10 mb-3">
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
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5 relative z-10">
          <button
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors border border-white/10 active:scale-95 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-300" />
            <span>Compartir</span>
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#ff2a55] hover:bg-[#ff2a55]/90 text-white font-medium text-xs transition-all shadow-md shadow-[#ff2a55]/25 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Escribinos</span>
          </a>
        </div>
      </div>
    </div>
  );
}