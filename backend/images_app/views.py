from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .images_controller import ImagesController, CategoriesController, PublicImagesController, TextBoxCategoriesController, TextBoxImagesController
from utils.base_authentication import JWTAuthentication
from permissions.decorator import permission_required

# Create your views here.


images_controller = ImagesController()
publicimages_controller=PublicImagesController()
textbox_images_controller=TextBoxImagesController()
categories_controller = CategoriesController()
categories_textbox_controller = TextBoxCategoriesController()



class ImagesViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    @permission_required(['create_images'])
    
    def post_images(self, request):
        return images_controller.create(request)
    @permission_required(['read_images'])
    
    def get_images(self, request):
        return images_controller.get_images(request)
    @permission_required(['update_images'])
    
    def update_images(self, request):
        return images_controller.update_images(request)
    @permission_required(['delete_images'])
    
    def delete_images(self, request):
        return images_controller.delete_images(request)


class PublicImagesViews(ModelViewSet):

    def get_publicimages(self, request):
        return publicimages_controller.get_publicimages(request)
    
class TextBoxImagesViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    
    def get_textboxe_images(self, request):
        return textbox_images_controller.get_textboxe_images(request)

class CategoriesViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_categories(self, request):
        return categories_controller.create(request)
    
    def get_categories(self, request):
        return categories_controller.get_categories(request)
    
    def update_categories(self, request):
        return categories_controller.update_categories(request)
    
    def delete_categories(self, request):
        return categories_controller.delete_categories(request)
    

class TextCategoriesViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    
    def get_categories_textbox(self, request):
        return categories_textbox_controller.get_categories_textbox(request)