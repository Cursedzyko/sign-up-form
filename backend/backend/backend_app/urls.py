from django.urls import path
from django.contrib.auth.decorators import login_required
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('home/', login_required(views.home_view), name='home'), # need to protect so that only logged in can access
    path('personal-info/', views.personal_info, name='personal_info'), # need to protect so that only auth with 42 can access
    path('signup-view/', views.signup_view, name='signup_view'),
    path('login-view/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('password-reset/', views.password_reset, name='password_reset'),
    path('set-new-password/<uidb64>/<token>/', views.set_new_password, name='set_new_password'),
    path('verify-email/<uidb64>/<token>/', views.verify_email, name='email_verify'),
    path('authorize/', views.authorize, name='authorize'),
]
