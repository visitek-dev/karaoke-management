# Generated by Django 3.0.6 on 2020-05-29 07:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0008_auto_20200527_1437'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room', models.CharField(max_length=255)),
                ('checkInDate', models.DateTimeField(default=datetime.datetime.now)),
                ('checkOutDate', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(choices=[('checkedIn', 'CHECKED IN'), ('checkedOut', 'CHECKED OUT')], max_length=31)),
                ('total', models.DecimalField(decimal_places=2, max_digits=20)),
                ('created_at', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.AlterField(
            model_name='payment',
            name='status',
            field=models.CharField(choices=[('checkedIn', 'CHECKED IN'), ('checkedOut', 'CHECKED OUT')], max_length=31),
        ),
    ]