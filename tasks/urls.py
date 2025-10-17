# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, ProjectViewSet
from .manual_views import TaskListCreateView, TaskDetailView
from graphene_django.views import GraphQLView
from .schema import schema

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('api/v1/', include(router.urls)),  # ViewSets - REST API v1
    path('manual/tasks/', TaskListCreateView.as_view()),  # Views manuales
    path('manual/tasks/<int:pk>/', TaskDetailView.as_view()),
]
