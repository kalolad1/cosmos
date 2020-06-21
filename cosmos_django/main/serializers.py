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


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Visit
        fields = '__all__'


class PatientProfileSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField('get_age')

    visits = VisitSerializer(many=True)
    medications = MedicationSerializer(many=True)
    vaccinations = VaccinationSerializer(many=True)

    class Meta:
        model = models.PatientProfile
        fields = '__all__'

    def get_age(self, patient_profile_instance):
        return patient_profile_instance.get_age()


class AccountSerializer(serializers.ModelSerializer):
    patient_profile = PatientProfileSerializer()

    class Meta:
        model = models.Account
        fields = ('email', 'patient_profile')
