from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from .models import Wordfilter


def word_filter_validator(value):
    for i in Wordfilter.objects.all():
        if i.word in value:
            raise serializers.ValidationError(_('Your submitted message violates blimps community guidelines.'))
