from django.contrib.gis.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=40, blank=True)
    email = models.EmailField()

    google_uid = models.CharField(max_length=200, blank=True)
    google_token = models.CharField(max_length=2000, blank=True)
    facebook_uid = models.CharField(max_length=200, blank=True)
    facebook_token = models.CharField(max_length=500, blank=True)
    signup_complete = models.BooleanField(default=False)

    sigPos = models.PointField(null=True, blank=True)

    avatar = models.IntegerField(default=1)
    coins = models.IntegerField(default=0)
    blocked = models.BooleanField(default=False)
    note = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.username + " | " + self.email


class DisallowedUsername(models.Model):
    username = models.CharField(max_length=40, blank=True)

    def __str__(self):
        return self.username
