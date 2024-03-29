from rest_framework import serializers
from rest_framework_gis.serializers import GeometryField

from general.wordFilterValidator import word_filter_validator
from accounts.serializers import AccountSerializer
from .models import Cloud, Vote, Report, TYPE_CHOICES


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('id', 'timestamp', 'user')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('id', 'user')


class CloudSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)
    user = AccountSerializer(many=False, read_only=True)

    type = serializers.ChoiceField(choices=TYPE_CHOICES)
    position = GeometryField()
    body = serializers.CharField(max_length=400, validators=[word_filter_validator])

    code = serializers.CharField(
                required=False,
                allow_null=True,
                allow_blank=True,
                max_length=20,
                validators=[word_filter_validator]
    )
    stars = serializers.IntegerField(required=False, allow_null=True)
    expiry = serializers.IntegerField(required=False, allow_null=True)

    votes = VoteSerializer(many=True, read_only=True)

    def create(self, validated_data):
        instance = Cloud.objects.create(**validated_data, user=self.context['user'])
        instance.save()
        return instance

    class Meta:
        model = Cloud
        exclude = ('visible', )
