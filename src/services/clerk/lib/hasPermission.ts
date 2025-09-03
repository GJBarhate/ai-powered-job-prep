import { auth } from "@clerk/nextjs/server"

type Permission =
  | "unlimited_resume_analysis"
  | "unlimited_interviews"
  | "unlimited_questions"
  | "1_interview"
  | "5_questions"

export async function hasPermission(permission: Permission) {
  const { has } = await auth()
  return has({ feature: permission })
}
