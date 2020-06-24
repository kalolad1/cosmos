from rest_framework import serializers

from . import models


class VaccinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vaccination
        fields = '__all__'


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Medication
        fields = '__all__'


class EncounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Encounter
        fields = '__all__'


class PatientProfileSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField('get_age')

    encounters = EncounterSerializer(many=True)
    medications = MedicationSerializer(many=True)
    vaccinations = VaccinationSerializer(many=True)

    class Meta:
        model = models.PatientProfile
        fields = '__all__'

    def get_age(self, patient_profile_instance):
        return patient_profile_instance.get_age()


class UserSerializer(serializers.ModelSerializer):
    patient_profile = PatientProfileSerializer()

    class Meta:
        model = models.User
        fields = ('email', 'patient_profile')
