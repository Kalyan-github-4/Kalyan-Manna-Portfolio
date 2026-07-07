import type { Request } from "express"
import { getAuth, verifyToken } from "@clerk/express"

import { env } from "../config/env.js"

function getBearerToken(authorizationHeader: string | undefined) {
  if (!authorizationHeader) return null

  const [scheme, token] = authorizationHeader.split(" ")

  if (scheme !== "Bearer" || !token) return null

  return token
}

export async function getAuthenticatedClerkUserId(req: Request) {
  const auth = getAuth(req)
  if (auth.userId) return auth.userId

  const token = getBearerToken(req.headers.authorization)
  if (!token) return null

  try {
    const payload = await verifyToken(token, {
      secretKey: env.CLERK_SECRET_KEY,
      headerType: ["Bearer"],
    })

    return payload.sub ?? null
  } catch {
    return null
  }
}