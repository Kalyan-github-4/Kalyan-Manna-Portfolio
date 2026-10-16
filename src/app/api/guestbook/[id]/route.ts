import { and, eq } from "drizzle-orm"

import { getClerkUserId, unauthorized } from "@/server/auth"
import { getDb } from "@/server/db"
import { guestbookEntries, users } from "@/server/db/schema"
import { invalidEntryId, isUuid } from "@/server/http"

const DELETE_WINDOW_MS = 24 * 60 * 60 * 1000

// A guest can delete their own entry within 24 hours of posting it.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const clerkUserId = await getClerkUserId(request)
  if (!clerkUserId) return unauthorized()

  const { id } = await params
  if (!isUuid(id)) return invalidEntryId()

  const db = getDb()

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1)

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 })
  }

  const ownEntry = and(
    eq(guestbookEntries.id, id),
    eq(guestbookEntries.userId, user.id)
  )

  const [entry] = await db
    .select({ createdAt: guestbookEntries.createdAt })
    .from(guestbookEntries)
    .where(ownEntry)
    .limit(1)

  if (!entry) {
    return Response.json({ message: "Entry not found" }, { status: 404 })
  }

  if (Date.now() - entry.createdAt.getTime() > DELETE_WINDOW_MS) {
    return Response.json(
      { message: "Entry can only be deleted within 24 hours of posting" },
      { status: 403 }
    )
  }

  await db.delete(guestbookEntries).where(ownEntry)

  return Response.json({ message: "Entry deleted successfully" })
}
