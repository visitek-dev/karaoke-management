# Generated by Django 3.0.6 on 2020-06-26 07:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_auto_20200626_1110'),
    ]

    operations = [
        migrations.CreateModel(
            name='WeeklySalary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weekly_salaries', to=settings.AUTH_USER_MODEL)),
                ('weeklySchedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weekly_salaries', to='accounts.WeeklySchedule')),
            ],
        ),
    ]