from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect
from django.urls import include, path, re_path

from . import logging_util
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('frontend.urls'), name='app'),
    path('account/api/', include('account.urls'), name='account'),
    path('', views.landing_page, name='cosmos_django/landing_page'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    re_path('^', lambda request: redirect('app/home'))
]

# Root level urls.py runs once on django start. Put project-level intializing
# code here.
logging_util.initialize_logging()
