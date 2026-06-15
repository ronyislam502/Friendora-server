export type TUserRole = keyof typeof USER_ROLE;

export const USER_ROLE = {
    user: "user",
    admin: "admin",
    super_admin: "super_admin"
} as const;

export const Gender = {
    male: "male",
    female: "female",
    other: "other"
} as const;

export const Relationship_Status={
    single: "single",
    in_a_relationship: "in a relationship",
    engaged: "engaged",
    married: "married",
    divorced: "divorced",
    widowed: "widowed"
} as const;

export const User_Status = {
    active: "active",
    inactive: "inactive",
    restricted: "restricted",
}