from django.contrib.gis.db import models


class Wordfilter(models.Model):
    word = models.CharField(max_length=100)
    note = models.TextField(blank=True, null=True)


class Coin(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    position = models.PointField(null=True, blank=True)
    reward = models.IntegerField(default=10)
