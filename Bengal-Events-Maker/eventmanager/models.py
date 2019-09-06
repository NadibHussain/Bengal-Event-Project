from django.db import models
from django.contrib.auth.models import User

class EventType(models.Model):
    title=models.CharField(max_length=255)
    count = models.IntegerField(default=0)

    class Meta:
        ordering =('-count',)

    def __str__ (self):
        return  self.title       

class Event(models.Model):
    title=models.CharField(max_length=255)
    created_by=models.ForeignKey(User,default=None)
    description = models.TextField(blank=True,default="")
    event_creation = models.DateTimeField(auto_now_add=True)
    event_date = models.DateTimeField()
    seat_number=models.IntegerField(blank=True,null=True)
    location=models.TextField(blank=True,default="")
    event_type=models.ForeignKey(EventType,on_delete=models.SET_NULL,null=True,blank=True)
    formstructure=models.TextField(blank=True,default="")
    
    class Meta:
        ordering =('-event_date',)

    def __str__ (self):
        return self.title 

class RegistrationData(models.Model):
    event_name=models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registered',default=None)
    data=models.TextField(blank=True,default="")
    user=models.ForeignKey(User,default=None)
    registration_date=models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return self.data
    
    class Meta:
        ordering =('-registration_date',)
