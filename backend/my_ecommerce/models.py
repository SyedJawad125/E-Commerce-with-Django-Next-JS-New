from datetime import time
from django.db import models
from django.forms import ValidationError
from user_auth.models import User

from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver
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


class SalesProduct(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    original_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        help_text="Original price before any discounts"
    )
    discount_percent = models.DecimalField(
        max_digits=5, 
        decimal_places=0, 
        default=0,
        help_text="Discount percentage (e.g., 10 for 10%)"
    )
    final_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        editable=False,
        help_text="Final price after discount (auto-calculated)", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.FileField(upload_to='saleproduct_images/', blank=True, null=True)
    salesprod_has_category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='saleprod_has_category1', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='saleproduct_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='saleproduct_updated_by', null=True, blank=True)
    
    class Meta:
        verbose_name = "Sales Product"
        verbose_name_plural = "Sales Products"

    def __str__(self):
        return self.name

    def clean(self):
        # Validate discount percentage
        if self.discount_percent < 0 or self.discount_percent > 100:
            raise ValidationError("Discount percentage must be between 0 and 100")
        
        # Calculate final price
        self.calculate_final_price()

    def calculate_final_price(self):
        """Calculate and set the final price based on original price and discount"""
        if self.discount_percent > 0:
            discount_amount = self.original_price * (self.discount_percent / 100)
            self.final_price = self.original_price - discount_amount
        else:
            self.final_price = self.original_price

    def save(self, *args, **kwargs):
        # Ensure clean() is called to calculate final_price
        self.full_clean()
        super().save(*args, **kwargs)

    @property
    def has_discount(self):
        """Check if product has any discount"""
        return self.discount_percent > 0

    @property
    def discount_amount(self):
        """Returns the actual discount amount"""
        return self.original_price - self.final_price if self.has_discount else 0

# Signal to ensure final_price is always calculated
@receiver(pre_save, sender=SalesProduct)
def calculate_final_price(sender, instance, **kwargs):
    instance.calculate_final_price()
    
class Order(models.Model):
    status_choices = (
        ("pending", "Pending"),
        ("booked", "Booked"),
        ("in_process", "In Process"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled")
    )
    
    payment_choices = (
        ("credit_card", "Credit Card"),
        ("debit_card", "Debit Card"),
        ("paypal", "PayPal"),
        ("cash_on_delivery", "Cash on Delivery")
    )

    bill = models.PositiveBigIntegerField(null=True, blank=True)
    customer_name = models.CharField(max_length=100)  # Can be different from User account name
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    delivery_address = models.TextField()
    city = models.CharField(max_length=100, null=True, blank=True)  
    status = models.CharField(max_length=50, choices=status_choices, default="pending")
    payment_method = models.CharField(max_length=50, choices=payment_choices)
    payment_status = models.BooleanField(default=False)
    delivery_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rider = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    # customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True, blank=True)

    # Other fields remain the same...


   


class OrderDetail(models.Model):
    unit_price = models.PositiveBigIntegerField(help_text="Price per unit at the time of purchase")
    quantity = models.PositiveIntegerField(default=1, help_text="Number of units ordered")
    total_price = models.PositiveBigIntegerField(blank=True, null=True, help_text="Automatically calculated as unit_price * quantity")
    product = models.ForeignKey(Product,  on_delete=models.CASCADE,  related_name='order_details')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_details')
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    class Meta:
        verbose_name = "Order Detail"
        verbose_name_plural = "Order Details"
        ordering = ['-created_at']
        # No unique_together constraint to allow same product multiple times in order

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Order: {self.order.id})"

    def clean(self):
        """Calculate total_price before saving"""
        if self.unit_price and self.quantity:
            self.total_price = self.unit_price * self.quantity

    def save(self, *args, **kwargs):
        """Ensure clean() is called and total_price is calculated"""
        self.full_clean()
        super().save(*args, **kwargs)



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



# models.py
# class GuestCustomer(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     phone = models.CharField(max_length=20)
#     created_at = models.DateTimeField(auto_now_add=True)