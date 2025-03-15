import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear restaurantes de ejemplo
  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: "La Pizzería Italiana",
      description: "Las mejores pizzas artesanales de la ciudad",
      address: "Av. Principal 123",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      products: {
        create: [
          {
            name: "Pizza Margherita",
            description: "Salsa de tomate, mozzarella y albahaca",
            price: 12.99,
            imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"
          },
          {
            name: "Pizza Pepperoni",
            description: "Salsa de tomate, mozzarella y pepperoni",
            price: 14.99,
            imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e"
          }
        ]
      }
    }
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: "Burger House",
      description: "Las hamburguesas más jugosas",
      address: "Calle Secundaria 456",
      imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
      products: {
        create: [
          {
            name: "Hamburguesa Clásica",
            description: "Carne, lechuga, tomate y queso",
            price: 9.99,
            imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
          },
          {
            name: "Hamburguesa BBQ",
            description: "Carne, bacon, cebolla caramelizada y salsa BBQ",
            price: 11.99,
            imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b"
          }
        ]
      }
    }
  });

  console.log('Datos de ejemplo creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 