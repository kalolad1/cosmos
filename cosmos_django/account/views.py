from django.conf import settings
from django.contrib import auth
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect

from . import models


def signin(request: HttpRequest):
    """Sign in a user."""
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = auth.authenticate(email=email, password=password)

        if user is not None:
            # User credentials were found.
            auth.login(request, user)
            return redirect('clinical/home')
        else:
            # Either the username or password was incorrect.
            return render(
                request,
                'account/signin.html',
                {'error': 'Username or password is incorrect.'})
    return render(request, 'account/signin.html')


def signup(request):
    """User submits sign up credentials."""
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        password_check = request.POST['password-check']

        if password == password_check:
            try:
                settings.AUTH_USER_MODEL.objects.get(email=email)
                return render(
                    request,
                    'account/signup.html',
                    {'error': 'Username already exists!'})
            except models.Account.DoesNotExist:
                # No existing user exists, create user successfully and bring
                # them to the home page.
                user = settings.AUTH_USER_MODEL.objects.create_user(
                    email=email, password=password)
                auth.login(request, user)
                return redirect('clinical/home')
        else:
            # User failed to enter two passwords that matched.
            return render(
                request,
                'account/signup.html',
                {'error': 'Passwords do not match!'})
    return render(request, 'account/signup.html')


def logout(request):
    """Logs the user out and sends them back to the landing page."""
    auth.logout(request)
    return redirect('cosmos_django/landing_page')
