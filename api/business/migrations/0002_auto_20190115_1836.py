# Generated by Django 2.1.2 on 2019-01-15 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='radarissue',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
