from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    #traemos la clase serializada
    #Le decimos que el queryset es todo lo que hay en el modelo Task
    queryset = Task.objects.all()   
    #SI queremos darle mas información, como los campos que van a ser consultados
    #importamos el modelo de Task
    #QUe permite hacer todas las operaciones CRUD
    #COn esas dos cosas, la clase ya sabe como serializar y generar todo el CRUD.
