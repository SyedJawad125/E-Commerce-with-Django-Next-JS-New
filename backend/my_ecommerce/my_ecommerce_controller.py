from venv import logger
from django.db import transaction
from django.utils import timezone
from django.contrib.auth import authenticate
from my_ecommerce.my_ecommerce_filters import CategoryFilter, ContactFilter, EmployeeFilter, ProductFilter, OrderFilter, PublicOrderFilter, PublicSalesProductFilter, \
    PublicproductFilter, PubliccategoryFilter, SlidercategoryFilter, SliderproductFilter
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


class ProductController:
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    parser_classes = [MultiPartParser, FormParser]  # Ensure file upload support

    def create(self, request):
        def get_unique_filename(filename):
            import uuid
            ext = filename.split('.')[-1]
            return f"{uuid.uuid4().hex}.{ext}"

        try:
            # Debug request data
            print("Request content type:", request.content_type)
            print("Files in request:", request.FILES)
            print("Data in request:", request.data)

            data = request.data.copy()
            data["created_by"] = str(request.user.guid)

            # Handle single image - NEW FIXED VERSION
            if 'image' in request.FILES:
                img_file = request.FILES['image']
                print("Image file received:", img_file.name, img_file.size)  # Debug
                unique_name = get_unique_filename(img_file.name)
                data['image'] = default_storage.save(f'product_images/{unique_name}', img_file)
            elif 'image' in data and data['image'] == 'undefined':
                data['image'] = None
            else:
                data['image'] = None  # Explicitly set to None if not provided

            # Handle multiple images (working correctly now)
            if 'images' in request.FILES:
                image_list = []
                for img in request.FILES.getlist('images'):
                    unique_name = get_unique_filename(img.name)
                    path = default_storage.save(f'product_images/{unique_name}', img)
                    image_list.append(path)
                data['images'] = json.dumps(image_list)
            else:
                data['images'] = json.dumps([])

            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                product = serializer.save()
                return Response({
                    'status_code': 200,
                    'message': 'SUCCESSFUL',
                    'data': self.serializer_class(product).data
                }, status=200)
                
            return Response({
                'status_code': 400,
                'message': 'VALIDATION_ERROR',
                'data': serializer.errors
            }, status=400)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({
                'status_code': 500,
                'message': 'SERVER_ERROR',
                'error': str(e)
            }, status=500)
     # def create(self, request):
    #     try:
    #         request.POST._mutable = True
    #         request.data["created_by"] = request.user.guid
    #         request.POST._mutable = False

    #         # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
    #         validated_data = ProductSerializer(data=request.data)
    #         if validated_data.is_valid():
    #             response = validated_data.save()
    #             response_data = ProductSerializer(response).data
    #             return Response({'data': response_data}, 200)
    #         else:
    #             error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
    #             return Response({'data': error_message}, 400)
    #         # else:
    #         #     return Response({'data': "Permission Denaied"}, 400)
    #     except Exception as e:
    #         return Response({'error': str(e)}, 500)
    def get_product(self, request):
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

    def update_product(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Product.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = ProductSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = ProductSerializer(response).data
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

            request.data._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            serializer = SalesProductSerializer(data=request.data)
            if serializer.is_valid():
                instance = serializer.save()
                return Response(
                    {
                        "success": True,
                        "data": SalesProductSerializer(instance).data
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

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_salesproduct(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = SalesProduct.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = SalesProductSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = SalesProductSerializer(response).data
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

    def create(self, request):
        try:
            request.POST._mutable = True
            order_details = request.data.pop('OrderDetail', [])
            request.data['customer'] = request.user.guid
            request.data['delivery_date'] = self._calculate_delivery_date()
            request.data['status'] = 'booked'
            request.POST._mutable = False

            if not (request.user.role in ['admin', 'manager'] or request.user.is_superuser):
                return Response({'data': "Permission Denied"}, status=400)

            serialized_data = self.serializer_class(data=request.data)
            if not serialized_data.is_valid():
                return create_response(
                    {}, 
                    get_first_error_message(serialized_data.errors, UNSUCCESSFUL),
                    400
                )

            with transaction.atomic():
                response_data = serialized_data.save()
                bill = 0
                
                for item in order_details:
                    item['order'] = response_data.id
                    item['total_price'] = item['quantity'] * item['unit_price']
                    bill += item['total_price']
                    
                    serialized_detail = self.order_detail_serializer(data=item)
                    if not serialized_detail.is_valid():
                        return create_response(
                            {},
                            get_first_error_message(serialized_detail.errors, UNSUCCESSFUL),
                            400
                        )
                    serialized_detail.save()
                
                response_data.bill = bill
                response_data.save()

            return create_response(
                self.serializer_class(response_data).data,
                SUCCESSFUL,
                200
            )

        except Exception as e:
            return create_response(
                {'error': str(e)},
                UNSUCCESSFUL,
                500
            )
        
    def checkout(self, request):
        """Handle checkout functionality"""
        try:
            cart_items = request.data.get('cart_items', [])
            user = request.user
            
            order_data = {
                'customer': user.guid,
                'customer_name': request.data.get('name'),
                'customer_email': request.data.get('email'),
                'customer_phone': request.data.get('phone'),
                'delivery_address': request.data.get('address'),
                'payment_method': request.data.get('payment_method'),
                'payment_status': request.data.get('payment_status', False),
                'status': 'booked',
                'delivery_date': self._calculate_delivery_date()
            }
            
            # Validate and create order
            serialized_data = self.serializer_class(data=order_data)
            if not serialized_data.is_valid():
                return create_response(
                    {},
                    get_first_error_message(serialized_data.errors, UNSUCCESSFUL),
                    400
                )
            
            with transaction.atomic():
                order = serialized_data.save()
                order_total = 0
                
                for item in cart_items:
                    try:
                        product = Product.objects.get(id=item['product_id'])
                        total_price = product.price * item['quantity']
                        
                        order_detail_data = {
                            'order': order.id,
                            'product': product.id,
                            'unit_price': product.price,
                            'quantity': item['quantity'],
                            'total_price': total_price
                        }
                        
                        serialized_detail = self.order_detail_serializer(data=order_detail_data)
                        if not serialized_detail.is_valid():
                            transaction.set_rollback(True)
                            return create_response(
                                {},
                                get_first_error_message(serialized_detail.errors, UNSUCCESSFUL),
                                400
                            )
                            
                        serialized_detail.save()
                        order_total += total_price
                    except Product.DoesNotExist:
                        transaction.set_rollback(True)
                        return create_response(
                            {},
                            f"Product with id {item['product_id']} not found",
                            400
                        )
                
                order.bill = order_total
                order.save()
                
                response_data = {
                    'status': 'success',
                    'order_id': order.id,
                    'bill_number': order.bill,
                    'total_amount': order_total
                }
                
                return create_response(response_data, SUCCESSFUL, 201)
                
        except Exception as e:
            return create_response(
                {'error': str(e)},
                UNSUCCESSFUL,
                500
            )
    def get_order(self, request):
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

    def update_order(self, request):
        try:
            if 'id' in request.data:
                instance = Order.objects.filter(id=request.data['id']).first()
                if instance:
                    request.POST._mutable = True
                    order_details = request.data.pop('OrderDetail') if "OrderDetail" in request.data else None
                    delete_order_details = request.data.pop('DeleteOrderDetail') if 'DeleteOrderDetail' in request.data else None
                    request.POST._mutable = False

                    serialized_data = self.serializer_class(instance, data=request.data, partial=True)
                    if serialized_data.is_valid():
                        response_data = serialized_data.save()
                        bill = 0

                        if order_details:
                            for i in order_details:
                                i['order'] = response_data.id
                                i['total_price'] = i['quantity'] * i['unit_price']
                                bill += i['total_price']
                                serialized_detail = self.order_detail_serializer(data=i)
                                if serialized_detail.is_valid():
                                    serialized_detail.save()
                                else:
                                    transaction.set_rollback(True)
                                    return create_response({}, get_first_error_message(serialized_detail.errors, UNSUCCESSFUL),400)
                            response_data.bill = bill
                            response_data.save()

                        if delete_order_details:
                            od = instance.order_detail_order.filter(id__in=delete_order_details)
                            if od:
                                od.delete()
                        return create_response(self.serializer_class(response_data).data, SUCCESSFUL, 200)
                    else:
                        return create_response({}, get_first_error_message(serialized_data.errors, UNSUCCESSFUL), 400)
                else:
                    return create_response({}, NOT_FOUND, 404)
            else:
                return create_response({}, ID_NOT_PROVIDED, 400)
        except Exception as e:
            return create_response({'error':str(e)}, UNSUCCESSFUL, 500)

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

class ContactController:
    serializer_class = ContactSerializer
    filterset_class = ContactFilter

 
    def create(self, request):
        try:
            # request.POST._mutable = True
            # request.data["created_by"] = request.user.guid
            # request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = ContactSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = ContactSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_contact(self, request):
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
        












        