import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card border-red-900 bg-red-950/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-400 mb-1">Error</h3>
          <p className="text-gray-300">{message || 'Ocurrió un error inesperado'}</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="mt-4 btn-secondary text-sm"
            >
              Intentar de nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

