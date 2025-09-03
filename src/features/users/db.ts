import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { revalidateUserCache } from "./dbCache"
import { revalidateTag } from "next/cache"

export async function upsertUser(user: typeof UserTable.$inferInsert) {
  console.log("[DB] Upserting user:", user.id, user.email)
  
  const result = await db
    .insert(UserTable)
    .values(user)
    .onConflictDoUpdate({
      target: [UserTable.id],
      set: user,
    })

  // Force cache invalidation
  revalidateUserCache(user.id)
  
  // Also invalidate any general cache tags
  revalidateTag('users')
  
  console.log("[DB] User upserted successfully:", user.id)
  return result
}

export async function deleteUser(id: string) {
  console.log("[DB] Deleting user:", id)
  
  const result = await db.delete(UserTable).where(eq(UserTable.id, id))

  // Force cache invalidation
  revalidateUserCache(id)
  revalidateTag('users')
  
  console.log("[DB] User deleted successfully:", id)
  return result
}
