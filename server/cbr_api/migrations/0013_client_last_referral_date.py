# Generated by Django 3.1.6 on 2021-04-07 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0012_merge_20210402_2242"),
    ]

    operations = [
        migrations.AddField(
            model_name="client",
            name="last_referral_date",
            field=models.BigIntegerField(default=0),
        ),
    ]
