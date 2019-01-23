from django.apps import apps
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.ModeratorPermission import ModeratorPermission
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point
from datetime import datetime, timedelta

from .tasks import primary_issue_task
from .models import RadarIssue, RadarHit
from .serializers import RadarIssueSerializer

Account = apps.get_model('accounts', 'Account')
HistoricPosition = apps.get_model('accounts', 'HistoricPosition')


class Radarset(viewsets.ViewSet):
    permission_classes = (ModeratorPermission, )

    def nearby(self):
        pass

    @action(detail=False, methods=['post'])
    def issue(self, request):
        serializer = RadarIssueSerializer(data=request.data, context={'user': Account.objects.get(user=request.user)})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        res = primary_issue_task(serializer.data)
        print(res)

        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def check(self, request):
        point = Point(request.data['position']['coordinates'], srid=4326)
        affected_users = set()

        queryset = HistoricPosition.objects.filter(
            position__distance_lte=(point, D(m=request.data['radius'])),
            timestamp__gt=(datetime.now() - timedelta(hours=24))
        )

        for instance in queryset:
            affected_users.add(instance.account.first())

        return Response({'value': len(affected_users)})
