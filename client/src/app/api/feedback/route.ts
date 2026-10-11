import { desc, eq } from "drizzle-orm"

import { getClerkUserId, unauthorized } from "@/server/auth"
import { getDb } from "@/server/db"
import { feedbackEntries, users } from "@/server/db/schema"
import { readJsonObject } from "@/server/http"
import { upsertUserFromClerk } from "@/server/users"

export const dynamic = "force-dynamic"

// Public: approved feedback only.
export async function GET() {
  const entries = await getDb()
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

  return Response.json({
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
}

export async function POST(request: Request) {
  try {
    const userId = await getClerkUserId(request)
    if (!userId) return unauthorized()

    const { role, feedback, rating } = await readJsonObject(request)

    if (typeof role !== "string" || role.trim().length < 2) {
      return Response.json(
        { message: "Role or title is required" },
        { status: 400 }
      )
    }

    if (typeof feedback !== "string" || feedback.trim().length < 5) {
      return Response.json(
        { message: "Feedback message is required" },
        { status: 400 }
      )
    }

    if (feedback.length > 500) {
      return Response.json(
        { message: "Feedback message is too long" },
        { status: 400 }
      )
    }

    const safeRating =
      typeof rating === "number" && rating >= 1 && rating <= 5
        ? Math.round(rating)
        : 5

    const user = await upsertUserFromClerk(userId)

    const [entry] = await getDb()
      .insert(feedbackEntries)
      .values({
        userId: user.id,
        role: role.trim(),
        feedback: feedback.trim(),
        rating: safeRating,
        status: "approved",
      })
      .returning()

    if (!entry) throw new Error("Insert returned no row")

    return Response.json(
      {
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
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Feedback submit failed:", error)

    return Response.json(
      { message: "Failed to submit feedback" },
      { status: 500 }
    )
  }
}
