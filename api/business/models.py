from django.contrib.gis.db import models


class RadarIssue(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=True, blank=True)
    title = models.CharField(max_length=80, default='')
    short = models.CharField(max_length=37, default='')
    body = models.TextField(null=True, blank=True)

    position = models.PointField(srid=4326, blank=True)
    radius = models.IntegerField(null=True, blank=True)
    do_notify = models.BooleanField(default=True)
    end_date = models.DateTimeField()

    issued_by = models.ForeignKey('accounts.account', null=True, on_delete=models.SET_NULL)
    issued_for = models.CharField(max_length=200, default='')

    hits = models.ManyToManyField('business.RadarHit')


class RadarHit(models.Model):
    account = models.ForeignKey('accounts.account', on_delete=models.CASCADE)
    notified = models.BooleanField(default=False)

    click_through = models.BooleanField(default=False)
    click_through_timestamp = models.DateTimeField(null=True, blank=True)
    did_complete = models.BooleanField(default=False)
