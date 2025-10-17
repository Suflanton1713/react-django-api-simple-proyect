import { useEffect, useState } from 'react';
import { getAllProjects } from '../api/task.api';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';
import { FolderIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllProjects();
      const data = Array.isArray(res.data) ? res.data : (res.data?.results ?? []);
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando proyectos..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadProjects} />;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Proyectos</h1>
          <p className="text-gray-400">Gestiona tus proyectos y equipos de trabajo</p>
        </div>
        <button 
          onClick={() => navigate('/project-create')}
          className="btn-primary"
        >
          + Nuevo Proyecto
        </button>
      </div>

      {/* Lista de proyectos */}
      {projects.length === 0 ? (
        <EmptyState
          icon={FolderIcon}
          title="No hay proyectos"
          description="Comienza creando tu primer proyecto para organizar tus tareas"
          actionLabel="Crear Proyecto"
          onAction={() => navigate('/project-create')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onRefresh={loadProjects}
            />
          ))}
        </div>
      )}
    </div>
  );
}

