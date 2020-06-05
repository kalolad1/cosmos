from rest_framework import serializers

from . import models


class PatientProfileSerializer(serializers.ModelSerializer):
    visits = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.PatientProfile
        fields = '__all__'


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Visit
        fields = '__all__'