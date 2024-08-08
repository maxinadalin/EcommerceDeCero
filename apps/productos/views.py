from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from .serializers import ProductoSerializers
from apps.productos.models import Productos
from django.db.models import Q
from apps.categorias.models import Categoria

# Create your views here.

class ProductosView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format = None):
        
        sortBy = request.query_params.get("sortBy")
        
        if not (sortBy == "date_created" or sortBy == 'name'):
            sortBy = "date_created"
        
        try :
             productos = Productos.objects.order_by(sortBy).all()
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
            

class ProuctoSearch(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        data = self.request.data
        search = data['search']

        # Chequear si algo input ocurrio en la busqueda
        if len(search) == 0:
            # mostrar todos los productos si no hay input en la busqueda
            search_results = Productos.objects.all()
        else:
            # Si hay criterio de busqueda, filtramos con dicho criterio usando Q
            search_results = Productos.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search)
            )
        search_results = ProductoSerializers(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)


class ProductoSearchCategorias(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request,format=None):
        data = self.request.data
        categorias = []
        
        try:
            categorias = data["categoria_id"]
            
            result=[]
            for categoria in categorias:
                if Productos.objects.filter(categoria=categoria).exists():
                    productos = Productos.objects.filter(categoria=categoria).all()
                     
                result.extend(productos) 
            
            productos = ProductoSerializers(result,many=True)
              
           
        except ValueError:
                return Response({"mensaje":"la categorias deben ser un numero entero"},status= status.HTTP_400_BAD_REQUEST)
        
        
        return Response({"productos":productos.data},status=status.HTTP_200_OK)
        
        
