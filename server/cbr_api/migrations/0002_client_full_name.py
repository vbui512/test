# Generated by Django 3.1.6 on 2021-02-27 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cbr_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='full_name',
            field=models.CharField(default='', max_length=101),
        ),
    ]
