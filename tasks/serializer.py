from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        #Se coloca el nombre del modelo que importamos arriba
        #fields = ('id', 'title', 'description', 'done')
        #Tiene que ir el id, porque no lo tenemos en el modelo, pero si en la base de datos
        fields = '__all__'
        #con fields = '__all__' se traería todos los campos del modelo