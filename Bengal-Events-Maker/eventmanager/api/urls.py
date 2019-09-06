from django.conf.urls import url
from .views import (
   EventlistAPIView,
   EventDetailAPIView,
   EventCreateAPIView,
   RegistrationDataAPIView,
   RegisteredUserAPIView
)

urlpatterns = [
    url(r'^$',EventlistAPIView.as_view(),name='index'),
    url(r'^create/$',EventCreateAPIView.as_view(),name='event-create'),
    url(r'^register/$',RegistrationDataAPIView.as_view(),name='Register'),
    url(r'^register/(?P<id>[\w-]+)/$',RegisteredUserAPIView.as_view(),name='registerlist'),
    url(r'^(?P<id>[\w-]+)/$',EventDetailAPIView.as_view(),name='detail'),


   
] 