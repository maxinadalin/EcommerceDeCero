from django.urls import path
from .views import ProductosView,ProductosViewDetail

urlpatterns = [
    path("productos",ProductosView.as_view()),
    path("productosDetails/<productoId>",ProductosViewDetail.as_view())
]