# from django.utils import timezone
# from django.contrib.auth import authenticate

# from user_auth.user_serializer import *
# from user_auth.models import Token, User
# from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
# from utils.response_messages import *
# from utils.helper import create_response, paginate_data

import threading
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from e_commerce.settings import EMAIL_HOST_USER
from user_auth.user_serializer import *
from user_auth.models import Token, User
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from utils.response_messages import *
from utils.helper import create_response, paginate_data
from permissions.models import Role, Permission
from rest_framework import status


class ChangePasswordController:
    serializer_class = ChangePasswordSerializer
    def change_password(self,request):
        try:
            user = request.user
            if not user:
                return create_response({},USER_NOT_FOUND, status_code=400)

            serialized_data = self.serializer_class(data=request.data, context={'user':user})

            if serialized_data.is_valid():
                user.set_password(request.data['new_password'])
                user.save()
                return create_response({},PASSWORD_UPDATED, status_code=200)
            else:
                return create_response({},get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400)
        except Exception as e:
            return create_response({'error':str(e)}, UNSUCCESSFUL, 500)

class VerifyOtpController:
    serializer_class = VerifyOtpSerializer
    
    def verify_otp(self,request):
        # check OTP time delay
        time_delay = timezone.now() - timezone.timedelta(seconds=300)
        user = User.objects.filter(otp=request.data.get("otp"), otp_generated_at__gt=time_delay).first()

        if not user:
            return create_response({},INVALID_OTP, status_code=400)

        serialized_data = self.serializer_class(data=request.data, context={'user':user})

        if serialized_data.is_valid():
            user.set_password(request.data['new_password'])
            user.otp = None
            user.save()
            return create_response({},SUCCESSFUL, status_code=200)
        else:
            return create_response({},get_first_error_message(serialized_data.errors,UNSUCCESSFUL), status_code=400)

        
class ForgetPasswordController:
    serializer_class = ForgetPasswordSerializer
    
    def forget_password(self,request):
        serialized_data = self.serializer_class(data=request.data)
        if not serialized_data.is_valid():
            return create_response({},get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400 )
        
        user = User.objects.filter(email=request.data['email']).first()
        if not user:
            return create_response({}, USER_NOT_FOUND, status_code=404)

        otp = generate_six_length_random_number()
        user.otp = otp
        user.otp_generated_at = timezone.now()
        user.save()
        subject = "Password Recovery Request"
        message = f"""
            Hi {user.get_full_name()},
            Your request for password recovery has been received.
            Please use the following otp.
            OTP: {otp}
            """
        recipient_list = [request.data.get("email")]
        t = threading.Thread(target=send_mail, args=(subject, message, EMAIL_HOST_USER, recipient_list))
        t.start()
        return create_response({}, EMAIL_SUCCESSFULLY_SENT, status_code=200)


# class RegisterController:
#     serializer_class = UserSerializer
#     def create(self,request):
#         try:
#             serialized_data = self.serializer_class(data=request.data)
#             if serialized_data.is_valid():
#                 instance = serialized_data.save()
#                 return create_response(self.serializer_class(instance).data, SUCCESSFUL, status_code=200)
#             else:
#                 return create_response({}, get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400)
#         except Exception as e:
#             return create_response({'error':str(e)}, UNSUCCESSFUL, 500)


from .models import Role  # Import the Role model

class RegisterController:
    serializer_class = UserSerializer

    def create(self, request):
        try:
            # Deserialize the request data
            serialized_data = self.serializer_class(data=request.data)
            
            # Check if the serialized data is valid
            if serialized_data.is_valid():
                # Retrieve the Role instance with id 10
                role_instance = Role.objects.get(id=10)
                # role_instance = Role.objects.get(name='client')

                
                # Assign the Role instance to the user's role
                serialized_data.validated_data['role'] = role_instance
                
                # Save the user instance with the role set to the retrieved Role instance
                instance = serialized_data.save()
                
                # Return a successful response with the serialized user data, including the role
                return create_response(self.serializer_class(instance).data, SUCCESSFUL, status_code=200)
            else:
                # Handle validation errors and return a bad request response
                return create_response({}, get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400)
        except Role.DoesNotExist:
            # Handle the case where the Role with id 10 does not exist
            return create_response({'error': 'Role with id 10 does not exist'}, UNSUCCESSFUL, status_code=400)
        except Exception as e:
            # Handle any other exceptions and return a server error response
            return create_response({'error': str(e)}, UNSUCCESSFUL, status_code=500)

    

# class LoginController:   (Last Wala)
#     serializer_class = LoginSerializer

#     def login(self, request):
#         try:
#             # Validate the input data
#             serialized_data = self.serializer_class(data=request.data)
#             if not serialized_data.is_valid():
#                 return create_response({}, get_first_error_message(serialized_data.errors, "Unsuccessful"), 400)

#             # Authenticate the user
#             user = authenticate(username=request.data['username'], password=request.data['password'])
#             if not user:
#                 return create_response({}, message="Incorrect email or password", status_code=400)

#             # Initialize the permissions dictionary
#             permissions_dict = {
#                 "create_employee": False,
#                 "read_employee": False,
#                 "update_employee": False,
#                 "delete_employee": False
#             }

