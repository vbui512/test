import uuid
from django.core.management.base import BaseCommand
from cbr_api import models
import time
import random


class Command(BaseCommand):
    def handle(self, *args, **options):
        results = ["CAN", "GO", "CON"]
        outcomes = [
            "Full Recovery",
            "Partial Recovery",
            "No Improvement",
            "Worsening Condition",
        ]
        provides = [
            "Referral",
            "Counseling",
            "Wheelchair",
            "Wheelchair Repair",
            "Physiotherapy",
            "Prosthetic",
            "Orthotic",
            "Other",
        ]
        zones = models.Zone.objects.all()
        users = models.UserCBR.objects.all()
        clients = models.Client.objects.all()

        def getYearTimestamp(self, year):
            return ((year - 1970) * (60 * 60 * 24 * 365)) * 1000

        def createImprovement(self, visit, type, date):
            return models.Improvement.objects.create(
                id=uuid.uuid4(),
                visit_id=visit,
                risk_type=type,
                created_at=date,
                server_created_at=date,
                provided=random.choice(provides),
                desc="Provided the client with additional services and assistance to improve their health, social, educational and nutritional conditions.",
            )

        def createOutcome(self, visit, type, date):
            return models.Outcome.objects.create(
                id=uuid.uuid4(),
                visit_id=visit,
                risk_type=type,
                created_at=date,
                server_created_at=date,
                goal_met=random.choice(results),
                outcome=random.choice(outcomes),
            )

        def createVisit(self, health, social, educat, nutrit, type, village):
            console.log("createVisit is called in seedvisits 1");
            client = random.choice(clients)

            date_visited = random.randint(
                max(getYearTimestamp(self, 2019), client.last_visit_date),
                getYearTimestamp(self, 2021),
            )

            client.last_visit_date = date_visited
            client.save()

            visit = models.Visit.objects.create(
                id=uuid.uuid4(),
                user_id=random.choice(users),
                client_id=client,
                created_at=date_visited,
                server_created_at=date_visited,
                longitude=0.0,
                latitude=0.0,
                zone=random.choice(zones),
                village=village,
                health_visit=health,
                social_visit=social,
                educat_visit=educat,
                nutrit_visit=nutrit,
            )
            console.log("createVisit is called in seedvisits 2");
            visit.improvements.add(createImprovement(self, visit, type, date_visited))
            console.log("createVisit is called in seedvisits");
            visit.outcomes.add(createOutcome(self, visit, type, date_visited))
            console.log("createVisit is called in seedvisits 3");
            return visit

        if models.Visit.objects.all().count() > 0:
            self.stdout.write(self.style.ERROR("Visits have already been created!"))
            return
        if models.Zone.objects.all().count() == 0:
            self.stdout.write(
                self.style.ERROR("Zones have not been created! Run seedzones first!")
            )
            return
        if models.Disability.objects.all().count() == 0:
            self.stdout.write(
                self.style.ERROR(
                    "Disabilities have not been created! Run seeddisabilities first!"
                )
            )
            return
        if models.UserCBR.objects.all().count() == 0:
            self.stdout.write(
                self.style.ERROR("Users have not been created! Run seedusers first!")
            )
            return
        if models.Client.objects.all().count() == 0:
            self.stdout.write(
                self.style.ERROR(
                    "Clients have not been created! Run seedclients first!"
                )
            )
            return

        createVisit(self, True, False, False, False, "HEALTH", "#1")
        createVisit(self, False, True, False, False, "SOCIAL", "#2")
        createVisit(self, False, False, True, False, "EDUCAT", "#3")
        createVisit(self, False, False, False, True, "NUTRIT", "#4")

        createVisit(self, True, False, False, False, "HEALTH", "#5")
        createVisit(self, False, True, False, False, "SOCIAL", "#6")
        createVisit(self, False, False, True, False, "EDUCAT", "#7")
        createVisit(self, False, False, False, True, "NUTRIT", "#8")

        createVisit(self, True, False, False, False, "HEALTH", "#9")
        createVisit(self, False, True, False, False, "SOCIAL", "#1")
        createVisit(self, False, False, True, False, "EDUCAT", "#2")
        createVisit(self, False, False, False, True, "NUTRIT", "#3")

        self.stdout.write(self.style.SUCCESS("Visits successfully created!"))
