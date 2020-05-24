from django.urls import path

from . import views

urlpatterns = [
    path('signin/', views.signin, name='account/signin'),
    path('signup/', views.signup, name='account/signup'),
    path('logout/', views.logout, name='account/logout'),
]
