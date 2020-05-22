from django.shortcuts import render


def landing_page(request):
    return render(request, '../templates/cosmos_django/landing_page.html')
