"use server"

import { revalidateTag } from "next/cache"
import { getUserIdTag } from "./dbCache"
import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { upsertUser } from "./db"
import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"

export async function getUser(id: string) {
  // Remove cache for more reliable user lookup during onboarding
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  })
}

export async function getUserCached(id: string) {
  "use cache"
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  })
}

export async function getOrCreateUser(id: string) {
  // First try to get the user from database (no cache)
  let user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  })

  // If user doesn't exist, create them using Clerk data
  if (!user) {
    console.log("[Fallback] User not found in database, creating from Clerk data:", id)
    try {
      const { userId } = await auth()
      if (userId !== id) {
        throw new Error("Unauthorized: User ID mismatch")
      }

      const client = await clerkClient()
      const clerkUser = await client.users.getUser(id)
      const email = clerkUser.emailAddresses.find(
        (e: any) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress

      if (!email) {
        throw new Error("No primary email found")
      }

      const userData = {
        id: clerkUser.id,
        email,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
        imageUrl: clerkUser.imageUrl || '',
        createdAt: new Date(clerkUser.createdAt),
        updatedAt: new Date(clerkUser.updatedAt),
      }

      await upsertUser(userData)
      console.log("[Fallback] User created successfully:", id)
      
      // Force cache invalidation
      revalidateTag(getUserIdTag(id))
      revalidateTag('users')
      
      // Fetch the newly created user
      user = await db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
      })
    } catch (error) {
      console.error("[Fallback] Error creating user:", error)
      throw error
    }
  }

  return user
}
