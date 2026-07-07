import { Router } from "express"
import { desc, eq } from "drizzle-orm"

import { db } from "../db/index.js"
import { guestbookEntries, users } from "../db/schema.js"
import { requireAdmin } from "../middleware/requireAdmin.js"

const router = Router()

router.get("/pending", requireAdmin, async (_req, res) => {
  const entries = await db
    .select({
      id: guestbookEntries.id,
      message: guestbookEntries.message,
      role: guestbookEntries.role,
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
    .where(eq(guestbookEntries.status, "pending"))
    .orderBy(desc(guestbookEntries.createdAt))

  return res.json({
    entries,
  })
})

router.get("/all", requireAdmin, async (_req, res) => {
  const entries = await db
    .select({
      id: guestbookEntries.id,
      message: guestbookEntries.message,
      role: guestbookEntries.role,
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
    .orderBy(desc(guestbookEntries.createdAt))

  return res.json({
    entries,
  })
})

router.patch("/:id/approve", requireAdmin, async (req, res) => {
  const entryId = req.params.id

  if (!entryId || Array.isArray(entryId)) {
    return res.status(400).json({
      message: "Invalid entry id",
    })
  }

  const updatedEntry = await db
    .update(guestbookEntries)
    .set({
      status: "approved",
      updatedAt: new Date(),
    })
    .where(eq(guestbookEntries.id, entryId))
    .returning()

  if (!updatedEntry[0]) {
    return res.status(404).json({
      message: "Entry not found",
    })
  }

  return res.json({
    message: "Entry approved",
    entry: updatedEntry[0],
  })
})

router.patch("/:id/reject", requireAdmin, async (req, res) => {
  const entryId = req.params.id

  if (!entryId || Array.isArray(entryId)) {
    return res.status(400).json({
      message: "Invalid entry id",
    })
  }

  const updatedEntry = await db
    .update(guestbookEntries)
    .set({
      status: "rejected",
      updatedAt: new Date(),
    })
    .where(eq(guestbookEntries.id, entryId))
    .returning()

  if (!updatedEntry[0]) {
    return res.status(404).json({
      message: "Entry not found",
    })
  }

  return res.json({
    message: "Entry rejected",
    entry: updatedEntry[0],
  })
})

router.delete("/:id", requireAdmin, async (req, res) => {
  const entryId = req.params.id

  if (!entryId || Array.isArray(entryId)) {
    return res.status(400).json({
      message: "Invalid entry id",
    })
  }

  const deletedEntry = await db
    .delete(guestbookEntries)
    .where(eq(guestbookEntries.id, entryId))
    .returning()

  if (!deletedEntry[0]) {
    return res.status(404).json({
      message: "Entry not found",
    })
  }

  return res.json({
    message: "Entry deleted",
  })
})

export default router