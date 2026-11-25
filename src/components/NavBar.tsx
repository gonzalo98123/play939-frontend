// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";

const NAV_ITEMS = [
  { id: "streaming", label: "Streaming", href: "#streaming" },
  { id: "programacion", label: "Programación", href: "#programacion" },
  { id: "hit-de-la-semana", label: "Hit de la Semana", href: "#hit-de-la-semana" },
  { id: "sobre-nosotros", label: "Sobre Nosotros", href: "#sobre-nosotros" },
  { id: "noticias", label: "Noticias", href: "#noticias" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
  { id: "aplicacion", label: "Aplicación", href: "#aplicacion" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("streaming");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Buscamos la entrada que esté más visible en la franja superior/central
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        // Activa la sección cuando cruza la franja superior de lectura (debajo del navbar)
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080E]/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="#streaming" className="flex items-center shrink-0">
          <img
            src="/logo-ultimo.png"
            alt="Play 93.9 FM"
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Enlaces Desktop con indicador de sección activa */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`relative py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
                {/* Línea indicadora inferior en gradiente Play 93.9 */}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Botón CTA Desktop */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] text-white text-xs lg:text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[#E1005B]/20 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Contacto
          </a>
        </div>

        {/* Botón menú Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir o cerrar menú"
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú desplegable Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D15] border-b border-white/10 px-4 py-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#E1005B]/15 text-white border border-[#E1005B]/30"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#FF4B2B]" />
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}