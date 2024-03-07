import { config } from "dotenv"
import { z } from "zod"

config()

const envSchema = z.object({
    MONGODB_URL: z.string().min(1).url(),
})

export const env = envSchema.parse(process.env)
