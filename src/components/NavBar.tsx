// src/components/NavBar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Definimos los enlaces apuntando a los IDs de la landing
  const links = [
    { name: 'Inicio', href: '/#inicio' },
    { name: 'Sobre Nosotros', href: '/#sobre-nosotros' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0E]/80 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/#inicio" className="flex items-center gap-3 group">
          <div className="relative w-20 h-20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image 
              src="/logo3.png" 
              alt="Play 93.9 Logo" 
              width={40} 
              height={40} 
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Menú de Navegación (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 bg-[#16161E]/60 border border-white/5 px-6 py-2.5 rounded-full shadow-inner">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Botón de Acción Rápida (Derecha) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contacto"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] text-white text-sm font-bold shadow-lg shadow-[#E1005B]/20 hover:opacity-90 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>Contacto</span>
          </a>
        </div>

        {/* Botón menú hamburguesa (Móvil) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white transition-colors"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#16161E] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold py-2 px-3 rounded-lg text-gray-300 hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10">
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] text-white text-center font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Contacto Directo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}