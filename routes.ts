import { z } from 'zod';
import { insertGuestbookSchema, guestbookMessages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  guestbook: {
    list: {
      method: 'GET' as const,
      path: '/api/guestbook',
      responses: {
        200: z.array(z.custom<typeof guestbookMessages.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/guestbook',
      input: insertGuestbookSchema,
      responses: {
        201: z.custom<typeof guestbookMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type GuestbookMessage = z.infer<typeof api.guestbook.list.responses[200]>[number];
export type InsertGuestbookMessage = z.infer<typeof api.guestbook.create.input>;
