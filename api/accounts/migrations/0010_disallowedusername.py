# Generated by Django 2.1.2 on 2018-11-19 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_account_created'),
    ]

    operations = [
        migrations.CreateModel(
            name='DisallowedUsername',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=40)),
            ],
        ),
    ]