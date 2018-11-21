from rest_framework import serializers
from .models import Cloud, TYPE_CHOICES
from rest_framework_gis.serializers import GeometryField

from accounts.serializers import AccountSerializer
from .models import Cloud, Message, Vote, Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('id', 'timestamp', 'user')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('id', 'user', 'type')


class MessageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = AccountSerializer(many=False, read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)
    body = serializers.CharField(max_length=400)
    votes = VoteSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        exclude = ('reports', )

    def create(self, validated_data):
        instance = Message.objects.create(**validated_data, user=self.context['user'])
        # Posting user implicitly upvotes their own comment
        instance.votes.add(Vote.objects.create(user=self.context['user'], type='up'))
        instance.save()
        return instance


class CloudSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    type = serializers.ChoiceField(choices=TYPE_CHOICES)
    position = GeometryField()
    messages = MessageSerializer(many=True, read_only=False)

    def create(self, validated_data):
        # create first message if present
        if validated_data['messages'][0]:
            message = MessageSerializer(data=validated_data['messages'][0], context={'user': self.context['user']})
            message.is_valid()
            message.save()
        # pop off the messages before creating the cloud (m2m constraint)
        validated_data.pop('messages')
        instance = Cloud.objects.create(**validated_data, created_user=self.context['user'])
        instance.messages.add(message.data['id'])
        instance.save()
        return instance

    class Meta:
        model = Cloud
        exclude = ('visible', )
