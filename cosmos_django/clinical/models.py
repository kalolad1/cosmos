from django.conf import settings
from django.db import models


class PatientProfile(models.Model):
    account = models.OneToOneField(settings.AUTH_USER_MODEL,
                                   on_delete=models.CASCADE)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)

    def get_full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def __str__(self):
        return self.get_full_name()


class Encounter(models.Model):
    patient_profile = models.ForeignKey(PatientProfile,
                                        on_delete=models.CASCADE,
                                        null=True)

    PHYSICAL = 'physical'
    VACCINATION = 'vaccination'
    ILLNESS = 'illness'
    # (database representation, human-readable version)
    ENCOUNTER_TYPE_CHOICES = [
        (PHYSICAL, 'Physical'),
        (VACCINATION, 'Vaccination'),
        (ILLNESS, 'Illness'),
    ]
    encounter_type = models.CharField(max_length=60,
                                      choices=ENCOUNTER_TYPE_CHOICES)
    note = models.CharField(max_length=1000)

    def __str__(self):
        return self.note
