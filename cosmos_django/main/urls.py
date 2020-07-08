from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from . import api

urlpatterns = [
    path('token/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    # Used for base GET and POST
    path('users/', api.AccountsEndpoint.as_view(), name='main/users'),
    # Used for GET and PUT
    path('users/<int:user_id>/',
         api.AccountsEndpoint.as_view(),
         name='main/users'),
    path('encounters/',
         api.EncountersEndpoint.as_view(),
         name='main/encounters'),
    path('diagnoses/', api.DiagnosesEndpoint.as_view(), name='main/diagnosis'),
    path('medications/',
         api.MedicationsEndpoint.as_view(),
         name='main/medications'),
    path('allergies/', api.AllergiesEndpoint.as_view(), name='main/allergies'),
    path('vaccinations/',
         api.VaccinationsEndpoint.as_view(),
         name='main/vaccinations'),
]
