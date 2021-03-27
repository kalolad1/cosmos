"""Project-level urls."""

from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from . import logging_util
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('frontend.urls'), name='app'),
    path('main/api/', include('main.urls'), name='main'),
    path('', views.landing_page, name='cosmos_django/landing_page'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Root level urls.py runs once on django start. Put project-level initializing
# code here.
logging_util.initialize_logging()
