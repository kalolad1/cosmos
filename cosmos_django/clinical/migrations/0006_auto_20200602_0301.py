# Generated by Django 3.0.6 on 2020-06-02 03:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinical', '0005_auto_20200601_0353'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visit',
            name='patient_profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='visits', to='clinical.PatientProfile'),
        ),
    ]
