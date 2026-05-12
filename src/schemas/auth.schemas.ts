import { z } from "zod";

export const loginSchema = z.object({
    email : z.string().email("Invalid Email Address"),
    password: z.string().min(6, "Password Must be at least 6 charters"),
})

export type LoginFormData = z.infer<typeof loginSchema>