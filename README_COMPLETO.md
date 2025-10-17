# 🚀 API Lab - Django + React

Laboratorio interactivo para consumir y probar APIs REST y GraphQL con un frontend moderno tipo dashboard.

![Stack](https://img.shields.io/badge/Django-5.2-green)
![Stack](https://img.shields.io/badge/React-19-blue)
![Stack](https://img.shields.io/badge/GraphQL-3.4-E10098)
![Stack](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [APIs Disponibles](#-apis-disponibles)
- [Capturas](#-capturas)

---

## ✨ Características

### Backend Django
- ✅ **REST API** con Django REST Framework
- ✅ **GraphQL API** con Graphene Django
- ✅ **Documentación automática** con DRF Spectacular
- ✅ **CORS configurado** para desarrollo
- ✅ **Throttling y Filtros**
- ✅ **Endpoints personalizados** (tareas pendientes, atrasadas, etc.)

### Frontend React
- 📊 **Dashboard interactivo** con estadísticas en tiempo real
- ✅ **Gestión de Tareas** (CRUD completo)
- 📁 **Gestión de Proyectos** (CRUD completo)
- 🧪 **GraphQL Lab** (panel para ejecutar queries y mutations)
- 🎨 **UI moderna** con TailwindCSS y animaciones
- 📱 **Diseño responsive**
- 🔔 **Notificaciones toast**
- ⚡ **Estados de carga** y manejo de errores

---

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Python | 3.12 | Lenguaje base |
| Django | 5.2 | Framework web |
| DRF | 3.16 | REST API |
| Graphene Django | 3.2 | GraphQL API |
| DRF Spectacular | 0.28 | Documentación OpenAPI |
| Django CORS Headers | 4.9 | CORS |

### Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 19 | UI Library |
| Vite | 7.1 | Build tool |
| TailwindCSS | 4.1 | Estilos |
| React Router | 6.28 | Enrutamiento |
| Axios | 1.7 | HTTP Client |
| React Hook Form | 7.54 | Formularios |
| React Hot Toast | 2.4 | Notificaciones |
| Heroicons | - | Iconos |

---

## 📦 Instalación

### 1. Backend (Django)

```bash
# Navegar a la carpeta del proyecto
cd react-django-api-simple-proyect

# Activar entorno virtual (Windows)
..\venv\Scripts\activate

# O en Linux/Mac
source ../venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Realizar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser
```

### 2. Frontend (React)

```bash
# Navegar a la carpeta del frontend
cd client

# Instalar dependencias
npm install
```

---

## 🚀 Ejecución

### Método 1: Script Automático (Windows)

```bash
# Desde la carpeta react-django-api-simple-proyect
start.bat
```

Este script abrirá dos terminales: una para el backend y otra para el frontend.

### Método 2: Manual

#### Terminal 1 - Backend
```bash
cd react-django-api-simple-proyect
..\venv\Scripts\activate  # Windows
# source ../venv/bin/activate  # Linux/Mac
python manage.py runserver
```

#### Terminal 2 - Frontend
```bash
cd react-django-api-simple-proyect/client
npm run dev
```

### URLs Importantes

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Admin Django | http://localhost:8000/admin |
| REST API Tasks | http://localhost:8000/tasks/api/v1/tasks/ |
| REST API Projects | http://localhost:8000/tasks/api/v1/projects/ |
| GraphQL Endpoint | http://localhost:8000/graphql/ |
| GraphiQL IDE | http://localhost:8000/graphql/ |
| API Docs (Swagger) | http://localhost:8000/api/schema/swagger-ui/ |
| API Docs (ReDoc) | http://localhost:8000/api/schema/redoc/ |

---

## 📂 Estructura del Proyecto

```
react-django-api-simple-proyect/
├── client/                        # Frontend React
│   ├── src/
│   │   ├── api/                  # Funciones API
│   │   │   ├── task.api.js       # REST API
│   │   │   └── graphql.api.js    # GraphQL
│   │   ├── components/           # Componentes
│   │   │   ├── Layout.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectList.jsx
│   │   │   └── ...
│   │   ├── pages/               # Páginas
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── TaskFormPage.jsx
│   │   │   ├── ProjectFormPage.jsx
│   │   │   └── GraphQLPage.jsx
│   │   ├── App.jsx              # Rutas
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── tasks/                        # App Django
│   ├── models.py                # Modelos Task & Project
│   ├── serializer.py            # Serializers DRF
│   ├── views.py                 # ViewSets REST
│   ├── schema.py                # Schema GraphQL
│   └── urls.py                  # URLs
│
├── django_crud_api/             # Configuración Django
│   ├── settings.py
│   └── urls.py
│
├── manage.py
├── requirements.txt
├── start.bat                    # Script de inicio
└── README_COMPLETO.md          # Esta documentación
```

---

## 🔌 APIs Disponibles

### REST API - Tasks

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/tasks/api/v1/tasks/` | Lista todas las tareas |
| POST | `/tasks/api/v1/tasks/` | Crea una tarea |
| GET | `/tasks/api/v1/tasks/{id}/` | Obtiene una tarea |
| PUT | `/tasks/api/v1/tasks/{id}/` | Actualiza una tarea |
| DELETE | `/tasks/api/v1/tasks/{id}/` | Elimina una tarea |
| GET | `/tasks/api/v1/tasks/pending/` | Tareas pendientes |
| POST | `/tasks/api/v1/tasks/{id}/mark_done/` | Marca como completada |

### REST API - Projects

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/tasks/api/v1/projects/` | Lista todos los proyectos |
| POST | `/tasks/api/v1/projects/` | Crea un proyecto |
| GET | `/tasks/api/v1/projects/{id}/` | Obtiene un proyecto |
| PUT | `/tasks/api/v1/projects/{id}/` | Actualiza un proyecto |
| DELETE | `/tasks/api/v1/projects/{id}/` | Elimina un proyecto |
| GET | `/tasks/api/v1/projects/{id}/late_tasks/` | Tareas atrasadas |

### GraphQL API

**Query: Todas las tareas**
```graphql
query {
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
    }
  }
}
```

**Mutation: Crear tarea**
```graphql
mutation CreateTask($title: String!, $description: String!, $projectId: ID!) {
  createTask(title: $title, description: $description, projectId: $projectId) {
    task {
      id
      title
      description
    }
  }
}
```

---

## 🎯 Funcionalidades del Frontend

### 1. Dashboard
- Estadísticas generales (total tareas, completadas, pendientes, proyectos)
- Barra de progreso global
- Lista de tareas recientes
- Accesos rápidos a crear tarea/proyecto

### 2. Tareas
- Ver todas las tareas en tarjetas visuales
- Crear nueva tarea con formulario validado
- Editar tarea existente
- Eliminar tarea con confirmación
- Marcar como completada con un clic
- Filtrar por: Todas / Pendientes / Completadas
- Indicadores visuales de prioridad (Alta, Media, Baja)
- Alerta de tareas atrasadas

### 3. Proyectos
- Ver todos los proyectos con barra de progreso
- Crear nuevo proyecto
- Editar proyecto existente
- Eliminar proyecto
- Ver tareas atrasadas por proyecto
- Categorías de proyectos (Backend, Frontend, DevOps, etc.)

### 4. GraphQL Lab
- Panel dividido: Query/Mutation ↔ Respuesta
- Ejecutar query `allTasks`
- Ejecutar mutation `createTask` con formulario
- Visualización JSON de respuestas
- Documentación integrada
- Link directo a GraphiQL

---

## 📸 Capturas

*Nota: Las capturas estarían aquí en un README completo con imágenes*

---

## 🐛 Troubleshooting

### Error de CORS
Si ves errores de CORS en la consola del navegador:
1. Verifica que el backend esté corriendo
2. Asegúrate de que `django-cors-headers` esté instalado
3. Confirma que `http://localhost:5173` esté en `CORS_ALLOWED_ORIGINS` en `settings.py`

### Error al conectar con la API
1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Revisa la consola del navegador para ver el error exacto
3. Comprueba que las URLs en `client/src/api/task.api.js` sean correctas

### Heroicons no se muestran
```bash
cd client
npm install @heroicons/react
```

---

## 🔄 Flujo de Trabajo Recomendado

1. **Iniciar Backend**: `python manage.py runserver`
2. **Iniciar Frontend**: `npm run dev` (en carpeta client)
3. **Acceder al Frontend**: http://localhost:5173
4. **Crear un proyecto** desde la interfaz
5. **Crear tareas** asociadas al proyecto
6. **Probar GraphQL Lab** para experimentar con queries
7. **Explorar el Dashboard** para ver estadísticas

---

## 📝 Próximas Mejoras

- [ ] Autenticación JWT
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Filtros avanzados y búsqueda
- [ ] Drag & Drop para reordenar tareas
- [ ] Modo oscuro/claro
- [ ] Exportar datos a CSV/PDF
- [ ] Gráficos con Chart.js
- [ ] Tests unitarios e integración

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto y está bajo la Licencia MIT.

---

## 👨‍💻 Autor

Desarrollado como proyecto educativo para aprender Django, REST API, GraphQL y React.

---

## 🙏 Agradecimientos

- Django y DRF por el excelente framework backend
- React por la increíble biblioteca UI
- TailwindCSS por los estilos utilities-first
- Heroicons por los iconos hermosos
- La comunidad open source

---

¿Preguntas o sugerencias? ¡Abre un issue! 🚀

