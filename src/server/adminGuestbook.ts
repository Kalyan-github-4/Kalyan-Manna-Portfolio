import { desc, eq } from "drizzle-orm"

import { rejectNonAdmin } from "./auth"
import { getDb } from "./db"
import { guestbookEntries, users } from "./db/schema"
import { invalidEntryId, isUuid } from "./http"

type EntryStatus = "pending" | "approved" | "rejected"

export async function listEntries(request: Request, status?: EntryStatus) {
  const denied = await rejectNonAdmin(request)
  if (denied) return denied

  const entries = await getDb()
    .select({
      id: guestbookEntries.id,
      message: guestbookEntries.message,
      gradient: guestbookEntries.gradient,
      doodles: guestbookEntries.doodles,
      status: guestbookEntries.status,
      createdAt: guestbookEntries.createdAt,
      userName: users.name,
      userEmail: users.email,
      userImageUrl: users.imageUrl,
    })
    .from(guestbookEntries)
    .innerJoin(users, eq(guestbookEntries.userId, users.id))
    .where(status ? eq(guestbookEntries.status, status) : undefined)
    .orderBy(desc(guestbookEntries.createdAt))

  return Response.json({ entries })
}

export async function setEntryStatus(
  request: Request,
  id: string,
  status: "approved" | "rejected"
) {
  const denied = await rejectNonAdmin(request)
  if (denied) return denied

  if (!isUuid(id)) return invalidEntryId()

  const [entry] = await getDb()
    .update(guestbookEntries)
    .set({ status, updatedAt: new Date() })
    .where(eq(guestbookEntries.id, id))
    .returning()

  if (!entry) {
    return Response.json({ message: "Entry not found" }, { status: 404 })
  }

  return Response.json({ message: `Entry ${status}`, entry })
}

export async function deleteEntry(request: Request, id: string) {
  const denied = await rejectNonAdmin(request)
  if (denied) return denied

  if (!isUuid(id)) return invalidEntryId()

  const [entry] = await getDb()
    .delete(guestbookEntries)
    .where(eq(guestbookEntries.id, id))
    .returning({ id: guestbookEntries.id })

  if (!entry) {
    return Response.json({ message: "Entry not found" }, { status: 404 })
  }

  return Response.json({ message: "Entry deleted" })
}
