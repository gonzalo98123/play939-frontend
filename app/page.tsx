// src/app/page.tsx
import { fetchAPI } from "@/src/lib/strapi";
import DownloadAppBanner from "@/src/components/DownloadAppBanner";
import Sponsors from "@/src/components/Sponsors";
import NewsSection from "@/src/components/NewsSection";
import ProgramacionGrid from "@/src/components/Programacion";
import HeroSection from "@/src/components/HeroSection";
import { Suspense } from "react";
import Stream from "@/src/components/Stream";

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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">

      {/* 1. GRILLA DE PROGRAMACIÓN (COMPONENTE) 
      <Stream />*/}

      {/* 2. GRILLA DE PROGRAMACIÓN (COMPONENTE) */}
      <ProgramacionGrid programas={programas} />

      {/* 3. HERO SECTION (COMPONENTE) */}
      <HeroSection whatsapp={global?.whatsapp} />



      {/* 4. SECCIÓN DE NOTICIAS AISLADA CON SUSPENSE */}
      <Suspense fallback={<div className="text-gray-500 py-12 text-center animate-pulse">Cargando noticias de actualidad...</div>}>
        <NewsSection />
      </Suspense>

      {/* 5. BLOQUE DE PUBLICIDADES / SPONSORS */}
      <Sponsors publicidades={publicidades} />

      {/* 6. BANNER DE LA APP */}
      <DownloadAppBanner/>

    </div>
  );
}