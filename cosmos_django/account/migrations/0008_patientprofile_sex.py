# Generated by Django 3.0.6 on 2020-06-10 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_auto_20200609_0418'),
    ]

    operations = [
        migrations.AddField(
            model_name='patientprofile',
            name='sex',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female')], default='Male', max_length=60),
            preserve_default=False,
        ),
    ]