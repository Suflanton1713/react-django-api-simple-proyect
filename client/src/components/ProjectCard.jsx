import { useNavigate } from "react-router-dom";
import { 
  FolderIcon, 
  ClockIcon, 
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { getLateTasks } from '../api/task.api';
import toast from 'react-hot-toast';

export function ProjectCard({ project, onRefresh }) {
  const navigate = useNavigate();
  const [showingLateTasks, setShowingLateTasks] = useState(false);
  const [lateTasks, setLateTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryColors = {
    'Backend': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    'Frontend': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    'DevOps': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    'Mobile': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
  };

  const categoryColor = categoryColors[project.category] || categoryColors['Backend'];

  const handleViewLateTasks = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await getLateTasks(project.id);
      setLateTasks(res.data);
      setShowingLateTasks(true);
      if (res.data.length === 0) {
        toast.success('¡No hay tareas atrasadas!', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
      }
    } catch (err) {
      toast.error('Error al cargar tareas atrasadas');
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = project.tasks?.filter(t => t.done).length || 0;
  const totalTasks = project.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div 
      className="card cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FolderIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mt-1 ${categoryColor.bg} ${categoryColor.text} border ${categoryColor.border}`}>
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Progreso */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Progreso</span>
          <span>{completedTasks} / {totalTasks} tareas</span>
        </div>
        <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          {project.deadline && (
            <div className="flex items-center gap-1 text-gray-400">
              <ClockIcon className="w-4 h-4" />
              <span>{new Date(project.deadline).toLocaleDateString('es-ES')}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-400">
            <ClipboardDocumentListIcon className="w-4 h-4" />
            <span>{totalTasks} tareas</span>
          </div>
        </div>

        <button
          onClick={handleViewLateTasks}
          disabled={loading}
          className="flex items-center gap-1 text-xs px-3 py-1 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-md transition-colors border border-yellow-600/30"
        >
          <ExclamationTriangleIcon className="w-3 h-3" />
          {loading ? 'Cargando...' : 'Ver atrasadas'}
        </button>
      </div>

      {/* Tareas atrasadas modal inline */}
      {showingLateTasks && lateTasks.length > 0 && (
        <div 
          className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h4 className="text-sm font-semibold text-red-400 mb-2">Tareas Atrasadas:</h4>
          <ul className="space-y-1">
            {lateTasks.map(task => (
              <li key={task.id} className="text-xs text-gray-300">
                • {task.title} (Vence: {new Date(task.due_date).toLocaleDateString('es-ES')})
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowingLateTasks(false)}
            className="text-xs text-gray-400 hover:text-white mt-2"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

