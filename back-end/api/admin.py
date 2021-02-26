from django.contrib import admin
from .models import Task, Post

# Register your models here.

admin.site.register(Post)
admin.site.register(Task)