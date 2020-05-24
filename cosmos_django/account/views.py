from django.contrib import auth
from django.shortcuts import render, redirect

from .models import Account


def signin(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = auth.authenticate(email=email, password=password)

        if user is not None:
            # User was able to be logged in successful.
            auth.login(request, user)
            return redirect('clinical/home')
        else:
            # Either the username or password was incorrect. Sends them back to
            # the login page.
            return render(
                request,
                'account/signin.html',
                {'error': 'Username or password is incorrect.'})

    return render(request, 'account/signin.html')


def signup(request):
    # User submits sign up credentials.
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        password_check = request.POST['password-check']

        if password == password_check:
            try:
                Account.objects.get(email=email)
                return render(
                    request,
                    'account/signup.html',
                    {'error': 'Username already exists!'})
            except Account.DoesNotExist:
                # No existing user exists, create user successfully and bring
                # them to the home page.
                user = Account.objects.create_user(
                    email=email, password=password)
                auth.login(request, user)
                return redirect('clinical/home')
        else:
            # User failed to enter two passwords that matched.
            return render(
                request,
                'account/signup.html',
                {'error': 'Passwords do not match!'})

    # Displays sign up page.
    return render(request, 'account/signup.html')


def logout(request):
    auth.logout(request)
    return redirect('cosmos_django/landing_page')
