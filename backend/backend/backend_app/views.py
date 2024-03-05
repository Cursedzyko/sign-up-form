from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.conf import settings
import urllib.parse
import secrets
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate, login as auth_login
from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.urls import reverse
from .models import UserProfile
from django.contrib.auth.decorators import login_required


def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'sign_up.html')

def personal_info(request):
    if 'error' in request.GET:
        return redirect('/')
    return render(request, 'personal_info.html')

@login_required
def home_view(request):
    if request.user.is_authenticated:
        print("User is authenticated")
    else:
        print("User is not authenticated")
    return render(request, 'home.html')

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('usernamesignup')
        email = request.POST.get('emailsignup')
        password = request.POST.get('passwordsignup')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists. Please choose a different one.')
            return render(request, 'sign_up.html')
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email address already exists. Please use a different one.')
            return render(request, 'sign_up.html')

        user = User.objects.create_user(username=username, email=email, password=password)

        UserProfile.objects.create(user=user)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verification_link = request.build_absolute_uri(reverse('email_verify', args=[uid, token]))

        send_mail(
            'Verify your email for our awesome site',
            f'Please click the following link to verify your email address: {verification_link}',
            'from@example.com',
            [email],
            fail_silently=False,
        )

        return redirect('login')
    return render(request, 'sign_up.html')


def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        user.userprofile.email_verified = True
        user.userprofile.save()
        
        messages.success(request, 'Your email has been verified. You can now log in.')
        return redirect('login')
    else:
        messages.error(request, 'The verification link is invalid or has expired.')
        return redirect('signup')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            if user.is_active:
                try:
                    profile = user.userprofile
                except UserProfile.DoesNotExist:
                    profile = None

                if profile and profile.email_verified:
                    auth_login(request, user)
                    return redirect('home')
                elif profile and not profile.email_verified:
                    messages.error(request, 'Your email is not verified. Please check your email to activate your account.')
                    return render(request, 'login.html')
                else:
                    messages.error(request, 'Error logging in. Please contact support for assistance.')
                    return render(request, 'login.html')
            else:
                messages.error(request, 'Your account is inactive. Please contact support for assistance.')
                return render(request, 'login.html')
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
