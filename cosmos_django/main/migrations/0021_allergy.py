# Generated by Django 3.0.6 on 2020-07-03 18:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_auto_20200703_1801'),
    ]

    operations = [
        migrations.CreateModel(
            name='Allergy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('significance_score', models.IntegerField(default=1)),
                ('significance_group', models.CharField(choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')], default='low', max_length=60)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('patient_profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='allergies', to='main.PatientProfile')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]
