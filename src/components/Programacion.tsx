"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { getStrapiMedia } from "@/src/lib/strapi";

interface Programa {
  id: number | string;
  titulo?: string;
  conductor?: string;
  dia?: string;
  horario?: string;
  portada?: {
    url?: string;
  };
}

interface ProgramacionGridProps {
  programas: Programa[];
}

export default function ProgramacionGrid({ programas }: ProgramacionGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Función para mover manualmente con las flechas de forma suave
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.5;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Efecto para el movimiento continuo y ultra suave (autoscroll)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || programas.length <= 2) return;

    let animationFrameId: number;
    let speed = 0.5; // Velocidad del movimiento constante (puedes subirlo o bajarlo)

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;

        // Si llega al final del scroll, vuelve al principio de forma fluida
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, programas.length]);

  return (
    <section className="space-y-6">
      {/* ENCABEZADO Y FLECHAS DE NAVEGACIÓN */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 text-white">
          <Calendar className="w-7 h-7 text-[#FF4B2B]" />
          Nuestra Programación
        </h2>

        {programas.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-xl bg-[#16161E] border border-white/10 text-white hover:border-[#E1005B] transition-colors shadow-md"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-xl bg-[#16161E] border border-white/10 text-white hover:border-[#E1005B] transition-colors shadow-md"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {programas.length === 0 ? (
        <p className="text-gray-500 italic">No hay programas cargados todavía en Strapi.</p>
      ) : (
        /* CARRUSEL CON MOVIMIENTO CONTINUO Y SUAVE */
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-2 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
        >
          {programas.map((prog) => {
            const imageUrl = getStrapiMedia(prog.portada?.url ?? null);
            return (
              <div 
                key={prog.id} 
                className="min-w-[calc(100%-12px)] sm:min-w-[calc(50%-12px)] flex-shrink-0 bg-[#16161E] rounded-3xl border border-white/5 overflow-hidden hover:border-[#E1005B]/50 transition-all duration-300 group flex flex-col shadow-xl"
              >
                {/* CONTENEDOR DE IMAGEN */}
                {imageUrl ? (
                  <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-black/40">
                    <img 
                      src={imageUrl} 
                      alt={prog.titulo || "Programa de radio"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold uppercase tracking-wider bg-[#E1005B] text-white px-3.5 py-1.5 rounded-full shadow-lg">
                        {prog.dia || "Programación"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 sm:h-72 w-full bg-gradient-to-br from-[#E1005B]/20 to-[#16161E] flex items-center justify-center p-4 text-center">
                    <span className="text-gray-400 font-medium">Sin imagen</span>
                  </div>
                )}

                {/* DETALLES INFERIORES */}
                <div className="p-6 space-y-3 flex flex-col justify-between flex-1 bg-[#16161E]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-white line-clamp-1">
                      {prog.titulo}
                    </h3>
                    {prog.horario && (
                      <span className="text-xs font-semibold text-[#FF4B2B] bg-[#FF4B2B]/10 px-3 py-1 rounded-lg whitespace-nowrap">
                        {prog.horario}
                      </span>
                    )}
                  </div>
                  {prog.conductor && (
                    <p className="text-sm text-gray-400">
                      Conduce: <span className="text-gray-200 font-medium">{prog.conductor}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}