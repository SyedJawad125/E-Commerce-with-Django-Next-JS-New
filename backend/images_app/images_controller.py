
from django.contrib.auth import authenticate
from images_app.images_filter import CategoriesFilter, ImagesFilter, PublicImagesFilter
from images_app.images_serializers import CategoriesSerializer, ImagesSerializer, PublicImagesSerializer
from images_app.models import Categories, Images
from user_auth.user_serializer import UserSerializer
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from rest_framework.response import Response
from utils.helper import create_response, paginate_data
from utils.response_messages import *

from django.core.paginator import Paginator, EmptyPage
from venv import logger

class ImagesController:
    serializer_class = ImagesSerializer
    filterset_class = ImagesFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = ImagesSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = ImagesSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    
    # def get_images(self, request):
    #     try:
    #         images = None  # Initialize images to None
            
    #        # Check for different query params and filter accordingly
    #         if "category" in request.query_params:
    #             category = request.query_params.get('category')
    #             if category == "Bannerslider":
    #                 images = Images.objects.filter(category='Bannerslider')
    #             # elif category == "bannerimagaeshome":
    #             #     images = Images.objects.filter(category='bannerimagaeshome')
    #             # elif category == "animatedimagaeshome":
    #             #     images = Images.objects.filter(category='animatedimagaeshome')
    #             # elif category == "meetingsandeventshome":
    #             #     images = Images.objects.filter(category='meetingsandeventshome')
    #             # elif category == "featuredamenitieshome":
    #             #     images = Images.objects.filter(category='featuredamenitieshome')
    #             # elif category == "exploretheroomshome":
    #             #     images = Images.objects.filter(category='exploretheroomshome')
    #             # elif category == "gallerysliderhome":
    #             #     images = Images.objects.filter(category='gallerysliderhome')
    #             # elif category == "meetingsroomsgroupshome":
    #             #     images = Images.objects.filter(category='meetingsroomsgroupshome')
    #             else:
    #                 return Response({"error": "Category is wrong"}, status=400)
    #         else:
    #             images = Images.objects.all()

            
    #         # if images is None:
    #         #     return Response({'error': 'No valid query parameter found.'}, status=400)

    #         # Filtering data
    #         filtered_data = self.filterset_class(request.GET, queryset=images)
    #         data = filtered_data.qs

    #         # Pagination
    #         paginated_data, count = paginate_data(data, request)

    #         # Serialize the data
    #         serialized_data = self.serializer_class(paginated_data, many=True).data
    #         response_data = {
    #             "count": count,
    #             "data": serialized_data,
    #         }

    #         # Successful response
    #         return create_response(response_data, "SUCCESSFUL", 200)

    #     except Exception as e:
    #         return Response({'error': str(e)}, status=500)


    def get_images(self, request):
        try:
            images = None  # Initialize images to None
            
            # Check for different query params and filter accordingly
            if "category" in request.query_params:
                category = request.query_params.get('category')
                if category == "Bannerslider":
                    images = Images.objects.filter(category='Bannerslider')
                else:
                    return Response(
                        {
                            "status_code": 400,
                            "message": "Category is wrong",
                            "data": None
                        },
                        status=400
                    )
            else:
                images = Images.objects.all()

            # Filtering data
            filtered_data = self.filterset_class(request.query_params, queryset=images)
            data = filtered_data.qs

            # Get pagination parameters from request
            page = request.query_params.get('page', 1)
            limit = request.query_params.get('limit', 10)  # Default to 10 items per page
            offset = request.query_params.get('offset', 0)
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return Response(
                    {
                        "status_code": 400,
                        "message": "Invalid pagination parameters. Page, limit and offset must be integers.",
                        "data": None
                    },
                    status=400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return Response(
                    {
                        "status_code": 404,
                        "message": "Page not found",
                        "data": None
                    },
                    status=404
                )
            
            # Serialize the data
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "status_code": 200,
                "message": "Successful",
                "data": {
                    "count": paginator.count,
                    "total_pages": paginator.num_pages,
                    "current_page": page,
                    "limit": limit,
                    "offset": offset,
                    "next": paginated_data.has_next(),
                    "previous": paginated_data.has_previous(),
                    "images": serialized_data
                }
            }
            return Response(response_data, status=200)

        except Exception as e:
            import traceback
            logger.error(f"Error fetching images: {str(e)}\n{traceback.format_exc()}")
            return Response({
                "status_code": 500,
                "message": str(e),
                "data": None
            }, status=500)

    def update_images(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Images.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = ImagesSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = ImagesSerializer(response).data
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

    def delete_images(self, request):
        try:
            if "id" in request.query_params:
                instance = Images.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)


