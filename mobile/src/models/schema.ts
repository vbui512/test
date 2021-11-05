import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: "users",
            columns: [
                { name: "username", type: "string" },
                { name: "password", type: "string" },
                { name: "first_name", type: "string" },
                { name: "last_name", type: "string" },
                { name: "phone_number", type: "string", isOptional: true },
                { name: "role", type: "string" },
                { name: "zone", type: "number" },
                { name: "is_active", type: "boolean", isOptional: true },
                { name: "created_at", type: "number" },
                { name: "updated_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "clients",
            columns: [
                { name: "user_id", type: "string", isIndexed: true },
                { name: "first_name", type: "string" },
                { name: "last_name", type: "string" },
                { name: "full_name", type: "string" },
                { name: "birth_date", type: "number" },
                { name: "gender", type: "string" },
                { name: "phone_number", type: "string", isOptional: true },
                { name: "disability", type: "string" },
                { name: "other_disability", type: "string", isOptional: true },
                { name: "zone", type: "number" },
                { name: "village", type: "string" },
                { name: "caregiver_present", type: "boolean" },
                { name: "caregiver_name", type: "string", isOptional: true },
                { name: "caregiver_phone", type: "string", isOptional: true },
                { name: "caregiver_email", type: "string", isOptional: true },
                { name: "health_risk_level", type: "string" },
                { name: "social_risk_level", type: "string" },
                { name: "educat_risk_level", type: "string" },
                { name: "last_visit_date", type: "number" },
                { name: "created_at", type: "number" },
                { name: "updated_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "risks",
            columns: [
                { name: "client_id", type: "string", isIndexed: true },
                { name: "risk_type", type: "string" },
                { name: "risk_level", type: "string" },
                { name: "requirement", type: "string" },
                { name: "goal", type: "string" },
                { name: "timestamp", type: "number" },
            ],
        }),
        tableSchema({
            name: "referrals",
            columns: [
                { name: "date_referred", type: "number" },
                { name: "date_resolved", type: "number" },
                { name: "resolved", type: "boolean" },
                { name: "outcome", type: "string" },
                // { name: "picture", type: "number" },
                { name: "wheelchair", type: "boolean" },
                { name: "wheelchair_experience", type: "string" },
                { name: "hip_width", type: "number" },
                { name: "wheelchair_owned", type: "boolean" },
                { name: "wheelchair_repairable", type: "boolean" },
                { name: "physiotherapy", type: "boolean" },
                { name: "condition", type: "string" },
                { name: "prosthetic", type: "boolean" },
                { name: "prosthetic_injury_location", type: "string" },
                { name: "orthotic", type: "boolean" },
                { name: "orthotic_injury_location", type: "string" },
                { name: "services_other", type: "string" },
                { name: "client", type: "string", isIndexed: true },
                { name: "user", type: "string", isIndexed: true },
                { name: "created_at", type: "number" },
                { name: "updated_at", type: "number" },

            ],
        }),
    ],
});
