from django.shortcuts import render
from apps.categorias.serializers import CategoriaSerializers
from .models import Categiria
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions



class CategoriaView(APIView):
    permission_classes = (permission.AllowAny,)
    def get(self,request,format=None):
        if Categiria.objects.all().exists():
            categorias = Categiria.objects.all()
            resultado = []
            
            for categoria in categorias:
                if not categoria.parent:
                    item = {}
                    item["id"] = categoria.id,
                    item["name"] = categoria.name
                    item['photo'] = category.photo.url if category.photo  else None
                
                    item["sub_categorias"] = []
                    
                    for subcategoria in categorias:
                        if subcategoria.parent and subcategoria.parent.id == categoria.id:
                            sub_item = {}
                            
                            sub_item["id"] = subcategoria.id,
                            sub_item["name"] = subcategoria.name
                            sub_item['photo'] = subcategoria.photo.url if subcategoria.photo  else None

                            sub_item["sub_categorias"] = []
                            
                            item["sub_categorias"].append(sub_item)
                    resultado.append(item)
            
            return Response ({ "categoria" : resultado},status=status.HTTP_200_OK)
        
        else:
            return Response({"message":"no se encontraron categorias"},status=status.HTTP_404_NOT_FOUND)