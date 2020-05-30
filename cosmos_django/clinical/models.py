from typing import List, Tuple

from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models


class PatientProfile(models.Model):
    account: models.OneToOneField = models.OneToOneField(
        to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False)
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

    def get_full_name(self) -> str:
        return '{} {}'.format(self.first_name, self.last_name)

    def __str__(self) -> str:
        return self.get_full_name()


class Encounter(models.Model):
    patient_profile: models.ForeignKey = models.ForeignKey(
        PatientProfile, on_delete=models.CASCADE, null=True)

    PHYSICAL: str = 'physical'
    VACCINATION: str = 'vaccination'
    ILLNESS: str = 'illness'
    # (database representation, human-readable version)
    ENCOUNTER_TYPE_CHOICES: List[Tuple[str, str]] = [
        (PHYSICAL, 'Physical'),
        (VACCINATION, 'Vaccination'),
        (ILLNESS, 'Illness'),
    ]
    encounter_type: models.CharField = models.CharField(
        max_length=60, choices=ENCOUNTER_TYPE_CHOICES)
    note: models.CharField = models.CharField(
        max_length=1000,
        blank=False,
        default=None,
        validators=[MinLengthValidator(4)])

    def __str__(self) -> str:
        return self.note.__str__()
