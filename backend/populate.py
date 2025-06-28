import os
import django
# Set the Django settings module environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'e_commerce.settings')
# Set up Django
django.setup()
# Import get_user_model to dynamically get the user model
from django.contrib.auth import get_user_model

User = get_user_model()

def populate():
    try:
        # Check if the superuser already exists
        s_user = User.objects.get(username='adminuser')
        print('Superuser already exists.')
    except User.DoesNotExist:
        # If the superuser does not exist, create one
        s_user = User.objects.create_superuser(
            username='adminuser',
            email='nicenick1992@gmail.com',
            password='nicenick2025'
        )
        print('Superuser created successfully.')

if __name__ == '__main__':
    populate()



