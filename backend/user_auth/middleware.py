# middleware.py
class ThemeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if request.user.is_authenticated:
            theme = request.user.theme_preference
            response.set_cookie('user_theme', theme)
        
        return response