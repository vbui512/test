# Generated by Django 3.1.7 on 2021-03-04 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0002_auto_20210303_1750"),
    ]

    operations = [
        migrations.AlterField(
            model_name="disability",
            name="disability_type",
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name="zone",
            name="zone_name",
            field=models.CharField(max_length=50, unique=True),
        ),
    ]