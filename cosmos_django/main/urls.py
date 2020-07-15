from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from . import model_api
from . import search_api

urlpatterns = [
    path('token/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    # Used for base GET and POST
    path('users/', model_api.UsersEndpoint.as_view(), name='main/users'),
    # Used for GET and PUT
    path('users/<int:user_id>/',
         model_api.UsersEndpoint.as_view(),
         name='main/users'),
    path('encounters/',
         model_api.EncountersEndpoint.as_view(),
         name='main/encounters'),
    path('diagnoses/',
         model_api.DiagnosesEndpoint.as_view(),
         name='main/diagnosis'),
    path('medications/',
         model_api.MedicationsEndpoint.as_view(),
         name='main/medications'),
    path('allergies/',
         model_api.AllergiesEndpoint.as_view(),
         name='main/allergies'),
    path('vaccinations/',
         model_api.VaccinationsEndpoint.as_view(),
         name='main/vaccinations'),
    path('search', search_api.SearchEndpoint.as_view(), name='main/search'),
]
