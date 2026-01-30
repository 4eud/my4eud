import { useState } from "react";
import { useGuestbookMessages, useCreateGuestbookMessage } from "@/hooks/use-guestbook";
import { Loader2, Send, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export function GuestbookApp() {
  const { data: messages, isLoading } = useGuestbookMessages();
  const createMessage = useCreateGuestbookMessage();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    createMessage.mutate(
      { name, message },
      {
        onSuccess: () => {
          setMessage("");
          // Keep name for convenience
        }
      }
    );
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 shadow-sm">
        <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-2">
          <MessageSquare className="w-5 h-5" />
          sign da guestbook please?
        </h2>
        <p className="text-sm text-blue-600/80">leave a message plslslsls</p>
        
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="your name :P"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-inner bg-white/80"
            disabled={createMessage.isPending}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-inner bg-white/80"
              disabled={createMessage.isPending}
            />
            <button
              type="submit"
              disabled={createMessage.isPending || !message.trim() || !name.trim()}
              className="aero-button px-4 py-2 rounded font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createMessage.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Sign
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center p-8 text-blue-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : messages?.length === 0 ? (
          <div className="text-center p-8 text-slate-400 italic bg-slate-50 rounded border border-dashed border-slate-200">
            No messages yet. Be the first!
          </div>
        ) : (
          messages?.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs flex items-center justify-center shadow-sm">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  {msg.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {msg.createdAt && format(new Date(msg.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-8">
                {msg.message}
              </p>
              
              {/* Decorative quote */}
              <div className="absolute top-2 left-2 text-slate-100 -z-10 text-4xl font-serif">"</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
