from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView
)
from rest_framework.filters import(
    SearchFilter,
)
from django.contrib.auth.models import User
from .serializers import (
    EventListSerializers,
    EventDetailSerializers,
    EventCreateSerializers,
    RegistrationSerializers,
    RegistereredUserSerializers
    )
from .pagination import eventpagenumberpagination
from eventmanager.models import Event,RegistrationData
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

)
from rest_framework.response import Response
class EventlistAPIView(ListAPIView):
    serializer_class=EventListSerializers
    queryset=Event.objects.all()
    pagination_class = eventpagenumberpagination

class EventDetailAPIView(RetrieveAPIView):
    queryset=Event.objects.all()
    serializer_class=EventDetailSerializers
    lookup_field='id'

class EventCreateAPIView(CreateAPIView):
    queryset=Event.objects.all()
    serializer_class=EventCreateSerializers
    def post(self, request):
        print(request.user)
        serializer = EventCreateSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            q = serializer.save(created_by=request.user)
        return Response(serializer.data)

class RegistrationDataAPIView(CreateAPIView):
    queryset=RegistrationData.objects.all()
    serializer_class=RegistrationSerializers
    def post(self, request):
        serializer = RegistrationSerializers(data=request.data)
        # print(request.data['event_name'])
        event=Event.objects.get(title=request.data['name'])
        if serializer.is_valid(raise_exception=True):
            q = serializer.save(user=request.user,event_name=event)
        return Response(serializer.data)

class RegisteredUserAPIView(RetrieveAPIView):
    queryset=Event.objects.all()
    serializer_class=RegistereredUserSerializers
    lookup_field='id'
    