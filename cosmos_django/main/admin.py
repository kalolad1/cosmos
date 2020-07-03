"""Registers models to the admin console."""
from django.contrib import admin

from . import models

admin.site.register(models.User)
admin.site.register(models.PatientProfile)
admin.site.register(models.Address)
admin.site.register(models.Encounter)
admin.site.register(models.Significance)
admin.site.register(models.Diagnosis)
admin.site.register(models.Medication)
admin.site.register(models.Vaccination)
