from django.shortcuts import render
from permissions.decorator import permission_required
from . models import Product
from django.shortcuts import render,HttpResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
#from .blog_serializer import BlogSerializer
from utils.base_authentication import JWTAuthentication
from .my_ecommerce_controller import CategoryController, CategorySearchController, ContactController, \
    DropDownListCategoryController, EmployeeController, ProductController, OrderController, ProductTagController, \
    CategorySearchController, PublicOrderController, PublicReviewController, PublicSalesproductController, \
    PubliccategorywiseController, \
    PublicproductController, PubliccategoryController, ReviewController, SalesProductController, \
    SlidercategoryController, SliderproductController, DropDownListProductController, DropDownListSalesProductController

# from rest_framework.permissions import IsAdminUser
# Create your views here.


product_controller = ProductController()
salesproduct_controller = SalesProductController()
publicproduct_controller = PublicproductController()
dropdownlistproduct_controller = DropDownListProductController()
publicsalesproduct_controller = PublicSalesproductController()
dropdownlistsalesproduct_controller = DropDownListSalesProductController()
sliderproduct_controller = SliderproductController()
category_controller = CategoryController()
publiccategory_controller = PubliccategoryController()
dropdownlistcategory_controller = DropDownListCategoryController()
slidercategory_controller = SlidercategoryController()
order_controller = OrderController()
publicorder_controller = PublicOrderController()
producttag_controller = ProductTagController()
contact_controller = ContactController()
employee_controller = EmployeeController()
review_controller = ReviewController()
publicreview_controller = PublicReviewController()
categorysearch_controller = CategorySearchController()
publiccategorywise_controller = PubliccategorywiseController()





class ProductViews(ModelViewSet):

    authentication_classes = [JWTAuthentication]
    
    @permission_required(['create_product'])
    def post_product(self, request):
        return product_controller.create(request)
    
    @permission_required(['read_product'])
    def get_product(self, request):
        return product_controller.get_product(request)
    
    @permission_required(['update_product'])
    def update_product(self, request):
        return product_controller.update_product(request)
    
    @permission_required(['delete_product'])
    def delete_product(self, request):
        return product_controller.delete_product(request)

# class ProductImageViews(ModelViewSet):

#     # authentication_classes = [JWTAuthentication]
    
#     # @permission_required(['create_product'])
#     def post_productimage(self, request):
#         return productimage_controller.create(request)
    
#     # @permission_required(['read_product'])
#     def get_productimage(self, request):
#         return productimage_controller.get_productimage(request)
    
#     # @permission_required(['update_product'])
#     def update_productimage(self, request):
#         return productimage_controller.update_productimage(request)
    
#     # @permission_required(['delete_product'])
#     def delete_productimage(self, request):
#         return productimage_controller.delete_productimage(request)
    
class PublicproductViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    def get_publicproduct(self, request):
        return publicproduct_controller.get_publicproduct(request)

class SliderproductViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    def get_sliderproduct(self, request):
        return sliderproduct_controller.get_sliderproduct(request)

class DropDownListProductViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    def get_dropdownlistproduct(self, request):
        return dropdownlistproduct_controller.get_dropdownlistproduct(request)
class SalesProductViews(ModelViewSet):

    authentication_classes = [JWTAuthentication]
    
    # @permission_required(['create_saleproduct'])
    def post_salesproduct(self, request):
        return salesproduct_controller.create(request)
    
    # @permission_required(['read_saleproduct'])
    def get_salesproduct(self, request):
        return salesproduct_controller.get_salesproduct(request)
    
    # @permission_required(['update_saleproduct'])
    def update_salesproduct(self, request):
        return salesproduct_controller.update_salesproduct(request)
    
    # @permission_required(['delete_saleproduct'])
    def delete_salesproduct(self, request):
        return salesproduct_controller.delete_salesproduct(request)


class PublicSalesProductViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    def get_publicsalesproduct(self, request):
        return publicsalesproduct_controller.get_publicsalesproduct(request)
    
class DropDownListSalesProductViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    def get_dropdownlistsalesproduct(self, request):
        return dropdownlistsalesproduct_controller.get_dropdownlistsalesproduct(request)

class CategoryViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    @permission_required(['create_category'])
    def post_category(self, request):
        return category_controller.create(request)
    
    @permission_required(['read_category'])
    def get_category(self, request):
        return category_controller.get_category(request)
    
    @permission_required(['update_category'])
    def update_category(self, request):
        return category_controller.update_category(request)
    
    @permission_required(['delete_category'])
    def delete_category(self, request):
        return category_controller.delete_category(request)
    

class ProductTagViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    # @permission_required(['create_producttag'])
    def post_producttag(self, request):
        return producttag_controller.create(request)
    
    # @permission_required(['read_producttag'])
    def get_producttag(self, request):
        return producttag_controller.get_producttag(request)
    
    # @permission_required(['update_producttag'])
    def update_producttag(self, request):
        return producttag_controller.update_producttag(request)
    
    # @permission_required(['delete_producttag'])
    def delete_producttag(self, request):
        return producttag_controller.delete_producttag(request)


class PubliccategoryViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    def get_publiccategory(self, request):
        return publiccategory_controller.get_publiccategory(request)
    
class PubliccategoryWiseViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    def get_publiccategorywise(self, request, pk=None):
        return publiccategorywise_controller.get_publiccategorywise(request, pk)
    
class DropDownListCategoryViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    def get_dropdownlistcategory(self, request):
        return dropdownlistcategory_controller.get_dropdownlistcategory(request)

class SlidercategoryViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    def get_slidercategory(self, request):
        return slidercategory_controller.get_slidercategory(request)
    
    
class OrderViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_order(self, request):
        # Check if this is a checkout request
        if 'cart_items' in request.data:
            return order_controller.checkout(request)
        return order_controller.create(request)

    def get_order(self, request):
        return order_controller.get_order(request)

    def update_order(self, request):
        return order_controller.update_order(request)

    def delete_order(self, request):
        return order_controller.delete_order(request)
    
# class PublicOrderViews(ModelViewSet):

#     def post_publicorder(self, request):
#         # Check if this is a checkout request
#         if 'cart_items' in request.data:
#             return publicorder_controller.checkout(request)
#         return publicorder_controller.create_order_with_products(request)



class PublicOrderViews(ModelViewSet):
    
    def create(self, request, *args, **kwargs):
        """
        Unified order creation endpoint that handles:
        - Regular products
        - Sales products
        - Mixed orders
        - Checkout flow
        """
        if 'cart_items' in request.data:
            return publicorder_controller.checkout(request)
        elif 'items' in request.data and any(item.get('product_type') for item in request.data.get('items', [])):
            return publicorder_controller.create_mixed_order(request)
        else:
            return publicorder_controller.create_order_with_products(request)


class ContactViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]

    def post_contact(self, request):
        return contact_controller.create(request)

    def get_contact(self, request):
        return contact_controller.get_contact(request)

    def update_contact(self, request):
        return contact_controller.update_contact(request)

    def delete_contact(self, request):
        return contact_controller.delete_contact(request)
    



class EmployeeViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    @permission_required(['create_employee'])
    def post_employee(self, request):
        return employee_controller.create(request)
    
    @permission_required(['read_employee'])
    def get_employee(self, request):
        return employee_controller.get_employee(request)

    @permission_required(['update_employee'])
    def update_employee(self, request):
        return employee_controller.update_employee(request)

    @permission_required(['delete_employee'])
    def delete_employee(self, request):
        return employee_controller.delete_employee(request)


class ReviewViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    @permission_required(['create_reviews'])
    def post_review(self, request):
        return review_controller.create(request)
    
    @permission_required(['read_reviews'])
    def get_review(self, request):
        return review_controller.get_review(request)
    
    @permission_required(['update_reviews'])
    def update_review(self, request):
        return review_controller.update_review(request)
    
    @permission_required(['delete_reviews'])
    def delete_review(self, request):
        return review_controller.delete_review(request)
    

class PubliceReviewViews(ModelViewSet):
    # authentication_classes = [JWTAuthentication]

    def post_publicreview(self, request):
        return publicreview_controller.create(request)
    
    def get_publicreview(self, request):
        return publicreview_controller.get_publicreview(request)
    
    def get_publicreview_by_id(self, request, pk=None):
        return publicreview_controller.get_publicreview_by_id(request, pk)

from rest_framework.viewsets import ViewSet
from .my_ecommerce_controller import CategorySearchController
class CategorySearchViews(ViewSet):  # Changed from ModelViewSet to ViewSet
    controller = CategorySearchController()
    
    def list(self, request):  # This will handle GET /categorysearch/
        return self.controller.get_categorysearch(request)
    
    def suggestions(self, request):  # This will handle GET /categorysearch/suggestions/
        return self.controller.get_suggestions(request)



