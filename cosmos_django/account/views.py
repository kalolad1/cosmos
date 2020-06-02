from typing import Union, Optional

from django.contrib.auth.models import AbstractBaseUser
from django.contrib import auth
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.shortcuts import render, redirect

from . import models
from clinical import models as clinical_models

CHECKED_BOX = 'on'
USER_OR_PASS_IS_INCORRECT_ERROR = 'Username or password is incorrect.'
PASSWORDS_DO_NOT_MATCH_ERROR = 'Passwords do not match!'
USER_ALREADY_EXISTS_ERROR = 'User already exists!'


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
            return render(request=request,
                          template_name='account/signin.html',
                          context={'error': USER_OR_PASS_IS_INCORRECT_ERROR})
    return render(request=request, template_name='account/signin.html')


def signup(request: HttpRequest) -> Union[HttpResponse, HttpResponseRedirect]:
    """User submits sign up credentials."""
    if request.method == 'POST':
        email: str = request.POST['email']
        password: str = request.POST['password']
        password_check: str = request.POST['password-check']
        first_name: str = request.POST['first-name']
        last_name: str = request.POST['last-name']
        is_provider: bool = False
        try:
            if request.POST['is-provider'] == CHECKED_BOX:
                is_provider = True
        except (MultiValueDictKeyError, KeyError):
            is_provider = False

        if password == password_check:
            try:
                models.Account.objects.get(email=email)
                return render(request=request,
                              template_name='account/signup.html',
                              context={'error': USER_ALREADY_EXISTS_ERROR})
            except models.Account.DoesNotExist:
                # No existing user exists, create user successfully and bring
                # them to the home page.
                user: models.Account = (models.Account.objects.create_user(
                    email=email, password=password))
                if not is_provider:
                    clinical_models.PatientProfile.objects.create(
                        account=user,
                        first_name=first_name,
                        last_name=last_name)
                auth.login(request=request, user=user)
                return redirect(to='clinical/home')
        else:
            # User failed to enter two passwords that matched.
            return render(request=request,
                          template_name='account/signup.html',
                          context={'error': PASSWORDS_DO_NOT_MATCH_ERROR})
    return render(request=request, template_name='account/signup.html')


def logout(
    request: HttpRequest
) -> Union[HttpResponseRedirect, HttpResponsePermanentRedirect]:
    """Logs the user out and sends them back to the landing page."""
    auth.logout(request=request)
    return redirect(to='cosmos_django/landing_page')
