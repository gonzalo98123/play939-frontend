
import { NextResponse } from "next/server";
import { obtenerNoticias } from "@/src/lib/noticiasMusicales";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
