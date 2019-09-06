from .tokenSerializer import MyTokenObtainPairView
from django.conf.urls import url,include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    url(r'^eventmanager/',include('eventmanager.urls',namespace='event')),
    url(r'^accounts/',include('accounts.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/user/',include('accounts.api.urls',namespace='api-user')),
    url(r'^api/event/',include('eventmanager.api.urls',namespace='api-event')),
    url(r'^api/token/$', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^api/token/verify/$', TokenVerifyView.as_view(), name='token_verify'),
]
urlpatterns += staticfiles_urlpatterns()