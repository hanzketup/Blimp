import os
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from clouds import views as cloud_views
from accounts import views as accounts_views

router = routers.DefaultRouter()
router.register(r'clouds', cloud_views.Cloudset, basename='clouds')
router.register(r'messages', cloud_views.Messageset, basename='messages')
router.register(r'accounts', accounts_views.Accountset, basename='accounts')

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/', include(router.urls)),
    path(r'api/auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# Production react app proxy
if os.environ.get("DJANGO_ENV", "development") == "production":
    urlpatterns.insert(
        len(urlpatterns),
        re_path('^.*', TemplateView.as_view(template_name='index.html'))
    )
