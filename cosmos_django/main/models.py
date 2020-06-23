import datetime
from typing import List, Tuple

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils import timezone

from . import custom_exceptions


class UserManager(BaseUserManager):
    """Manager for the Account class."""
    def create_user(self, email: str, password: str) -> 'User':
        """Create a user."""
        if not email:
            raise custom_exceptions.DataForNewUserNotProvided()

        if not password:
            raise custom_exceptions.DataForNewUserNotProvided()

        if User.objects.filter(email=email).exists():
            raise custom_exceptions.UserAlreadyExistsException(
                message='An user with email: {} already exists in the database'
                .format(email))

        normalized_email: str = self.normalize_email(email=email)
        user: User = self.model(email=normalized_email)
        user.set_password(raw_password=password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str) -> 'User':
        """Create a superuser. Superusers can log into the admin platform."""
        superuser: User = self.create_user(email=email, password=password)
        superuser.is_admin = True
        superuser.is_superuser = True
        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser):
    """The Base User main."""
    email: models.EmailField = models.EmailField(max_length=60, unique=True)
    date_joined: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    is_active: models.BooleanField = models.BooleanField(default=True)
    is_admin: models.BooleanField = models.BooleanField(default=False)
    is_superuser: models.BooleanField = models.BooleanField(default=False)

    objects: UserManager = UserManager()

    # Specify which field the user will log in with.
    USERNAME_FIELD: str = 'email'
    EMAIL_FIELD: str = 'email'

    def __str__(self) -> str:
        return str(self.email.__str__())

    def is_staff(self) -> models.BooleanField:
        return self.is_admin

    def has_perm(self, perm: str, obj=None) -> models.BooleanField:
        return self.is_admin

    def has_module_perms(self, app_label: str) -> models.BooleanField:
        return self.is_admin


class PatientProfile(models.Model):
    user: models.OneToOneField = models.OneToOneField(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=False,
        related_name='patient_profile')
    first_name: models.CharField = models.CharField(
        max_length=60,
        blank=False,
        default=None,
        validators=[MinLengthValidator(1)])
    last_name: models.CharField = models.CharField(
        max_length=60,
        blank=False,
        default=None,
        validators=[MinLengthValidator(1)])
    date_of_birth: models.DateField = models.DateField(default=timezone.now)
    MALE: str = 'male'
    FEMALE: str = 'female'
    SEX_CHOICES: List[Tuple[str, str]] = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]
    sex: models.CharField = models.CharField(max_length=60,
                                             choices=SEX_CHOICES)

    profile_picture: models.ImageField = models.ImageField(
        upload_to='profile_pictures/', blank=True, null=True)

    def get_full_name(self) -> str:
        return '{} {}'.format(self.first_name, self.last_name)

    def get_age(self):
        today = datetime.date.today()
        year_difference = today.year - self.date_of_birth.year
        if self.date_of_birth.month > today.month:
            year_difference -= 1
        elif self.date_of_birth.month == today.month:
            if self.date_of_birth.day > today.day:
                year_difference -= 1
        return year_difference

    def __str__(self) -> str:
        return self.get_full_name()


class Visit(models.Model):
    patient_profile: models.ForeignKey = models.ForeignKey(
        PatientProfile,
        on_delete=models.CASCADE,
        null=True,
        related_name='visits')

    PHYSICAL: str = 'physical'
    VACCINATION: str = 'vaccination'
    ILLNESS: str = 'illness'
    # (database representation, human-readable version)
    VISIT_TYPE_CHOICES: List[Tuple[str, str]] = [
        (PHYSICAL, 'Physical'),
        (VACCINATION, 'Vaccination'),
        (ILLNESS, 'Illness'),
    ]
    visit_type: models.CharField = models.CharField(max_length=60,
                                                    choices=VISIT_TYPE_CHOICES)
    note: models.CharField = models.CharField(max_length=1000,
                                              blank=False,
                                              default=None)

    def __str__(self) -> str:
        return self.note.__str__()


class Medication(models.Model):
    patient_profile: models.ForeignKey = models.ForeignKey(
        PatientProfile,
        on_delete=models.CASCADE,
        null=True,
        related_name='medications')
    name: models.CharField = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name.__str__()


class Vaccination(models.Model):
    patient_profile: models.ForeignKey = models.ForeignKey(
        PatientProfile,
        on_delete=models.CASCADE,
        null=True,
        related_name='vaccinations')
    name: models.CharField = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name.__str__()
