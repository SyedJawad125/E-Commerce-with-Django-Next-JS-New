from django.db import models
from user_auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.FileField(upload_to='category_images/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='category_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='category_updated_by', null=True, blank=True)


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.FileField(upload_to='product_images/', blank=True, null=True)
    images = models.JSONField(default=list,null=True, blank=True)
    prod_has_category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='prod_has_category1', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='product_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='product_updated_by', null=True, blank=True)




    
class Order(models.Model):

    status_choices = (
            ("booked", "booked"),
            ("in_process", "in_process"),
            ("delivered", "delivered")
        )

    bill = models.PositiveBigIntegerField(null=True, blank=True)
    delivery_address = models.TextField()
    status = models.CharField(max_length=50, choices = status_choices, null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_rider', null=True,blank=True)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_customer', null=True,blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='order_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='order_updated_by', null=True, blank=True)
   


class OrderDetail(models.Model):
    unit_price = models.PositiveBigIntegerField()
    quantity = models.PositiveIntegerField()
    total_price = models.PositiveBigIntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_detail_product')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_detail_order')



class Contact(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=False)
    phone_number = models.CharField(max_length=20)
    message = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_created_by',null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_updated_by',null=True, blank=True)


class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    hire_date = models.DateField()
    position = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    image = models.FileField(upload_to='employee_images/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='employee_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employee_updated_by', null=True, blank=True)