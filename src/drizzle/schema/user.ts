import { pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm/relations"
import { JobInfoTable } from "./jobInfo"

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  imageUrl: varchar().notNull(),
  createdAt,
  updatedAt,
})

export const userRelations = relations(UserTable, ({ many }) => ({
  jobInfos: many(JobInfoTable),
}))
