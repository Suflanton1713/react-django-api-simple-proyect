# models.py
from django.db import models
from django.utils import timezone

class Project(models.Model):
    name = models.CharField(max_length=150)
    category = models.CharField(
        max_length=50,
        choices=[
            ("personal", "Personal"),
            ("work", "Trabajo"),
            ("study", "Estudio"),
            ("other", "Otro"),
        ],
        default="personal"
    )
    created_at = models.DateTimeField(default=timezone.now)
    deadline = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.category})"


class Task(models.Model):
    PRIORITY_CHOICES = [
        ("low", "Baja"),
        ("medium", "Media"),
        ("high", "Alta"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    priority = models.CharField(max_length=12, choices=PRIORITY_CHOICES, default="medium")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return f"{self.title} - {self.project.name}"
