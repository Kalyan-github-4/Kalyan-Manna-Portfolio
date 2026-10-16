import { createClerkClient, verifyToken } from "@clerk/backend"

const DEFAULT_ADMIN_EMAIL = "kalyanmanna439@gmail.com"

function secretKey() {
  const key = process.env.CLERK_SECRET_KEY
  if (!key) throw new Error("CLERK_SECRET_KEY is missing")
  return key
}

export function clerk() {
  return createClerkClient({ secretKey: secretKey() })
}

export async function getClerkUserId(request: Request) {
  const [scheme, token] = (request.headers.get("authorization") ?? "").split(" ")
  if (scheme !== "Bearer" || !token) return null

  try {
    const payload = await verifyToken(token, { secretKey: secretKey() })
    return payload.sub ?? null
  } catch {
    return null
  }
}

export async function getPrimaryEmail(clerkUserId: string) {
  const user = await clerk().users.getUser(clerkUserId)
  return (
    user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
      ?.emailAddress ?? null
  )
}

/** Resolves to an error Response when the caller is not the admin, else null. */
export async function rejectNonAdmin(request: Request) {
  const userId = await getClerkUserId(request)
  if (!userId) return unauthorized()

  const adminEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL
  if ((await getPrimaryEmail(userId)) !== adminEmail) {
    return Response.json({ message: "Admin access required" }, { status: 403 })
  }

  return null
}

export function unauthorized() {
  return Response.json({ message: "Unauthorized" }, { status: 401 })
}
