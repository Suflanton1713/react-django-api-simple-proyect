import { useState, useEffect } from 'react';
import { getAllTasksGraphQL, createTaskGraphQL } from '../api/graphql.api';
import { getAllProjects } from '../api/task.api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { 
  BeakerIcon, 
  PlayIcon, 
  DocumentTextIcon,
  PlusCircleIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export function GraphQLPage() {
  const [activeTab, setActiveTab] = useState('query'); // 'query' o 'mutation'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [projects, setProjects] = useState([]);
  
  // State para mutation
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    projectId: ''
  });

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await getAllProjects();
        const data = Array.isArray(res.data) ? res.data : (res.data?.results ?? []);
        setProjects(data);
      } catch (err) {
        console.error('Error cargando proyectos:', err);
      }
    }
    loadProjects();
  }, []);

  const handleQueryAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTasksGraphQL();
      setResult(data);
      toast.success('¡Query ejecutada correctamente!', {
        position: 'bottom-right',
        style: { background: '#10b981', color: '#fff' }
      });
    } catch (err) {
      setError('Error al ejecutar query: ' + err.message);
      toast.error('Error al ejecutar query');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.description || !taskData.projectId) {
      toast.error('Completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await createTaskGraphQL({
        title: taskData.title,
        description: taskData.description,
        project: taskData.projectId
      });
      setResult(data);
      toast.success('¡Tarea creada correctamente!', {
        position: 'bottom-right',
        style: { background: '#10b981', color: '#fff' }
      });
      // Limpiar formulario
      setTaskData({ title: '', description: '', projectId: '' });
    } catch (err) {
      setError('Error al ejecutar mutation: ' + err.message);
      toast.error('Error al crear tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
            <BeakerIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">GraphQL Lab</h1>
            <p className="text-gray-400">Experimenta con queries y mutations de GraphQL</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setActiveTab('query');
            setResult(null);
            setError(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'query'
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-dark-800 text-gray-400 hover:text-white'
          }`}
        >
          <DocumentTextIcon className="w-5 h-5" />
          Query (Consultar)
        </button>
        <button
          onClick={() => {
            setActiveTab('mutation');
            setResult(null);
            setError(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'mutation'
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-dark-800 text-gray-400 hover:text-white'
          }`}
        >
          <PlusCircleIcon className="w-5 h-5" />
          Mutation (Crear)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel izquierdo - Input */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CodeBracketIcon className="w-6 h-6 text-primary-400" />
            {activeTab === 'query' ? 'Query' : 'Mutation'}
          </h2>

          {activeTab === 'query' ? (
            <div>
              <div className="bg-dark-900 rounded-lg p-4 mb-4 border border-dark-700">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`query {
  allTasks {
    id
    title
    description
    done
    priority
    dueDate
    project {
      id
      name
      category
    }
  }
}`}
                </pre>
              </div>
              <button
                onClick={handleQueryAllTasks}
                disabled={loading}
                className="btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                {loading ? 'Ejecutando...' : 'Ejecutar Query'}
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Esta query obtiene todas las tareas con sus proyectos asociados
              </p>
            </div>
          ) : (
            <form onSubmit={handleCreateTask}>
              <div className="bg-dark-900 rounded-lg p-4 mb-4 border border-dark-700">
                <pre className="text-sm text-gray-300 overflow-x-auto mb-2">
{`mutation CreateTask(
  $title: String!
  $description: String!
  $projectId: ID!
) {
  createTask(
    title: $title
    description: $description
    projectId: $projectId
  ) {
    task {
      id
      title
      description
      done
    }
  }
}`}
                </pre>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="label">Título</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ej: Nueva tarea desde GraphQL"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Descripción</label>
                  <textarea
                    className="input resize-none"
                    rows="3"
                    placeholder="Descripción de la tarea..."
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Proyecto</label>
                  <select
                    className="input"
                    value={taskData.projectId}
                    onChange={(e) => setTaskData({ ...taskData, projectId: e.target.value })}
                  >
                    <option value="">Selecciona un proyecto</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                {loading ? 'Creando...' : 'Ejecutar Mutation'}
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Esta mutation crea una nueva tarea en el proyecto seleccionado
              </p>
            </form>
          )}
        </div>

        {/* Panel derecho - Output */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-green-400" />
            Respuesta
          </h2>

          {loading ? (
            <LoadingSpinner message="Ejecutando..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : result ? (
            <div className="bg-dark-900 rounded-lg p-4 border border-dark-700 overflow-x-auto">
              <pre className="text-sm text-green-400">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-dark-900 rounded-lg p-8 border border-dark-700 text-center">
              <BeakerIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Ejecuta una query o mutation para ver los resultados</p>
            </div>
          )}
        </div>
      </div>

      {/* Documentación */}
      <div className="card mt-6">
        <h2 className="text-xl font-semibold text-white mb-4">📘 Documentación GraphQL</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-white mb-2">Endpoint:</h3>
            <code className="bg-dark-900 px-3 py-2 rounded text-primary-400 text-sm">
              http://localhost:8000/graphql/
            </code>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-2">Queries disponibles:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code className="text-primary-400">allTasks</code>: Obtiene todas las tareas</li>
              <li><code className="text-primary-400">allProjects</code>: Obtiene todos los proyectos</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Mutations disponibles:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code className="text-primary-400">createTask</code>: Crea una nueva tarea</li>
              <li><code className="text-primary-400">updateTask</code>: Actualiza una tarea existente</li>
              <li><code className="text-primary-400">deleteTask</code>: Elimina una tarea</li>
            </ul>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> Puedes visitar{' '}
              <a 
                href="http://localhost:8000/graphql/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                http://localhost:8000/graphql/
              </a>
              {' '}en tu navegador para usar GraphiQL, un IDE interactivo con autocompletado y documentación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

