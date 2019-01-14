from django.apps import apps
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point

Account = apps.get_model('accounts', 'Account')
from .tasks import primary_issue_task
from .models import RadarIssue, RadarHit
from .serializers import RadarIssueSerializer

CLOUD_POLLING_DISTANCE = 100


class Radarset(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self):
        pass

    @action(detail=False, methods=['post'])
    def issue(self, request):
        serializer = RadarIssueSerializer(data=request.data, context={'user': Account.objects.get(user=request.user)})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        primary_issue_task.delay(serializer.data)

        return Response(serializer.data)
