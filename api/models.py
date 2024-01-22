from django.db import models

# Create your models here.
class Set(models.Model):
    title = models.CharField(null=True, blank=True, max_length=50)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[0:50]

class Card(models.Model):
    set = models.ForeignKey(Set, on_delete=models.CASCADE)
    front = models.TextField(null=True, blank=True)
    back = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.front[0:50]


