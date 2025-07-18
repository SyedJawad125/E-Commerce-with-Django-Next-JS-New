from venv import logger
from django.db import transaction
from django.utils import timezone
from django.contrib.auth import authenticate
from my_ecommerce.my_ecommerce_filters import CategoryFilter, ContactFilter, PublicContactFilter, DropDownListCategoryFilter, EmployeeFilter, \
    ProductFilter, OrderFilter, ProductTagFilter, PublicContactFilter, PublicOrderFilter, PublicReviewFilter, PublicSalesProductFilter, \
    PubliccategorywiseFilter, \
    PublicproductFilter, PubliccategoryFilter, ReviewFilter, SlidercategoryFilter, SliderproductFilter, \
    DropDownListProductFilter, DropDownListSalesProductFilter, TextBoxOrderFilter
from my_ecommerce.my_ecommerce_serializer import *
from my_ecommerce.models import Product
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg, F
from utils.helper import create_response, paginate_data
from utils.response_messages import *
from datetime import date, timedelta
# from vehicle.serializer import serializer
# from e_commerce.settings import EMAIL_HOST_USER
# from django.core.mail import send_mail

from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.uploadedfile import UploadedFile
import uuid
import json
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage
import traceback
import re

class ProductController:
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    parser_classes = [MultiPartParser, FormParser]  # Ensure file upload support

    
    def create(self, request):
        try:
            # Attach created_by user
            data = request.data.copy()
            data["created_by"] = request.user.guid  # use guid if needed

            # Validate and save product
            serializer = ProductSerializer(data=data)
            if serializer.is_valid():
                product = serializer.save()

                # Handle image uploads
                images = request.FILES.getlist('images')
                if len(images) > 5:
                    return Response({'error': 'You can upload a maximum of 5 images.'}, status=400)

                for img in images:
                    ProductImage.objects.create(product=product, images=img)

                response_data = ProductSerializer(product).data
                return Response({'data': response_data}, status=201)
            else:
                error_message = get_first_error_message(serializer.errors, "UNSUCCESSFUL")
                return Response({'error': error_message}, status=400)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    def get_product(self, request):
        try:
            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 12)  # Default limit 10 items per page
            offset = request.GET.get('offset', 0)  # Default offset 0
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "data": serialized_data,
            }
            
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
    # def get_product(self, request):
    #     try:
    #         # Query all products
    #         queryset = self.serializer_class.Meta.model.objects.all()

    #         # Apply filters
    #         filtered_qs = self.filterset_class(request.GET, queryset=queryset)
    #         final_qs = filtered_qs.qs

    #         # Apply pagination
    #         paginated_data, count = paginate_data(final_qs, request)

    #         # Serialize data
    #         serialized_data = self.serializer_class(paginated_data, many=True).data

    #         response_data = {
    #             "count": count,
    #             "data": serialized_data,
    #         }
    #         return create_response(response_data, "SUCCESSFUL", 200)

    #     except Exception as e:
    #         import traceback
    #         traceback.print_exc()  # Optional: useful for logging/debugging
    #         return Response({'error': str(e)}, status=500)



    def update_product(self, request):
        try:
            data = request.data.copy()

            # Validate required fields
            if "id" not in data:
                return Response({"data": "ID NOT PROVIDED"}, status=400)

            product = Product.objects.filter(id=data["id"]).first()
            if not product:
                return Response({"data": "NOT FOUND"}, status=404)

            # Add updated_by info
            data["updated_by"] = request.user.guid

            # Update product
            serializer = ProductSerializer(product, data=data, partial=True)
            if not serializer.is_valid():
                error_message = get_first_error_message(serializer.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, status=400)

            product_instance = serializer.save()

            # Handle deleted images
            deleted_ids = []
            if "deleted_images" in data:
                try:
                    deleted_ids = [int(i.strip()) for i in data["deleted_images"].split(",") if i.strip().isdigit()]
                    ProductImage.objects.filter(id__in=deleted_ids, product=product_instance).delete()
                except Exception as e:
                    print(f"Error deleting images: {str(e)}")

            # Handle uploaded images - THIS IS CORRECT FOR MULTIPLE IMAGES
            uploaded_images = request.FILES.getlist('images')  # This should get all images
            if len(uploaded_images) > 6:
                return Response({'error': 'You can upload a maximum of 5 images.'}, status=400)

            for img in uploaded_images:
                ProductImage.objects.create(product=product_instance, images=img, created_by=request.user)

            response_data = ProductSerializer(product_instance).data
            response_data.update({
                'message': 'Product updated successfully',
                'images_uploaded': len(uploaded_images),
                'images_deleted': len(deleted_ids),
                'total_images': ProductImage.objects.filter(product=product_instance).count()
            })

            return Response({"data": response_data}, status=200)

        except Exception as e:
            print(f"\n!!! ERROR in update_product: {str(e)}")
            print(traceback.format_exc())
            return Response({'error': str(e)}, status=500)


            
    def delete_product(self, request):
        try:
            if "id" in request.query_params:
                instance = Product.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)


class PublicproductController:
    serializer_class = PublicproductSerializer
    filterset_class = PublicproductFilter


    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_publicproduct(self, request):
        try:
            # Get all instances
            instances = self.serializer_class.Meta.model.objects.all()
            
            # Apply filters
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs
            
            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 24)  # Default limit 16 items per page
            offset = request.GET.get('offset', 0)  # Default offset 0
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "data": serialized_data,
            }
            
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
    
class SliderproductController:
    serializer_class = SliderproductSerializer
    filterset_class = SliderproductFilter


    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_sliderproduct(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)
        except Exception as e:
            return Response({'error': str(e)}, 500)


class DropDownListProductController:
    serializer_class = DropDownListProductSerializer
    filterset_class = DropDownListProductFilter


    def get_dropdownlistproduct(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)
        except Exception as e:
            return Response({'error': str(e)}, 500)


