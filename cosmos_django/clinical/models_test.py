from django.apps import apps
from django.test import TestCase

from . import models

Account = apps.get_model('account', 'Account')


class TestClinicalModels(TestCase):
    def test_create_patient_profile(self):
        account: Account = Account.objects.create_user(email='test@gmail.com',
                                                       password='1234')

        patient_profile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')

        self.assertEqual(patient_profile.account, account)
        self.assertEqual(patient_profile.first_name, 'John')
        self.assertEqual(patient_profile.last_name, 'Doe')

    def test_get_full_name(self):
        account: Account = Account.objects.create_user(email='test@gmail.com',
                                                       password='1234')

        patient_profile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')

        self.assertEqual(patient_profile.get_full_name(), 'John Doe')

    def test_patient_profile__str__(self):
        account: Account = Account.objects.create_user(email='test@gmail.com',
                                                       password='1234')

        patient_profile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')

        self.assertEqual(patient_profile.__str__(), 'John Doe')

    def test_create_encounter(self):
        account: Account = Account.objects.create_user(email='test@gmail.com',
                                                       password='1234')

        patient_profile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')
        encounter = models.Encounter.objects.create(
            patient_profile=patient_profile,
            encounter_type=models.Encounter.PHYSICAL,
            note='This is my note.')

        self.assertEqual(encounter.patient_profile, patient_profile)
        self.assertEqual(encounter.encounter_type, 'physical')
        self.assertEqual(encounter.note, 'This is my note.')

    def test_encounter__str__(self):
        account: Account = Account.objects.create_user(email='test@gmail.com',
                                                       password='1234')

        patient_profile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')
        encounter = models.Encounter.objects.create(
            patient_profile=patient_profile,
            encounter_type=models.Encounter.PHYSICAL,
            note='This is my note.')
        self.assertEqual(encounter.__str__(), 'This is my note.')
