export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl">Página no encontrada</p>
      <a href="/" className="mt-4 text-blue-500 hover:text-blue-700">
        Volver al inicio
      </a>
    </div>
  );
} 