from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from general.wordFilterValidator import word_filter_validator
from .models import Account, Level


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=False, read_only=True)
    notification_token = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = Account
        fields = ('id', 'username', 'is_moderator', 'avatar', 'coins', 'level', 'distance_traveled', 'notification_token')


class CompleteSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=40, validators=[
        UniqueValidator(queryset=Account.objects.all()),
        word_filter_validator
    ])

    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        # signup_complete assures that the user has a username
        # and have accepted our tos & privacy policy
        instance.signup_complete = True
        instance.save()
        return instance

