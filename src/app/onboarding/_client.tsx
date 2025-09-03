"use client"

import { getUser, getOrCreateUser } from "@/features/users/actions"
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function OnboardingClient({ userId }: { userId: string }) {
  const router = useRouter()
  const [retryCount, setRetryCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    let timeoutId: NodeJS.Timeout | null = null

    const checkUser = async () => {
      try {
        let user = await getUser(userId)
        
        // If user doesn't exist and we've been trying for a while, use fallback
        if (user == null && retryCount >= 20 && !usedFallback) {
          console.log("[Onboarding] Using fallback user creation after 20 retries")
          setUsedFallback(true)
          try {
            user = await getOrCreateUser(userId)
          } catch (fallbackError) {
            console.error("[Onboarding] Fallback failed:", fallbackError)
            setError("Unable to create your account. Please try signing out and signing in again.")
            return
          }
        }
        
        if (user != null) {
          if (intervalId) clearInterval(intervalId)
          if (timeoutId) clearTimeout(timeoutId)
          router.replace("/app")
          return
        }

        // Increment retry count
        setRetryCount(prev => prev + 1)

        // If we've been trying for too long, show error
        if (retryCount >= 120) { // 120 attempts * 1000ms = 2 minutes
          if (intervalId) clearInterval(intervalId)
          if (timeoutId) clearTimeout(timeoutId)
          setError("Account creation is taking longer than expected. Please try refreshing the page or contact support.")
          return
        }
      } catch (error) {
        console.error("Error checking user:", error)
        setRetryCount(prev => prev + 1)

        if (retryCount >= 120) {
          if (intervalId) clearInterval(intervalId)
          if (timeoutId) clearTimeout(timeoutId)
          setError("There was an error creating your account. Please try refreshing the page or contact support.")
        }
      }
    }

    // Initial check
    checkUser()

    // Set up polling with exponential backoff
    const startPolling = () => {
      const delay = Math.min(1000 + (retryCount * 100), 5000) // Start at 1s, increase by 100ms each retry, max 5s
      intervalId = setInterval(checkUser, delay)
    }

    startPolling()

    // Set absolute timeout after 3 minutes
    timeoutId = setTimeout(() => {
      if (intervalId) clearInterval(intervalId)
      setError("Account creation timed out. Please try refreshing the page or contact support.")
    }, 180000) // 3 minutes

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [userId, router, retryCount, usedFallback])

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => {
            setError(null)
            setRetryCount(0)
            setUsedFallback(false)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Loader2Icon className="animate-spin size-24 mx-auto mb-4" />
      <p className="text-muted-foreground">
        {usedFallback 
          ? "Finalizing your account setup..." 
          : retryCount > 10 
            ? "Still working on it..." 
            : "Setting up your account..."
        }
      </p>
      {retryCount > 30 && !usedFallback && (
        <p className="text-sm text-muted-foreground mt-2">
          This is taking longer than usual. Please wait a moment...
        </p>
      )}
    </div>
  )
}
