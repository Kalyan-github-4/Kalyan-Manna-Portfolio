import "dotenv/config"
import { and, eq } from "drizzle-orm"

import { db } from "../db/index.js"
import { feedbackEntries, users } from "../db/schema.js"

const mockFeedbacks = [
  {
    clerkUserId: "mock_feedback_naomi",
    name: "Naomi Adeyemi",
    email: "naomi@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    role: "Founder · Bloom Studio",
    rating: 5,
    feedback:
      "Kalyan delivered a clean, modern website that made our business look much more professional online.",
  },
  {
    clerkUserId: "mock_feedback_hugo",
    name: "Hugo Marchetti",
    email: "hugo@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    role: "Owner · AutoHub Rentals",
    rating: 5,
    feedback:
      "The management system made our day-to-day work much easier. We can now track customers and bookings smoothly.",
  },
  {
    clerkUserId: "mock_feedback_priya",
    name: "Priya Nair",
    email: "priya@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    role: "Marketing Lead · Loomstack",
    rating: 4,
    feedback:
      "Very professional work. The design, animations, and responsiveness were exactly what we needed.",
  },
  {
    clerkUserId: "mock_feedback_sebastian",
    name: "Sebastian Cole",
    email: "sebastian@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    role: "Creative Director",
    rating: 5,
    feedback:
      "The portfolio design helped us showcase our services beautifully and attract better client inquiries.",
  },
  {
    clerkUserId: "mock_feedback_meiling",
    name: "Mei-Ling Zhao",
    email: "meiling@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    role: "Product Designer",
    rating: 5,
    feedback:
      "Great attention to detail. The UI feels premium, smooth, and easy to use across devices.",
  },
]

async function upsertMockUser(mockUser: (typeof mockFeedbacks)[number]) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, mockUser.clerkUserId))
    .limit(1)

  if (existingUser[0]) {
    const updatedUser = await db
      .update(users)
      .set({
        name: mockUser.name,
        email: mockUser.email,
        imageUrl: mockUser.imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, mockUser.clerkUserId))
      .returning()

    return updatedUser[0]
  }

  const createdUser = await db
    .insert(users)
    .values({
      clerkUserId: mockUser.clerkUserId,
      name: mockUser.name,
      email: mockUser.email,
      imageUrl: mockUser.imageUrl,
    })
    .returning()

  return createdUser[0]
}

async function seedFeedback() {
  console.log("🌱 Seeding mock feedback...")

  for (const mock of mockFeedbacks) {
    const user = await upsertMockUser(mock)

    if (!user) {
      throw new Error(`Failed to create mock user: ${mock.name}`)
    }

    const existingFeedback = await db
      .select()
      .from(feedbackEntries)
      .where(
        and(
          eq(feedbackEntries.userId, user.id),
          eq(feedbackEntries.feedback, mock.feedback)
        )
      )
      .limit(1)

    if (existingFeedback[0]) {
      console.log(`↪ Skipped existing feedback from ${mock.name}`)
      continue
    }

    await db.insert(feedbackEntries).values({
      userId: user.id,
      role: mock.role,
      feedback: mock.feedback,
      rating: mock.rating,
      status: "approved",
    })

    console.log(`✅ Added feedback from ${mock.name}`)
  }

  console.log("✅ Mock feedback seed completed")
}

seedFeedback()
  .catch((error) => {
    console.error("❌ Feedback seed failed")
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })