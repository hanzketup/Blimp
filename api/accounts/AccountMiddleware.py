from django.apps import apps


class AccountMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        Account = apps.get_model('accounts', 'Account')
        response = self.get_response(request)
        query = Account.objects.filter(user=request.user)

        # attach the users account to the response if found
        if query.exists():
            response.account = query.first()

        return response
