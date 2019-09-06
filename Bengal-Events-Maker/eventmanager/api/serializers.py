from rest_framework.serializers import ModelSerializer,HyperlinkedIdentityField,SerializerMethodField
from eventmanager.models import Event,RegistrationData


class EventListSerializers(ModelSerializer):
    
    created_by=SerializerMethodField()
    link= HyperlinkedIdentityField(
        view_name='api-event:detail',
        lookup_field='id'
    )
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'created_by',
            'event_date',
            'link'  
        ]

    def get_created_by(self,obj) :
        return (obj.created_by.username)
           

class EventDetailSerializers(ModelSerializer):
    
    created_by=SerializerMethodField()
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'created_by',
            'description',
            'event_creation',
            'event_date',
            'seat_number',
            'location',
            'event_type',
            'formstructure',
        ]
    def get_created_by(self,obj) :
        return (obj.created_by.username)

class EventCreateSerializers(ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title',
            'description',
            'event_date',
            'seat_number',
            'location',
            'formstructure',
        ]

class RegistrationSerializers(ModelSerializer):
    
    class Meta:
        model = RegistrationData
        fields = [
            'event_name',
            'data',
        ]


class RegistrationListSerializer(ModelSerializer):
    user=SerializerMethodField()
    class Meta:
        model = RegistrationData
        fields = [
            'user',
            'registration_date',
            'data'
        ] 
    def get_user(self,obj) :
        return (obj.user.username)  

class RegistereredUserSerializers(ModelSerializer):
    registered = RegistrationListSerializer(many=True)
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'seat_number',
            'formstructure',
            'registered'
        ]