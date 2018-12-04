from django.contrib import admin
from general.GeoAdmin import GeoAdmin

from . import models

admin.site.register(models.Account, GeoAdmin)
admin.site.register(models.Level)
