# Generated by Django 3.0.6 on 2020-06-09 04:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_medication_vaccination'),
    ]

    operations = [
        migrations.AddField(
            model_name='patientprofile',
            name='date_of_birth',
            field=models.DateField(default=datetime.date(2020, 6, 9)),
        ),
    ]