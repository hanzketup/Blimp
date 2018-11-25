from django.contrib.gis.db import models

TYPE_CHOICES = (
    ('msg', 'msg'),
    ('deal', 'deal'),
    ('review', 'review'),
    ('warn', 'warn')
)


class Cloud(models.Model):

    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('accounts.account', on_delete=models.SET_NULL, null=True)

    visible = models.BooleanField(default=True)
    type = models.CharField(max_length=12, choices=TYPE_CHOICES)
    position = models.PointField(srid=4326, blank=True)
    body = models.TextField()

    votes = models.ManyToManyField('clouds.vote', blank=True)
    reports = models.ManyToManyField('clouds.report', blank=True)

    def __str__(self):
        return self.type + ' | ' + str(self.timestamp)


class Report(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('accounts.account', on_delete=models.CASCADE)

    def __str__(self):
        return "reported by: " + self.user.username


class Vote(models.Model):
    user = models.ForeignKey('accounts.account', on_delete=models.CASCADE)

    def __str__(self):
        return "vote by: " + self.user.username
