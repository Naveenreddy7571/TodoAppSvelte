import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const todos=sqliteTable("todos",{
    id:integer("id").primaryKey().notNull(),
    title:text("title"),
    completed: integer("completed", { mode: "boolean" }).notNull().default(false), 
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`), 
}) 
