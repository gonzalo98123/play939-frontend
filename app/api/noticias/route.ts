
import { NextResponse } from "next/server";
import { obtenerNoticias } from "@/src/lib/noticiasMusicales";

// Forzar que esta ruta sea dinámica para que Vercel no intente prerenderizarla en el build
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const noticias = await obtenerNoticias();

    return NextResponse.json({
      success: true,
      fuente: "Billboard Argentina",
      total: noticias.length,
      noticias,
    });

  } catch (error: unknown) {
    const mensaje =
      error instanceof Error
        ? error.message
        : String(error);

    console.error("Error obteniendo noticias:", mensaje);

    return NextResponse.json(
      {
        success: false,
        fuente: "Billboard Argentina",
        error: mensaje,
      },
      { status: 500 }
    );
  }
}