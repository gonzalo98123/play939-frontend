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

  // Duplicamos los programas para crear el efecto de bucle infinito sin saltos bruscos
  const extendedProgramas = [...programas, ...programas];

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

  // Efecto para el movimiento continuo y bucle infinito suave
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || programas.length <= 1) return;

    let animationFrameId: number;
    let speed = 0.5; // Velocidad del movimiento constante

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;

        // La mitad exacta del ancho total del scroll corresponde al final del primer bloque original
        const halfScrollWidth = container.scrollWidth / 2;

        // Si pasamos la mitad, reiniciamos el scroll al principio de forma invisible
        if (container.scrollLeft >= halfScrollWidth) {
          container.scrollLeft = container.scrollLeft - halfScrollWidth;
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
        /* CARRUSEL INFINITO Y CONTINUO */
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-2 select-none items-stretch"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
        >
          {extendedProgramas.map((prog, index) => {
            const imageUrl = getStrapiMedia(prog.portada?.url ?? null);
            return (
              <div 
                key={`${prog.id}-${index}`} 
                className="w-[85vw] sm:w-[calc(43%-12px)] min-w-[85vw] sm:min-w-[calc(43%-12px)] max-w-[480px] flex-shrink-0 bg-[#16161E] rounded-3xl border border-white/5 overflow-hidden hover:border-[#E1005B]/50 transition-all duration-300 group flex flex-col shadow-2xl"
              >
                {/* CONTENEDOR DE IMAGEN ADAPTABLE */}
                {imageUrl ? (
                  <div className="w-full relative bg-black/40 flex items-center justify-center overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={prog.titulo || "Programa de radio"} 
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none" 
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-bold uppercase tracking-wider bg-[#E1005B] text-white px-3.5 py-1.5 rounded-full shadow-lg">
                        {prog.dia || "Programación"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full bg-gradient-to-br from-[#E1005B]/20 to-[#16161E] flex items-center justify-center p-4 text-center">
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