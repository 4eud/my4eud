import { guestbookMessages, type GuestbookMessage, type InsertGuestbookMessage } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  getGuestbookMessages(): Promise<GuestbookMessage[]>;
  createGuestbookMessage(message: InsertGuestbookMessage): Promise<GuestbookMessage>;
}

export class DatabaseStorage implements IStorage {
  async getGuestbookMessages(): Promise<GuestbookMessage[]> {
    return await db.select().from(guestbookMessages).orderBy(desc(guestbookMessages.createdAt));
  }

  async createGuestbookMessage(insertMessage: InsertGuestbookMessage): Promise<GuestbookMessage> {
    const [message] = await db
      .insert(guestbookMessages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
