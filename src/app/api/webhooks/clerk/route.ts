import { deleteUser, upsertUser } from "@/features/users/db"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  console.log("[Webhook] Clerk webhook received")
  
  try {
    const event = await verifyWebhook(request)
    console.log("[Webhook] Event type:", event.type, "for user:", event.data.id)

    switch (event.type) {
      case "user.created":
      case "user.updated":
        const clerkData = event.data
        const email = clerkData.email_addresses.find(
          e => e.id === clerkData.primary_email_address_id
        )?.email_address
        
        if (email == null) {
          console.error("[Webhook] No primary email found for user:", clerkData.id)
          return new Response("No primary email found", { status: 400 })
        }

        const userData = {
          id: clerkData.id,
          email,
          name: `${clerkData.first_name || ''} ${clerkData.last_name || ''}`.trim() || 'User',
          imageUrl: clerkData.image_url || '',
          createdAt: new Date(clerkData.created_at),
          updatedAt: new Date(clerkData.updated_at),
        }

        console.log("[Webhook] Upserting user:", userData.id, userData.email)
        await upsertUser(userData)
        console.log("[Webhook] User upserted successfully:", userData.id)

        break
        
      case "user.deleted":
        if (event.data.id == null) {
          console.error("[Webhook] No user ID found for deletion")
          return new Response("No user ID found", { status: 400 })
        }

        console.log("[Webhook] Deleting user:", event.data.id)
        await deleteUser(event.data.id)
        console.log("[Webhook] User deleted successfully:", event.data.id)
        break
        
      default:
        console.log("[Webhook] Unhandled event type:", event.type)
        break
    }
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error)
    return new Response(`Webhook processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }

  console.log("[Webhook] Webhook processed successfully")
  return new Response("Webhook received", { status: 200 })
}
