from rest_framework import viewsets, permissions

from . import models
from . import serializers


class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = models.PatientProfile.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = serializers.PatientProfileSerializer
