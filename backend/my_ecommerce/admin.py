from django.contrib import admin

from my_ecommerce.models import Category,Product

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
# admin.site.register(Order)
# admin.site.register(OrderDetail)

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'price', 'is_new_arrival', 'is_kids_product','is_sales_product')
#     list_filter = ('is_new_arrival', 'is_kids_product', 'is_sales_product')

