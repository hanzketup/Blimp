from __future__ import absolute_import
from celery import shared_task
from django.apps import apps
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point
from datetime import datetime, timedelta

from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage

@shared_task
def primary_issue_task(issue):
    Account = apps.get_model('accounts', 'Account')
    HistoricPosition = apps.get_model('accounts', 'HistoricPosition')
    RadarIssue = apps.get_model('business', 'RadarIssue')
    RadarHit = apps.get_model('business', 'RadarHit')

    point = Point(issue['position']['coordinates'], srid=4326)
    issue_acutal = RadarIssue.objects.get(pk=issue.id)
    affected_users = set()

    queryset = HistoricPosition.objects.filter(
        position__distance_lte=(point, D(m=issue['radius'])),
        timestamp__gt=(datetime.utcfromtimestamp(int(issue['timestamp'])) - timedelta(hours=24))
    )

    # boil down the queryset to unique users
    for instance in queryset:
        affected_users.add(instance.account.first())

    # Iterate over found users
    for user in affected_users:
        # create a RadarHit object for each user
        new_hit = RadarHit.objects.create(
            account=user
        )

        issue_acutal.hits.add(new_hit)
        issue_acutal.save()

        # If the issue includes sending push notifications
        if issue['do_notify']:
            # Make sure that the user has a expo notification token stored
            if user.notification_token:
                try:
                    response = PushClient().publish(
                        PushMessage(
                            to=user.notification_token,
                            title=issue['title'],
                            body=issue['short'],
                        ))
                    new_hit.notified = response.ok
                    print(response)
                except:
                    pass


    return affected_users
