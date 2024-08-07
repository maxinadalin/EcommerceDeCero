from django.contrib import admin

from apps.productos.models import Productos

class ProductAdmin(admin.ModelAdmin):
  
    list_display = ('id', 'name',
                    'price', 'quantity', 'sold', 'price_discount'  )
    list_display_links = ('id', 'name', )
    list_filter = ('categoria', )
    list_editable = ( 'price', 'quantity','price_discount' )
    search_fields = ('name', 'description', )
    list_per_page = 25

admin.site.register(Productos, ProductAdmin)