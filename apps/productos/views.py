from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from .serializers import ProductoSerializers
from apps.productos.models import Productos

# Create your views here.

class ProductosView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format = None):
        
        try :
             productos = Productos.objects.all()
             productos = ProductoSerializers(productos, many=True)

             return Response({"Productos": productos.data},status = status.HTTP_200_OK)
             
        except:
            return Response ({"mensage":"no se encontraron productos disponibles"},status = status.HTTP_400_BAD_REQUEST)


class ProductosViewDetail(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get (self,request,productoId,format = None):
        try:
            productoId = int(productoId)
            
        except:
            return Response ({"mensaje" : "el id del producto debe ser un numero entero"})
        
        if Productos.objects.filter(id=productoId).exists():
            producto = Productos.objects.get(id = productoId)
            producto = ProductoSerializers (producto)
            
            return Response({"producto" : producto.data},status = status.HTTP_200_OK) 
        else :
            return Response ({"mensaje" : "no existe ningun producto con ese id"},status=status.HTTP_404_NOT_FOUND)
            