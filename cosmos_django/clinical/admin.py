from django.contrib import admin

from . import models

admin.site.register(models.Visit)
admin.site.register(models.PatientProfile)