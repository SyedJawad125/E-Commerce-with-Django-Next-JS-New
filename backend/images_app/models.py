from django.db import models
from user_auth.models import User



class Categories(models.Model):
    
    category = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories_updated_by', null=True, blank=True)

class Images(models.Model):
    
    image = models.ImageField(upload_to='hotel_images/')
    name = models.CharField(max_length=30, null=True, blank=True)
    description = models.TextField(max_length=500, null=True, blank=True)
    bulletsdescription = models.TextField(null=True, blank=True)
    imagescategory = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='categoriesimages', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images_updated_by', null=True, blank=True)

