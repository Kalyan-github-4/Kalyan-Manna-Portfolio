import type { NextFunction, Request, Response } from "express"
import { getAuth } from "@clerk/express"

import { getAuthenticatedClerkUserId } from "../lib/clerkAuth.js"

export async function requireAuth(
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

  next()
}