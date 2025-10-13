from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
#routers va a tomar las vistas y generar todas las urls necesarias para el CRUD
from .views import TaskView
#Podemos traer toda la view con from tasks import views

router = routers.DefaultRouter()
router.register(r'tasks', TaskView, 'tasks')

#r de raw, es una cadena de texto sin formato, es decir, no va a interpretar nada especial
#El segundo parámetro es la vista que va a manejar las rutas que empiecen con tasks
#El tercer parámetro es un nombre para identificar esa ruta
urlpatterns = [

    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API')),
]

#Lo hacemos para  definir las rutas de la app tasks
#TIene tres parámetros, el nombre de la ruta, la vista que va a manejar esa ruta y un nombre para identificar esa ruta
#Manejamos versiones porque nuestra api puede ir cambiando, api versioning

#Todo el anterior código nos genera las siguientes rutas:
#GET /api/v1/tasks/ -> Listar todas las tareas
#POST /api/v1/tasks/ -> Crear una nueva tarea
#GET /api/v1/tasks/{id}/ -> Obtener una tarea específica
#PUT /api/v1/tasks/{id}/ -> Actualizar una tarea específica
#PATCH /api/v1/tasks/{id}/ -> Actualizar parcialmente una tarea específica
#DELETE /api/v1/tasks/{id}/ -> Eliminar una tarea específica