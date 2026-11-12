// src/components/DownloadAppBanner.tsx
import { Sparkles, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface DownloadAppBannerProps {
  appUrl?: string;
}

export default function DownloadAppBanner({ appUrl = "https://play939.appradio.ar/" }: DownloadAppBannerProps) {
  return (
    <section className="relative my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#16161E] via-[#1A1A24] to-[#16161E] border border-white/10 p-8 md:p-10 shadow-2xl">
      
      {/* Efecto de luz de fondo difusa */}
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#E1005B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-[#FF4B2B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Texto e Logo */}
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="flex items-center justify-center w-32 h-32 shrink-0">
            <Image 
              src="/logo3.png" 
              alt="Play 93.9 Logo" 
              width={64} 
              height={64} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF4B2B]/10 text-[#FF4B2B] font-bold text-xs rounded-full uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multiplataforma</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Radio Play en tus dispositivos
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              Disfrutá de nuestra programación en vivo y conectá con la música desde cualquier celular, tablet o computadora con un solo clic, sin descargas pesadas.
            </p>
          </div>
        </div>

        {/* Botón de Acceso a la Web App */}
        <div className="shrink-0">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/60 hover:bg-black/80 border border-white/15 text-white transition-all hover:scale-105 shadow-xl group"
          >
            <div className="text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">App Oficial</p>
              <p className="text-sm font-bold tracking-wide text-white group-hover:text-[#FF4B2B] transition-colors">ABRIR APLICACIÓN</p>
            </div>
            <ExternalLink className="w-5 h-5 text-[#FF4B2B] ml-1 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}