// src/components/Sponsors.tsx
import { getStrapiMedia } from "@/src/lib/strapi";
import { Megaphone } from "lucide-react";

export default function Sponsors({ publicidades }: { publicidades: any[] }) {
  if (!publicidades || publicidades.length === 0) return null;

  // Ordenar opcionalmente por el campo 'orden'
  const sortedPublicidades = [...publicidades].sort((a, b) => (a.orden || 0) - (b.orden || 0));

  return (
    <section className="space-y-8 my-16">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] text-white shadow-lg shadow-[#E1005B]/30">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-widest text-[#FF4B2B] uppercase">
            Nuestros Socios Comerciales
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Auspiciantes Oficiales
          </h3>
        </div>
      </div>

      {/* Grilla flexible: adaptativa según la cantidad de marcas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {sortedPublicidades.map((item: any) => {
          const pub = item.attributes || item;
          const imgData = pub.imagenAnuncio?.data?.attributes || pub.imagenAnuncio;
          const imageUrl = getStrapiMedia(imgData?.url);

          if (!imageUrl) return null;

          const CardContent = (
            <div className="w-full bg-[#16161E] rounded-3xl border border-white/10 overflow-hidden group hover:border-[#E1005B] transition-all duration-300 p-3 md:p-4 shadow-2xl hover:shadow-[#E1005B]/30 flex items-center justify-center relative">
              
              {/* Resplandor sutil al pasar el cursor */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#E1005B]/10 via-transparent to-[#FF4B2B]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              {/* Imagen con altura automática: se adapta a las proporciones reales del flyer */}
              <img 
                src={imageUrl} 
                alt={pub.nombreCliente || "Publicidad"} 
                className="w-full h-auto max-h-[550px] object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-500 relative z-10"
              />
            </div>
          );

          return pub.enlaceUrl ? (
            <a 
              key={item.id} 
              href={pub.enlaceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              title={pub.nombreCliente}
              className="block transform transition-transform hover:-translate-y-1.5 w-full"
            >
              {CardContent}
            </a>
          ) : (
            <div key={item.id} className="block w-full">
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}