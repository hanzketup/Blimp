# Generated by Django 2.1.2 on 2018-11-12 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20181112_2035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='google_token',
            field=models.CharField(blank=True, max_length=2000),
        ),
    ]