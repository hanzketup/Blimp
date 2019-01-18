from rest_framework import serializers
from rest_framework_gis.serializers import GeometryField

from general.wordFilterValidator import word_filter_validator
from accounts.serializers import AccountSerializer
from .models import RadarIssue, RadarHit


class RadarIssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = RadarIssue
        exclude = ('issued_by', 'issued_for', 'hits')
