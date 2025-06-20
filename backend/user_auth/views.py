from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from utils.base_authentication import JWTAuthentication
from user_auth.user_controller import *


register_controller = RegisterController()
login_controller = LoginController()
logout_controller = LogoutController()
forget_password_controller = ForgetPasswordController()
verify_otp_controller = VerifyOtpController()
change_password_controller = ChangePasswordController()


class RegisterAPIView(ModelViewSet):
    def create(self, request):
        return register_controller.create(request)


class LoginAPIView(ModelViewSet):
    def login(self,request):
        return login_controller.login(request)
    
class LogoutAPIView(ModelViewSet):
    authentication_classes = (JWTAuthentication,)
    
    def logout(self,request):
        return logout_controller.logout(request)
    
class ChangePasswordAPIView(ModelViewSet):
    
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def post(self,request):
        return change_password_controller.change_password(request)


class VerifyOtpAPIView(ModelViewSet):
    def post(self,request):
        return verify_otp_controller.verify_otp(request)

class ForgetPasswordAPIView(ModelViewSet):
    def post(self,request):
        return forget_password_controller.forget_password(request)


# from django.http import JsonResponse
# from django.views.decorators.http import require_POST
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# @require_POST
# def set_theme_preference(request):
#     if request.user.is_authenticated:
#         theme_pref = request.POST.get('theme', 'light')
#         request.user.profile.theme_preference = theme_pref
#         request.user.profile.save()
#         return JsonResponse({'status': 'success'})
#     return JsonResponse({'status': 'error'}, status=401)


# @csrf_exempt
# def get_theme_preference(request):
#     if request.user.is_authenticated:
#         return JsonResponse({'theme': request.user.profile.theme_preference})
#     return JsonResponse({'theme': 'dark'})  # Default for anonymous users

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

@require_POST
@login_required
def set_theme_preference(request):
    theme = request.POST.get('theme', 'dark')
    if theme not in dict(request.user._meta.get_field('theme_preference').choices):
        return JsonResponse({'status': 'error', 'message': 'Invalid theme choice'}, status=400)

    request.user.theme_preference = theme
    request.user.save()
    return JsonResponse({'status': 'success', 'theme': theme})