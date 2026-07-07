import { Router } from "express"
import nodemailer from "nodemailer"
import { z } from "zod"

const router = Router()

const contactSchema = z.object({
	name: z.string().trim().min(2).max(80),
	email: z.string().trim().email().max(120),
	message: z.string().trim().min(10).max(3000),
})

router.post("/", async (req, res) => {
	const parsed = contactSchema.safeParse(req.body)

	if (!parsed.success) {
		return res.status(400).json({
			message: "Invalid contact payload",
			issues: parsed.error.flatten(),
		})
	}

	const { name, email, message } = parsed.data

	const smtpHost = process.env.SMTP_HOST
	const smtpPort = process.env.SMTP_PORT
	const smtpUser = process.env.SMTP_USER
	const smtpPass = process.env.SMTP_PASS
	const toEmail = process.env.CONTACT_TO_EMAIL

	if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !toEmail) {
		return res.status(202).json({
			message: "Contact request accepted",
			delivered: false,
		})
	}

	const transporter = nodemailer.createTransport({
		host: smtpHost,
		port: Number(smtpPort),
		secure: Number(smtpPort) === 465,
		auth: {
			user: smtpUser,
			pass: smtpPass,
		},
	})

	await transporter.sendMail({
		from: process.env.CONTACT_FROM_EMAIL || smtpUser,
		to: toEmail,
		replyTo: email,
		subject: `Portfolio contact from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
	})

	return res.status(201).json({
		message: "Contact request sent",
		delivered: true,
	})
})

export default router