class SalesProductController:
    serializer_class = SalesProductSerializer
    filterset_class = CategoryFilter

    def create(self, request):
        try:
            # Ensure required fields are present
            if 'original_price' not in request.data:
                return Response(
                    {"error": "original_price field is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Attach created_by user
            data = request.data.copy()
            data["created_by"] = request.user.guid  # use guid if needed

            # Validate and save product
            serializer = SalesProductSerializer(data=data)
            if serializer.is_valid():
                product = serializer.save()

                # Handle image uploads
                images = request.FILES.getlist('images')
                if len(images) > 5:
                    return Response(
                        {'error': 'You can upload a maximum of 5 images.'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

                for img in images:
                    # Assuming you have a SalesProductImage model similar to ProductImage
                    SalesProductImage.objects.create(sale_product=product, images=img)

                response_data = SalesProductSerializer(product).data
                return Response(
                    {
                        "success": True,
                        "data": response_data
                    },
                    status=status.HTTP_201_CREATED
                )
            return Response(
                {
                    "error": "Validation failed",
                    "details": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_salesproduct(self, request):
        try:
            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 12)  # Default limit 10 items per page
            offset = request.GET.get('offset', 0)  # Default offset 0
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "data": serialized_data,
            }
            
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
    
    def update_salesproduct(self, request):
        try:
            data = request.data.copy()

            # Validate required fields
            if "id" not in data:
                return Response({"data": "ID NOT PROVIDED"}, status=400)

            # Find product instance
            product = SalesProduct.objects.filter(id=data["id"]).first()
            if not product:
                return Response({"data": "NOT FOUND"}, status=404)

            # Add updated_by info
            data["updated_by"] = request.user.guid

            # Update product
            serializer = SalesProductSerializer(product, data=data, partial=True)
            if not serializer.is_valid():
                error_message = get_first_error_message(serializer.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, status=400)

            product_instance = serializer.save()

            # Handle deleted images - changed 'product' to 'sale_product'
            deleted_ids = []
            if "deleted_images" in data:
                try:
                    deleted_ids = [int(i.strip()) for i in data["deleted_images"].split(",") if i.strip().isdigit()]
                    SalesProductImage.objects.filter(id__in=deleted_ids, sale_product=product_instance).delete()
                except Exception as e:
                    print(f"Error deleting images: {str(e)}")

            # Handle uploaded images - maximum 5 images
            uploaded_images = request.FILES.getlist('images')
            
            # Check total images won't exceed 5 after upload
            existing_images_count = SalesProductImage.objects.filter(sale_product=product_instance).count()
            if existing_images_count - len(deleted_ids) + len(uploaded_images) > 5:
                return Response(
                    {'error': 'Total images cannot exceed 5. Please delete some images first.'}, 
                    status=400
                )

            if len(uploaded_images) > 5:
                return Response({'error': 'You can upload a maximum of 5 images at once.'}, status=400)

            for img in uploaded_images:
                SalesProductImage.objects.create(
                    sale_product=product_instance,  # changed from 'product' to 'sale_product'
                    images=img,
                    created_by=request.user
                )

            response_data = SalesProductSerializer(product_instance).data
            response_data.update({
                'message': 'Sales Product updated successfully',
                'images_uploaded': len(uploaded_images),
                'images_deleted': len(deleted_ids),
                'total_images': SalesProductImage.objects.filter(sale_product=product_instance).count()
            })

            return Response({"data": response_data}, status=200)

        except Exception as e:
            print(f"\n!!! ERROR in update_salesproduct: {str(e)}")
            print(traceback.format_exc())
            return Response({'error': str(e)}, status=500)
        
    def delete_salesproduct(self, request):
        try:
            if "id" in request.query_params:
                instance = SalesProduct.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)



class PublicSalesproductController:
    serializer_class = PublicSalesProductSerializer
    filterset_class = PublicSalesProductFilter


    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_publicsalesproduct(self, request):
        try:
            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 12)  # Default limit 10 items per page
            offset = request.GET.get('offset', 0)  # Default offset 0

            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )

            # Apply offset and limit
            if offset > 0:
                data = data[offset:]

            paginator = Paginator(data, limit)

            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )

            serialized_data = self.serializer_class(paginated_data, many=True).data

            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "data": serialized_data,
            }

            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
    
class SliderproductController:
    serializer_class = SliderproductSerializer
    filterset_class = SliderproductFilter


    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_sliderproduct(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)
        except Exception as e:
            return Response({'error': str(e)}, 500)


class DropDownListSalesProductController:
    serializer_class = DropDownListSalesProductSerializer
    filterset_class = DropDownListSalesProductFilter


    def get_dropdownlistsalesproduct(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)
        except Exception as e:
            return Response({'error': str(e)}, 500)





class CategoryController:
    serializer_class = CategorySerializer
    filterset_class = CategoryFilter

    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = CategorySerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = CategorySerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_category(self, request):
        try:
            # Get all instances
            instances = self.serializer_class.Meta.model.objects.all()
            
            # Apply filters
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs
            
            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 12)  # Default to 12 items per page
            offset = request.GET.get('offset', 0)
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "categories": serialized_data,
            }
            
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

    def update_category(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Category.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = CategorySerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = CategorySerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_category(self, request):
        try:
            if "id" in request.query_params:
                instance = Category.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)



class PubliccategoryController:
    serializer_class = PubliccategorySerializer
    filterset_class = PubliccategoryFilter


    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_publiccategory(self, request):
        try:
            # Get all instances
            instances = self.serializer_class.Meta.model.objects.all()
            
            # Apply filters
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs
            
            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 24)  # Default limit 16 items per page
            offset = request.GET.get('offset', 0)  # Default offset 0
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "data": serialized_data,
            }
            
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

class PubliccategorywiseController:
    serializer_class = PubliccategorywiseSerializer
    filterset_class = PubliccategorywiseFilter


    def get_publiccategorywise(self, request, pk=None):
        try:
            if pk is not None:
                # Fetch single category by ID
                instance = self.serializer_class.Meta.model.objects.filter(pk=pk).first()
                if not instance:
                    return Response({'error': 'Category not found'}, status=404)

                serialized_data = self.serializer_class(instance).data
                return create_response(serialized_data, "SUCCESSFUL", 200)

            # Fetch all categories (paginated)
            instances = self.serializer_class.Meta.model.objects.all()
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)
            serialized_data = self.serializer_class(paginated_data, many=True).data

            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            import traceback
            print("Error in get_publiccategory:", str(e))
            traceback.print_exc()
            return Response({'error': str(e)}, status=500)


class DropDownListCategoryController:
    serializer_class = DropDownListCategorySerializer
    filterset_class = DropDownListCategoryFilter


    def get_dropdownlistcategory(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)
        except Exception as e:
            return Response({'error': str(e)}, 500)
        
class SlidercategoryController:
    serializer_class = SlidercategorySerializer
    filterset_class = SlidercategoryFilter


    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_slidercategory(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)
        except Exception as e:
            return Response({'error': str(e)}, 500)


from datetime import date, timedelta
import logging

