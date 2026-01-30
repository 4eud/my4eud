import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const guestbookMessages = pgTable("guestbook_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGuestbookSchema = createInsertSchema(guestbookMessages).pick({
  name: true,
  message: true,
});

export type GuestbookMessage = typeof guestbookMessages.$inferSelect;
export type InsertGuestbookMessage = z.infer<typeof insertGuestbookSchema>;
