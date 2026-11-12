
import { Suspense } from "react";
import { connection } from "next/server";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { fetchAPI } from "@/src/lib/strapi";

async function getGlobalData() {
  try {
    const res = await fetchAPI("/configuracion-global");
    return res?.data || {};
  } catch (error) {
    console.error("Error obteniendo configuración global:", error);
    return {};
  }
}

async function ContactoContenido() {
  // Evita que esta sección dependa de datos disponibles
  // únicamente durante la generación estática.
  await connection();

  const global = await getGlobalData();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Encabezado */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="text-4xl font-black text-white">
          Contactate con{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1005B] to-[#FF4B2B]">
            Play 93.9
          </span>
        </h1>

        <p className="text-gray-400">
          ¿Querés pautar en la radio, enviar tus saludos o consultar por
          programación? Escribinos directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Información directa y comercial */}
        <div className="bg-[#16161E] rounded-2xl border border-white/5 p-8 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
            Área Comercial y Estudios
          </h2>

          <div className="space-y-5">
            {/* Ubicación */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/5 text-[#FF4B2B]">
                <MapPin className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">
                  Ubicación
                </p>
                <p className="text-white font-medium text-sm">
                  Dino Carignani 154, Alta Gracia
                </p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/5 text-[#E1005B]">
                <Phone className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">
                  Teléfono / WhatsApp
                </p>
                <p className="text-white font-medium text-sm">
                  +54 3547 577080
                </p>
              </div>
            </div>

            {/* Correo */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/5 text-[#FF4B2B]">
                <Mail className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">
                  Correo Electrónico
                </p>
                <p className="text-white font-medium text-sm">
                  play93.9fm@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Botón de WhatsApp */}
          {global?.whatsapp && (
            <a
              href={`https://wa.me/${String(global.whatsapp).replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E1005B] to-[#FF4B2B] text-white font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-[#E1005B]/20"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar mensaje a WhatsApp
            </a>
          )}
        </div>

        {/* Formulario de mensaje */}
        <div className="bg-[#16161E] rounded-2xl border border-white/5 p-8 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
            Envianos tu consulta
          </h2>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-xs font-bold text-gray-400 mb-1"
              >
                Nombre Completo
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#E1005B] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-400 mb-1"
              >
                Correo Electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#E1005B] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-xs font-bold text-gray-400 mb-1"
              >
                Mensaje
              </label>

              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Escribí tu mensaje o propuesta acá..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#E1005B] text-sm resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors text-sm"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Contacto() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 py-12 text-gray-400">
          Cargando información de contacto...
        </div>
      }
    >
      <ContactoContenido />
    </Suspense>
  );
}
