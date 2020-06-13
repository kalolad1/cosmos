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
    path('accounts/', api.AccountsEndpoint.as_view(), name='account/accounts'),
    path('visits/', api.VisitEndpoint.as_view(), name='account/visits'),
]
