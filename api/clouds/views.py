from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point

from clouds.serializers import CloudSerializer, ReportSerializer, VoteSerializer
from accounts.models import Account
from .models import Cloud, Vote


class Cloudset(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = CloudSerializer(data=request.data, context={'user': Account.objects.get(user=request.user)})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def nearby(self, request):
        point = Point(request.data['position']['coordinates'], srid=4326)

        if point:
            queryset = Cloud.objects.filter(position__distance_lte=(point, D(km=20)), visible=True)
            serializer = CloudSerializer(queryset, many=True)
            return Response(serializer.data)

        else:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):

        queryset = Cloud.objects.filter(pk=pk)
        if queryset.exists():

            previous_vote = queryset.first().votes.filter(user=Account.objects.get(user=request.user).pk)
            if not previous_vote.exists():
                serializer = VoteSerializer(data={
                    'user': Account.objects.get(user=request.user).pk,
                })
                serializer.is_valid(raise_exception=True)
                serializer.save()

                queryset.first().votes.add(serializer.data['id'])
                queryset.first().save()

                return Response(status=status.HTTP_201_CREATED)

            else:
                previous_vote.delete()
                return Response(status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    @action(detail=True, methods=['post'])
    def report(self, request, pk=None):
        serializer = ReportSerializer(data={'user': Account.objects.get(user=request.user).pk})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        queryset = Cloud.objects.filter(pk=pk)
        if queryset.exists():
            queryset.first().reports.add(serializer.data['id'])
            queryset.first().save()
            return Response(status=status.HTTP_201_CREATED)

        else:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
