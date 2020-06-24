# Generated by Django 3.0.6 on 2020-06-24 00:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Encounter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('encounter_type', models.CharField(choices=[('physical', 'Physical'), ('vaccination', 'Vaccination'), ('illness', 'Illness')], max_length=60)),
                ('note', models.CharField(default=None, max_length=1000)),
                ('patient_profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='visits', to='main.PatientProfile')),
            ],
        ),
        migrations.DeleteModel(
            name='Visit',
        ),
    ]
