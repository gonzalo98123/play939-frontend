
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radio Play 93.9 FM | Alta Gracia",
  description: "La radio de la música. Escuchanos en vivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.className} bg-[#0B0B0E] text-white antialiased pb-24`}
      >
        <NavBar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
