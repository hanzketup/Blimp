# Generated by Django 2.1.2 on 2018-11-11 17:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clouds', '0003_auto_20181111_1753'),
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='userLink',
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]