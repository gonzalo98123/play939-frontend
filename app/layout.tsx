import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar";
import Footer from "@/src/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radio Play 93.9 FM | Alta Gracia",
  description: "La radio de la música. Escuchanos en vivo.",
};

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} bg-[#0B0B0E] text-white antialiased pb-0 md:pb-16`}
      >
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <Footer
          facebookUrl="https://www.facebook.com/play93.9"
          instagramUrl="https://www.instagram.com/playfmag/"
          youtubeUrl="https://www.youtube.com/@play93.9"
          solutionWebIgUrl="https://www.instagram.com/solution.web.gr/"
        />
      </body>
    </html>
  );
}