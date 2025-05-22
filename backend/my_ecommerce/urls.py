from django.urls import path
from .views import CategoryViews, ContactViews, EmployeeViews, ProductViews, OrderViews, PublicSalesProductViews, PublicproductViews, PubliccategoryViews, SalesProductViews, \
    SlidercategoryViews, SliderproductViews,EmployeeViews

urlpatterns = [
    path('product', ProductViews.as_view({"get": "get_product",
                                          "post": "post_product",
                                          "patch": "update_product",
                                          "delete": "delete_product"})),

    path('publicproduct', PublicproductViews.as_view({"get": "get_publicproduct"})),

    path('sliderproduct', SliderproductViews.as_view({"get": "get_sliderproduct"})),

    path('salesproduct', SalesProductViews.as_view({"get": "get_salesproduct",
                                          "post": "post_salesproduct",
                                          "patch": "update_salesproduct",
                                          "delete": "delete_salesproduct"})),

    path('publicsalesproduct', PublicSalesProductViews.as_view({"get": "get_publicsalesproduct"})),

    path('category', CategoryViews.as_view({"get": "get_category",
                                                "post": "post_category",
                                                "patch": "update_category",
                                                "delete": "delete_category"})),

    path('publiccategory', PubliccategoryViews.as_view({"get": "get_publiccategory"})),


    path('slidercategory', SlidercategoryViews.as_view({"get": "get_slidercategory"})),
    

    path('order', OrderViews.as_view({"get": "get_order",
                                                "post": "post_order",
                                                "patch": "update_order",
                                                "delete": "delete_order"})),
                                                
    path('contact', ContactViews.as_view({"get": "get_contact",
                                                "post": "post_contact",
                                                "patch": "update_contact",
                                                "delete": "delete_contact"})),
    

    path('employee', EmployeeViews.as_view({"get": "get_employee",
                                                "post": "post_employee",
                                                "patch": "update_employee",
                                                "delete": "delete_employee"})),

]