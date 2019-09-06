from django.contrib import admin
from .models import Event,EventType,RegistrationData

class EventAdmin(admin.ModelAdmin):
    list_display = ('title','location','event_date')
    search_fields= ['title']
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('event_name','data','user','registration_date')
    search_fields= ['event_name']
class EventTypeAdmin(admin.ModelAdmin):
    list_display =('title','count')

admin.site.register(Event,EventAdmin)
admin.site.register(EventType,EventTypeAdmin)
admin.site.register(RegistrationData,RegistrationAdmin)