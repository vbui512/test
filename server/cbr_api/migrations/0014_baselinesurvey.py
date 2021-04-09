# Generated by Django 3.1.7 on 2021-04-08 06:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0013_client_other_disability"),
    ]

    operations = [
        migrations.CreateModel(
            name="BaselineSurvey",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("survey_date", models.BigIntegerField()),
                (
                    "health",
                    models.CharField(
                        choices=[
                            ("VP", "Very Poor"),
                            ("P", "Poor"),
                            ("F", "Fine"),
                            ("G", "Good"),
                        ],
                        max_length=2,
                    ),
                ),
                ("health_have_rehabilitation_access", models.BooleanField()),
                ("health_need_rehabilitation_access", models.BooleanField()),
                ("health_have_assistive_device", models.BooleanField()),
                ("health_working_assistive_device", models.BooleanField()),
                ("health_need_assistive_device", models.BooleanField()),
                (
                    "health_assistive_device_type",
                    models.CharField(
                        choices=[
                            ("WC", "Wheelchair"),
                            ("PR", "Prosthetic"),
                            ("OR", "Orthotic"),
                            ("CR", "Crutch"),
                            ("WS", "Walking Stick"),
                            ("HA", "Hearing Aid"),
                            ("GL", "Glasses"),
                            ("SF", "Standing Frame"),
                            ("CS", "Corner Seat"),
                        ],
                        max_length=2,
                        blank=True,
                    ),
                ),
                (
                    "health_services_satisfaction",
                    models.CharField(
                        choices=[
                            ("VP", "Very Poor"),
                            ("P", "Poor"),
                            ("F", "Fine"),
                            ("G", "Good"),
                        ],
                        max_length=2,
                    ),
                ),
                ("school_currently_attend", models.BooleanField()),
                ("school_grade", models.IntegerField(blank=True)),
                (
                    "school_not_attend_reason",
                    models.CharField(
                        choices=[
                            ("LF", "Lack Funding"),
                            ("D", "Disability"),
                            ("O", "Other"),
                        ],
                        max_length=2,
                        blank=True,
                    ),
                ),
                ("school_ever_attend", models.BooleanField()),
                ("school_want_attend", models.BooleanField()),
                ("social_community_valued", models.BooleanField()),
                ("social_independent", models.BooleanField()),
                ("social_able_participate", models.BooleanField()),
                ("social_affected_by_disability", models.BooleanField()),
                ("social_discrimination", models.BooleanField()),
                ("work", models.BooleanField()),
                ("work_what", models.CharField(max_length=50, blank=True)),
                (
                    "work_status",
                    models.CharField(
                        choices=[("EMPL", "Employed"), ("SEMPL", "Self-Employed")],
                        max_length=5,
                        blank=True,
                    ),
                ),
                ("work_meet_financial_needs", models.BooleanField()),
                ("work_affected_by_disability", models.BooleanField()),
                ("work_want", models.BooleanField()),
                (
                    "food_security",
                    models.CharField(
                        choices=[
                            ("VP", "Very Poor"),
                            ("P", "Poor"),
                            ("F", "Fine"),
                            ("G", "Good"),
                        ],
                        max_length=2,
                    ),
                ),
                ("food_enough_monthly", models.BooleanField()),
                (
                    "food_enough_for_child",
                    models.CharField(
                        choices=[
                            ("M", "Malnourished"),
                            ("U", "Undernourished"),
                            ("W", "Well-nourished"),
                        ],
                        max_length=1,
                        blank=True,
                    ),
                ),
                ("empowerment_organization_member", models.BooleanField()),
                (
                    "empowerment_organization",
                    models.CharField(max_length=50, blank=True),
                ),
                ("empowerment_rights_awareness", models.BooleanField()),
                ("empowerment_influence_others", models.BooleanField()),
                ("shelter_adequate", models.BooleanField()),
                ("shelter_essential_access", models.BooleanField()),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="baseline_surveys",
                        to="cbr_api.client",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="baselinesurveys",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
