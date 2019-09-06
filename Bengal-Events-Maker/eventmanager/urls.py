from django.conf.urls import url
from . import views

app_name='eventmanager'

urlpatterns=[

    url(r'^',views.eventmanager,name="eventmanager"),
  
]