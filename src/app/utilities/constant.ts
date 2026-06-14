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