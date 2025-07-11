from django.urls import path
from .views import CategorySearchViews, CategoryViews, ContactViews, PublicContactViews, EmployeeViews, CategorySearchViews, \
    ProductTagViews, ProductViews, OrderViews, PublicContactViews, PublicOrderViews, PublicSalesProductViews, PubliccategoryWiseViews, \
    PubliceReviewViews, \
    PublicproductViews, PubliccategoryViews, ReviewViews, SalesProductViews, \
    SlidercategoryViews, SliderproductViews, EmployeeViews, DropDownListCategoryViews, DropDownListProductViews, \
    DropDownListSalesProductViews, TextBoxOrderViews

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('product', ProductViews.as_view({"get": "get_product",
                                          "post": "post_product",
                                          "patch": "update_product",
                                          "delete": "delete_product"})),

    path('publicproduct', PublicproductViews.as_view({"get": "get_publicproduct"})),

    path('sliderproduct', SliderproductViews.as_view({"get": "get_sliderproduct"})),
    path('dropdownlistproduct', DropDownListProductViews.as_view({"get": "get_dropdownlistproduct"})),

    path('salesproduct', SalesProductViews.as_view({"get": "get_salesproduct",
                                          "post": "post_salesproduct",
                                          "patch": "update_salesproduct",
                                          "delete": "delete_salesproduct"})),

    path('publicsalesproduct', PublicSalesProductViews.as_view({"get": "get_publicsalesproduct"})),
    path('dropdownlistsalesproduct', DropDownListSalesProductViews.as_view({"get": "get_dropdownlistsalesproduct"})),

    path('category', CategoryViews.as_view({"get": "get_category",
                                                "post": "post_category",
                                                "patch": "update_category",
                                                "delete": "delete_category"})),

    path('publiccategory', PubliccategoryViews.as_view({"get": "get_publiccategory"})),

    path('publiccategorywise/<int:pk>/', PubliccategoryWiseViews.as_view({"get": "get_publiccategorywise"})),
    
    path('dropdownlistcategory', DropDownListCategoryViews.as_view({"get": "get_dropdownlistcategory"})),

    path('slidercategory', SlidercategoryViews.as_view({"get": "get_slidercategory"})),

    path('producttag', ProductTagViews.as_view({"get": "get_producttag",
                                                "post": "post_producttag",
                                                "patch": "update_producttag",
                                                "delete": "delete_producttag"})), 

    path('order', OrderViews.as_view({"get": "get_order",
                                                "post": "post_order",
                                                "patch": "update_order",
                                                "delete": "delete_order"})),

    path('textbox_order', TextBoxOrderViews.as_view({"get": "get_textboxorder"})),     

    path('publicorder', PublicOrderViews.as_view({'post': 'create'}), name='public-order'),

    path('contact', ContactViews.as_view({"get": "get_contact", "delete": "delete_contact" })),
    
    path('publiccontact', PublicContactViews.as_view({"get": "get_publiccontact", "post": "post_publiccontact"})),
    

    path('employee', EmployeeViews.as_view({"get": "get_employee",
                                                "post": "post_employee",
                                                "patch": "update_employee",
                                                "delete": "delete_employee"})),

    path('review', ReviewViews.as_view({"get": "get_review",
                                                "post": "post_review",
                                                "patch": "update_review",
                                                "delete": "delete_review"})),

    # path('publicreview', PubliceReviewViews.as_view({"get": "get_publicreview",
    #                                             "post": "post_publicreview"})),

    path('publicreview', PubliceReviewViews.as_view({"get": "get_publicreview", "post": "post_publicreview"})),
    # path('publicreview/<int:pk>/', PubliceReviewViews.as_view({"get": "get_publicreview_by_id"})),


    path('categorysearch/', CategorySearchViews.as_view({'get': 'list'}), name='category-search'),

    path('categorysearch/suggestions/', CategorySearchViews.as_view({'get': 'suggestions'}), name='category-suggestions'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)





    # path('publicreview/<int:pk>/', PubliceReviewViews.as_view({"get": "get_publiccategorywise"})),
