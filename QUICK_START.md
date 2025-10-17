# 🚀 Guía de Inicio Rápido - API Lab

## ⚡ Inicio Rápido (Windows)

```bash
# 1. Ejecuta este script desde la carpeta react-django-api-simple-proyect
start.bat
```

Esto iniciará automáticamente:
- ✅ Backend Django en http://localhost:8000
- ✅ Frontend React en http://localhost:5173

---

## 📝 Inicio Manual

### 1️⃣ Terminal 1 - Backend

```bash
cd react-django-api-simple-proyect
..\venv\Scripts\activate
python manage.py runserver
```

### 2️⃣ Terminal 2 - Frontend

```bash
cd react-django-api-simple-proyect\client
npm install     # Solo la primera vez
npm run dev
```

---

## 🎯 URLs Importantes

| Servicio | URL |
|----------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:8000 |
| **GraphiQL** | http://localhost:8000/graphql/ |
| **Admin Django** | http://localhost:8000/admin |

---

## 🔥 Primeros Pasos

1. **Abre el Frontend**: http://localhost:5173
2. **Explora el Dashboard**: Verás estadísticas de tareas y proyectos
3. **Crea un Proyecto**: Click en "Nuevo Proyecto"
   - Nombre: "Mi Primer Proyecto"
   - Categoría: Backend
4. **Crea una Tarea**: Click en "Nueva Tarea"
   - Título: "Configurar entorno"
   - Descripción: "Instalar dependencias"
   - Proyecto: Mi Primer Proyecto
   - Prioridad: Alta
5. **Prueba GraphQL Lab**: Ve a la sección GraphQL y ejecuta queries

---

## 🧪 Prueba las APIs

### REST API - Crear Tarea

```bash
curl -X POST http://localhost:8000/tasks/api/v1/tasks/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva tarea desde API",
    "description": "Probando la API REST",
    "priority": 1,
    "project": 1
  }'
```

### GraphQL - Consultar Tareas

Visita http://localhost:8000/graphql/ y ejecuta:

```graphql
query {
  allTasks {
    id
    title
    done
    project {
      name
    }
  }
}
```

---

## 🎨 Características del Frontend

### Dashboard
- 📊 Estadísticas en tiempo real
- 📈 Barra de progreso global
- 🆕 Tareas recientes
- ⚡ Accesos rápidos

### Tareas
- ✅ CRUD completo
- 🔍 Filtros (Todas, Pendientes, Completadas)
- 🎯 Prioridades visuales
- ⏰ Alertas de tareas atrasadas
- ✔️ Marcar como completada con un click

### Proyectos
- 📁 CRUD completo
- 📊 Barra de progreso por proyecto
- 🏷️ Categorías
- ⚠️ Ver tareas atrasadas

### GraphQL Lab
- 🧪 Ejecutar queries
- ✍️ Ejecutar mutations
- 📝 Visualización JSON
- 📚 Documentación integrada

---

## ❓ Problemas Comunes

### ❌ "Cannot GET /api/..."
**Solución**: Asegúrate de que el backend Django esté corriendo.

### ❌ CORS Error
**Solución**: Verifica que `http://localhost:5173` esté en `CORS_ALLOWED_ORIGINS` en `settings.py`.

### ❌ "Module not found"
**Solución**: 
```bash
cd client
npm install
```

### ❌ Iconos no se muestran
**Solución**:
```bash
cd client
npm install @heroicons/react
```

---

## 📚 Documentación Completa

Para más detalles, consulta:
- `README_COMPLETO.md` - Documentación completa del proyecto
- `client/README.md` - Documentación del frontend
- `../README.md` - Documentación de las APIs

---

## 🎉 ¡Listo!

Ya puedes empezar a usar tu laboratorio de APIs. Experimenta con:
- Crear tareas y proyectos
- Filtrar y buscar
- Marcar tareas como completadas
- Probar GraphQL
- Explorar la documentación de la API

**¡Diviértete desarrollando!** 🚀

