# Generated by Django 3.0.6 on 2020-06-29 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_weeklysalary'),
    ]

    operations = [
        migrations.AddField(
            model_name='weeklysalary',
            name='weeklySalary',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True),
        ),
    ]
