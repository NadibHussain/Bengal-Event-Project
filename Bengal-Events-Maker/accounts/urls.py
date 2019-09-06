from django.conf.urls import url
from . import views

app_name='accounts'

urlpatterns=[

    url(r'^signup/$',views.signup_view,name="signup"),
    url(r'^signin/$',views.signin_view,name="signin"),
    url(r'^logout/$',views.logout_view,name="logout"),
    url(r'^personal/$',views.personal_view,name="personal"),
]