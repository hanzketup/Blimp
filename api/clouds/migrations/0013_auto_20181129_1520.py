# Generated by Django 2.1.2 on 2018-11-29 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clouds', '0012_auto_20181128_1144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cloud',
            name='expiry',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
