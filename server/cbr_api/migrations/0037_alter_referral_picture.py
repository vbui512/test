# Generated by Django 3.2.9 on 2021-11-15 06:01

import cbr_api.models
import cbr_api.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0036_auto_20211114_0116"),
    ]

    operations = [
        migrations.AlterField(
            model_name="referral",
            name="picture",
            field=models.ImageField(
                blank=True,
                null=True,
                storage=cbr_api.storage.OverwriteStorage(),
                upload_to=cbr_api.models.Referral.rename_file,
            ),
        ),
    ]