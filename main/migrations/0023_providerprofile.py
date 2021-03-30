# Generated by Django 3.0.6 on 2020-07-05 22:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_auto_20200703_1828'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProviderProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(default=None, max_length=60)),
                ('last_name', models.CharField(default=None, max_length=60)),
                ('date_of_birth', models.DateField(default=django.utils.timezone.now)),
                ('sex', models.CharField(choices=[('male', 'Male'), ('female', 'Female')], max_length=60)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='provider_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]