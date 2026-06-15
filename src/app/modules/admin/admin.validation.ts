import { z } from "zod";

const createAdminValidationSchema = z.object({
    body: z.object({
        name: z.string()
    })
})