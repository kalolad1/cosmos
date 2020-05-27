# Generated by Django 3.0.6 on 2020-05-27 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Encounter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('encounter_type', models.CharField(choices=[('physical', 'Physical'), ('vaccination', 'Vaccination'), ('illness', 'Illness')], max_length=60)),
                ('note', models.CharField(max_length=1000)),
            ],
        ),
    ]
