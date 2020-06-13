"""Registers models to the admin console."""
from django.contrib import admin

from . import models

admin.site.register(models.Account)
admin.site.register(models.PatientProfile)
admin.site.register(models.Visit)
admin.site.register(models.Medication)
admin.site.register(models.Vaccination)
