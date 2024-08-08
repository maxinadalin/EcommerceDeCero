from django.urls import path
from .views import ProductosView,ProductosViewDetail,ProuctoSearch,ProductoSearchCategorias

urlpatterns = [
    path("productos",ProductosView.as_view()),
    path("productosDetails/<productoId>",ProductosViewDetail.as_view()),
    path("productosSearch",ProuctoSearch.as_view()),
    path("productosSearchCategorias",ProductoSearchCategorias.as_view())
]