from typing import Union

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.shortcuts import redirect


@login_required
def home(
    request: HttpRequest
) -> Union[HttpResponseRedirect, HttpResponsePermanentRedirect]:
    """Loads the user's home page."""
    return redirect(to='frontend/home')
