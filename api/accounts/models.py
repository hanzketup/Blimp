from django.contrib.gis.db import models
from django.contrib.auth.models import User
from django.contrib.gis.geos import Point


class Level(models.Model):

    id = models.IntegerField(primary_key=True)
    goal = models.IntegerField()

    reward = models.IntegerField()
    # items = models.ManyToManyField('item')

    def __str__(self):
        return 'level ' + str(self.id)


class Account(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=40, blank=True)
    email = models.EmailField()
    age = models.DateField(null=True, blank=True)
    is_moderator = models.BooleanField(default=False)

    google_uid = models.CharField(max_length=200, blank=True)
    google_token = models.CharField(max_length=2000, blank=True)
    facebook_uid = models.CharField(max_length=200, blank=True)
    facebook_token = models.CharField(max_length=500, blank=True)
    signup_complete = models.BooleanField(default=False)
    notification_token = models.CharField(max_length=100, blank=True)

    position = models.PointField(srid=4326, null=True, blank=True)
    position_timestamp = models.DateTimeField(null=True, blank=True)
    position_history = models.ManyToManyField('accounts.HistoricPosition', blank=True, related_name="account")

    avatar = models.IntegerField(default=0)
    coins = models.IntegerField(default=100)
    level = models.ForeignKey(Level, default=1, on_delete=models.SET_DEFAULT)
    distance_traveled = models.IntegerField(default=0)

    blocked = models.BooleanField(default=False)
    note = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.username) + " | " + str(self.email)


class HistoricPosition(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    initial = models.BooleanField()
    background = models.BooleanField(default=False)
    position = models.PointField(srid=4326)

    speed = models.IntegerField(blank=True, null=True)
    accuracy = models.IntegerField(blank=True, null=True)
    altitude = models.IntegerField(blank=True, null=True)
