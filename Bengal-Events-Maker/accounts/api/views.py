from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView, 

)
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from django.contrib.auth import login,logout
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

)
from django.contrib.auth.models import User
from rest_framework.filters import(
    SearchFilter,
    OrderingFilter
)

from .serializers import UserCreateSerilaizer,UserLoginSerializer
User=get_user_model()

class UserCreateAPIView(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserCreateSerilaizer

    def perform_create(self, serializer):
        serializer.save()
        user=User.objects.get(username=serializer['username'].value)
        login(self.request,user)

class UserLoginAPIView(APIView):
    permission_classes=[AllowAny]
    serializer_class=UserLoginSerializer

    def post(self,request):
        data=request.data
        serializer=UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data=serializer.data
            return Response(new_data,status=HTTP_200_OK)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)