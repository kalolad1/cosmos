# Generated by Django 3.0.6 on 2020-07-03 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_remove_encounter_significance_band'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='diagnosis',
            name='significance',
        ),
        migrations.AddField(
            model_name='diagnosis',
            name='significance_group',
            field=models.CharField(choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')], default='low', max_length=60),
        ),
        migrations.AddField(
            model_name='diagnosis',
            name='significance_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='encounter',
            name='significance_group',
            field=models.CharField(choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')], default='low', max_length=60),
        ),
        migrations.AddField(
            model_name='encounter',
            name='significance_score',
            field=models.IntegerField(default=1),
        ),
        migrations.DeleteModel(
            name='Significance',
        ),
    ]
