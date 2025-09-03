import { db } from "@/drizzle/db"
import {
  JobInfoTable,
  questionDifficulties,
  QuestionTable,
} from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { insertQuestion } from "@/features/questions/db"
import { getQuestionJobInfoTag } from "@/features/questions/dbCache"
import { canCreateQuestion } from "@/features/questions/permissions"
import { PLAN_LIMIT_MESSAGE } from "@/lib/errorToast"
import { generateAiQuestion } from "@/services/ai/questions"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { createDataStreamResponse } from "ai"
import { and, asc, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import z from "zod"

const schema = z.object({
  prompt: z.enum(questionDifficulties),
  jobInfoId: z.string().min(1),
})

export async function POST(req: Request) {
  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return new Response("Error generating your question", { status: 400 })
  }

  const { prompt: difficulty, jobInfoId } = result.data
  const { userId } = await getCurrentUser()

  if (userId == null) {
    return new Response("You are not logged in", { status: 401 })
  }

  if (!(await canCreateQuestion())) {
    return new Response(PLAN_LIMIT_MESSAGE, { status: 403 })
  }

  const jobInfo = await getJobInfo(jobInfoId, userId)
  if (jobInfo == null) {
    return new Response("You do not have permission to do this", {
      status: 403,
    })
  }

  const previousQuestions = await getQuestions(jobInfoId)

  return createDataStreamResponse({
    execute: async dataStream => {
      const res = generateAiQuestion({
        previousQuestions,
        jobInfo,
        difficulty,
        onFinish: async question => {
          const { id } = await insertQuestion({
            text: question,
            jobInfoId,
            difficulty,
          })

          dataStream.writeData({ questionId: id })
        },
      })
      res.mergeIntoDataStream(dataStream, { sendUsage: false })
    },
  })
}

async function getQuestions(jobInfoId: string) {
  "use cache"
  cacheTag(getQuestionJobInfoTag(jobInfoId))

  return db.query.QuestionTable.findMany({
    where: eq(QuestionTable.jobInfoId, jobInfoId),
    orderBy: asc(QuestionTable.createdAt),
  })
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
