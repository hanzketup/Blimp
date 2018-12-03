import math
import random
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point

from accounts.models import Account
from .models import Coin
from .serializers import CoinSerializer

GENERATE_RADIUS = 100
GENERATE_MINIMUM = 15
GENERATE_MAXIMUM = 35


class Coinset(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['post'])
    def nearby(self, request):
        point = Point(request.data['position']['coordinates'], srid=4326)
        queryset = Coin.objects.filter(position__distance_lte=(point, D(m=GENERATE_RADIUS)))

        if queryset.count() < GENERATE_MINIMUM:
            random_length = random.randint(GENERATE_MINIMUM, GENERATE_MAXIMUM)  - queryset.count()

            for i in range(random_length):
                y0 = request.data['position']['coordinates'][1]
                x0 = request.data['position']['coordinates'][0]
                u = random.random()
                v = random.random()
                w = GENERATE_RADIUS/111300 * math.sqrt(u)
                t = 2 * math.pi * v
                x = w * math.cos(t)
                y1 = w * math.sin(t)
                x1 = x / math.cos(y0)

                point = Point([(x0 + x1), (y0 + y1)], srid=4326)
                Coin.objects.create(
                    position=point
                )

            queryset = Coin.objects.filter(position__distance_lte=(point, D(m=GENERATE_RADIUS)))
            serializer = CoinSerializer(queryset, many=True)
            return Response(serializer.data)

        else:
            serializer = CoinSerializer(queryset, many=True)
            return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def pickup(self, request, pk=None):
        coin = Coin.objects.get(pk=pk)
        account = Account.objects.get(user=request.user)

        account.coins += coin.reward
        account.save()
        coin.delete()

        return Response(200)
