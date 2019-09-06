from django.contrib import admin
from .models import info,interest

class infoAdmin(admin.ModelAdmin):
    list_display = ('user','profilecreation','admin')
    search_fields= ['user']
    filter_horizontal=('interest',)

class interestAdmin(admin.ModelAdmin):
    list_display =('title','count')



admin.site.register(info,infoAdmin)
admin.site.register(interest,interestAdmin)
