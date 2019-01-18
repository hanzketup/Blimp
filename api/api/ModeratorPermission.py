from rest_framework import permissions
from django.apps import apps


class ModeratorPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        Account = apps.get_model('accounts', 'Account')
        return Account.objects.get(user=request.user).is_moderator
