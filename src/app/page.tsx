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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);

  // Primero verificamos que la API funcione
  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus("API Test: " + data.message);
      })
      .catch((error) => {
        setApiStatus("Error en API Test: " + error.message);
      });
  }, []);

  useEffect(() => {
    fetch('/api/restaurantes')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setRestaurants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar restaurantes:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Cargando restaurantes...</p>
        {apiStatus && <p className="mt-2 text-sm text-gray-600">{apiStatus}</p>}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
        {apiStatus && <p className="mt-2 text-sm text-gray-600">{apiStatus}</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a PedidoListo</h1>
      {apiStatus && <p className="text-center mb-4 text-sm text-gray-600">{apiStatus}</p>}
      {restaurants.length === 0 ? (
        <p className="text-center text-gray-600">No hay restaurantes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurantes/${restaurant.id}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                {restaurant.imageUrl ? (
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.description}</p>
                <p className="text-gray-500 text-sm">{restaurant.address}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 