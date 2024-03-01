from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.conf import settings
import urllib.parse
import secrets
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate, login as auth_login
from django.contrib import messages

def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'sign_up.html')

def personal_info(request):
    if 'error' in request.GET:
        return redirect('/')
    return render(request, 'personal_info.html')

def home_view(request):
    return render(request, 'home.html')

def signup_view(request):
    if request.method == 'POST':

        print("Username value:", request.POST.get('passwordsignup'))
        
        username = request.POST.get('usernamesignup')
        email = request.POST.get('emailsignup')
        password = request.POST.get('passwordsignup')

        user = User.objects.create_user(username=username, email=email, password=password)  # Fixed variable name

        return redirect('login')
    return render(request, 'sign_up.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print("Username: " , username)
        print("Password: ", password)

        user = authenticate(request, username=username, password=password)

        print("User:", user)
        if user is not None:
            auth_login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')
            return render(request, 'login.html')
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def authorize(request):
    state = secrets.token_urlsafe(16)
    authorization_url = settings.FORTYTWO_AUTH_URL + "?" + urllib.parse.urlencode({
        'client_id': settings.FORTYTWO_CLIENT_ID,
        'redirect_uri': settings.FORTYTWO_REDIRECT_URI,
        'response_type': 'code',
        'scope': 'public',
        'state': state 
    })
    return redirect(authorization_url)
