from django.urls import path
from .views import CategoriesViews, ImagesViews, PublicImagesViews


urlpatterns = [

path('images', ImagesViews.as_view({"get": "get_images",
                                    "post": "post_images",
                                    "patch": "update_images",
                                    "delete": "delete_images"})),
                                    
path('publicimages', PublicImagesViews.as_view({"get": "get_publicimages"})),

path('categories', CategoriesViews.as_view({"get": "get_categories",
                                            "post": "post_categories",
                                            "patch": "update_categories",
                                            "delete": "delete_categories"})),


]