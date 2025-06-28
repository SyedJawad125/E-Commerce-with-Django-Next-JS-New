# import os
# import django
# # Set the Django settings module environment variable
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'e_commerce.settings')
# # Set up Django
# django.setup()
# # Import get_user_model to dynamically get the user model
# from django.contrib.auth import get_user_model

# User = get_user_model()

# def populate():
#     try:
#         # Check if the superuser already exists
#         s_user = User.objects.get(username='adminuser')
#         print('Superuser already exists.')
#     except User.DoesNotExist:
#         # If the superuser does not exist, create one
#         s_user = User.objects.create_superuser(
#             username='adminuser',
#             email='nicenick1992@gmail.com',
#             password='nicenick2025'
#         )
#         print('Superuser created successfully.')

# if __name__ == '__main__':
#     populate()



# import os
# import django
# from django.core.exceptions import ImproperlyConfigured

# # Set the Django settings module environment variable
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'e_commerce.settings')

# # Set up Django
# try:
#     django.setup()
# except ImproperlyConfigured as e:
#     print(f"Error setting up Django: {e}")
#     raise

# from django.contrib.auth import get_user_model

# User = get_user_model()

# def populate(username='adminuser', email='nicenick1992@gmail.com', password='nicenick2025'):
#     try:
#         # Check if the superuser already exists
#         s_user = User.objects.get(username=username)
#         print(f'User {username} already exists.')
#     except User.DoesNotExist:
#         try:
#             # If the superuser does not exist, create one
#             s_user = User.objects.create_superuser(
#                 username=username,
#                 email=email,
#                 password=password
#             )
#             print(f'Superuser {username} created successfully.')
#         except Exception as e:
#             print(f'Error creating superuser: {e}')
#             raise

# if __name__ == '__main__':
#     populate()