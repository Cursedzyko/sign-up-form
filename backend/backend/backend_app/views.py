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
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth import update_session_auth_hash
import re


def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'sign_up.html')

def personal_info(request):
    if 'error' in request.GET:
        return redirect('/')
    return render(request, 'nickname.html')

def forgot_password(request):
    return render(request, 'password_reset.html')

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

        #pass policy
        if not re.findall('[A-Z]', password):
            messages.error(request, 'Password must contain at least one uppercase letter, one digit, one symbol.')
            return render(request, 'sign_up.html')
        if not re.findall('[0-9]', password):
            messages.error(request, 'Password must contain at least one uppercase letter, one digit, one symbol')
            return render(request, 'sign_up.html')
        if not re.findall('[!@#$%^&*(),.?":{}|<>]', password):
            messages.error(request, 'Password must contain at least one uppercase letter, one digit, one symbol')
            return render(request, 'sign_up.html')

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
            'from@example.com', # need to change
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


def password_reset(request):
    print('HERE')
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('emailsignup')

        if not (username and email):
            messages.error(request, 'Please provide both username and email.')
            return render(request, 'password_reset.html') 
            
        try:
            user = User.objects.get(username=username, email=email)
        except User.DoesNotExist:
            messages.error(request, 'Invalid username or email.')
            return render(request, 'password_reset.html') 

        if user.userprofile.email_verified:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = request.build_absolute_uri(reverse('set_new_password', args=[uid, token]))
            print('HE:Lo')
            send_mail(
                'Reset your password',
                f'Please click the following link to reset your password: {reset_link}',
                'from@example.com', #need to enter
                [email],
                fail_silently=False,
            )

            messages.success(request, 'Password reset link has been sent to your email.')
        else:
            messages.error(request, 'Your email is not verified. Please verify your email before resetting your password.')
            return render(request, 'password_reset.html')

    return render(request, 'password_reset.html')

def set_new_password(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        return render(request, 'set_new_password.html')
    else:
        return HttpResponseBadRequest('Invalid password reset link.')

def submit_new_password(request):
    if request.method == 'POST':
        username = request.POST.get('usernamesignup')
        password = request.POST.get('passwordreset')
        confirm_password = request.POST.get('passwordconfirm')
        
        # Check if passwords match
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'set_new_password.html')

        try:
            # Fetch user based on the provided username
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            messages.error(request, 'User does not exist.')
            return render(request, 'set_new_password.html')

        # Set the new password for the user
        user.set_password(password)
        user.save()

        # Update the session authentication hash
        update_session_auth_hash(request, user)

        # Display success message and redirect to login page
        messages.success(request, 'Your password has been updated successfully.')
        return redirect('login')

    else:
        return HttpResponseNotAllowed(['POST'])




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
