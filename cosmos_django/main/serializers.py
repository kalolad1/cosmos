from rest_framework import serializers

from . import models


class VaccinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vaccination
        fields = '__all__'


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Medication
        fields = (
            'id',
            'name',
            'description',
            'created_at',
            'significance_score',
            'significance_group',
        )


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Diagnosis
        fields = (
            'id',
            'name',
            'description',
            'created_at',
            'significance_score',
            'significance_group',
        )


class EncounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Encounter
        fields = (
            'id',
            'encounter_type',
            'note',
            'created_at',
            'updated_at',
            'significance_score',
            'significance_group',
        )


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = ('address_line', 'city', 'state', 'zip_code')


class PatientProfileSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField('get_age')

    address = AddressSerializer()
    encounters = EncounterSerializer(many=True)
    diagnoses = DiagnosisSerializer(many=True)
    medications = MedicationSerializer(many=True)
    vaccinations = VaccinationSerializer(many=True)

    class Meta:
        model = models.PatientProfile
        fields = ('address', 'age', 'date_of_birth', 'encounters', 'ethnicity',
                  'first_name', 'last_name', 'phone_number', 'profile_picture',
                  'race', 'religion', 'sex', 'medications', 'vaccinations',
                  'insurance', 'pharmacy', 'diagnoses')

    def get_age(self, patient_profile_instance):
        return patient_profile_instance.get_age()


class UserSerializer(serializers.ModelSerializer):
    patient_profile = PatientProfileSerializer()

    class Meta:
        model = models.User
        fields = ('email', 'patient_profile')
