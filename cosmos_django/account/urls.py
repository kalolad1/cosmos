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
    path('register/', api.register, name='account/register'),
    path('get-account/', api.get_account, name='account/get_account'),
    path('create-visit/', api.create_visit, name='account/create_visit'),
]
