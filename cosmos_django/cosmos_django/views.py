from django.shortcuts import render, redirect


def landing_page(request):
    """Load the landing page."""
    if request.user.is_authenticated:
        return redirect('clinical/home')
    return render(request, '../templates/cosmos_django/landing_page.html')
