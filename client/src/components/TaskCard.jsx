import { useNavigate } from "react-router-dom";
import { 
  ClockIcon, 
  FlagIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  FolderIcon 
} from '@heroicons/react/24/outline';

export function TaskCard({ task, onMarkDone, onDelete }) {
  const navigate = useNavigate();

  const priorityColors = {
    1: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
    2: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    3: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  };

  const priorityLabels = { 1: 'Alta', 2: 'Media', 3: 'Baja' };
  const priority = priorityColors[task.priority] || priorityColors[3];

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.done;

  return (
    <div 
      className={`card cursor-pointer hover:scale-[1.02] transition-transform ${
        task.done ? 'opacity-70' : ''
      } ${isOverdue ? 'border-red-500/50' : ''}`}
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {task.done ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : isOverdue ? (
            <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-600" />
          )}
          <h3 className={`text-lg font-semibold ${task.done ? 'line-through text-gray-500' : 'text-white'}`}>
            {task.title}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.text} border ${priority.border}`}>
          <FlagIcon className="w-3 h-3 inline mr-1" />
          {priorityLabels[task.priority]}
        </span>
      </div>

      <p className="text-gray-400 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          {task.project_name && (
            <div className="flex items-center gap-1 text-gray-400">
              <FolderIcon className="w-4 h-4" />
              <span>{task.project_name}</span>
            </div>
          )}
          {task.due_date && (
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
              <ClockIcon className="w-4 h-4" />
              <span>{new Date(task.due_date).toLocaleDateString('es-ES')}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {!task.done && onMarkDone && (
            <button
              onClick={() => onMarkDone(task.id)}
              className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Completar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
