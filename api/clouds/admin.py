from django.contrib import admin

from . import models

admin.site.register(models.Cloud)
admin.site.register(models.Vote)
admin.site.register(models.Report)
