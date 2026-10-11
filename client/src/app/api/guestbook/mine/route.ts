import { desc, eq } from "drizzle-orm"

import { getClerkUserId, unauthorized } from "@/server/auth"
import { getDb } from "@/server/db"
import { guestbookEntries, users } from "@/server/db/schema"

export async function GET(request: Request) {
  const clerkUserId = await getClerkUserId(request)
  if (!clerkUserId) return unauthorized()

  const db = getDb()

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1)

  if (!user) return Response.json({ entries: [] })

  const entries = await db
    .select()
    .from(guestbookEntries)
    .where(eq(guestbookEntries.userId, user.id))
    .orderBy(desc(guestbookEntries.createdAt))

  return Response.json({ entries })
}
