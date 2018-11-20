from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Account, DisallowedUsername


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'avatar', 'coins')


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
            raise serializers.ValidationError()

        if DisallowedUsername.objects.filter(username__icontains=data['username']).exists():
            raise serializers.ValidationError()

        return data
