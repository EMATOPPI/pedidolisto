import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        products: true,
      },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    return NextResponse.json(
      { error: "Error al obtener restaurantes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const restaurant = await prisma.restaurant.create({
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        imageUrl: data.imageUrl,
      },
    });
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error("Error al crear restaurante:", error);
    return NextResponse.json(
      { error: "Error al crear restaurante" },
      { status: 500 }
    );
  }
} 