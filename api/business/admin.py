from django.contrib.gis import admin

from general.GeoAdmin import GeoAdmin


from . import models

admin.site.register(models.RadarIssue, GeoAdmin)
admin.site.register(models.RadarHit)