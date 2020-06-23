import datetime

from django.test import TestCase
import freezegun

from . import custom_exceptions
from . import models


class TestModels(TestCase):
    def setUp(self) -> None:
        self.user: models.User = models.User.objects.create_user(
            email='test@gmail.com', password='1234')
        self.patient_profile: models.PatientProfile = models.PatientProfile.objects.create(
            user=self.user,
            first_name='John',
            last_name='Doe',
            date_of_birth=datetime.date(year=2000, month=2, day=10),
            sex='male')

    def test_create_user_no_email_raises_value_error(self):
        self.assertRaises(custom_exceptions.DataForNewUserNotProvided,
                          models.User.objects.create_user,
                          email='',
                          password='1234')

    def test_create_user_no_password_raises_value_error(self):
        self.assertRaises(custom_exceptions.DataForNewUserNotProvided,
                          models.User.objects.create_user,
                          email='test@gmail.com',
                          password='')

    def test_create_user_succeeds(self):
        self.assertEqual(self.user.email, 'test@gmail.com')
        self.assertTrue(self.user.check_password(raw_password='1234'))
        try:
            models.User.objects.get(email='test@gmail.com')
        except models.User.DoesNotExist:
            self.fail("Account not saved to db.")

    def test_create_superuser(self):
        superuser: models.User = models.User.objects.create_superuser(
            email='superuser@gmail.com', password='1234')
        self.assertEqual(superuser.email, 'superuser@gmail.com')
        self.assertTrue(superuser.check_password(raw_password='1234'))
        self.assertTrue(superuser.is_admin)
        self.assertTrue(superuser.is_superuser)
        try:
            models.User.objects.get(email='superuser@gmail.com')
        except models.User.DoesNotExist:
            self.fail("Account not saved to db.")

    def test_is_staff_returns_false(self):
        self.assertFalse(self.user.is_staff())

    def test_is_staff_returns_true(self):
        self.user.is_admin = True
        self.assertTrue(self.user.is_staff())

    def test_has_perm_returns_false(self):
        self.assertFalse(self.user.has_perm('test'))

    def test_has_perm_returns_true(self):
        self.user.is_admin = True
        self.assertTrue(self.user.has_perm('test'))

    def test_has_module_perms_returns_false(self):
        self.assertFalse(self.user.has_module_perms('app_label'))

    def test_has_module_perms_returns_true(self):
        self.user.is_admin = True
        self.assertTrue(self.user.has_module_perms('app_label'))

    def test___str__(self):
        self.assertEqual(self.user.__str__(), 'test@gmail.com')

    def test_username_field(self):
        self.assertEqual(models.User.USERNAME_FIELD, 'email')

    def test_create_patient_profile(self):
        self.assertEqual(self.patient_profile.user, self.user)
        self.assertEqual(self.patient_profile.first_name, 'John')
        self.assertEqual(self.patient_profile.last_name, 'Doe')

    def test_get_full_name(self):
        self.assertEqual(self.patient_profile.get_full_name(), 'John Doe')

    @freezegun.freeze_time("2020-02-10")
    def test_get_age(self):
        self.assertEqual(self.patient_profile.get_age(), 20)

    @freezegun.freeze_time("2020-01-01")
    def test_get_age_no_birthday_in_year_yet(self):
        self.assertEqual(self.patient_profile.get_age(), 19)

    @freezegun.freeze_time("2020-02-07")
    def test_get_age_birthday_in_this_month(self):
        self.assertEqual(self.patient_profile.get_age(), 19)

    def test_patient_profile__str__(self):
        self.assertEqual(self.patient_profile.__str__(), 'John Doe')

    def test_create_visit(self):
        visit: models.Visit = models.Visit.objects.create(
            patient_profile=self.patient_profile,
            visit_type=models.Visit.PHYSICAL,
            note='This is my note.')

        self.assertEqual(visit.patient_profile, self.patient_profile)
        self.assertEqual(visit.visit_type, 'physical')
        self.assertEqual(visit.note, 'This is my note.')

    def test_visit__str__(self):
        visit: models.Visit = models.Visit.objects.create(
            patient_profile=self.patient_profile,
            visit_type=models.Visit.PHYSICAL,
            note='This is my note.')
        self.assertEqual(visit.__str__(), 'This is my note.')

    def test_medication__str__(self):
        medication: models.Medication = models.Medication.objects.create(
            patient_profile=self.patient_profile, name='Advil')
        self.assertEqual(medication.__str__(), 'Advil')

    def test_vaccination__str__(self):
        vaccination: models.Vaccination = models.Vaccination.objects.create(
            patient_profile=self.patient_profile, name='COVID-19')
        self.assertEqual(vaccination.__str__(), 'COVID-19')
