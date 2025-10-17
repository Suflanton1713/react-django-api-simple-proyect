import { useEffect, useState } from 'react';
import { getAllTasks, markTaskDone, getPendingTasks } from '../api/task.api';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';
import { ClipboardDocumentListIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = filter === 'pending' ? await getPendingTasks() : await getAllTasks();
      // Normalizar respuesta: puede ser array directo o paginada { results: [] }
      let tasksData = Array.isArray(res.data) ? res.data : (res.data?.results ?? []);
      
      if (filter === 'completed') {
        tasksData = tasksData.filter(task => task.done);
      }
      
      setTasks(tasksData);
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleMarkDone = async (id) => {
    try {
      await markTaskDone(id);
      toast.success('¡Tarea completada!', { 
        position: 'bottom-right',
        style: { background: '#10b981', color: '#fff' }
      });
      loadTasks();
    } catch (err) {
      toast.error('Error al completar la tarea', {
        position: 'bottom-right',
        style: { background: '#ef4444', color: '#fff' }
      });
    }
  };

  if (loading) return <LoadingSpinner message="Cargando tareas..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadTasks} />;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tareas</h1>
          <p className="text-gray-400">Gestiona tus tareas y proyectos</p>
        </div>
        <button 
          onClick={() => navigate('/task-create')}
          className="btn-primary"
        >
          + Nueva Tarea
        </button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 mb-6">
        <FunnelIcon className="w-5 h-5 text-gray-400" />
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            Todas ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending' 
                ? 'bg-primary-600 text-white' 
                : 'bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed' 
                ? 'bg-primary-600 text-white' 
                : 'bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            Completadas
          </button>
        </div>
      </div>

      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <EmptyState
          icon={ClipboardDocumentListIcon}
          title="No hay tareas"
          description="Comienza creando tu primera tarea para organizar tu trabajo"
          actionLabel="Crear Tarea"
          onAction={() => navigate('/task-create')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onMarkDone={handleMarkDone}
            />
          ))}
        </div>
      )}
    </div>
  );
}
