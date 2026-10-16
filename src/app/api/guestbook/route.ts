import { desc, eq } from "drizzle-orm"

import { getClerkUserId, unauthorized } from "@/server/auth"
import { getDb } from "@/server/db"
import { guestbookEntries, users } from "@/server/db/schema"
import { readJsonObject } from "@/server/http"
import { upsertUserFromClerk } from "@/server/users"

export const dynamic = "force-dynamic"

// Card design is not a guest-facing choice: the client ships a fixed set of
// designed templates and each new entry is handed one of them. The ids match
// the colour words already stored in the `gradient` column, so entries written
// before templates existed still resolve to a real template.
const CARD_TEMPLATE_IDS = [
  "purple",
  "forest",
  "maroon",
  "navy",
  "ocean",
  "sunset",
] as const

function assignCardTemplate() {
  return CARD_TEMPLATE_IDS[Math.floor(Math.random() * CARD_TEMPLATE_IDS.length)]
}

// Public: only approved entries appear on the wall.
export async function GET() {
  const entries = await getDb()
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

  return Response.json({
    entries: entries.map((entry) => ({
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
}

export async function POST(request: Request) {
  try {
    const userId = await getClerkUserId(request)
    if (!userId) return unauthorized()

    const { message } = await readJsonObject(request)

    if (typeof message !== "string" || message.trim().length < 2) {
      return Response.json(
        { message: "Guestbook message is required" },
        { status: 400 }
      )
    }

    if (message.length > 300) {
      return Response.json(
        { message: "Guestbook message is too long" },
        { status: 400 }
      )
    }

    const user = await upsertUserFromClerk(userId)

    const [entry] = await getDb()
      .insert(guestbookEntries)
      .values({
        userId: user.id,
        message: message.trim(),
        // Anything style-related in the request body is ignored on purpose.
        gradient: assignCardTemplate(),
        doodles: [],
        status: "approved",
      })
      .returning()

    if (!entry) throw new Error("Insert returned no row")

    return Response.json(
      {
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
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Guestbook submit failed:", error)

    return Response.json(
      { message: "Failed to submit guestbook entry" },
      { status: 500 }
    )
  }
}
