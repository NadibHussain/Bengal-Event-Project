from rest_framework.serializers import (
    ModelSerializer,
    HyperlinkedIdentityField,
    SerializerMethodField,
    EmailField,
    CharField,
    ValidationError)
from django.contrib.auth import get_user_model

User=get_user_model()

class UserCreateSerilaizer(ModelSerializer):
    password2=CharField()
    
    class Meta:
        model=User
        fields = [
            'username',
            'email',
            'password',
            'password2',
        ]
        extra_kwargs={'password':{'write_only':True}}
    
    def validate_password2(self,value):
        data=self.get_initial()
        print(data)
        password1=data.get('password')
        password2=value
        if password1 != password2:
            raise ValidationError("not matching password") 
        email_qs=User.objects.filter(password=password2)
        return value

    def create(self,validated_data):
        print(validated_data)
        username=validated_data['username']
        email=validated_data['email']
        password=validated_data['password2']
        user_obj=User(username=username,email=email)
        user_obj.set_password(password)
        user_obj.save()
        return validated_data

class UserLoginSerializer(ModelSerializer):
    token = CharField(read_only=True,allow_blank=True)
    username=CharField()
    class Meta:
        model=User
        fields = [
            'username',
            'password',
            'token',
        ]
        extra_kwargs={'password':{'write_only':True}}
    
    def validate(self,data):
        user_obj=None
        username=data.get('username',None)
        password=data.get('password',None)
        user = User.objects.filter(username=username)
        if not user.exists() :
            raise ValidationError("No User of that name")
        user_obj=user.first()    
        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Wrong Password or Username")
          
        return data