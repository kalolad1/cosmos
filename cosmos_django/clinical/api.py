from django.db.models.query import QuerySet
from rest_framework import viewsets, permissions

from . import models
from . import serializers


class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset: QuerySet = models.PatientProfile.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = serializers.PatientProfileSerializer


class VisitViewSet(viewsets.ModelViewSet):
    queryset: QuerySet = models.Visit.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = serializers.VisitSerializer
