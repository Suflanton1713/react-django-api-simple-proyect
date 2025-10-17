# ✅ Lista de Verificación - API Lab

## 🔧 Configuración Inicial

- [ ] Backend Django está corriendo en http://localhost:8000
- [ ] Frontend React está corriendo en http://localhost:5173
- [ ] No hay errores en las consolas del terminal
- [ ] Las dependencias están instaladas (`npm install` en client/)

---

## 🧪 Pruebas del Frontend

### Dashboard
- [ ] Se muestra correctamente el dashboard
- [ ] Las estadísticas se cargan (Total tareas, Completadas, Pendientes, Proyectos)
- [ ] La barra de progreso global funciona
- [ ] Se muestran las tareas recientes
- [ ] Los botones de acceso rápido funcionan

### Navegación
- [ ] El sidebar se muestra en desktop
- [ ] El menú hamburguesa funciona en móvil
- [ ] Los enlaces de navegación funcionan correctamente
- [ ] Las rutas cambian sin recargar la página

### Tareas
- [ ] Se muestra la lista de tareas
- [ ] Los filtros funcionan (Todas, Pendientes, Completadas)
- [ ] Se puede crear una nueva tarea
- [ ] El formulario valida los campos requeridos
- [ ] Se puede editar una tarea existente
- [ ] Se puede eliminar una tarea (con confirmación)
- [ ] El botón "Completar" marca la tarea como done
- [ ] Las notificaciones toast aparecen correctamente
- [ ] Los indicadores de prioridad se muestran con colores
- [ ] Las tareas atrasadas se marcan en rojo

### Proyectos
- [ ] Se muestra la lista de proyectos
- [ ] Las tarjetas de proyecto muestran la barra de progreso
- [ ] Se puede crear un nuevo proyecto
- [ ] Se puede editar un proyecto existente
- [ ] Se puede eliminar un proyecto
- [ ] El botón "Ver atrasadas" funciona y muestra tareas atrasadas
- [ ] Las categorías se muestran con colores diferentes

### GraphQL Lab
- [ ] El panel de GraphQL se carga correctamente
- [ ] Los tabs Query y Mutation cambian correctamente
- [ ] El botón "Ejecutar Query" funciona y muestra resultados
- [ ] El formulario de mutation permite crear tareas
- [ ] Las respuestas JSON se muestran correctamente formateadas
- [ ] La documentación se muestra en la parte inferior

---

## 🔌 Pruebas de API

### REST API - Tasks
- [ ] GET `/tasks/api/v1/tasks/` devuelve todas las tareas
- [ ] POST `/tasks/api/v1/tasks/` crea una nueva tarea
- [ ] GET `/tasks/api/v1/tasks/{id}/` devuelve una tarea específica
- [ ] PUT `/tasks/api/v1/tasks/{id}/` actualiza una tarea
- [ ] DELETE `/tasks/api/v1/tasks/{id}/` elimina una tarea
- [ ] GET `/tasks/api/v1/tasks/pending/` devuelve solo pendientes
- [ ] POST `/tasks/api/v1/tasks/{id}/mark_done/` marca como completada

### REST API - Projects
- [ ] GET `/tasks/api/v1/projects/` devuelve todos los proyectos
- [ ] POST `/tasks/api/v1/projects/` crea un nuevo proyecto
- [ ] GET `/tasks/api/v1/projects/{id}/` devuelve un proyecto específico
- [ ] PUT `/tasks/api/v1/projects/{id}/` actualiza un proyecto
- [ ] DELETE `/tasks/api/v1/projects/{id}/` elimina un proyecto
- [ ] GET `/tasks/api/v1/projects/{id}/late_tasks/` devuelve tareas atrasadas

### GraphQL API
- [ ] Query `allTasks` devuelve todas las tareas con sus proyectos
- [ ] Mutation `createTask` crea una nueva tarea
- [ ] Los datos anidados (project dentro de task) se devuelven correctamente
- [ ] GraphiQL funciona en http://localhost:8000/graphql/

---

## 🎨 UI/UX

### Diseño
- [ ] Los colores dark theme se ven bien
- [ ] Las tarjetas tienen bordes y sombras
- [ ] Los botones tienen hover effects
- [ ] Las transiciones son suaves
- [ ] Los iconos se muestran correctamente

### Responsive
- [ ] El layout funciona en desktop (1920px)
- [ ] El layout funciona en tablet (768px)
- [ ] El layout funciona en móvil (375px)
- [ ] El sidebar se convierte en menú hamburguesa en móvil
- [ ] Las tarjetas se reorganizan en columnas según el tamaño

### Estados
- [ ] Los spinners de carga se muestran
- [ ] Los mensajes de error se muestran claramente
- [ ] Los estados vacíos tienen ilustraciones
- [ ] Las notificaciones toast aparecen y desaparecen

---

## ⚡ Performance

- [ ] Las páginas cargan rápidamente (< 1s)
- [ ] Las transiciones no tienen lag
- [ ] Las imágenes y recursos cargan correctamente
- [ ] No hay errores en la consola del navegador
- [ ] No hay warnings de React en la consola

---

## 🐛 Testing

### Flujo Completo
1. [ ] Crear un proyecto "Test Project"
2. [ ] Crear una tarea asociada al proyecto
3. [ ] Marcar la tarea como completada
4. [ ] Verificar que el dashboard actualice las estadísticas
5. [ ] Editar la tarea
6. [ ] Eliminar la tarea
7. [ ] Eliminar el proyecto
8. [ ] Probar GraphQL creando una tarea
9. [ ] Verificar que aparezca en la lista REST

### Edge Cases
- [ ] Intentar crear tarea sin título (debe validar)
- [ ] Intentar crear tarea sin proyecto (debe validar)
- [ ] Eliminar un proyecto con tareas (debe confirmar)
- [ ] Navegar entre páginas múltiples veces
- [ ] Refrescar la página en diferentes rutas

---

## 📝 Notas

**Fecha de prueba**: __________

**Pruebas realizadas por**: __________

**Estado general**: ⭐⭐⭐⭐⭐ (califica de 1 a 5)

**Problemas encontrados**:
- 
- 
- 

**Sugerencias de mejora**:
- 
- 
- 

---

## ✅ Conclusión

Si todos los checks están marcados, ¡el proyecto está listo para usar! 🎉

Si encontraste algún problema, revisa:
1. Los logs de la consola del navegador
2. Los logs del terminal de Django
3. Los logs del terminal de Vite
4. La documentación en `README_COMPLETO.md`