class PublicImagesController:
    serializer_class = PublicImagesSerializer
    filterset_class = PublicImagesFilter

    def get_publicimages(self, request):
        try:
            images = None  # Initialize images to None

            # Check for different query params and filter accordingly
            if "category" in request.query_params:
                category = request.query_params.get('category')
                if category == "invitationbgimage":
                    images = Images.objects.filter(category='invitationbgimage')
                elif category == "bannerimagaeshome":
                    images = Images.objects.filter(category='bannerimagaeshome')
                elif category == "animatedimagaeshome":
                    images = Images.objects.filter(category='animatedimagaeshome')
                elif category == "meetingsandeventshome":
                    images = Images.objects.filter(category='meetingsandeventshome')
                elif category == "featuredamenitieshome":
                    images = Images.objects.filter(category='featuredamenitieshome')
                elif category == "exploretheroomshome":
                    images = Images.objects.filter(category='exploretheroomshome')
                elif category == "gallerysliderhome":
                    images = Images.objects.filter(category='gallerysliderhome')
                elif category == "meetingsroomsgroupshome":
                    images = Images.objects.filter(category='meetingsroomsgroupshome')
                else:
                    return Response({"error": "Category is wrong"}, status=400)
            else:
                images = Images.objects.all()

            # if images is None:
            #     return Response({'error': 'No valid query parameter found.'}, status=400)

            # Filtering data
            filtered_data = self.filterset_class(request.GET, queryset=images)
            data = filtered_data.qs

            # Pagination
            paginated_data, count = paginate_data(data, request)

            # Serialize the data
            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }

            # Successful response
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

class CategoriesController:
    serializer_class = CategoriesSerializer
    filterset_class = CategoriesFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = CategoriesSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = CategoriesSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_categories(self, request):
        try:
            # Get all instances
            instances = self.serializer_class.Meta.model.objects.all()
            
            # Apply filters
            filtered_data = self.filterset_class(request.query_params, queryset=instances)
            data = filtered_data.qs
            
            # Get pagination parameters from request
            page = request.query_params.get('page', 1)
            limit = request.query_params.get('limit', 10)  # Default to 10 items per page
            offset = request.query_params.get('offset', 0)
            
            try:
                page = int(page)
                limit = int(limit)
                offset = int(offset)
            except ValueError:
                return Response(
                    {
                        "status_code": 400,
                        "message": "Invalid pagination parameters. Page, limit and offset must be integers.",
                        "data": None
                    },
                    status=400
                )
            
            # Apply offset and limit
            if offset > 0:
                data = data[offset:]
            
            paginator = Paginator(data, limit)
            
            try:
                paginated_data = paginator.page(page)
            except EmptyPage:
                return Response(
                    {
                        "status_code": 404,
                        "message": "Page not found",
                        "data": None
                    },
                    status=404
                )
            
            # Serialize the data
            serialized_data = self.serializer_class(paginated_data, many=True).data
            
            response_data = {
                "status_code": 200,
                "message": "SUCCESSFUL",
                "data": {
                    "count": paginator.count,
                    "total_pages": paginator.num_pages,
                    "current_page": page,
                    "limit": limit,
                    "offset": offset,
                    "next": paginated_data.has_next(),
                    "previous": paginated_data.has_previous(),
                    "categories": serialized_data
                }
            }
            return Response(response_data, status=200)

        except Exception as e:
            import traceback
            logger.error(f"Error fetching categories: {str(e)}\n{traceback.format_exc()}")
            return Response({
                "status_code": 500,
                "message": str(e),
                "data": None
            }, status=500)

    def update_categories(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Categories.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = CategoriesSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = CategoriesSerializer(response).data
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

    def delete_categories(self, request):
        try:
            if "id" in request.query_params:
                instance = Categories.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)