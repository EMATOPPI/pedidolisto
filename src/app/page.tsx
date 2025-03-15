'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Restaurant {
  id: string;
  name: string;
  description: string | null;
  address: string;
  imageUrl: string | null;
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">PedidoListo</h1>
      <p className="text-xl">¡Bienvenido a nuestra aplicación!</p>
    </div>
  );
} 