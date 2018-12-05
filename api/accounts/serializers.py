from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.utils.translation import ugettext as _
from .models import Account, Level
from general.models import Wordfilter


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    level = LevelSerializer(many=False, read_only=True)

    class Meta:
        model = Account
        fields = ('id', 'username', 'avatar', 'coins', 'level', 'distance_traveled')


class CompleteSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=40, validators=[UniqueValidator(queryset=Account.objects.all())])

    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        # signup_complete assures that the user has a username
        # and have accepted our tos & privacy policy
        instance.signup_complete = True
        instance.save()
        return instance

    def validate(self, data):

        if Account.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError(_('Username already exists.'))

        if Wordfilter.objects.filter(word__icontains=data['username']).exists():
            raise serializers.ValidationError(_('Username not allowed.'))

        return data
