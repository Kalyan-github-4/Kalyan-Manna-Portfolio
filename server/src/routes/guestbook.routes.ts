import { Router } from "express"
import { clerkClient, getAuth } from "@clerk/express"
import { and, desc, eq } from "drizzle-orm"

import { db } from "../db/index.js"
import { guestbookEntries, users } from "../db/schema.js"
import { requireAuth } from "../middleware/requireAuth.js"
import { getAuthenticatedClerkUserId } from "../lib/clerkAuth.js"

const router = Router()

// Card design is no longer a guest-facing choice: the client ships a fixed set
// of designed templates, and the server hands each new entry one of them. The
// ids match the colour words already stored in the `gradient` column, so
// entries written before templates existed still resolve to a real template.
const CARD_TEMPLATE_IDS = [
  "purple",
  "forest",
  "maroon",
  "navy",
  "ocean",
  "sunset",
] as const

function assignCardTemplate() {
  const index = Math.floor(Math.random() * CARD_TEMPLATE_IDS.length)
  return CARD_TEMPLATE_IDS[index] ?? "purple"
}

async function upsertUserFromClerk(clerkUserId: string) {
  const clerkUser = await clerkClient.users.getUser(clerkUserId)

  const primaryEmail = clerkUser.emailAddresses.find(
    (email: { id: string; emailAddress: string }) =>
      email.id === clerkUser.primaryEmailAddressId
  )

  const name =
    clerkUser.fullName ||
    clerkUser.username ||
    primaryEmail?.emailAddress ||
    "Guest"

  const email = primaryEmail?.emailAddress || null
  const imageUrl = clerkUser.imageUrl || null

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1)

  if (existingUser[0]) {
    const updatedUser = await db
      .update(users)
      .set({
        name,
        email,
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning()

    if (!updatedUser[0]) {
      throw new Error("Failed to update user")
    }

    return updatedUser[0]
  }

  const createdUser = await db
    .insert(users)
    .values({
      clerkUserId,
      name,
      email,
      imageUrl,
    })
    .returning()

  if (!createdUser[0]) {
    throw new Error("Failed to create user")
  }

  return createdUser[0]
}

// Public: only approved entries appear on the wall
router.get("/", async (_req, res) => {
  const entries = await db
    .select({
      id: guestbookEntries.id,
      message: guestbookEntries.message,
      template: guestbookEntries.gradient,
      createdAt: guestbookEntries.createdAt,
      userName: users.name,
      userImageUrl: users.imageUrl,
      userClerkUserId: users.clerkUserId,
    })
    .from(guestbookEntries)
    .innerJoin(users, eq(guestbookEntries.userId, users.id))
    .where(eq(guestbookEntries.status, "approved"))
    .orderBy(desc(guestbookEntries.createdAt))

  return res.json({
    entries: entries.map((entry: (typeof entries)[number]) => ({
      id: entry.id,
      message: entry.message,
      template: entry.template,
      createdAt: entry.createdAt,
      user: {
        name: entry.userName,
        imageUrl: entry.userImageUrl,
        clerkUserId: entry.userClerkUserId,
      },
    })),
  })
})

// Protected: logged-in user submits feedback
router.post("/", async (req, res) => {
  try {
    const { userId: authUserId, sessionId } = getAuth(req)
    const userId = authUserId || (await getAuthenticatedClerkUserId(req))

    console.log("Guestbook auth debug:", {
      userId,
      sessionId,
      hasAuthorizationHeader: Boolean(req.headers.authorization),
    })

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const { message } = req.body

    if (!message || typeof message !== "string" || message.trim().length < 2) {
      return res.status(400).json({
        message: "Guestbook message is required"
      })
    }

    if (message.length > 300) {
      return res.status(400).json({
        message: "Guestbook message is too long",
      })
    }

    const user = await upsertUserFromClerk(userId)

    const insertedEntry = await db
      .insert(guestbookEntries)
      .values({
        userId: user.id,
        message: message.trim(),
        // Ignores anything style-related in the request body on purpose —
        // the design is ours to pick, not the guest's to send.
        gradient: assignCardTemplate(),
        doodles: [],
        status: "approved",
      })
      .returning()

    const entry = insertedEntry[0]

    if (!entry) {
      return res.status(500).json({
        message: "Failed to create guestbook entry",
      })
    }

    return res.status(201).json({
      message: "Guestbook entry submitted successfully.",
      entry: {
        id: entry.id,
        message: entry.message,
        template: entry.gradient,
        createdAt: entry.createdAt,
        user: {
          name: user.name,
          imageUrl: user.imageUrl,
          clerkUserId: user.clerkUserId,
        },
      },
    })
  } catch (error) {
    console.error("Guestbook submit failed:", error)

    return res.status(500).json({
      message: "Failed to submit guestbook entry",
    })
  }
})

// Protected: user can see their own submitted entries
router.get("/mine", requireAuth, async (req, res) => {
  const { userId: authUserId } = getAuth(req)
  const userId = authUserId || (await getAuthenticatedClerkUserId(req))

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId))
    .limit(1)

  const user = existingUser[0]

  if (!user) {
    return res.json({
      entries: [],
    })
  }

  const entries = await db
    .select()
    .from(guestbookEntries)
    .where(eq(guestbookEntries.userId, user.id))
    .orderBy(desc(guestbookEntries.createdAt))

  return res.json({
    entries,
  })
})

// Protected: user can delete own entry
router.delete("/:id", requireAuth, async (req, res) => {
  const { userId: authUserId } = getAuth(req)
  const userId = authUserId || (await getAuthenticatedClerkUserId(req))
  const entryId = req.params.id

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  if (!entryId || Array.isArray(entryId)) {
    return res.status(400).json({
      message: "Invalid entry id",
    })
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId))
    .limit(1)

  const user = existingUser[0]

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    })
  }

  const existingEntry = await db
    .select({
      id: guestbookEntries.id,
      createdAt: guestbookEntries.createdAt,
    })
    .from(guestbookEntries)
    .where(
      and(
        eq(guestbookEntries.id, entryId),
        eq(guestbookEntries.userId, user.id)
      )
    )
    .limit(1)

  const entry = existingEntry[0]

  if (!entry) {
    return res.status(404).json({
      message: "Entry not found",
    })
  }

  const ageMs = Date.now() - new Date(entry.createdAt).getTime()
  const twentyFourHoursMs = 24 * 60 * 60 * 1000

  if (ageMs > twentyFourHoursMs) {
    return res.status(403).json({
      message: "Entry can only be deleted within 24 hours of posting",
    })
  }

  await db
    .delete(guestbookEntries)
    .where(
      and(
        eq(guestbookEntries.id, entryId),
        eq(guestbookEntries.userId, user.id)
      )
    )

  return res.json({
    message: "Entry deleted successfully",
  })
})

export default router