class OrderController:
    serializer_class = OrderSerializer
    order_detail_serializer = OrderDetailSerializer
    filterset_class = OrderFilter

    def _calculate_delivery_date(self):
        """Calculate delivery date based on current day"""
        today = date.today()
        if today.weekday() in [3, 4]:  # Thursday, Friday
            return today + timedelta(days=4)
        elif today.weekday() == 5:  # Saturday
            return today + timedelta(days=3)
        return today + timedelta(days=2)
    
    def _get_product_price(self, product_type, product_id):
        """
        Helper method to get price based on product type
        Returns: (price, product) tuple
        """
        if product_type == 'product':
            product = Product.objects.get(id=product_id)
            return product.price, product
        elif product_type == 'sales_product':
            sales_product = SalesProduct.objects.get(id=product_id)
            return sales_product.final_price, sales_product
        else:
            raise ValueError(f"Invalid product type: {product_type}")
        

    def create(self, request):
        """
        Handles order creation with both regular and sales products
        - Requires authentication
        - Takes customer info and items list
        - Can include both product types
        - Calculates totals automatically
        - Returns created order summary
        """
        try:
            # Require authentication
            if not request.user.is_authenticated:
                return create_response(
                    {},
                    "Authentication required to create orders",
                    401
                )

            # Prepare order data with delivery date
            order_data = {
                'customer_name': request.data.get('customer_name'),
                'customer_email': request.data.get('customer_email'),
                'customer_phone': request.data.get('customer_phone'),
                'delivery_address': request.data.get('delivery_address'),
                'city': request.data.get('city'),
                'payment_method': request.data.get('payment_method'),
                'status': 'pending',
                'created_by': request.user.username,
                'delivery_date': self._calculate_delivery_date()  # Delivery date added here
            }

            # Validate required fields
            required_fields = ['customer_name', 'customer_phone', 'delivery_address', 'payment_method']
            for field in required_fields:
                if not order_data.get(field):
                    return create_response({}, f"{field.replace('_', ' ').title()} is required", 400)

            # Process items
            items = request.data.get('items', [])
            if not items:
                return create_response({}, "At least one item is required", 400)

            # Start transaction
            with transaction.atomic():
                # Create order
                serialized_order = self.serializer_class(data=order_data)
                if not serialized_order.is_valid():
                    return create_response(
                        {},
                        get_first_error_message(serialized_order.errors, UNSUCCESSFUL),
                        400
                    )
                
                order = serialized_order.save()
                bill = 0
                order_items = []

                # Process each item
                for item in items:
                    product_type = item.get('product_type', 'product')
                    product_id = item.get('product_id')
                    quantity = item.get('quantity', 1)

                    try:
                        # Get price and product
                        unit_price, product = self._get_product_price(product_type, product_id)
                        total_price = unit_price * quantity

                        # Prepare order detail data
                        order_detail_data = {
                            'order': order,
                            'unit_price': unit_price,
                            'quantity': quantity,
                            'total_price': total_price
                        }

                        # Set product field based on type
                        if product_type == 'product':
                            order_detail_data['product'] = product
                        else:
                            order_detail_data['sales_product'] = product

                        # Create order detail
                        order_detail = OrderDetail.objects.create(**order_detail_data)

                        bill += total_price
                        order_items.append({
                            'id': order_detail.id,
                            'product_type': product_type,
                            'product_id': product.id,
                            'product_name': product.name,
                            'quantity': quantity,
                            'unit_price': float(unit_price),
                            'total_price': float(total_price),
                            'is_discounted': getattr(product, 'has_discount', False)
                        })

                    except (Product.DoesNotExist, SalesProduct.DoesNotExist):
                        return create_response(
                            {},
                            f"{product_type.replace('_', ' ').title()} with id {product_id} not found",
                            404
                        )
                    except Exception as e:
                        return create_response(
                            {},
                            f"Error processing {product_type} {product_id}: {str(e)}",
                            400
                        )

                # Update order total
                order.bill = bill
                order.save()

                # Prepare response
                response_data = {
                    'order_id': order.id,
                    'customer_info': {
                        'name': order.customer_name,
                        'email': order.customer_email,
                        'phone': order.customer_phone
                    },
                    'delivery_info': {
                        'address': order.delivery_address,
                        'city': order.city if hasattr(order, 'city') else None,
                        'estimated_date': order.delivery_date.strftime('%Y-%m-%d')  # Now guaranteed to exist
                    },
                    'order_summary': {
                        'items': order_items,
                        'subtotal': float(order.bill),
                        'total': float(order.bill)
                    },
                    'payment_method': order.payment_method,
                    'status': order.status,
                    'created_by': request.user.username,
                    'created_at': timezone.now().isoformat()
                }

                return create_response(response_data, SUCCESSFUL, 201)

        except Exception as e:
            import traceback
            logger.error(f"Order creation failed: {str(e)}\n{traceback.format_exc()}")
            return create_response(
                {'error': str(e)},
                UNSUCCESSFUL,
                500
            )
    # def get_order(self, request):
    #     try:
    #         instances = self.serializer_class.Meta.model.objects.all()
    #         filtered_data = self.filterset_class(request.GET, queryset=instances)
    #         data = filtered_data.qs
    #         paginated_data, count = paginate_data(data, request)
            
    #         # Transform each order instance to match create_mixed_order format
    #         formatted_orders = []
    #         for order in paginated_data:
    #             order_items = []
                
    #             # Process order details
    #             for detail in order.order_details.all():
    #                 # Skip if no product associated
    #                 if not detail.product and not detail.sales_product:
    #                     continue
                    
    #                 # Determine product type and info
    #                 if detail.product:
    #                     product_type = "product"
    #                     product_id = detail.product.id
    #                     product_name = detail.product.name
    #                     is_discounted = getattr(detail.product, 'has_discount', False)
    #                 else:  # sales_product
    #                     product_type = "sales_product"
    #                     product_id = detail.sales_product.id
    #                     product_name = detail.sales_product.name
    #                     is_discounted = True  # Assuming sales products are always discounted
                    
    #                 # Handle None values for prices
    #                 unit_price = float(detail.unit_price) if detail.unit_price is not None else 0.0
    #                 total_price = float(detail.total_price) if detail.total_price is not None else 0.0
                    
    #                 order_items.append({
    #                     'product_type': product_type,
    #                     'product_id': product_id,
    #                     'product_name': product_name,
    #                     'quantity': detail.quantity,
    #                     'unit_price': unit_price,
    #                     'total_price': total_price,
    #                     'is_discounted': is_discounted
    #                 })
                
    #             # Calculate subtotal and total, handling None values
    #             subtotal = float(order.bill) if order.bill is not None else 0.0
                
    #             # Format the order data
    #             formatted_order = {
    #                 'order_id': order.id,
    #                 'customer_info': {
    #                     'name': order.customer_name,
    #                     'email': order.customer_email,
    #                     'phone': order.customer_phone
    #                 },
    #                 'delivery_info': {
    #                     'address': order.delivery_address,
    #                     'city': order.city,  # Added city field here
    #                     'estimated_date': order.delivery_date.strftime('%Y-%m-%d') if order.delivery_date else None
                        
    #                 },
    #                 'order_summary': {
    #                     'items': order_items,
    #                     'subtotal': subtotal,
    #                     'total': subtotal
    #                 },
    #                 'payment_method': order.payment_method,
    #                 'status': order.status
    #             }
    #             formatted_orders.append(formatted_order)
            
    #         response_data = {
    #             "status_code": 200,
    #             "message": "Successful",
    #             "data": {
    #                 "count": count,
    #                 "data": formatted_orders,
    #             }
    #         }
    #         return Response(response_data, status=200)
        
    #     except Exception as e:
    #         import traceback
    #         logger.error(f"Error fetching orders: {str(e)}\n{traceback.format_exc()}")
    #         return Response({
    #             "status_code": 500,
    #             "message": str(e),
    #             "data": None
    #         }, status=500)
        
    # def get_order(self, request):
    #     try:
    #         # Get all instances
    #         instances = self.serializer_class.Meta.model.objects.all()
            
    #         # Apply filters
    #         # filtered_data = self.filterset_class(request.GET, queryset=instances)
    #         filtered_data = self.filterset_class(request.query_params, queryset=instances)
    #         data = filtered_data.qs
            
    #         # Get pagination parameters from request
    #         page = request.query_params.get('page', 1)
    #         limit = request.query_params.get('limit', 10)  # Default to 10 items per page
    #         offset = request.query_params.get('offset', 0)
            
    #         try:
    #             page = int(page)
    #             limit = int(limit)
    #             offset = int(offset)
    #         except ValueError:
    #             return Response(
    #                 {
    #                     "status_code": 400,
    #                     "message": "Invalid pagination parameters. Page, limit and offset must be integers.",
    #                     "data": None
    #                 },
    #                 status=400
    #             )
            
    #         # Apply offset and limit
    #         if offset > 0:
    #             data = data[offset:]
            
    #         paginator = Paginator(data, limit)
            
    #         try:
    #             paginated_data = paginator.page(page)
    #         except EmptyPage:
    #             return Response(
    #                 {
    #                     "status_code": 404,
    #                     "message": "Page not found",
    #                     "data": None
    #                 },
    #                 status=404
    #             )
            
    #         # Transform each order instance to match create_mixed_order format
    #         formatted_orders = []
    #         for order in paginated_data:
    #             order_items = []
                
    #             # Process order details
    #             for detail in order.order_details.all():
    #                 # Skip if no product associated
    #                 if not detail.product and not detail.sales_product:
    #                     continue
                    
    #                 # Determine product type and info
    #                 if detail.product:
    #                     product_type = "product"
    #                     product_id = detail.product.id
    #                     product_name = detail.product.name
    #                     is_discounted = getattr(detail.product, 'has_discount', False)
    #                 else:  # sales_product
    #                     product_type = "sales_product"
    #                     product_id = detail.sales_product.id
    #                     product_name = detail.sales_product.name
    #                     is_discounted = True  # Assuming sales products are always discounted
                    
    #                 # Handle None values for prices
    #                 unit_price = float(detail.unit_price) if detail.unit_price is not None else 0.0
    #                 total_price = float(detail.total_price) if detail.total_price is not None else 0.0
                    
    #                 order_items.append({
    #                     'product_type': product_type,
    #                     'product_id': product_id,
    #                     'product_name': product_name,
    #                     'quantity': detail.quantity,
    #                     'unit_price': unit_price,
    #                     'total_price': total_price,
    #                     'is_discounted': is_discounted
    #                 })
                
    #             # Calculate subtotal and total, handling None values
    #             subtotal = float(order.bill) if order.bill is not None else 0.0
                
    #             # Format the order data
    #             formatted_order = {
    #                 'order_id': order.id,
    #                 'customer_info': {
    #                     'name': order.customer_name,
    #                     'email': order.customer_email,
    #                     'phone': order.customer_phone
    #                 },
    #                 'delivery_info': {
    #                     'address': order.delivery_address,
    #                     'city': order.city,
    #                     'estimated_date': order.delivery_date.strftime('%Y-%m-%d') if order.delivery_date else None
    #                 },
    #                 'order_summary': {
    #                     'items': order_items,
    #                     'subtotal': subtotal,
    #                     'total': subtotal
    #                 },
    #                 'payment_method': order.payment_method,
    #                 'status': order.status
    #             }
    #             formatted_orders.append(formatted_order)

    #         response_data = {
    #             "status_code": 200,
    #             "message": "Successful",
    #             "data": {
    #                 "count": paginator.count,
    #                 "total_pages": paginator.num_pages,
    #                 "current_page": page,
    #                 "limit": limit,
    #                 "offset": offset,
    #                 "next": paginated_data.has_next(),
    #                 "previous": paginated_data.has_previous(),
    #                 "orders": formatted_orders  # This matches frontend expectation
    #             }
    #         }
    #         return Response(response_data, status=200)
        
    #     except Exception as e:
    #         import traceback
    #         logger.error(f"Error fetching orders: {str(e)}\n{traceback.format_exc()}")
    #         return Response({
    #             "status_code": 500,
    #             "message": str(e),
    #             "data": None
    #         }, status=500)


   

    logger = logging.getLogger(__name__)

    def get_order(self, request):
        try:
            # Fetch and order queryset
            instances = self.serializer_class.Meta.model.objects.all().order_by('-id')
            
            # Apply filters
            filtered_data = self.filterset_class(request.query_params, queryset=instances)
            data = filtered_data.qs

            # Get pagination parameters
            try:
                page = int(request.query_params.get('page', 1))
                limit = int(request.query_params.get('limit', 10))
            except ValueError:
                return Response({
                    "status_code": 400,
                    "message": "Invalid pagination parameters. 'page' and 'limit' must be integers.",
                    "data": None
                }, status=400)

            paginator = Paginator(data, limit)

            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return Response({
                    "status_code": 200,
                    "message": "No more data",
                    "data": {
                        "count": paginator.count,
                        "total_pages": paginator.num_pages,
                        "current_page": page,
                        "limit": limit,
                        "next": False,
                        "previous": page > 1,
                        "orders": []
                    }
                }, status=200)

            formatted_orders = []
            for order in paginated_data:
                order_items = []

                for detail in order.order_details.all():
                    if not detail.product and not detail.sales_product:
                        continue

                    if detail.product:
                        product_type = "product"
                        product_id = detail.product.id
                        product_name = detail.product.name
                        is_discounted = getattr(detail.product, 'has_discount', False)
                    else:
                        product_type = "sales_product"
                        product_id = detail.sales_product.id
                        product_name = detail.sales_product.name
                        is_discounted = True

                    order_items.append({
                        'product_type': product_type,
                        'product_id': product_id,
                        'product_name': product_name,
                        'quantity': detail.quantity,
                        'unit_price': float(detail.unit_price or 0),
                        'total_price': float(detail.total_price or 0),
                        'is_discounted': is_discounted
                    })

                subtotal = float(order.bill or 0)

                formatted_order = {
                    'order_id': order.id,
                    'customer_info': {
                        'name': order.customer_name,
                        'email': order.customer_email,
                        'phone': order.customer_phone
                    },
                    'delivery_info': {
                        'address': order.delivery_address,
                        'city': order.city,
                        'estimated_date': order.delivery_date.strftime('%Y-%m-%d') if order.delivery_date else None
                    },
                    'order_summary': {
                        'items': order_items,
                        'subtotal': subtotal,
                        'total': subtotal
                    },
                    'payment_method': order.payment_method,
                    'status': order.status
                }
                formatted_orders.append(formatted_order)

            return Response({
                "status_code": 200,
                "message": "Successful",
                "data": {
                    "count": paginator.count,
                    "total_pages": paginator.num_pages,
                    "current_page": page,
                    "limit": limit,
                    "next": paginated_data.has_next(),
                    "previous": paginated_data.has_previous(),
                    "orders": formatted_orders
                }
            }, status=200)

        except Exception as e:
            import traceback
            logger.error(f"Error fetching orders: {str(e)}\n{traceback.format_exc()}")
            return Response({
                "status_code": 500,
                "message": str(e),
                "data": None
            }, status=500)

    def update_order(self, request):
        """
        Handles order updates with both regular and sales products
        - Requires authentication
        - Takes order ID and updated fields
        - Can update personal info and/or items list
        - For items, can add/update/remove products
        - Recalculates totals automatically
        - Returns updated order summary
        """
        try:
            # Require authentication
            if not request.user.is_authenticated:
                return create_response(
                    {},
                    "Authentication required to update orders",
                    401
                )

            # Validate order ID
            if 'id' not in request.data:
                return create_response({}, "Order ID not provided", 400)
            
            order_id = request.data['id']
            instance = Order.objects.filter(id=order_id).first()
            
            if not instance:
                return create_response({}, "Order not found", 404)

            # Prepare update data
            update_data = {}
            personal_info_fields = [
                'customer_name', 'customer_email', 'customer_phone',
                'delivery_address', 'city', 'payment_method'
            ]
            
            # Extract personal info if provided
            for field in personal_info_fields:
                if field in request.data:
                    update_data[field] = request.data.get(field)

            # Process items if provided
            items = request.data.get('items', None)
            delete_items = request.data.get('delete_items', [])

            # Start transaction
            with transaction.atomic():
                # Update order fields if any
                if update_data:
                    serialized_data = self.serializer_class(instance, data=update_data, partial=True)
                    if not serialized_data.is_valid():
                        return create_response(
                            {}, 
                            get_first_error_message(serialized_data.errors, UNSUCCESSFUL),
                            400
                        )
                    instance = serialized_data.save()

                bill = 0
                order_items = []

                # Process item deletions first
                if delete_items:
                    instance.order_details.filter(id__in=delete_items).delete()

                # Process new/updated items
                if items is not None:
                    # Clear existing items if full update is intended
                    if request.data.get('full_update', False):
                        instance.order_details.all().delete()

                    for item in items:
                        product_type = item.get('product_type')
                        product_id = item.get('product_id')
                        quantity = item.get('quantity', 1)
                        item_id = item.get('id', None)  # For existing items

                        try:
                            # Get price and product
                            unit_price, product = self._get_product_price(product_type, product_id)
                            total_price = unit_price * quantity

                            # Prepare order detail data
                            order_detail_data = {
                                'order': instance,
                                'unit_price': unit_price,
                                'quantity': quantity,
                                'total_price': total_price
                            }

                            # Set product field based on type
                            if product_type == 'product':
                                order_detail_data['product'] = product
                            else:
                                order_detail_data['sales_product'] = product

                            # Update or create order detail
                            if item_id:
                                order_detail = OrderDetail.objects.filter(id=item_id, order=instance).first()
                                if order_detail:
                                    for key, value in order_detail_data.items():
                                        setattr(order_detail, key, value)
                                    order_detail.save()
                                else:
                                    raise ValueError(f"Order detail item {item_id} not found")
                            else:
                                order_detail = OrderDetail.objects.create(**order_detail_data)

                            bill += total_price
                            order_items.append({
                                'id': order_detail.id,
                                'product_type': product_type,
                                'product_id': product.id,
                                'product_name': product.name,
                                'quantity': quantity,
                                'unit_price': float(unit_price),
                                'total_price': float(total_price),
                                'is_discounted': getattr(product, 'has_discount', False)
                            })

                        except (Product.DoesNotExist, SalesProduct.DoesNotExist):
                            return create_response(
                                {},
                                f"{product_type.replace('_', ' ').title()} with id {product_id} not found",
                                404
                            )
                        except Exception as e:
                            return create_response(
                                {},
                                f"Error processing {product_type} {product_id}: {str(e)}",
                                400
                            )

                    # Update order total
                    instance.bill = bill
                    instance.save()

                # Prepare response
                order_details = instance.order_details.all()
                if not order_items:  # If items weren't updated, use existing ones
                    order_items = [{
                        'id': item.id,
                        'product_type': 'product' if item.product else 'sales_product',
                        'product_id': item.product.id if item.product else item.sales_product.id,
                        'product_name': item.product.name if item.product else item.sales_product.name,
                        'quantity': item.quantity,
                        'unit_price': float(item.unit_price),
                        'total_price': float(item.total_price),
                        'is_discounted': getattr(item.product or item.sales_product, 'has_discount', False)
                    } for item in order_details]

                response_data = {
                        'order_id': instance.id,
                        'customer_info': {
                            'name': instance.customer_name,
                            'email': instance.customer_email,
                            'phone': instance.customer_phone
                        },
                        'delivery_info': {
                            'address': instance.delivery_address,
                            'city': instance.city if hasattr(instance, 'city') else None,
                            'estimated_date': instance.delivery_date.strftime('%Y-%m-%d') if instance.delivery_date else None
                        },
                        'order_summary': {
                            'items': order_items,
                            'subtotal': float(instance.bill),
                            'total': float(instance.bill)
                        },
                        'payment_method': instance.payment_method,
                        'status': instance.status,
                        'updated_by': request.user.username,
                        'updated_at': timezone.now().isoformat()
                    }


                return create_response(response_data, SUCCESSFUL, 200)

        except Exception as e:
            import traceback
            logger.error(f"Order update failed: {str(e)}\n{traceback.format_exc()}")
            return create_response(
                {'error': str(e)},
                UNSUCCESSFUL,
                500
            )

    def delete_order(self, request):
        try:
            if "id" in request.query_params:
                instance = Order.objects.filter(id=request.query_params['id']).first()
                if instance:
                    instance.delete()
                    return Response({"data": "SUCCESSFUL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

class TextBoxOrderController:
    serializer_class = TextBoxOrderSerializer
    filterset_class = TextBoxOrderFilter


    def get_textboxorder(self, request):
        try:
            order_id = request.query_params.get('id')

            # If ID is provided, return a single order
            if order_id:
                instance = self.serializer_class.Meta.model.objects.filter(id=order_id).first()
                if not instance:
                    return Response({'error': 'Order not found'}, status=404)
                
                serialized_data = self.serializer_class(instance).data
                return create_response(serialized_data, "SUCCESSFUL", 200)

            # Else return paginated list
            instances = self.serializer_class.Meta.model.objects.all()
            filtered_data = self.filterset_class(request.query_params, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)
            serialized_data = self.serializer_class(paginated_data, many=True).data

            return create_response({
                "count": count,
                "data": serialized_data,
            }, "SUCCESSFUL", 200)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({'error': str(e)}, status=500)


class PublicOrderController:
    serializer_class = PublicOrderSerializer
    order_detail_serializer = OrderDetailSerializer
    filterset_class = PublicOrderFilter

    def _calculate_delivery_date(self):
        """Calculate delivery date based on current day"""
        today = date.today()
        if today.weekday() in [3, 4]:  # Thursday, Friday
            return today + timedelta(days=4)
        elif today.weekday() == 5:  # Saturday
            return today + timedelta(days=3)
        return today + timedelta(days=2)

    def _get_product_price(self, product_type, product_id):
        """
        Helper method to get price based on product type
        Returns: (price, product) tuple
        """
        if product_type == 'product':
            product = Product.objects.get(id=product_id)
            return product.price, product
        elif product_type == 'sales_product':
            sales_product = SalesProduct.objects.get(id=product_id)
            return sales_product.final_price, sales_product
        else:
            raise ValueError(f"Invalid product type: {product_type}")

    def create_mixed_order(self, request):
        """
        Handles order creation with both regular and sales products
        - Takes user personal info
        - Takes list of items with product_type (product/sales_product), product_id, and quantity
        - Calculates prices from respective tables
        - Returns order summary with calculated totals
        """
        try:
            # Extract data from request
            personal_info = {
                'customer_name': request.data.get('customer_name'),
                'customer_email': request.data.get('customer_email'),
                'customer_phone': request.data.get('customer_phone'),
                'delivery_address': request.data.get('delivery_address'),
                'city': request.data.get('city'), 
                'payment_method': request.data.get('payment_method'),
            }
            
            # Get product selections (list of {product_type, product_id, quantity})
            items = request.data.get('items', [])
            
            # Validate required fields
            if not all(personal_info.values()) or not items:
                return create_response(
                    {},
                    "Missing required fields (personal info or items)",
                    400
                )
            
            # Prepare order data
            order_data = {
                **personal_info,
                'delivery_date': self._calculate_delivery_date(),
                'status': 'pending',
                'payment_status': False
            }
            
            # Validate order data
            serialized_data = self.serializer_class(data=order_data)
            if not serialized_data.is_valid():
                return create_response(
                    {}, 
                    get_first_error_message(serialized_data.errors, UNSUCCESSFUL),
                    400
                )
            
            # Process order with transaction
            with transaction.atomic():
                order = serialized_data.save()
                bill = 0
                order_items = []
                
                # Process each item
                for item in items:
                    product_type = item.get('product_type')
                    product_id = item.get('product_id')
                    quantity = item.get('quantity', 1)
                    
                    try:
                        # Get price and product based on type
                        unit_price, product = self._get_product_price(product_type, product_id)
                        total_price = unit_price * quantity
                        
                        # Prepare order detail data based on product type
                        order_detail_data = {
                            'order': order,
                            'unit_price': unit_price,
                            'quantity': quantity,
                            'total_price': total_price
                        }
                        
                        # Set the appropriate product field based on type
                        if product_type == 'product':
                            order_detail_data['product'] = product
                        else:
                            order_detail_data['sales_product'] = product
                        
                        # Create order detail with all fields at once
                        order_detail = OrderDetail.objects.create(**order_detail_data)
                        
                        bill += total_price
                        order_items.append({
                            'product_type': product_type,
                            'product_id': product.id,
                            'product_name': product.name,
                            'quantity': quantity,
                            'unit_price': float(unit_price),
                            'total_price': float(total_price),
                            'is_discounted': getattr(product, 'has_discount', False)
                        })
                        
                    except (Product.DoesNotExist, SalesProduct.DoesNotExist):
                        return create_response(
                            {},
                            f"{product_type.replace('_', ' ').title()} with id {product_id} not found",
                            404
                        )
                    except Exception as e:
                        return create_response(
                            {},
                            f"Error processing {product_type} {product_id}: {str(e)}",
                            400
                        )
                
                # Update order total
                order.bill = bill
                order.save()

                # Prepare detailed response
                response_data = {
                    'order_id': order.id,
                    'customer_info': {
                        'name': order.customer_name,
                        'email': order.customer_email,
                        'phone': order.customer_phone
                    },
                    'delivery_info': {
                        'address': order.delivery_address,
                        'city': order.city if hasattr(order, 'city') else None,
                        'estimated_date': order.delivery_date.strftime('%Y-%m-%d')
                    },
                    'order_summary': {
                        'items': order_items,
                        'subtotal': float(bill),
                        'total': float(bill)
                    },
                    'payment_method': order.payment_method,
                    'status': order.status
                }

                return create_response(response_data, SUCCESSFUL, 200)

        except Exception as e:
            import traceback
            logger.error(f"Order creation failed: {str(e)}\n{traceback.format_exc()}")
            return create_response(
                {'error': str(e)},
                UNSUCCESSFUL,
                500
            )

class ProductTagController:
    serializer_class = ProductTagSerializer
    filterset_class = ProductTagFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = ProductTagSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = ProductTagSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_producttag(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_producttag(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = ProductTag.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = ProductTagSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = ProductTagSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_producttag(self, request):
        try:
            if "id" in request.query_params:
                instance = ProductTag.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)
        


from django.core.paginator import Paginator, EmptyPage
       
class ContactController:
    serializer_class = ContactSerializer
    filterset_class = ContactFilter

 
    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_contact(self, request):
        try:
            # Get filtered queryset
            queryset = self.serializer_class.Meta.model.objects.all()
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            
            # Apply ordering if needed (you can add your default ordering here)
            # filtered_queryset = filtered_queryset.order_by('-created_at')
            
            # Pagination
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 10)
            offset = request.GET.get('offset', 0)
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return Response({
                    'status': 'ERROR',
                    'message': 'Invalid pagination parameters'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Apply offset and limit
            if offset > 0:
                filtered_queryset = filtered_queryset[offset:]
            
            paginator = Paginator(filtered_queryset, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return Response({
                    'status': 'ERROR',
                    'message': 'Page not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            # Serialize data
            serializer = self.serializer_class(paginated_data, many=True)
            
            return Response({
                'status': 'SUCCESS',
                'message': 'Contacts retrieved successfully',
                'data': serializer.data,
                'meta': {
                    'total': paginator.count,
                    'pages': paginator.num_pages,
                    'current_page': page,
                    'limit': limit,
                    'offset': offset,
                    'has_next': paginated_data.has_next(),
                    'has_previous': paginated_data.has_previous()
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to retrieve contacts',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete_contact(self, request):
        try:
            if "id" in request.query_params:
                instance = Contact.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)
        

from rest_framework.exceptions import ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
import logging
 
class PublicContactController:
    serializer_class = PublicContactSerializer
    filterset_class = PublicContactFilter

 
    # def create(self, request):
    #     try:
    #         # request.POST._mutable = True
    #         # request.data["created_by"] = request.user.guid
    #         # request.POST._mutable = False

    #         # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
    #         validated_data = PublicContactSerializer(data=request.data)
    #         if validated_data.is_valid():
    #             response = validated_data.save()
    #             response_data = PublicContactSerializer(response).data
    #             return Response({'data': response_data}, 200)
    #         else:
    #             error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
    #             return Response({'data': error_message}, 400)
    #         # else:
    #         #     return Response({'data': "Permission Denaied"}, 400)
    #     except Exception as e:
    #         return Response({'error': str(e)}, 500)


    logger = logging.getLogger(__name__)

    def create(self, request):
        try:
            serializer = PublicContactSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            contact = serializer.save()  # Model validators will run automatically

            return Response({
                'success': True,
                'message': "Contact created successfully",
                'data': PublicContactSerializer(contact).data
            }, status=201)

        except ValidationError as e:
            return Response({
                'success': False,
                'errors': e.detail
            }, status=400)

        except DjangoValidationError as e:
            return Response({
                'success': False,
                'errors': e.message_dict if hasattr(e, 'message_dict') else {'non_field_errors': [str(e)]}
            }, status=400)

        except Exception as e:
            logger.error(f"Error creating contact: {str(e)}", exc_info=True)
            return Response({
                'success': False,
                'error': "An unexpected error occurred while processing your request"
            }, status=500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_publiccontact(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)



class EmployeeController:
    serializer_class = EmployeeSerializer
    filterset_class = EmployeeFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = EmployeeSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = EmployeeSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_employee(self, request):
        try:
            # Get all instances
            instances = self.serializer_class.Meta.model.objects.all()
            
            # Apply filters
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs
            
            # Get pagination parameters from request
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 10)  # Default limit 16 items per page
            offset = request.GET.get('offset', 0)  # Default offset 0
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return create_response(
                    {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
                    "BAD_REQUEST",
                    400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return create_response(
                    {"error": "Page not found"},
                    "NOT_FOUND",
                    404
                )
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": page,
                "limit": limit,
                "offset": offset,
                "next": paginated_data.has_next(),
                "previous": paginated_data.has_previous(),
                "data": serialized_data,
            }
            
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

    def update_employee(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Employee.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = EmployeeSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = EmployeeSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_employee(self, request):
        try:
            if "id" in request.query_params:
                instance = Employee.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)
        


from django.shortcuts import get_object_or_404

# class ReviewController:
#     serializer_class = ReviewSerializer
#     filterset_class = ReviewFilter



#     def create(self, request):
#         try:
#             request.POST._mutable = True
#             request.data["created_by"] = request.user.guid
#             request.POST._mutable = False

#             # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
#             validated_data = ReviewSerializer(data=request.data, context={'request': request})
#             if validated_data.is_valid():
#                 response = validated_data.save()
#                 response_data = ReviewSerializer(response).data
#                 return Response({'data': response_data}, 200)
#             else:
#                 error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
#                 return Response({'data': error_message}, 400)
#             # else:
#             #     return Response({'data': "Permission Denaied"}, 400)
#         except Exception as e:
#             return Response({'error': str(e)}, 500)

#     # mydata = Member.objects.filter(firstname__endswith='s').values()
#     def get_review(self, request):
#         try:
#             # Get all instances
#             instances = self.serializer_class.Meta.model.objects.all()
            
#             # Apply filters
#             filtered_data = self.filterset_class(request.GET, queryset=instances)
#             data = filtered_data.qs
            
#             # Get pagination parameters from request
#             page = request.GET.get('page', 1)
#             limit = request.GET.get('limit', 10)  # Default to 10 items per page
#             offset = request.GET.get('offset', 0)
            
#             try:
#                 page = int(page)
#                 limit = int(limit)
#                 offset = int(offset)
#             except ValueError:
#                 return create_response(
#                     {"error": "Invalid pagination parameters. Page, limit and offset must be integers."},
#                     "BAD_REQUEST",
#                     400
#                 )
            
#             # Apply offset and limit
#             if offset > 0:
#                 data = data[offset:]
            
#             paginator = Paginator(data, limit)
            
#             try:
#                 paginated_data = paginator.page(page)
#             except EmptyPage:
#                 return create_response(
#                     {"error": "Page not found"},
#                     "NOT_FOUND",
#                     404
#                 )
            
#             serialized_data = self.serializer_class(paginated_data, many=True).data
            
#             response_data = {
#                 "count": paginator.count,
#                 "total_pages": paginator.num_pages,
#                 "current_page": page,
#                 "limit": limit,
#                 "offset": offset,
#                 "next": paginated_data.has_next(),
#                 "previous": paginated_data.has_previous(),
#                 "data": serialized_data,
#             }
            
#             return create_response(response_data, "SUCCESSFUL", 200)

#         except Exception as e:
#             return Response({'error': str(e)}, status=500)

#     def update_review(self, request):
#         try:
#             if "id" in request.data:
#                 # finding instance
#                 instance = Review.objects.filter(id=request.data["id"]).first()

#                 if instance:
#                     request.POST._mutable = True
#                     request.data["updated_by"] = request.user.guid
#                     request.POST._mutable = False

#                     # updating the instance/record with request in context
#                     serialized_data = ReviewSerializer(
#                         instance, 
#                         data=request.data, 
#                         partial=True,
#                         context={'request': request}  # Add this line
#                     )
                    
#                     if serialized_data.is_valid():
#                         response = serialized_data.save()
#                         response_data = ReviewSerializer(response).data
#                         return Response({"data": response_data}, 200)
#                     else:
#                         error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
#                         return Response({'data': error_message}, 400)
#                 else:
#                     return Response({"data": "NOT FOUND"}, 404)
#             else:
#                 return Response({"data": "ID NOT PROVIDED"}, 400)

#         except Exception as e:
#             return Response({'error': str(e)}, 500)

#     def delete_review(self, request):
#         try:
#             if "id" in request.query_params:
#                 instance = Review.objects.filter(id=request.query_params['id']).first()

#                 if instance:
#                     instance.delete()
#                     return Response({"data": "SUCESSFULL"}, 200)
#                 else:
#                     return Response({"data": "RECORD NOT FOUND"}, 404)
#             else:
#                 return Response({"data": "ID NOT PROVIDED"}, 400)
#         except Exception as e:
#             return Response({'error': str(e)}, 500)
        


class ReviewController:
    serializer_class = ReviewSerializer
    filterset_class = ReviewFilter

    def create(self, request):
        try:
            # Make request data mutable if needed
            if hasattr(request.data, '_mutable'):
                request.data._mutable = True
            
            # Check if either product or sales_product is provided
            product_id = request.data.get('product')
            sales_product_id = request.data.get('sales_product')

            if not product_id and not sales_product_id:
                return Response({
                    'status': 'ERROR',
                    'message': 'Either product or sales_product ID is required'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Validate product exists if provided
            if product_id:
                product = get_object_or_404(Product, id=product_id)
            if sales_product_id:
                sales_product = get_object_or_404(SalesProduct, id=sales_product_id)

            # Set created_by if user is authenticated
            if request.user.is_authenticated:
                request.data["user"] = request.user.guid
            
            # Validate and save
            serializer = self.serializer_class(data=request.data, context={'request': request})
            if serializer.is_valid():
                review = serializer.save()
                
                # Return enriched response data
                response_data = self.serializer_class(review).data
                
                # Enhance the response with product/sales_product details
                enhanced_data = {
                    **response_data,
                    'product': {
                        'id': review.product.id if review.product else None,
                        'name': review.product.name if review.product else None
                    } if review.product else None,
                    'sales_product': {
                        'id': review.sales_product.id if review.sales_product else None,
                        'name': review.sales_product.name if review.sales_product else None,
                        'discount_percent': review.sales_product.discount_percent if review.sales_product else None
                    } if review.sales_product else None
                }
                
                return Response({
                    'status': 'SUCCESS',
                    'message': 'Review created successfully',
                    'data': enhanced_data
                }, status=status.HTTP_201_CREATED)
            
            # Handle validation errors
            error_message = get_first_error_message(serializer.errors, "UNSUCCESSFUL")
            return Response({
                'status': 'ERROR',
                'message': error_message,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to create review',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_review(self, request):
        try:
            # Get filtered queryset
            queryset = Review.objects.all()
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            
            # Apply ordering (newest first by default)
            filtered_queryset = filtered_queryset.order_by('-created_at')
            
            # Pagination
            page = request.GET.get('page', 1)
            limit = request.GET.get('limit', 10)
            offset = request.GET.get('offset', 0)
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return Response({
                    'status': 'ERROR',
                    'message': 'Invalid pagination parameters'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Apply offset and limit
            if offset > 0:
                filtered_queryset = filtered_queryset[offset:]
            
            paginator = Paginator(filtered_queryset, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return Response({
                    'status': 'ERROR',
                    'message': 'Page not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            # Serialize data with enriched product/sales product info
            serializer = self.serializer_class(paginated_data, many=True)
            
            return Response({
                'status': 'SUCCESS',
                'message': 'Reviews retrieved successfully',
                'data': serializer.data,
                'meta': {
                    'total': paginator.count,
                    'pages': paginator.num_pages,
                    'current_page': page,
                    'limit': limit,
                    'offset': offset,
                    'has_next': paginated_data.has_next(),
                    'has_previous': paginated_data.has_previous()
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to retrieve reviews',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def update_review(self, request):
        try:
            # Validate required ID field
            if "id" not in request.data:
                return Response({
                    'status': 'ERROR',
                    'message': 'Review ID not provided'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Find the review instance
            instance = Review.objects.filter(id=request.data["id"]).first()
            if not instance:
                return Response({
                    'status': 'ERROR',
                    'message': 'Review not found'
                }, status=status.HTTP_404_NOT_FOUND)

            # Check ownership (user can only update their own reviews)
            if request.user.is_authenticated and instance.user != request.user:
                return Response({
                    'status': 'ERROR',
                    'message': 'You can only update your own reviews'
                }, status=status.HTTP_403_FORBIDDEN)

            # Create a copy of the data to avoid modifying the original request
            data = request.data.copy()
            
            # Explicitly remove product/sales_product fields
            data.pop('product', None)
            data.pop('sales_product', None)
            
            # Update the review
            serializer = self.serializer_class(
                instance,
                data=data,
                partial=True,
                context={'request': request}
            )
            
            if serializer.is_valid():
                updated_review = serializer.save()
                
                # Return enriched response
                response_data = self.serializer_class(updated_review).data
                return Response({
                    'status': 'SUCCESS',
                    'message': 'Review updated successfully',
                    'data': response_data
                }, status=status.HTTP_200_OK)
            
            # Handle validation errors
            error_message = get_first_error_message(serializer.errors, "Validation failed")
            return Response({
                'status': 'ERROR',
                'message': error_message,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to update review',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete_review(self, request):
        try:
            # Validate required ID parameter
            review_id = request.query_params.get('id')
            if not review_id:
                return Response({
                    'status': 'ERROR',
                    'message': 'Review ID not provided'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Find the review instance
            instance = Review.objects.filter(id=review_id).first()
            if not instance:
                return Response({
                    'status': 'ERROR',
                    'message': 'Review not found'
                }, status=status.HTTP_404_NOT_FOUND)

            # Check ownership (user can only delete their own reviews)
            if request.user.is_authenticated and instance.user != request.user:
                return Response({
                    'status': 'ERROR',
                    'message': 'You can only delete your own reviews'
                }, status=status.HTTP_403_FORBIDDEN)

            # Delete the review
            instance.delete()
            
            return Response({
                'status': 'SUCCESS',
                'message': 'Review deleted successfully',
                'data': {'id': review_id}
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to delete review',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PublicReviewController:
    serializer_class = PublicReviewSerializer
    filterset_class = PublicReviewFilter

    def create(self, request):
        try:
            # Check if either product or sales_product is provided
            product_id = request.data.get('product')
            sales_product_id = request.data.get('sales_product')

            if not product_id and not sales_product_id:
                return Response({
                    'status': 'ERROR',
                    'message': 'Either product or sales_product ID is required'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Validate product exists if provided
            if product_id:
                product = get_object_or_404(Product, id=product_id)
            if sales_product_id:
                sales_product = get_object_or_404(SalesProduct, id=sales_product_id)

            # Validate and save
            serializer = ReviewSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                review = serializer.save()

                # Return success response
                return Response({
                    'status': 'SUCCESS',
                    'message': 'Review created successfully',
                    'data': {
                        'id': review.id,
                        'name': review.name,
                        'comment': review.comment,
                        'rating': review.rating,
                        'product': {
                            'id': review.product.id if review.product else None,
                            'name': review.product.name if review.product else None
                        } if review.product else None,
                        'sales_product': {
                            'id': review.sales_product.id if review.sales_product else None,
                            'name': review.sales_product.name if review.sales_product else None,
                            'discount_percent': review.sales_product.discount_percent if review.sales_product else None
                        } if review.sales_product else None
                    }
                }, status=status.HTTP_201_CREATED)

            # Handle validation errors
            error_message = get_first_error_message(serializer.errors, "UNSUCCESSFUL")
            return Response({
                'status': 'ERROR',
                'message': error_message,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to create review',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # mydata = Member.objects.filter(firstname__endswith='s').values()

    def get_publicreview(self, request):
        try:
            # Get product or sales_product ID from query params
            product_id = request.GET.get('product_id') or request.GET.get('product')
            sales_product_id = request.GET.get('sales_product_id') or request.GET.get('sales_product')

            # Validate at least one ID is provided
            if not product_id and not sales_product_id:
                return Response({
                    'status': 'ERROR',
                    'message': 'Either product_id or sales_product_id is required',
                    'data': None
                }, status=status.HTTP_400_BAD_REQUEST)

            # Build the query based on provided ID
            query = Q()
            if product_id:
                query |= Q(product_id=product_id)
            if sales_product_id:
                query |= Q(sales_product_id=sales_product_id)

            # Get filtered reviews
            instances = self.serializer_class.Meta.model.objects.filter(query)

            if not instances.exists():
                return Response({
                    'status': 'SUCCESS',
                    'message': 'No reviews found',
                    'data': []
                }, status=status.HTTP_200_OK)

            # Apply additional filters if needed
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            # Paginate and serialize
            paginated_data, count = paginate_data(data, request)
            serialized_data = self.serializer_class(paginated_data, many=True).data

            # Format response
            response_data = {
                'status': 'SUCCESS',
                'message': 'Reviews retrieved successfully',
                'data': {
                    'count': count,
                    'reviews': serialized_data
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': 'Failed to retrieve reviews',
                'error': str(e),
                'data': None
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_publicreview_by_id(self, request):
        try:
            # Get product or sales_product ID from query params
            product_id = request.GET.get('product_id') or request.GET.get('product')
            sales_product_id = request.GET.get('sales_product_id') or request.GET.get('sales_product')
            review_id = request.GET.get('review_id')

            # Validate at least one ID is provided
            if not product_id and not sales_product_id and not review_id:
                return Response({
                    'status': 'ERROR',
                    'message': 'Either product_id, sales_product_id, or review_id is required',
                    'data': None
                }, status=status.HTTP_400_BAD_REQUEST)

            # Build the base queryset
            queryset = self.serializer_class.Meta.model.objects.all()

            # Apply specific filters based on provided IDs
            if review_id:
                queryset = queryset.filter(id=review_id)
            else:
                query = Q()
                if product_id:
                    query |= Q(product_id=product_id)
                if sales_product_id:
                    query |= Q(sales_product_id=sales_product_id)
                queryset = queryset.filter(query)

            if not queryset.exists():
                return Response({
                    'status': 'SUCCESS',
                    'message': 'No reviews found',
                    'data': []
                }, status=status.HTTP_200_OK)

            # Apply additional filters if filterset_class is defined
            if hasattr(self, 'filterset_class') and self.filterset_class:
                queryset = self.filterset_class(request.GET, queryset=queryset).qs

            # Paginate the results
            paginated_data, count = paginate_data(queryset, request)

            # Serialize the data
            serializer = self.serializer_class(paginated_data, many=True)

            # Format the response
            response_data = {
                'status': 'SUCCESS',
                'message': 'Reviews retrieved successfully',
                'data': {
                    'count': count,
                    'reviews': serializer.data
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({
                'status': 'ERROR',
                'message': 'Internal server error',
                'error': str(e),
                'data': None
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# In my_ecommerce_controller.py
from django.db.models import Q, Case, When, IntegerField
from rest_framework.pagination import PageNumberPagination

class LuxurySearchPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CategorySearchController:
    serializer_class = PubliccategorySerializer
    filterset_class = PubliccategoryFilter
    pagination_class = LuxurySearchPagination

    def get_categorysearch(self, request):
        search_query = request.GET.get('q', '').strip()
    
        if not search_query:
            return create_response([], "EMPTY_QUERY", 200)
        
        try:
            # Only search by fields that exist in your model
            # categories = Category.objects.filter(
            #     Q(name__icontains=search_query) |
            #     Q(description__icontains=search_query)
            # ).annotate(
            #     search_rank=Case(
            #         When(name__istartswith=search_query, then=3),
            #         When(name__icontains=search_query, then=2),
            #         When(description__icontains=search_query, then=1),
            #         default=0,
            #         output_field=IntegerField(),
            #     )
            # ).order_by('-search_rank', '-created_at').distinct()
            

            categories = Category.objects.filter(name__icontains=search_query).order_by('-created_at').distinct()

            # Paginate results
            paginator = self.pagination_class()
            paginated_categories = paginator.paginate_queryset(categories, request)
            
            # Serialize results
            category_data = self.serializer_class(
                paginated_categories, 
                many=True, 
                context={'request': request}
            ).data
            
            # Format results
            results = {
                'categories': category_data,
                'search_meta': {
                    'query': search_query,
                    'category_count': categories.count(),
                }
            }
            
            return create_response(results, "SUCCESSFUL", 200)
            
        except Exception as e:
            return create_response(
                {"error": str(e)},
                "SERVER_ERROR",
                500
            )

    def get_suggestions(self, request):
        query = request.GET.get('q', '').strip()
        if not query:
            return create_response([], "EMPTY_QUERY", 200)
            
        # Get category suggestions only
        suggestions = {
            'popular_categories': list(Category.objects.filter(
                Q(name__icontains=query)
            ).order_by('-views')[:5].values('name', 'slug')),
            'trending_categories': list(Category.objects.order_by('-views')[:3].values('name', 'slug'))
        }
        return create_response(suggestions, "SUCCESSFUL", 200)