# serializers.py
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Project, Task
from django.utils import timezone



class TaskSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)
    title = serializers.CharField(
        max_length=200,
        validators=[UniqueValidator(queryset=Task.objects.all())]
    )

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'done', 'priority',
            'created_at', 'updated_at', 'due_date', 'project', 'project_name'
        ]

    # --- Validación individual de campos ---

    def validate_due_date(self, value):
        """ La fecha de entrega debe ser futura."""
        if value and value < timezone.now().date():
            raise serializers.ValidationError("La fecha de entrega debe ser en el futuro.")
        return value

    def validate_priority(self, value):
        """ La prioridad debe estar en el rango permitido."""
        if value not in ['low', 'medium', 'high']:
            raise serializers.ValidationError("La prioridad debe ser 'low', 'medium' o 'high'.")
        return value

    # --- Validación general del objeto completo ---

    def validate(self, data):
        """ Coherencia entre 'done' y 'due_date'."""
        if data.get('done') and data.get('due_date'):
            if data['due_date'] > timezone.now().date():
                raise serializers.ValidationError(
                    "Una tarea completada no puede tener una fecha futura."
                )
        return data



class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    name = serializers.CharField(
        max_length=100,
        validators=[UniqueValidator(queryset=Project.objects.all())]
    )

    class Meta:
        model = Project
        fields = ['id', 'name', 'category', 'created_at', 'deadline', 'tasks']

    # --- Validación de un solo campo ---
    def validate_name(self, value):
        """ Evita nombres genéricos o vacíos."""
        forbidden = ["test", "demo", "example", "nuevo proyecto"]
        if value.strip().lower() in forbidden:
            raise serializers.ValidationError("El nombre del proyecto no puede ser genérico.")
        return value

    # --- Validación de coherencia entre campos ---
    def validate(self, data):
        """ Verifica que deadline sea posterior a created_at."""
        created = data.get('created_at')
        deadline = data.get('deadline')
        if created and deadline and deadline < created:
            raise serializers.ValidationError(
                "La fecha límite no puede ser anterior a la fecha de creación."
            )
        return data
