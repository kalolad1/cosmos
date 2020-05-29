from typing import Union, Optional

from django.contrib.auth.models import AbstractBaseUser
from django.contrib import auth
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.shortcuts import render, redirect

from . import models


def signin(request: HttpRequest) -> Union[HttpResponse, HttpResponseRedirect]:
    """Sign in a user."""
    if request.method == 'POST':
        email: str = request.POST['email']
        password: str = request.POST['password']
        user: Optional[AbstractBaseUser] = auth.authenticate(email=email,
                                                             password=password)

        if user is not None:
            # User credentials were found.
            auth.login(request=request, user=user)
            return redirect(to='clinical/home')
        else:
            # Either the username or password was incorrect.
            return render(
                request=request,
                template_name='account/signin.html',
                context={'error': 'Username or password is incorrect.'})
    return render(request=request, template_name='account/signin.html')


def signup(request: HttpRequest) -> Union[HttpResponse, HttpResponseRedirect]:
    """User submits sign up credentials."""
    if request.method == 'POST':
        email: str = request.POST['email']
        password: str = request.POST['password']
        password_check: str = request.POST['password-check']

        if password == password_check:
            try:
                models.Account.objects.get(email=email)
                return render(request=request,
                              template_name='account/signup.html',
                              context={'error': 'Username already exists!'})
            except models.Account.DoesNotExist:
                # No existing user exists, create user successfully and bring
                # them to the home page.
                user: models.Account = (models.Account.objects.create_user(
                    email=email, password=password))
                auth.login(request=request, user=user)
                return redirect(to='clinical/home')
        else:
            # User failed to enter two passwords that matched.
            return render(request=request,
                          template_name='account/signup.html',
                          context={'error': 'Passwords do not match!'})
    return render(request=request, template_name='account/signup.html')


def logout(request: HttpRequest) -> Union[HttpResponseRedirect]:
    """Logs the user out and sends them back to the landing page."""
    auth.logout(request=request)
    return redirect(to='cosmos_django/landing_page')
