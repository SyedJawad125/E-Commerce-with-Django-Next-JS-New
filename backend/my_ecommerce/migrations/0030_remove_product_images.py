# Generated by Django 5.1.3 on 2025-06-05 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('my_ecommerce', '0029_producttag_created_by_producttag_updated_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='images',
        ),
    ]
