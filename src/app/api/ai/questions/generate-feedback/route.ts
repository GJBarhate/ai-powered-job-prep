import { generateAiQuestionFeedback } from "@/services/ai/questions"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import z from "zod"

const schema = z.object({
  prompt: z.string().min(1),
  questionId: z.string().min(1).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      return new Response("Error generating your feedback", { status: 400 })
    }

    const { prompt: answer, questionId } = result.data
    const { userId } = await getCurrentUser()

    if (userId == null) {
      return new Response("You are not logged in", { status: 401 })
    }

    // ALWAYS generate feedback regardless of questionId
    const res = generateAiQuestionFeedback({
      question: questionId ? "Specific question" : "General interview question",
      answer,
    })

    return res.toDataStreamResponse({ sendUsage: false })
    
  } catch (error) {
    console.error("Feedback error:", error)
    return new Response("Error generating feedback", { status: 500 })
  }
}