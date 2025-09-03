import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, redirectToSignIn } = await auth()

  return {
    userId,
    redirectToSignIn,
    user: allData && userId != null ? await getUser(userId) : undefined,
  }
}

async function getUser(id: string) {
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  })
}
