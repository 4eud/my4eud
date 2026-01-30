import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertGuestbookMessage } from "@shared/routes";

export function useGuestbookMessages() {
  return useQuery({
    queryKey: [api.guestbook.list.path],
    queryFn: async () => {
      const res = await fetch(api.guestbook.list.path);
      if (!res.ok) throw new Error("Failed to fetch messages");
      // Using parse method from schema would be better if exported, 
      // but api.guestbook.list.responses[200] is a Zod schema
      const data = await res.json();
      return api.guestbook.list.responses[200].parse(data);
    },
  });
}

export function useCreateGuestbookMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: InsertGuestbookMessage) => {
      const res = await fetch(api.guestbook.create.path, {
        method: api.guestbook.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
           const err = await res.json();
           throw new Error(err.message || "Validation failed");
        }
        throw new Error("Failed to post message");
      }
      
      const data = await res.json();
      return api.guestbook.create.responses[201].parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.guestbook.list.path] });
    },
  });
}
