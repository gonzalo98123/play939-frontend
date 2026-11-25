// src/components/Footer.tsx
"use client";

interface FooterProps {
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  solutionWebIgUrl?: string;
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V12H8v3h2v7h3v-7h2.2l.8-3H13V9.5c0-.28.22-.5.5-.5Z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46A2.75 2.75 0 0 0 2.42 7.19 28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
    </svg>
  );
}

export default function Footer({
  facebookUrl = "https://www.facebook.com/",
  instagramUrl = "https://www.instagram.com/",
  youtubeUrl = "https://www.youtube.com/",
  solutionWebIgUrl = "https://www.instagram.com/",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full md:fixed md:bottom-0 md:left-0 md:right-0 z-40 bg-[#08080E]/85 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-0 md:h-14 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs text-gray-400">
        {/* Derechos reservados */}
        <p className="text-center md:text-left whitespace-nowrap">
          © {currentYear}{" "}
          <span className="font-semibold text-white">Radio Play 93.9 FM</span>.
          Todos los derechos reservados.
        </p>

        {/* Redes sociales */}
        <div className="flex items-center gap-3">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Radio Play 93.9"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#E1005B]/50 hover:bg-[#E1005B]/15 transition-all"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Radio Play 93.9"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#E1005B]/50 hover:bg-[#E1005B]/15 transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube de Radio Play 93.9"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#E1005B]/50 hover:bg-[#E1005B]/15 transition-all"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Crédito SolutionWeb */}
        <p className="text-center md:text-right whitespace-nowrap">
          Creado por{" "}
          <a
            href={solutionWebIgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] hover:opacity-80 transition-opacity"
          >
            SolutionWeb
          </a>
        </p>
      </div>
    </footer>
  );
}