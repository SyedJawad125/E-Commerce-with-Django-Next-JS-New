import json
from rest_framework import serializers
from .models import Contact, Employee, Product, Order, OrderDetail, Category, SalesProduct
from rest_framework.serializers import ModelSerializer
from user_auth.user_serializer import UserListingSerializer

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields='__all__'
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
            'image': {'required': False, 'allow_null': True}
        }

    def validate_image(self, value):
        """Modified to handle edge cases"""
        if value is None or value == 'undefined':
            return None
            
        # Handle case where Django might have already processed it
        if hasattr(value, 'file'):
            return value
            
        # Handle case where it might come as a path string
        if isinstance(value, str):
            if value.startswith('product_images/'):
                return value
            if '.' in value:  # Has file extension
                return value
                
        raise serializers.ValidationError(
            "Invalid image format. Must be a file upload or valid path string"
        )


    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
        return data

class PublicproductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields='__all__'
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
            'image': {'required': False, 'allow_null': True}
        }

    def validate_image(self, value):
        """Modified to handle edge cases"""
        if value is None or value == 'undefined':
            return None
            
        # Handle case where Django might have already processed it
        if hasattr(value, 'file'):
            return value
            
        # Handle case where it might come as a path string
        if isinstance(value, str):
            if value.startswith('product_images/'):
                return value
            if '.' in value:  # Has file extension
                return value
                
        raise serializers.ValidationError(
            "Invalid image format. Must be a file upload or valid path string"
        )


    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
        return data

class SliderproductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields='__all__'
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
            'image': {'required': False, 'allow_null': True}
        }

    def validate_image(self, value):
        """Modified to handle edge cases"""
        if value is None or value == 'undefined':
            return None
            
        # Handle case where Django might have already processed it
        if hasattr(value, 'file'):
            return value
            
        # Handle case where it might come as a path string
        if isinstance(value, str):
            if value.startswith('product_images/'):
                return value
            if '.' in value:  # Has file extension
                return value
                
        raise serializers.ValidationError(
            "Invalid image format. Must be a file upload or valid path string"
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
        return data



class SalesProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesProduct
        fields = ['id','name', 'description', 'original_price', 'discount_percent','final_price', 'image','created_by','updated_by','salesprod_has_category']
        read_only_fields = ['final_price', 'id']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.salesprod_has_category.name if instance.salesprod_has_category else None
        return data
    
class PublicSalesProductSerializer(ModelSerializer):
    class Meta:
        model = SalesProduct
        fields = ['id','name', 'description', 'original_price', 'discount_percent','final_price', 'image','created_by','updated_by','salesprod_has_category']
        read_only_fields = ['final_price', 'id']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.salesprod_has_category.name if instance.salesprod_has_category else None
        return data
    
class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields='__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        return data


class PubliccategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        return data
    
class SlidercategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        return data

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ['updated_at']


    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_at_date'] = instance.created_at.date()
        data['order_details'] = OrderDetailSerializer(instance.order_detail_order.all(), many=True).data if instance.order_detail_order else None
        return data

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'

    

class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields='__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None

        return data



class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None 

        return data
