from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
def home(request):
    """Loads the user's home page."""
    return render(request, 'clinical/home.html', {'user': request.user})
