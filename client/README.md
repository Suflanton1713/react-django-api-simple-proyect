# 🚀 API Lab - Frontend

Frontend moderno e interactivo para consumir las APIs REST y GraphQL del backend Django.

## ✨ Características

- 📊 **Dashboard**: Visualización de estadísticas y métricas
- ✅ **Gestión de Tareas**: CRUD completo con filtros y estados
- 📁 **Gestión de Proyectos**: Organiza tareas por proyectos
- 🧪 **GraphQL Lab**: Panel interactivo para probar queries y mutations
- 🎨 **Diseño moderno**: UI tipo dashboard con TailwindCSS
- 📱 **Responsive**: Funciona en móviles, tablets y desktop

## 🛠️ Tecnologías

- React 19
- React Router DOM
- Axios
- TailwindCSS
- React Hook Form
- React Hot Toast
- Heroicons
- Vite

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## 🚀 Ejecución

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

El frontend estará disponible en `http://localhost:5173`

## 📂 Estructura del Proyecto

```
src/
├── api/                    # Funciones para consumir APIs
│   ├── task.api.js        # Endpoints REST
│   └── graphql.api.js     # Queries y Mutations GraphQL
├── components/            # Componentes reutilizables
│   ├── Layout.jsx         # Layout principal con sidebar
│   ├── TaskCard.jsx       # Tarjeta de tarea
│   ├── TaskList.jsx       # Lista de tareas
│   ├── ProjectCard.jsx    # Tarjeta de proyecto
│   ├── ProjectList.jsx    # Lista de proyectos
│   ├── LoadingSpinner.jsx # Spinner de carga
│   ├── ErrorMessage.jsx   # Mensaje de error
│   └── EmptyState.jsx     # Estado vacío
├── pages/                 # Páginas/Vistas
│   ├── DashboardPage.jsx  # Dashboard principal
│   ├── TaskPage.jsx       # Página de tareas
│   ├── TaskFormPage.jsx   # Formulario de tarea
│   ├── ProjectPage.jsx    # Página de proyectos
│   ├── ProjectFormPage.jsx# Formulario de proyecto
│   └── GraphQLPage.jsx    # Panel de GraphQL
├── App.jsx               # Configuración de rutas
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🔗 Endpoints

### REST API
- Tasks: `http://localhost:8000/tasks/api/v1/tasks/`
- Projects: `http://localhost:8000/tasks/api/v1/projects/`

### GraphQL API
- GraphQL: `http://localhost:8000/graphql/`

## 🎯 Funcionalidades Implementadas

### ✅ Tareas
- Ver todas las tareas
- Crear nueva tarea
- Editar tarea
- Eliminar tarea
- Marcar como completada
- Filtrar por estado (todas, pendientes, completadas)
- Visualizar tareas atrasadas

### 📁 Proyectos
- Ver todos los proyectos
- Crear nuevo proyecto
- Editar proyecto
- Eliminar proyecto
- Ver tareas atrasadas por proyecto
- Barra de progreso por proyecto

### 🧪 GraphQL Lab
- Ejecutar query `allTasks`
- Ejecutar mutation `createTask`
- Visualización de respuestas JSON
- Formulario interactivo para variables

### 📊 Dashboard
- Estadísticas generales
- Tareas recientes
- Progreso global
- Accesos rápidos

## 🎨 Paleta de Colores

- **Primary**: Azul (`#0ea5e9`)
- **Success**: Verde (`#10b981`)
- **Danger**: Rojo (`#ef4444`)
- **Warning**: Amarillo (`#eab308`)
- **Dark**: Tonos de gris oscuro

## 📝 Notas

- Asegúrate de que el backend Django esté corriendo en `http://localhost:8000`
- El frontend consume tanto las APIs REST como GraphQL
- Las notificaciones toast aparecen en la esquina inferior derecha

## 🐛 Troubleshooting

Si tienes problemas de CORS:
- Verifica que `django-cors-headers` esté instalado en el backend
- Asegúrate de que `http://localhost:5173` esté en `CORS_ALLOWED_ORIGINS`

## 📄 Licencia

MIT
