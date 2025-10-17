import { useEffect, useState } from 'react';
import { getAllTasks, getAllProjects, getPendingTasks } from '../api/task.api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardDocumentListIcon, 
  FolderIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalProjects: 0,
    overdueTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [tasksRes, projectsRes, pendingRes] = await Promise.all([
          getAllTasks(),
          getAllProjects(),
          getPendingTasks()
        ]);

        // Normalizar respuesta de tareas (array o paginada)
        const tasks = Array.isArray(tasksRes.data) ? tasksRes.data : (tasksRes.data?.results ?? []);
        const completedTasks = tasks.filter(t => t.done);
        const overdue = tasks.filter(t => 
          t.due_date && new Date(t.due_date) < new Date() && !t.done
        );

        setStats({
          totalTasks: tasks.length,
          completedTasks: completedTasks.length,
          pendingTasks: (Array.isArray(pendingRes.data) ? pendingRes.data : (pendingRes.data?.results ?? [])).length,
          totalProjects: (Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data?.results ?? [])).length,
          overdueTasks: overdue.length
        });

        // Últimas 5 tareas
        setRecentTasks(tasks.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Cargando dashboard..." />;
  }

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Bienvenido a tu laboratorio de APIs</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Tasks */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Tareas</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <ClipboardDocumentListIcon className="w-6 h-6 text-primary-400" />
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Completadas</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.completedTasks}</p>
              <p className="text-xs text-green-400 mt-1">
                {completionRate}% completado
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.pendingTasks}</p>
              {stats.overdueTasks > 0 && (
                <p className="text-xs text-red-400 mt-1">
                  {stats.overdueTasks} atrasadas
                </p>
              )}
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Proyectos</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <FolderIcon className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ChartBarIcon className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-semibold text-white">Progreso General</h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Tareas completadas</span>
            <span className="text-white font-medium">{completionRate}%</span>
          </div>
          <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-green-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Tareas Recientes</h2>
          <button 
            onClick={() => navigate('/tasks')}
            className="text-sm text-primary-400 hover:text-primary-300"
          >
            Ver todas →
          </button>
        </div>
        
        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No hay tareas recientes
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map(task => (
              <div
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="flex items-center justify-between p-4 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-600 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  {task.done ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className={`font-medium ${task.done ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-400">{task.project_name}</p>
                  </div>
                </div>
                {task.due_date && (
                  <span className="text-xs text-gray-400">
                    {new Date(task.due_date).toLocaleDateString('es-ES')}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <button
          onClick={() => navigate('/task-create')}
          className="card hover:border-primary-600 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <ClipboardDocumentListIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Nueva Tarea</h3>
              <p className="text-sm text-gray-400">Crear una tarea rápidamente</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/project-create')}
          className="card hover:border-purple-600 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <FolderIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Nuevo Proyecto</h3>
              <p className="text-sm text-gray-400">Organizar tareas en proyectos</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/graphql')}
          className="card hover:border-green-600 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">GraphQL Lab</h3>
              <p className="text-sm text-gray-400">Probar queries y mutations</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

