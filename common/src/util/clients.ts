import { IReferral } from "./referrals";
import { IRisk, riskLevels } from "./risks";
import { ISurvey } from "./survey";
import { IVisitSummary } from "./visits";
import { useZones } from "./hooks/zones";
import { string } from "yup/lib/locale";
import { SearchOption } from "./searchOptions";

export interface IClientSummary {
    id: number;
    full_name: string;
    zone: number;
    health_risk_level: string;
    educat_risk_level: string;
    social_risk_level: string;
    last_visit_date: number;
    created_by_user: number;
}

export interface IClient {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: number | string;
    gender: Gender;
    phone_number: string;
    disability: number[];
    other_disability: string;
    created_by_user: number;
    created_date: number;
    longitude: string;
    latitude: string;
    zone: number;
    village: string;
    picture: string;
    caregiver_present: boolean;
    caregiver_name: string;
    caregiver_phone: string;
    caregiver_email: string;
    caregiver_picture: unknown;
    risks: IRisk[];
    visits: IVisitSummary[];
    referrals: IReferral[];
    baseline_surveys: ISurvey[];
}

export enum Gender {
    MALE = "M",
    FEMALE = "F",
}

export enum SortOptions {
    ID = "id",
    NAME = "name",
    ZONE = "zone",
    HEALTH = "health",
    EDUCATION = "education",
    SOCIAL = "social",
}

export const genders = {
    [Gender.FEMALE]: "Female",
    [Gender.MALE]: "Male",
};

export const clientPrioritySort = (a: IClientSummary, b: IClientSummary) => {
    const getCombinedRisk = (c: IClientSummary) =>
        [c.health_risk_level, c.educat_risk_level, c.social_risk_level].reduce(
            (sum, r) => sum + riskLevels[r].level,
            0
        );

    const riskA = getCombinedRisk(a);
    const riskB = getCombinedRisk(b);

    if (riskA !== riskB) {
        // sort risks descending
        return riskB - riskA;
    }

    // if they have the same risk, sort by visit dates ascending (oldest first)
    return a.last_visit_date - b.last_visit_date;
};