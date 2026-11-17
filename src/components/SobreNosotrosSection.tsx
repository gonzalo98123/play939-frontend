// src/components/SobreNosotrosSection.tsx
import { Radio, Music, Users } from "lucide-react";

export default function SobreNosotrosSection() {
  return (
    <section id="sobre-nosotros" className="scroll-mt-24 max-w-5xl mx-auto py-8 space-y-12">
      {/* Encabezado */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-[#E1005B]/10 text-[#E1005B] text-xs font-bold tracking-wider uppercase border border-[#E1005B]/20">
          Radio Play 93.9 FM
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          La Radio de la{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1005B] to-[#FF4B2B]">
            Música
          </span>
        </h2>
        <p className="text-gray-400 text-base leading-relaxed">
          Somos la emisora de referencia en Alta Gracia y la región, conectando a nuestra comunidad con los éxitos del momento, información local relevante y el mejor entretenimiento dinámico.
        </p>
      </div>

      {/* Tarjetas de propuesta de valor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#16161E] rounded-2xl border border-white/5 p-6 space-y-3 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#E1005B]/10 text-[#E1005B] flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Transmisión 24/7</h3>
          <p className="text-sm text-gray-400">
            Llegamos a todo el departamento Santa María en el 93.9 del dial y al mundo entero a través de nuestra plataforma digital.
          </p>
        </div>

        <div className="bg-[#16161E] rounded-2xl border border-white/5 p-6 space-y-3 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#FF4B2B]/10 text-[#FF4B2B] flex items-center justify-center">
            <Music className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Sonido Urbano & Hits</h3>
          <p className="text-sm text-gray-400">
            Una programación musical cuidadosamente seleccionada con los ritmos que marcan tendencia en la juventud y la familia.
          </p>
        </div>

        <div className="bg-[#16161E] rounded-2xl border border-white/5 p-6 space-y-3 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#E1005B]/10 text-[#E1005B] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Conexión Local</h3>
          <p className="text-sm text-gray-400">
            Damos voz a los vecinos, emprendedores, artistas y eventos de Alta Gracia para mantener activa a la comunidad.
          </p>
        </div>
      </div>
    </section>
  );
}