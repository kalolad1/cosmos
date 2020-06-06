from django.urls import path

from . import api

urlpatterns = [
    path('auth/register', api.RegistrationAPI.as_view()),
]
