import requests
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from google.oauth2 import id_token
from google.auth.transport import requests as g_requests

from .serializers import AccountSerializer, CompleteSerializer
from .models import Account


# helper function to serialize login user and access token
def token_account_helper(account, token):
    serializer = AccountSerializer(account)
    return {
        'account': serializer.data,
        'token': token
    }


class Accountset(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @action(detail=False, methods=['post'])
    def complete_signup(self, request):
        queryset = Account.objects.filter(user__pk=request.user.pk)

        if queryset.exists():
            serializer = CompleteSerializer(queryset[0], data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        else:
            return Response(status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def auth_google(self, request):

        idinfo = id_token.verify_oauth2_token(request.data['token'], g_requests.Request())

        # make sure that the token is issued by google
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # return token if user already exists
        if Account.objects.filter(google_uid=idinfo['sub']).exists():
            account = Account.objects.get(google_uid=idinfo['sub'])
            token, created = Token.objects.get_or_create(user=account.user)
            return Response(
                token_account_helper(account=account, token=token.key)
            )

        # create a new user & account and return a fresh Token
        else:
            new_account = Account.objects.create(
                user=User.objects.create(username=idinfo['sub']),
                email=idinfo['email'],
                google_uid=idinfo['sub'],
                google_token=request.data['token']
            )

            token = Token.objects.create(user=new_account.user)
            return Response(
                token_account_helper(account=new_account, token=token.key)
            )

    @action(detail=False, methods=['post'])
    def auth_facebook(self, request):
        # fetch users email and assure that our fb issued token works
        resp = requests.get(
            'https://graph.facebook.com/me?fields=name,email&access_token={}'.format(
                request.data['token']
            )
        )

        if not resp.status_code == 200:
            return Response(status.HTTP_400_BAD_REQUEST)

        resp_json = resp.json()
        # return token if user already exists
        if Account.objects.filter(facebook_uid=resp_json['id']).exists():
            account = Account.objects.get(facebook_uid=resp_json['id'])
            token, created = Token.objects.get_or_create(user=account.user)
            return Response(
                token_account_helper(account=account, token=token.key)
            )

        # create a new user & account and return a fresh Token
        else:
            new_account = Account.objects.create(
                user=User.objects.create(username=resp_json['id']),
                email=resp_json['email'],
                facebook_uid=resp_json['id'],
                facebook_token=request.data['token']
            )

            token = Token.objects.create(user=new_account.user)
            return Response(
                token_account_helper(account=new_account, token=token.key)
            )
