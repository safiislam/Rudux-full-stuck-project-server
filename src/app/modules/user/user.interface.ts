

const USER_ROLE = {
    saller: "saller",
    customer: "customer"
} as const



export type TUser = {
    name: string,
    email: string,
    password: string,
    role?: "saller" | "customer"
}

export type TUserRole = keyof typeof USER_ROLE