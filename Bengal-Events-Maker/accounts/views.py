from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout
from django.contrib.auth.models import User
from profileinfo.models import info
from profileinfo.forms import  PersonalInfoForm
from .forms import RegisterForm
def signup_view(request):
    if request.method=="POST" :
        form=RegisterForm(request.POST)
        if form.is_valid():
            user=form.save()
            login(request,user)
            return redirect('accounts:personal')
    else:
        form=RegisterForm()   
    return render(request,'accounts/signup.html',{'form':form})

def personal_view(request):
    #form that selects interest when signup
    personalform=PersonalInfoForm()
    if request.method=="POST" :
        personalform=PersonalInfoForm(request.POST)
        if personalform.is_valid():
           user=request.user
           interest = personalform.cleaned_data['interest']
           instance=info(user=user)
           instance.save()
           for i in range(interest.count()):
               instance.interest.add(interest[i])
           instance.save()
           #personalform.save()
           return redirect('polls:index')
      
    return render(request,'accounts/personalinfo.html',{'form':personalform,'user':request.user})


def signin_view(request):
    form=AuthenticationForm()
    if request.method=="POST" :
        form=AuthenticationForm(data=request.POST)
        if form.is_valid():
            #login
            user=form.get_user()
            login(request,user)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect('polls:index')
    return render(request,'accounts/signin.html',{'form':form})

def logout_view(request):
       logout(request)
       return redirect('event:eventmanager')
