import { Router } from "express"
import { clerkClient, getAuth } from "@clerk/express"
import { desc, eq } from "drizzle-orm"

import { db } from "../db/index.js"
import { feedbackEntries, users } from "../db/schema.js"
import { getAuthenticatedClerkUserId } from "../lib/clerkAuth.js"

const router = Router()

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

// Public: approved feedback only
router.get("/", async (_req, res) => {
  const entries = await db
    .select({
      id: feedbackEntries.id,
      role: feedbackEntries.role,
      feedback: feedbackEntries.feedback,
      rating: feedbackEntries.rating,
      createdAt: feedbackEntries.createdAt,
      userName: users.name,
      userImageUrl: users.imageUrl,
      userClerkUserId: users.clerkUserId,
    })
    .from(feedbackEntries)
    .innerJoin(users, eq(feedbackEntries.userId, users.id))
    .where(eq(feedbackEntries.status, "approved"))
    .orderBy(desc(feedbackEntries.createdAt))
    .limit(10)

  return res.json({
    entries: entries.map((entry) => ({
      id: entry.id,
      role: entry.role,
      feedback: entry.feedback,
      rating: entry.rating,
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

    console.log("Feedback auth debug:", {
      userId,
      sessionId,
      hasAuthorizationHeader: Boolean(req.headers.authorization),
    })

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const { role, feedback, rating } = req.body

    if (!role || typeof role !== "string" || role.trim().length < 2) {
      return res.status(400).json({
        message: "Role or title is required",
      })
    }

    if (!feedback || typeof feedback !== "string" || feedback.trim().length < 5) {
      return res.status(400).json({
        message: "Feedback message is required",
      })
    }

    if (feedback.length > 500) {
      return res.status(400).json({
        message: "Feedback message is too long",
      })
    }

    const safeRating =
      typeof rating === "number" && rating >= 1 && rating <= 5
        ? Math.round(rating)
        : 5

    const user = await upsertUserFromClerk(userId)

    const insertedEntry = await db
      .insert(feedbackEntries)
      .values({
        userId: user.id,
        role: role.trim(),
        feedback: feedback.trim(),
        rating: safeRating,
        status: "approved",
      })
      .returning()

    const entry = insertedEntry[0]

    if (!entry) {
      return res.status(500).json({
        message: "Failed to create feedback",
      })
    }

    return res.status(201).json({
      message: "Feedback submitted successfully.",
      entry: {
        id: entry.id,
        role: entry.role,
        feedback: entry.feedback,
        rating: entry.rating,
        createdAt: entry.createdAt,
        user: {
          name: user.name,
          imageUrl: user.imageUrl,
          clerkUserId: user.clerkUserId,
        },
      },
    })
  } catch (error) {
    console.error("Feedback submit failed:", error)

    return res.status(500).json({
      message: "Failed to submit feedback",
    })
  }
})

export default router