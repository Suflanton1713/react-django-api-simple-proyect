import { PlusIcon } from '@heroicons/react/24/outline';

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="card text-center py-12">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
      {onAction && (
        <button onClick={onAction} className="btn-primary inline-flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

