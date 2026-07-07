import type { NextFunction, Request, Response } from "express"
import { clerkClient, getAuth } from "@clerk/express"

import { env } from "../config/env.js"
import { getAuthenticatedClerkUserId } from "../lib/clerkAuth.js"

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId: authUserId } = getAuth(req)
  const userId = authUserId || (await getAuthenticatedClerkUserId(req))

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  const user = await clerkClient.users.getUser(userId)

  const primaryEmail = user.emailAddresses.find(
    (email: { id: string; emailAddress: string }) =>
      email.id === user.primaryEmailAddressId
  )

  if (primaryEmail?.emailAddress !== env.ADMIN_EMAIL) {
    return res.status(403).json({
      message: "Admin access required",
    })
  }

  next()
}