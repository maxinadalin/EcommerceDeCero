# 3.3
from django.urls import path

from .views import CategoriaView
urlpatterns = [
    path('categories', CategoriaView.as_view()),


]