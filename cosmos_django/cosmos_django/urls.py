from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls'), name='account'),
    path('clinical/', include('clinical.urls'), name='clinical'),
    path('frontend/', include('frontend.urls'), name='frontend'),
    path('', views.landing_page, name='cosmos_django/landing_page'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
