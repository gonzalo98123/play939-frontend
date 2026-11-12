// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { fetchAPI } from "@/src/lib/strapi";
import NavBar from "@/src/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radio Play 93.9 FM | Alta Gracia",
  description: "La radio de la música. Escuchanos en vivo.",
};

async function getGlobalConfig() {
  try {
    const data = await fetchAPI('/configuracion-global');
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalConfig = await getGlobalConfig();
  const streamUrl = globalConfig?.urlStreaming || '';

  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-[#0B0B0E] text-white antialiased pb-24`}>
        <NavBar />
        <main className="min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}