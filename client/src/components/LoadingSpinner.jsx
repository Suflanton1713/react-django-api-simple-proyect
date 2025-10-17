export function LoadingSpinner({ size = 'md', message = 'Cargando...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} border-4 border-dark-700 border-t-primary-500 rounded-full animate-spin`} />
      {message && <p className="mt-4 text-gray-400 text-sm">{message}</p>}
    </div>
  );
}

