import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelpers"
import { JobInfoTable } from "./jobInfo"
import { relations } from "drizzle-orm/relations"
import { text } from "drizzle-orm/pg-core"

export const InterviewTable = pgTable("interviews", {
  id,
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  duration: varchar({ length: 50 }).notNull(),
  humeChatId: varchar({ length: 255 }),
  feedback: text("feedback"),
  createdAt,
  updatedAt,
})

export const interviewRelations = relations(InterviewTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [InterviewTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}))
