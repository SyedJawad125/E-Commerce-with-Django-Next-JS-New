# Generated by Django 5.1.3 on 2025-06-05 11:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_ecommerce', '0028_alter_product_group'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='producttag',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='producttag_created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='producttag',
            name='updated_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='producttag_updated_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
