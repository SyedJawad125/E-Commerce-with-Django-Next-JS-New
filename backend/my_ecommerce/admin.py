from django.contrib import admin

from my_ecommerce.models import Category, Order, OrderDetail, Product

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderDetail)




