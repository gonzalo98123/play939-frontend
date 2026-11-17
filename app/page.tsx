// src/app/page.tsx
import { fetchAPI } from "@/src/lib/strapi";
import DownloadAppBanner from "@/src/components/DownloadAppBanner";
import Sponsors from "@/src/components/Sponsors";
import NewsSection from "@/src/components/NewsSection";
import ProgramacionGrid from "@/src/components/Programacion";
import HeroSection from "@/src/components/HeroSection";
import SobreNosotrosSection from "@/src/components/SobreNosotrosSection";
import ContactoSection from "@/src/components/ContactoSection";
import Stream from "@/src/components/Stream";
import { Suspense } from "react";

interface GlobalConfig {
  whatsapp?: string;
  [key: string]: any;
}

async function getData() {
  let programas = [];
  let publicidades = [];
  let global: GlobalConfig = {};

  try {
    const res = await fetchAPI('/programas?populate=*');
    programas = res?.data || [];
  } catch (error) {
    console.error("Error al obtener programas:", error);
  }

  try {
    const res = await fetchAPI('/publicidads?populate=*');
    publicidades = res?.data || [];
  } catch (error) {
    console.error("Error al obtener publicidades:", error);
  }

  try {
    const res = await fetchAPI('/configuracion-global');
    global = res?.data || {};
  } catch (error) {
    console.error("Error al obtener configuración global:", error);
  }

  return { programas, publicidades, global };
}

export default async function Home() {
  const { programas, publicidades, global } = await getData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-24">

      {/* 1. INICIO / REPRODUCTOR Y HERO */}
      <section id="inicio" className="space-y-12 pt-4">
        <Stream whatsappNumber={global?.whatsapp} />
        <HeroSection whatsapp={global?.whatsapp} />
      </section>

      {/* 2. PROGRAMACIÓN */}
      <section id="programacion">
        <ProgramacionGrid programas={programas} />
      </section>

      {/* 3. SOBRE NOSOTROS */}
      <SobreNosotrosSection />

      {/* 4. NOTICIAS */}
      <section id="noticias">
        <Suspense fallback={<div className="text-gray-500 py-12 text-center animate-pulse">Cargando noticias de actualidad...</div>}>
          <NewsSection />
        </Suspense>
      </section>

      {/* 5. SPONSORS */}
      <Sponsors publicidades={publicidades} />

      {/* 6. CONTACTO */}
      <ContactoSection />

      {/* 7. BANNER DE LA APP */}
      <DownloadAppBanner />

    </div>
  );
}