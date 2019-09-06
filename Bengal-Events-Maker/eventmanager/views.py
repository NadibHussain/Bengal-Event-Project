from django.shortcuts import render
from profileinfo.models import info
from django.contrib.auth.decorators import login_required
  
def eventmanager(request):
#    userinfo=info.objects.get(user=request.user) 
   print(request.user)
   return render(request,"eventmanager/eventmanager.html")

