# Generated by Django 2.1.2 on 2019-01-14 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_account_is_moderator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='position_history',
            field=models.ManyToManyField(blank=True, related_name='account', to='accounts.HistoricPosition'),
        ),
    ]
