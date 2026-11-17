import nodemailer from "nodemailer"
import { z } from "zod"

import { readJsonObject } from "@/server/http"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(3000),
  topic: z.string().trim().max(40).optional(),
  call: z
    .object({
      start: z.iso.datetime(),
      timeZone: z.string().trim().max(64),
    })
    .optional(),
})

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await readJsonObject(request))

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid contact payload", issues: z.flattenError(parsed.error) },
      { status: 400 }
    )
  }

  const { name, email, message, topic, call } = parsed.data

  const {
    SMTP_HOST: host,
    SMTP_PORT: port,
    SMTP_USER: user,
    SMTP_PASS: pass,
    CONTACT_TO_EMAIL: to,
  } = process.env

  if (!host || !port || !user || !pass || !to) {
    return Response.json(
      { message: "Contact request accepted", delivered: false },
      { status: 202 }
    )
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || user,
    to,
    replyTo: email,
    subject: call
      ? `Call request from ${name}`
      : `Portfolio contact from ${name}${topic ? ` (${topic})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      topic ? `Topic: ${topic}` : null,
      call
        ? `Call requested (30 min, Google Meet): ${new Date(call.start).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short",
          })} IST (their time zone: ${call.timeZone})`
        : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  })

  return Response.json(
    { message: "Contact request sent", delivered: true },
    { status: 201 }
  )
}
