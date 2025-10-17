# views.py
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, Task
from .serializer import ProjectSerializer, TaskSerializer
from rest_framework.throttling import UserRateThrottle

class TaskThrottle(UserRateThrottle):
    scope = 'task'
    

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'category']
    ordering_fields = ['created_at', 'deadline']
    ordering = ['created_at']

    @action(detail=True, methods=['get'])
    def late_tasks(self, request, pk=None):
        """Lista las tareas atrasadas de un proyecto."""
        project = self.get_object()
        overdue = project.tasks.filter(done=False, due_date__lt=models.functions.Now())
        serializer = TaskSerializer(overdue, many=True)
        return Response(serializer.data)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['done', 'priority', 'project__category']
    search_fields = ['title', 'description', 'project__name']
    ordering_fields = ['created_at', 'priority', 'due_date']
    throttle_classes = [TaskThrottle]
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Devuelve todas las tareas pendientes."""
        pending_tasks = self.queryset.filter(done=False)
        serializer = self.get_serializer(pending_tasks, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def mark_done(self, request, pk=None):
        """Marca una tarea como completada."""
        task = self.get_object()
        task.done = True
        task.save()
        return Response({'status': f'Tarea {task.title} completada'})
