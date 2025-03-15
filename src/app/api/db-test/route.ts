import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Intentar una consulta simple
    const testConnection = await prisma.$queryRaw`SELECT 1 as result`;
    
    // Intentar obtener el conteo de restaurantes
    const restaurantCount = await prisma.restaurant.count();
    
    return NextResponse.json({
      status: "success",
      message: "Conexión a la base de datos exitosa",
      dbTest: testConnection,
      restaurantCount: restaurantCount
    });
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Error al conectar con la base de datos",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 