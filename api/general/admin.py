from django.contrib.gis import admin

from general.GeoAdmin import GeoAdmin

from .models import Wordfilter, Coin


admin.site.register(Wordfilter)
admin.site.register(Coin, GeoAdmin)
