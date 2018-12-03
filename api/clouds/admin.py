from django.contrib.gis import admin

from general.GeoAdmin import GeoAdmin


from . import models

admin.site.register(models.Cloud, GeoAdmin)
admin.site.register(models.Vote)
admin.site.register(models.Report)
