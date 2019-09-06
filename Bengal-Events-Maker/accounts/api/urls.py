from django.conf.urls import url
from .views import (
    UserCreateAPIView,
    UserLoginAPIView
)

urlpatterns = [
    url(r'^$',UserCreateAPIView.as_view(),name='create'),
    url(r'^login/$',UserLoginAPIView.as_view(),name='login'),
   
]   