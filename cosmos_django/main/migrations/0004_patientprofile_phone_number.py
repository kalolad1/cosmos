# Generated by Django 3.0.6 on 2020-06-27 22:43

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20200624_0120'),
    ]

    operations = [
        migrations.AddField(
            model_name='patientprofile',
            name='phone_number',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None),
        ),
    ]
