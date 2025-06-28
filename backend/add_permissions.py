# import os
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'e_commerce.settings')
# import django
# django.setup()
# from permissions.models import Permission

# permissions = [
    # Permission(name='Create Role', code='create_role', module_name='Role', description='User can create role'),
    # Permission(name='Read Role', code='read_role', module_name='Role', description='User can read role'),
    # Permission(name='Update Role', code='update_role', module_name='Role', description='User can update role'),
    # Permission(name='Delete Role', code='delete_role', module_name='Role', description='User can delete role'),

    # Permission(name='Create Room', code='create_room', module_name='Room', description='User can create Room'),
    # Permission(name='Read Room', code='read_room', module_name='Room', description='User can read Room'),
    # Permission(name='Update Room', code='update_room', module_name='Room', description='User can update Room'),
    # Permission(name='Delete Room', code='delete_room', module_name='Room', description='User can delete Room'),
   
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
# ]



# def add_permission():
#     for permission in permissions:
#         try:
#             Permission.objects.get(code=permission.code)
#         except Permission.DoesNotExist:
#             permission.save()


# if __name__ == '__main__':
#     print("Populating hrm...")
#     add_permission()