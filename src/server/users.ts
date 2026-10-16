import { clerk } from "./auth"
import { getDb } from "./db"
import { users } from "./db/schema"

export async function upsertUserFromClerk(clerkUserId: string) {
  const clerkUser = await clerk().users.getUser(clerkUserId)

  const email =
    clerkUser.emailAddresses.find(
      (address) => address.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ?? null

  const profile = {
    name: clerkUser.fullName || clerkUser.username || email || "Guest",
    email,
    imageUrl: clerkUser.imageUrl || null,
  }

  const [user] = await getDb()
    .insert(users)
    .values({ clerkUserId, ...profile })
    .onConflictDoUpdate({
      target: users.clerkUserId,
      set: { ...profile, updatedAt: new Date() },
    })
    .returning()

  if (!user) throw new Error("Failed to save user")

  return user
}
