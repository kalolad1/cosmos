from django.test import TestCase

from . import models


class TestModels(TestCase):
    def test_create_user_no_email_raises_value_error(self):
        self.assertRaises(ValueError,
                          models.Account.objects.create_user,
                          email='',
                          password='1234')

    def test_create_user_no_password_raises_value_error(self):
        self.assertRaises(ValueError,
                          models.Account.objects.create_user,
                          email='test@gmail.com',
                          password='')

    def test_create_user_succeeds(self):
        user: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        self.assertEqual(user.email, 'test@gmail.com')
        self.assertTrue(user.check_password(raw_password='1234'))
        try:
            models.Account.objects.get(email='test@gmail.com')
        except models.Account.DoesNotExist:
            self.fail("Account not saved to db.")

    def test_create_superuser(self):
        superuser: models.Account = models.Account.objects.create_superuser(
            email='test@gmail.com', password='1234')
        self.assertEqual(superuser.email, 'test@gmail.com')
        self.assertTrue(superuser.check_password(raw_password='1234'))
        self.assertTrue(superuser.is_admin)
        self.assertTrue(superuser.is_superuser)
        try:
            models.Account.objects.get(email='test@gmail.com')
        except models.Account.DoesNotExist:
            self.fail("Account not saved to db.")

    def test_is_staff_returns_false(self):
        user: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')
        self.assertFalse(user.is_staff())

    def test_is_staff_returns_true(self):
        user: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')
        user.is_admin = True
        self.assertTrue(user.is_staff())

    def test___str__(self):
        user: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')
        self.assertEqual(user.__str__(), 'test@gmail.com')

    def test_username_field(self):
        self.assertEqual(models.Account.USERNAME_FIELD, 'email')

    def test_create_patient_profile(self):
        account: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        patient_profile: models.PatientProfile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')

        self.assertEqual(patient_profile.account, account)
        self.assertEqual(patient_profile.first_name, 'John')
        self.assertEqual(patient_profile.last_name, 'Doe')

    def test_get_full_name(self):
        account: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        patient_profile: models.PatientProfile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')

        self.assertEqual(patient_profile.get_full_name(), 'John Doe')

    def test_patient_profile__str__(self):
        account: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        patient_profile: models.PatientProfile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')

        self.assertEqual(patient_profile.__str__(), 'John Doe')

    def test_create_visit(self):
        account: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        patient_profile: models.PatientProfile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')
        visit: models.Visit = models.Visit.objects.create(
            patient_profile=patient_profile,
            visit_type=models.Visit.PHYSICAL,
            note='This is my note.')

        self.assertEqual(visit.patient_profile, patient_profile)
        self.assertEqual(visit.visit_type, 'physical')
        self.assertEqual(visit.note, 'This is my note.')

    def test_encounter__str__(self):
        account: models.Account = models.Account.objects.create_user(
            email='test@gmail.com', password='1234')

        patient_profile: models.PatientProfile = models.PatientProfile.objects.create(
            account=account, first_name='John', last_name='Doe')
        visit: models.Visit = models.Visit.objects.create(
            patient_profile=patient_profile,
            visit_type=models.Visit.PHYSICAL,
            note='This is my note.')
        self.assertEqual(visit.__str__(), 'This is my note.')
