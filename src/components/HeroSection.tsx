import { Radio } from "lucide-react";

interface HeroSectionProps {
  whatsapp?: string;
}

export default function HeroSection({ whatsapp }: HeroSectionProps) {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#16161E] to-[#0B0B0E] border border-white/10 p-8 md:p-12 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E1005B]/20 to-[#FF4B2B]/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl space-y-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1005B]/10 text-[#E1005B] text-xs font-bold tracking-wider uppercase border border-[#E1005B]/20">
          <Radio className="w-4 h-4 animate-pulse" />
          Alta Gracia, Córdoba
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          RADIO PLAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1005B] to-[#FF4B2B]">93.9 FM</span>
        </h1>
        
        <p className="text-gray-400 text-lg">
          La radio de la música. Conéctate con la mejor programación, transmisiones en vivo y toda la energía urbana donde vayas.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] text-white font-semibold hover:opacity-95 transition-opacity shadow-lg shadow-[#E1005B]/30 flex items-center gap-2"
            >
              Escribinos al WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}