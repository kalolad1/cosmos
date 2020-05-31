from rest_framework import serializers

from . import models


class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PatientProfile
        fields = '__all__'
