import json
from rest_framework import serializers
from .models import Contact, Employee, Product, Order, OrderDetail, Category, ProductImage, ProductTag, Review, SalesProduct, SalesProductImage
from rest_framework.serializers import ModelSerializer
from user_auth.user_serializer import UserListingSerializer


class ProductImageSerializer(ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'images']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        return data


class ProductSerializer(ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
        data['tag_name'] = [tag.name for tag in instance.tags.all()] if instance.tags.exists() else []
        data['image_urls'] = [img.images.url for img in instance.images.all()] if hasattr(instance, 'images') else []
        return data


# class ProductSerializer(ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     image_urls = serializers.SerializerMethodField()

#     class Meta:
#         model = Product
#         fields = '__all__'
#         extra_kwargs = {
#             'images': {'required': False, 'allow_null': True},
#         }

#     def get_image_urls(self, obj):
#         return [img.images.url for img in obj.images.all()] if obj.images.exists() else []

#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#         data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
#         data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
#         data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
#         data['tag_name'] = [tag.name for tag in instance.tags.all()] if instance.tags.exists() else []
#         return data



# from rest_framework.serializers import ModelSerializer, SerializerMethodField

# class ProductSerializer(ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     created_by = SerializerMethodField()
#     updated_by = SerializerMethodField()
#     category_name = SerializerMethodField()
#     tag_name = SerializerMethodField()
#     image_urls = SerializerMethodField()

#     class Meta:
#         model = Product
#         fields = '__all__'

#     def get_created_by(self, obj):
#         return UserListingSerializer(obj.created_by).data if obj.created_by else None

#     def get_updated_by(self, obj):
#         return UserListingSerializer(obj.updated_by).data if obj.updated_by else None

#     def get_category_name(self, obj):
#         return obj.prod_has_category.name if obj.prod_has_category else None

#     def get_tag_name(self, obj):
#         return [tag.name for tag in obj.tags.all()] if obj.tags.exists() else []

#     def get_image_urls(self, obj):
#         return [img.images.url for img in obj.images.all()] if obj.images.exists() else []


class PublicproductSerializer(ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
        data['tag_name'] = [tag.name for tag in instance.tags.all()] if instance.tags.exists() else []
        data['image_urls'] = [img.images.url for img in instance.images.all()] if hasattr(instance, 'images') else []
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
    
class SalesProductImageSerializer(ModelSerializer):
    class Meta:
        model = SalesProductImage
        fields = ['id', 'images']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        return data
    
class SalesProductSerializer(serializers.ModelSerializer):
    images = SalesProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = SalesProduct
        fields = ['id','name', 'description', 'original_price', 'discount_percent','final_price', 'images','created_by','updated_by','salesprod_has_category']
        read_only_fields = ['final_price', 'id']
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.salesprod_has_category.name if instance.salesprod_has_category else None
        data['image_urls'] = [img.images.url for img in instance.images.all()] if hasattr(instance, 'images') else []
        return data



    
class PublicSalesProductSerializer(ModelSerializer):
    images = SalesProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = SalesProduct
        fields = ['id','name', 'description', 'original_price', 'discount_percent','final_price', 'images','created_by','updated_by','salesprod_has_category']
        read_only_fields = ['final_price', 'id']
        extra_kwargs = {
            'images': {'required': False, 'allow_null': True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        data['category_name'] = instance.salesprod_has_category.name if instance.salesprod_has_category else None
        data['image_urls'] = [img.images.url for img in instance.images.all()] if hasattr(instance, 'images') else []
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
    

class PubliccategorywiseSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        return data
    
class DropDownListCategorySerializer(ModelSerializer):
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
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_at_date'] = instance.created_at.date()
        data['order_details'] = OrderDetailSerializer(instance.order_details.all(), many=True).data if instance.order_details else None
        return data
    
class PublicOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {
            'customer': {'required': False, 'allow_null': True}
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_at_date'] = instance.created_at.date()
        data['order_details'] = OrderDetailSerializer(instance.order_details.all(), many=True).data if instance.order_details else None
        return data
    
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'
        read_only_fields = ['bill', 'status', 'created_at', 'updated_at']

    def to_representation(self, instance):
        try:
            return super().to_representation(instance)
        except Exception as e:
            import traceback
            print("ERROR in OrderDetailSerializer:")  # Console log
            traceback.print_exc()  # Full error trace
            raise
        
class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = '__all__'
        

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None 

        return data    

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



class ReviewSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'user', 'name', 'rating', 'comment', 'product', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate(self, data):
        if not self.context['request'].user.is_authenticated and not data.get('name'):
            raise serializers.ValidationError("Please provide a name for your review.")
        return data

    def create(self, validated_data):
        if self.context['request'].user.is_authenticated:
            validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['product_name'] = instance.product.name if instance.product else None
        
        return data
    

class PublicReviewSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'user', 'name', 'rating', 'comment', 'product', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate(self, data):
        if not self.context['request'].user.is_authenticated and not data.get('name'):
            raise serializers.ValidationError("Please provide a name for your review.")
        return data

    def create(self, validated_data):
        if self.context['request'].user.is_authenticated:
            validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    


# class ProductSerializer(ModelSerializer):
#     # images = ProductImageSerializer(many=True, read_only=True)
#     class Meta:
#         model = Product
#         fields='__all__'
#         extra_kwargs = {
#             'images': {'required': False, 'allow_null': True},
#             'image': {'required': False, 'allow_null': True}
#         }

#     def validate_image(self, value):
#         """Modified to handle edge cases"""
#         if value is None or value == 'undefined':
#             return None
            
#         # Handle case where Django might have already processed it
#         if hasattr(value, 'file'):
#             return value
            
#         # Handle case where it might come as a path string
#         if isinstance(value, str):
#             if value.startswith('product_images_new/'):
#                 return value
#             if '.' in value:  # Has file extension
#                 return value
                
#         raise serializers.ValidationError(
#             "Invalid image format. Must be a file upload or valid path string"
#         )


#     def to_representation(self, instance):
#         data = super().to_representation(instance)

#         data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
#         data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
#         data['category_name'] = instance.prod_has_category.name if instance.prod_has_category else None
#         # data['tag_name'] = instance.tags.name if instance.tags else None
#         data['tag_name'] = [tags.name for tags in instance.tags.all()] if instance.tags.exists() else []
#         data['image_urls'] = [img.images.url for img in instance.images.all()] if hasattr(instance, 'images') else []

#         return data