import { z } from "zod"

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().int().positive().default(5000),
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
	CLIENT_URL: z.string().default("https://kalyan-manna-portfolio.vercel.app"),
	CLIENT_URLS: z.string().optional(),
	ADMIN_EMAIL: z.string().email().default("kalyanmanna439@gmail.com"),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	throw new Error(`Invalid environment: ${parsed.error.message}`)
}

const values = parsed.data

const allowedOrigins = Array.from(
	new Set(
		[values.CLIENT_URL, values.CLIENT_URLS]
			.filter(Boolean)
			.flatMap((value) => (value ? value.split(",") : []))
			.map((origin) => origin.trim())
			.filter(Boolean)
	)
)

export const env = {
	...values,
	allowedOrigins,
}
