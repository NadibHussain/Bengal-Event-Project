from django.db import models
from django.contrib.auth.models import User



class interest(models.Model):
    title=models.CharField(max_length=255)
    count = models.IntegerField(default=0)

    class Meta:
        ordering =('-count',)

    def __str__ (self):
        return  self.title

class info(models.Model):
    user = models.OneToOneField(User, default=None, null=True, on_delete=models.CASCADE,blank=True)
    interest=models.ManyToManyField(interest)
    profilecreation = models.DateTimeField(auto_now_add=True)
    admin = models.BooleanField(default= True)
    
    class Meta:
        ordering =('-profilecreation',)

    def __str__ (self):
        return self.user.username