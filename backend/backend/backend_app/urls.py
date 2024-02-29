from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('home/', views.home_view, name='home'),
    path('personal-info/', views.personal_info, name='personal_info'),
    path('signup-view/', views.signup_view, name='signup_view'),
    path('login-view/', views.login_view, name='login_view'),
    path('authorize/', views.authorize, name='authorize'),
]
