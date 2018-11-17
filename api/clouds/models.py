from django.contrib.gis.db import models

TYPE_CHOICES = (
    ('msg', 'msg'),
    ('deal', 'deal'),
    ('review', 'review'),
    ('warn', 'warn')
)


class Cloud(models.Model):

    created_timestamp = models.DateTimeField(auto_now_add=True)
    created_user = models.ForeignKey('accounts.account', on_delete=models.SET_NULL, null=True)

    visible = models.BooleanField(default=True)
    type = models.CharField(max_length=12, choices=TYPE_CHOICES)
    position = models.PointField(srid=4326, blank=True)
    visits = models.IntegerField(default=0)

    messages = models.ManyToManyField('clouds.message')

    def __str__(self):
        return self.type + ' | ' + str(self.created_timestamp)


class Message(models.Model):
    user = models.ForeignKey('accounts.account', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    body = models.TextField()

    votes = models.ManyToManyField('clouds.vote', blank=True)
    reports = models.ManyToManyField('clouds.report', blank=True)

    def __str__(self):
        return "By " + self.user.username + " on " + str(self.timestamp)


class Report(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('accounts.account', on_delete=models.CASCADE)

    def __str__(self):
        return "reported by: " + self.user.username


class Vote(models.Model):
    type = models.CharField(max_length=12, choices=(('up', 'up'), ('down', 'down')))
    user = models.ForeignKey('accounts.account', on_delete=models.CASCADE)

    def __str__(self):
        return self.type + "vote by: " + self.user.username