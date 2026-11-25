// src/app/page.tsx
import { fetchAPI } from "@/src/lib/strapi";
import DownloadAppBanner from "@/src/components/DownloadAppBanner";
import Sponsors from "@/src/components/Sponsors";
import NewsSection from "@/src/components/NewsSection";
import ProgramacionGrid from "@/src/components/Programacion";
import HeroSection from "@/src/components/HeroSection";
import HitDeLaSemana, { HitSemanaData } from "@/src/components/HitDeLaSemana";
import SobreNosotrosSection from "@/src/components/SobreNosotrosSection";
import ContactoSection from "@/src/components/ContactoSection";
import Stream from "@/src/components/Stream";
import { Suspense } from "react";

interface GlobalConfig extends HitSemanaData {
  whatsapp?: string;
  [key: string]: any;
}

async function getData() {
  let programas = [];
  let publicidades = [];
  let global: GlobalConfig = {};

  try {
    const res = await fetchAPI("/programas?populate=*");
    programas = res?.data || [];
  } catch (error) {
    console.error("Error al obtener programas:", error);
  }

  try {
    const res = await fetchAPI("/publicidads?populate=*");
    publicidades = res?.data || [];
  } catch (error) {
    console.error("Error al obtener publicidades:", error);
  }

  try {
    const res = await fetchAPI("/configuracion-global?populate=*");
    global = res?.data || {};
  } catch (error) {
    console.error("Error al obtener configuración global:", error);
  }

  return { programas, publicidades, global };
}

export default async function Home() {
  const { programas, publicidades, global } = await getData();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-24">
      {/* 1. STREAMING / REPRODUCTOR Y HERO */}
      <section id="streaming" className="scroll-mt-24 space-y-12 pt-4">
        <Stream whatsappNumber={global?.whatsapp} />
        <HeroSection whatsapp={global?.whatsapp} />
      </section>

      {/* 2. PROGRAMACIÓN */}
      <section id="programacion" className="scroll-mt-24">
        <ProgramacionGrid programas={programas} />
      </section>

      {/* 3. EL HIT DE LA SEMANA */}
      <HitDeLaSemana data={global} backendUrl={backendUrl} />

      {/* 4. SOBRE NOSOTROS */}
      <SobreNosotrosSection />

      {/* 5. NOTICIAS */}
      <section id="noticias" className="scroll-mt-24">
        <Suspense
          fallback={
            <div className="text-gray-500 py-12 text-center animate-pulse">
              Cargando noticias de actualidad...
            </div>
          }
        >
          <NewsSection />
        </Suspense>
      </section>

      {/* 6. SPONSORS */}
      <Sponsors publicidades={publicidades} />

      {/* 7. CONTACTO */}
      <ContactoSection />

      {/* 8. BANNER DE LA APP */}
      <section id="aplicacion" className="scroll-mt-24">
        <DownloadAppBanner />
      </section>
    </div>
  );
}