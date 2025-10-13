from django.db import models

#Hereda de la clase model
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True) #Puede guardar vacío
    done = models.BooleanField(default=False) #Por defecto es falso

    def __str__(self):
        return self.title
