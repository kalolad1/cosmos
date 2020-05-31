from django.urls import path
from rest_framework import routers

from . import api
from . import views

router = routers.DefaultRouter()
router.register('api/patient_profiles', api.PatientProfileViewSet,
                'patient_profiles')

urlpatterns = [
    path('home/', views.home, name='clinical/home'),
] + router.urls
