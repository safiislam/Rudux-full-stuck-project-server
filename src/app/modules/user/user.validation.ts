import { z } from "zod";


const userValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })
})
const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})



export const UserValidations = {
    userValidationSchema,
    userLoginValidationSchema
}