import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createTask, deleteTask, getTask, updateTask, getAllProjects } from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeftIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

export function TaskFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Cargar proyectos
        const projectsRes = await getAllProjects();
        setProjects(projectsRes.data);

        // Si estamos editando, cargar la tarea
        if (params.id) {
          const res = await getTask(params.id);
          setValue('title', res.data.title);
          setValue('description', res.data.description);
          setValue('priority', res.data.priority);
          setValue('project', res.data.project);
          if (res.data.due_date) {
            setValue('due_date', res.data.due_date.split('T')[0]);
          }
        }
      } catch (err) {
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      
      // Convertir priority a número
      data.priority = parseInt(data.priority);
      
      if (params.id) {
        await updateTask(params.id, data);
        toast.success('¡Tarea actualizada!', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
      } else {
        await createTask(data);
        toast.success('¡Tarea creada!', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
      }
      navigate('/tasks');
    } catch (err) {
      toast.error('Error al guardar la tarea', {
        position: 'bottom-right',
        style: { background: '#ef4444', color: '#fff' }
      });
    } finally {
      setLoading(false);
    }
  });

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await deleteTask(params.id);
        toast.success('Tarea eliminada', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
        navigate('/tasks');
      } catch (err) {
        toast.error('Error al eliminar la tarea');
      }
    }
  };

  if (loading && params.id) {
    return <LoadingSpinner message="Cargando tarea..." />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Volver a tareas
        </button>
        <h1 className="text-3xl font-bold text-white">
          {params.id ? 'Editar Tarea' : 'Nueva Tarea'}
        </h1>
        <p className="text-gray-400 mt-2">
          {params.id ? 'Modifica los detalles de tu tarea' : 'Crea una nueva tarea para tu proyecto'}
        </p>
      </div>

      {/* Formulario */}
      <div className="card">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="label">Título *</label>
            <input
              type="text"
              placeholder="Ej: Diseñar interfaz de usuario"
              className="input"
              {...register('title', { required: 'El título es requerido' })}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="label">Descripción *</label>
            <textarea
              placeholder="Describe los detalles de la tarea..."
              rows="4"
              className="input resize-none"
              {...register('description', { required: 'La descripción es requerida' })}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prioridad */}
            <div>
              <label className="label">Prioridad *</label>
              <select
                className="input"
                {...register('priority', { required: 'La prioridad es requerida' })}
                defaultValue="3"
              >
                <option value="1">🔴 Alta</option>
                <option value="2">🟡 Media</option>
                <option value="3">🔵 Baja</option>
              </select>
              {errors.priority && (
                <p className="mt-2 text-sm text-red-400">{errors.priority.message}</p>
              )}
            </div>

            {/* Proyecto */}
            <div>
              <label className="label">Proyecto *</label>
              <select
                className="input"
                {...register('project', { required: 'El proyecto es requerido' })}
              >
                <option value="">Selecciona un proyecto</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="mt-2 text-sm text-red-400">{errors.project.message}</p>
              )}
            </div>
          </div>

          {/* Fecha límite */}
          <div>
            <label className="label">Fecha límite</label>
            <input
              type="date"
              className="input"
              {...register('due_date')}
            />
          </div>

          {/* Botones */}
          <div className="flex items-center justify-between pt-4">
            <div>
              {params.id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn-danger inline-flex items-center gap-2"
                >
                  <TrashIcon className="w-5 h-5" />
                  Eliminar
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/tasks')}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary inline-flex items-center gap-2"
              >
                <CheckIcon className="w-5 h-5" />
                {loading ? 'Guardando...' : params.id ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
