import "dotenv/config"
import express from "express"
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"

import { env } from "./config/env.js"
import guestbookRoutes from "./routes/guestbook.routes.js"
import adminGuestbookRoutes from "./routes/adminGuestbook.routes.js"
import contactRoutes from "./routes/contact.js"
import feedbackRoutes from "./routes/feedback.routes.js"

// import your db connection
import { db } from "./db/index.js"
import { sql } from "drizzle-orm"

const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error("CORS origin not allowed"))
    },
    credentials: true,
  })
)

app.use(express.json())

app.use(clerkMiddleware())

app.get("/", (_req, res) => {
  return res.json({
    message: "Portfolio backend is running",
  })
})

app.get("/health", (_req, res) => {
  return res.json({
    ok: true,
  })
})

app.use("/api/guestbook", guestbookRoutes)
app.use("/api/admin/guestbook", adminGuestbookRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/feedback", feedbackRoutes)

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const message = err instanceof Error ? err.message : "Unexpected error"

    return res.status(500).json({
      message,
    })
  }
)

async function startServer() {
  try {
    await db.execute(sql`select 1`)

    console.log("✅ Database connected successfully")

    app.listen(env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error("❌ Database connection failed")

    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    process.exit(1)
  }
}

void startServer()