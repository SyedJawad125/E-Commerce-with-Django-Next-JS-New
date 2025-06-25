from django_filters import DateFilter, CharFilter, FilterSet
from .models import *
from django.db import models
from .models import Product

from django_filters import FilterSet, CharFilter, DateFilter
from django_filters.filters import Filter


class ProductFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte')
    date_to = DateFilter(field_name='created_at', lookup_expr='lte')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    price = CharFilter(field_name='price')
    description = CharFilter(field_name='description', lookup_expr='icontains')
    tags = CharFilter(field_name='tags__name', lookup_expr='iexact')

    class Meta:
        model = Product
        exclude = ['image', 'images']
       
        

# import django_filters
# from django.db.models import Q

class PublicproductFilter(FilterSet):
    id = CharFilter(field_name='id')
    # dept_updated_by_user= CharFilter(field_name='id')
    # dept_added_by_user= CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')
    price = CharFilter(field_name='price')
    description = CharFilter(field_name='description', lookup_expr='icontains')
    category = CharFilter(field_name='prod_has_category')
    tags = CharFilter(field_name='tags__name', lookup_expr='iexact')
    
    # Add this new search filter
    # search = django_filters.CharFilter(method='custom_search')

    # def custom_search(self, queryset, name, value):
    #     return queryset.filter(
    #         Q(name__icontains=value) |
    #         Q(description__icontains=value) |
    #         Q(tags__name__icontains=value)
    #     ).distinct()
    
    class Meta:
        model = Product
        exclude = ['image']
       

class SliderproductFilter(FilterSet):
    id = CharFilter(field_name='id')
    # dept_updated_by_user= CharFilter(field_name='id')
    # dept_added_by_user= CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')
    price = CharFilter(field_name='price')
    description = CharFilter(field_name='description', lookup_expr='icontains')

    class Meta:
        model = Product
        exclude = ['image', 'images']
        
class SalesProductFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte')
    date_to = DateFilter(field_name='created_at', lookup_expr='lte')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    price = CharFilter(field_name='price')
    discount_price = CharFilter(field_name='discount_price')
    description = CharFilter(field_name='description', lookup_expr='icontains')

    class Meta:
        model = SalesProduct
        exclude = ['image']
        
class PublicSalesProductFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte')
    date_to = DateFilter(field_name='created_at', lookup_expr='lte')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    price = CharFilter(field_name='price')
    discount_price = CharFilter(field_name='discount_price')
    description = CharFilter(field_name='description', lookup_expr='icontains')

    class Meta:
        model = SalesProduct
        exclude = ['image']

class CategoryFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Category
        # fields ='__all__'
        exclude = ['image']

class PubliccategoryFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Category
        # fields ='__all__'
        exclude = ['image']

class PubliccategorywiseFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Category
        # fields ='__all__'
        exclude = ['image']

class DropDownListCategoryFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Category
        # fields ='__all__'
        exclude = ['image']
class SlidercategoryFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Category
        # fields ='__all__'
        exclude = ['image']

class OrderFilter(FilterSet):
    id = CharFilter(field_name='id')
    # dept_updated_by_user= CharFilter(field_name='id')
    # dept_added_by_user= CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    delivery_address = CharFilter(field_name='delivery_address', lookup_expr='icontains')
    bill = CharFilter(field_name='bill')

    class Meta:
        model = Order
        fields ='__all__'

class PublicOrderFilter(FilterSet):
    id = CharFilter(field_name='id')
    # dept_updated_by_user= CharFilter(field_name='id')
    # dept_added_by_user= CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    delivery_address = CharFilter(field_name='delivery_address', lookup_expr='icontains')
    bill = CharFilter(field_name='bill')

    class Meta:
        model = Order
        fields ='__all__'

class ProductTagFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = ProductTag
        fields ='__all__'

class ContactFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Contact
        fields ='__all__'



class EmployeeFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    position = CharFilter(field_name='position', lookup_expr='icontains')
    salary = CharFilter(field_name='salary')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    

    class Meta:
        model = Employee
        # fields ='__all__'
        exclude = ['image']

# class ReviewFilter(FilterSet):
#     id = CharFilter(field_name='id')
#     name = CharFilter(field_name='name', lookup_expr='icontains')
#     date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
#     date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    

#     class Meta:
#         model = Review
#         fields ='__all__'



from django_filters import FilterSet, CharFilter, DateFilter, NumberFilter, ChoiceFilter
from django.db.models import Q

class ReviewFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    rating = NumberFilter(field_name='rating')
    user = CharFilter(field_name='user__username', lookup_expr='icontains')
    
    # Date filters
    date_from = DateFilter(field_name='created_at', lookup_expr='gte')
    date_to = DateFilter(field_name='created_at', lookup_expr='lte')
    
    # Product/SalesProduct filters
    product_id = NumberFilter(field_name='product__id')
    product_name = CharFilter(field_name='product__name', lookup_expr='icontains')
    sales_product_id = NumberFilter(field_name='sales_product__id')
    sales_product_name = CharFilter(field_name='sales_product__name', lookup_expr='icontains')
    
    # Combined filter for any product type
    item_id = NumberFilter(method='filter_by_item_id')
    item_name = CharFilter(method='filter_by_item_name')

    class Meta:
        model = Review
        fields = {
            'rating': ['exact', 'gte', 'lte'],
        }

    def filter_by_item_id(self, queryset, name, value):
        """Filter by either product_id or sales_product_id"""
        return queryset.filter(
            Q(product__id=value) | Q(sales_product__id=value)
        )

    def filter_by_item_name(self, queryset, name, value):
        """Filter by either product name or sales product name"""
        return queryset.filter(
            Q(product__name__icontains=value) | 
            Q(sales_product__name__icontains=value)
        )

class PublicReviewFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    

    class Meta:
        model = Review
        fields ='__all__'
