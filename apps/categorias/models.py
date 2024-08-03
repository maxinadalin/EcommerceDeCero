from django.db import models
from datetime import datetime
# Create your models here.


class Categoria(models.Model):
    class Meta:
        verbose_name = "categoria"
        verbose_name_plural = "categorias"
    
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE,blank=True,null=True)
    name = models.CharField(max_length=255, unique=True)
    date_created = models.DateTimeField(default=datetime.now)
    photo = models.ImageField(upload_to='photos/%Y/%m/')

    
    def __str__(self):
        return self.name
     