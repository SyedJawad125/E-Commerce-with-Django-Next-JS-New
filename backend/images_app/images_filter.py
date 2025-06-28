from django_filters import CharFilter, FilterSet
from .models import *
import django_filters


class ImagesFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    imagescategory = CharFilter(field_name='imagescategory__category', lookup_expr='icontains')

    
    class Meta:
        model = Images
        # fields ='__all__'
        exclude = ['image']


class PublicImagesFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    imagescategory = CharFilter(field_name='imagescategory__category', lookup_expr='icontains')

    class Meta:
        model = Images
        # fields ='__all__'
        exclude = ['image']


class CategoriesFilter(FilterSet):
    id = CharFilter(field_name='id')
    category = CharFilter(field_name='category', lookup_expr='icontains')

    
    class Meta:
        model = Categories
        fields ='__all__'

class TextBoxCategoriesFilter(FilterSet):
    id = CharFilter(field_name='id')
    category = CharFilter(field_name='category', lookup_expr='icontains')

    
    class Meta:
        model = Categories
        fields ='__all__'
