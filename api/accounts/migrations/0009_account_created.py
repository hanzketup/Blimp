# Generated by Django 2.1.2 on 2018-11-13 21:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_remove_account_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
