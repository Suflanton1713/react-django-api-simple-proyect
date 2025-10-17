import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createProject, deleteProject, getProject, updateProject } from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeftIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

export function ProjectFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProject() {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getProject(params.id);
          setValue('name', res.data.name);
          setValue('category', res.data.category);
          if (res.data.deadline) {
            setValue('deadline', res.data.deadline.split('T')[0]);
          }
        } catch (err) {
          toast.error('Error al cargar el proyecto');
        } finally {
          setLoading(false);
        }
      }
    }
    loadProject();
  }, [params.id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      
      if (params.id) {
        await updateProject(params.id, data);
        toast.success('¡Proyecto actualizado!', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
      } else {
        await createProject(data);
        toast.success('¡Proyecto creado!', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
      }
      navigate('/projects');
    } catch (err) {
      toast.error('Error al guardar el proyecto', {
        position: 'bottom-right',
        style: { background: '#ef4444', color: '#fff' }
      });
    } finally {
      setLoading(false);
    }
  });

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto? Se eliminarán todas sus tareas.')) {
      try {
        await deleteProject(params.id);
        toast.success('Proyecto eliminado', {
          position: 'bottom-right',
          style: { background: '#10b981', color: '#fff' }
        });
        navigate('/projects');
      } catch (err) {
        toast.error('Error al eliminar el proyecto');
      }
    }
  };

  if (loading && params.id) {
    return <LoadingSpinner message="Cargando proyecto..." />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Volver a proyectos
        </button>
        <h1 className="text-3xl font-bold text-white">
          {params.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h1>
        <p className="text-gray-400 mt-2">
          {params.id ? 'Modifica los detalles de tu proyecto' : 'Crea un nuevo proyecto para organizar tus tareas'}
        </p>
      </div>

      {/* Formulario */}
      <div className="card">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="label">Nombre del Proyecto *</label>
            <input
              type="text"
              placeholder="Ej: Desarrollo API"
              className="input"
              {...register('name', { required: 'El nombre es requerido' })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría */}
            <div>
              <label className="label">Categoría *</label>
              <select
                className="input"
                {...register('category', { required: 'La categoría es requerida' })}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="DevOps">DevOps</option>
                <option value="Mobile">Mobile</option>
                <option value="Data">Data</option>
                <option value="QA">QA</option>
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-400">{errors.category.message}</p>
              )}
            </div>

            {/* Fecha límite */}
            <div>
              <label className="label">Fecha límite</label>
              <input
                type="date"
                className="input"
                {...register('deadline')}
              />
            </div>
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
                onClick={() => navigate('/projects')}
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

