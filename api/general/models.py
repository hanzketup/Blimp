from django.contrib.gis.db import models


class Wordfilter(models.Model):
    word = models.CharField(max_length=100)
    note = models.TextField(blank=True, null=True)
