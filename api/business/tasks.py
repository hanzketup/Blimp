from __future__ import absolute_import
from celery import shared_task
from django.apps import apps
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point
from datetime import datetime, timedelta


@shared_task
def primary_issue_task(issue):
    point = Point(issue['position']['coordinates'], srid=4326)
    Account = apps.get_model('accounts', 'Account')
    HistoricPosition = apps.get_model('accounts', 'HistoricPosition')
    affected_user = set()

    queryset = HistoricPosition.objects.filter(
        position__distance_lte=(point, D(m=issue['radius'])),
        timestamp__gt=(datetime.utcfromtimestamp(int(issue['timestamp'])) - timedelta(hours=24))
    )

    # boil down the queryset to unique users
    for instance in queryset:
        affected_user.add(instance.account.first())

    if issue['do_notify']:
        pass

    return affected_user
