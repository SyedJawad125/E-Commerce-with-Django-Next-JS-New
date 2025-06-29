import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'e_commerce.settings')
import django
django.setup()
from permissions.models import Permission

permissions = [
    Permission(name='create_images', code='create_images', description='User can create Images'),
    Permission(name='read_images', code='read_images', description='User can read Images'),
    Permission(name='update_images', code='update_images', description='User can update Images'),
    Permission(name='delete_images', code='delete_images', description='User can delete Images'),

    Permission(name='create_images_category', code='create_images_category', description='User can create Images Category'),
    Permission(name='read_images_category', code='read_images_category', description='User can read Images Category'),
    Permission(name='update_images_category', code='update_images_category', description='User can update Images Category'),
    Permission(name='delete_images_category', code='delete_images_category', description='User can delete Images Category'),
   
    # Permission(name='Create Employee', code='create_employee', module_name='Employee', description='User can create Employee'),
    # Permission(name='Read Employee', code='read_employee', module_name='Employee', description='User can read Employee'),
    # Permission(name='Update Employee', code='update_employee', module_name='Employee', description='User can update Employee'),
    # Permission(name='Delete Employee', code='delete_employee', module_name='Employee', description='User can delete Employee'),
    
    # Permission(name='Create Booking', code='create_booking', module_name='Booking', description='User can create Booking'),
    # Permission(name='Read Booking', code='read_booking', module_name='Booking', description='User can read Booking'),
    # Permission(name='Update Booking', code='update_booking', module_name='Booking', description='User can update Booking'),
    # Permission(name='Delete Booking', code='delete_booking', module_name='Booking', description='User can delete Booking'),

    # Permission(name='Create Images', code='create_images', module_name='Images', description='User can create Images'),
    # Permission(name='Read Images', code='read_images', module_name='Images', description='User can read images'),
    # Permission(name='Update Images', code='update_images', module_name='Images', description='User can update Images'),
    # Permission(name='Delete Images', code='delete_images', module_name='Images', description='User can delete Images'),
]



def add_permission():
    for permission in permissions:
        try:
            Permission.objects.get(code=permission.code)
        except Permission.DoesNotExist:
            permission.save()


if __name__ == '__main__':
    print("Populating hrm...")
    add_permission()