from django.shortcuts import render, redirect


def landing_page(request):
    """Load the landing page."""
    return render(request, '../templates/cosmos_django/landing_page.html')