#             # Check if the user is a superuser
#             if user.is_superuser:
#                 # Fetch all permissions and set them to True
#                 all_permissions = Permission.objects.all()
#                 for perm in all_permissions:
#                     if perm.code in permissions_dict:
#                         permissions_dict[perm.code] = True
#             elif user.role:
#                 # Fetch permissions based on the user's role
#                 role_permissions = user.role.permissions.all()
#                 for perm in role_permissions:
#                     if perm.code in permissions_dict:
#                         permissions_dict[perm.code] = True

#             # Prepare the response data
#             response_data = {
#                 "token": user.get_access_token(),
#                 "name": user.get_full_name(),
#                 "username": user.username,
#                 "email": user.email,
#                 "permissions": permissions_dict
#             }

#             # Update or create the user's token
#             Token.objects.update_or_create(defaults={"token": response_data.get("token")}, user_id=user.guid)
            
#             # Reset failed login attempts and update last login time
#             user.failed_login_attempts = 0
#             user.last_failed_time = None
#             user.last_login = timezone.now()
#             user.save()

#             # Return response data including permissions
#             return create_response(response_data, "Successful", status_code=200)
        
#         except Exception as e:
#             return create_response({'error': str(e)}, "Unsuccessful", 500)


class LoginController():
    serializer_class = LoginSerializer

    def login(self, request):
        try:
            # Validate the input data
            serialized_data = self.serializer_class(data=request.data)
            if not serialized_data.is_valid():
                return Response({
                    "message": "Unsuccessful",
                    "errors": serialized_data.errors
                }, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate the user
            user = authenticate(email=request.data['email'], password=request.data['password'])
            if not user:
                return Response({
                    "message": "Incorrect email or password"
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the user is active
            if not user.is_active:
                return Response({
                    "message": "Account is disabled"
                }, status=status.HTTP_403_FORBIDDEN)

            # Initialize the permissions dictionary dynamically
            permissions_dict = {perm.code: False for perm in Permission.objects.all()}

            # Check if the user is a superuser
            if user.is_superuser:
                all_permissions = Permission.objects.all()
                for perm in all_permissions:
                    if perm.code in permissions_dict:
                        permissions_dict[perm.code] = True
            elif user.role:
                # Fetch permissions based on the user's role
                role_permissions = user.role.permissions.all()
                for perm in role_permissions:
                    if perm.code in permissions_dict:
                        permissions_dict[perm.code] = True

            # Prepare the response data
            response_data = {
                "token": user.get_access_token(),
                "name": user.get_full_name(),
                "username": user.username,
                "email": user.email,
                "role": user.role.id if user.role else None,  # Include role ID in the response
                "permissions": permissions_dict  # Ensure permissions are included in the response
            }

            # Update or create the user's token
            Token.objects.update_or_create(defaults={"token": response_data.get("token")}, user_id=user.guid)
            
            # Reset failed login attempts and update last login time
            user.failed_login_attempts = 0
            user.last_failed_time = None
            user.last_login = timezone.now()
            user.save()

            # Return response data including permissions and role ID
            return Response({
                "message": "Successful",
                "data": response_data
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                "message": "Unsuccessful",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# class LoginController:
#     serializer_class = LoginSerializer

#     def login(self, request):
#         try:
#             serialized_data = self.serializer_class(data=request.data)

#             if not serialized_data.is_valid():
#                 return create_response({},get_first_error_message(serialized_data.errors, UNSUCCESSFUL), 400)

#             user = authenticate(username=request.data['username'], password=request.data['password'])
#             if not user:
#                 return create_response({}, message=INCORRECT_EMAIL_OR_PASSWORD, status_code=400)
            
#             permissions = Permission.objects.filter()

#             response_data = {
#                 "token": user.get_access_token(),
#                 "name": user.get_full_name(),
#                 "username":user.username,
#                 "email": user.email,
#                 "permissions": ""
#             }

#             Token.objects.update_or_create(defaults={"token": response_data.get("token")},user_id=user.guid)
#             user.failed_login_attempts = 0
#             user.last_failed_time = None
#             user.last_login = timezone.now()
#             user.save()
#             return create_response(response_data, SUCCESSFUL, status_code=200)
#         except Exception as e:
#             return create_response({'error':str(e)}, UNSUCCESSFUL, 500)
        

class LogoutController:
    def logout(self,request):
        try:
            user = request.user.guid
            token = Token.objects.filter(user=user)
            if not token:
                return create_response({},UNSUCCESSFUL, status_code=400)
            token.delete()
            return create_response({}, SUCCESSFUL, status_code=200)
        except Exception as e:
            return create_response({'error':str(e)}, UNSUCCESSFUL, 500)




from rest_framework.response import Response
from rest_framework import status

class SetThemeController:
    @staticmethod
    def set_theme_preference(request):
        theme = request.data.get('theme', 'dark')

        if theme not in dict(request.user._meta.get_field('theme_preference').choices):
            return Response({'status': 'error', 'message': 'Invalid theme choice'}, status=status.HTTP_400_BAD_REQUEST)

        request.user.theme_preference = theme
        request.user.save()
        return Response({'status': 'success', 'theme': theme})
