from __future__ import absolute_import
from celery import shared_task
from django.apps import apps
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point
from datetime import datetime, timedelta
from django.utils import timezone

Account = apps.get_model('accounts', 'Account')
HistoricPosition = apps.get_model('accounts', 'HistoricPosition')


@shared_task
def primary_issue_task(issue):
    affected_user = {}

    queryset = HistoricPosition.objects.filter(
        position__distance_lte=(issue.position, D(m=issue.radius)),
        timestamp__gt=(issue.timestamp - timedelta(hours=24))
    )

    # boil down the queryset to unique users
    for instance in queryset:
        print(instance.account.all())

    if issue.do_notify():
        pass

    return 0
