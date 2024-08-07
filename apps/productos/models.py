from django.db import models
from apps.categorias.models import Categoria
from datetime import datetime

# Create your models here.

class Productos(models.Model):
    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"

    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='photos/%Y/%m/')
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)
    price_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)    

    def get_thumbnail(self):
        if self.photo:
            return self.photo.url
        return ''

    def __str__(self):
        return self.name
    
    def final_price(self):
        # Aplicar el descuento al precio base
        return self.price - self.price_discount