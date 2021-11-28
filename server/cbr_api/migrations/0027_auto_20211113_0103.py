# Generated by Django 3.2.8 on 2021-11-13 09:03

import cbr_api.util
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0026_auto_20211104_1947"),
    ]

    operations = [
        migrations.AddField(
            model_name="baselinesurvey",
            name="created_at",
            field=models.BigIntegerField(
                default=cbr_api.util.current_milli_time, verbose_name="date created"
            ),
        ),
        migrations.AddField(
            model_name="baselinesurvey",
            name="updated_at",
            field=models.BigIntegerField(default=0, verbose_name="date updated"),
        ),
        migrations.AlterField(
            model_name="baselinesurvey",
            name="id",
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]