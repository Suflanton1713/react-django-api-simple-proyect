import graphene
from graphene_django import DjangoObjectType
from .models import Task, Project

# === Tipos ===
class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = "__all__"

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"

# === Consultas ===
class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_tasks = graphene.List(TaskType)
    task_by_id = graphene.Field(TaskType, id=graphene.Int(required=True))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_tasks(root, info):
        return Task.objects.all()

    def resolve_task_by_id(root, info, id):
        return Task.objects.get(pk=id)


# === Mutaciones ===
class CreateTask(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        done = graphene.Boolean()
        project_id = graphene.Int(required=True)

    task = graphene.Field(TaskType)

    @staticmethod
    def mutate(root, info, title, project_id, description=None, done=False):
        project = Project.objects.get(pk=project_id)
        task = Task.objects.create(
            title=title,
            description=description or "",
            done=done,
            project=project
        )
        return CreateTask(task=task)


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        done = graphene.Boolean()

    task = graphene.Field(TaskType)

    @staticmethod
    def mutate(root, info, id, title=None, description=None, done=None):
        task = Task.objects.get(pk=id)
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if done is not None:
            task.done = done
        task.save()
        return UpdateTask(task=task)


class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(root, info, id):
        task = Task.objects.get(pk=id)
        task.delete()
        return DeleteTask(ok=True)


# === Registro de Mutaciones ===
class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()


# === Esquema final ===
schema = graphene.Schema(query=Query, mutation=Mutation)
