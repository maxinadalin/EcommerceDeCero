from rest_framework import serializers
from .models import Productos

class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = [
            'id',
            'name',
            'photo',
            'description',
            'price',
            'categoria',
            'quantity',
            'sold',
            'date_created',
            'price_discount',
            'get_thumbnail',
            'final_price'  
        ]

