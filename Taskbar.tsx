import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Monitor, Wifi, Volume2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { SystemTrayPopup } from "./SystemTrayPopup";

interface TaskbarProps {
  windows: Array<{ id: string; title: string; icon: any; isOpen: boolean; isMinimized: boolean; }>;
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
}

export function Taskbar({ 
  windows, 
  activeWindowId, 
  onWindowClick, 
  onStartClick,
  isStartOpen 
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 md:h-12 bg-gradient-to-b from-[#3a7bd5cc] to-[#3a6073cc] backdrop-blur-md border-t border-white/30 z-50 flex items-center justify-between px-1 shadow-lg">
      
      {/* Start Button & Windows */}
      <div className="flex items-center gap-1 h-full py-1">
        <button
          onClick={onStartClick}
          className={cn(
            "h-full px-2 md:px-4 rounded-l-lg rounded-r-xl font-bold italic text-white shadow-[0_2px_5px_rgba(0,0,0,0.3)] transition-all flex items-center gap-2",
            isStartOpen 
              ? "bg-gradient-to-b from-[#1a4a2a] to-[#2d8a4e] inset-shadow" 
              : "bg-gradient-to-b from-[#3c9f56] to-[#1e5c30] hover:brightness-110"
          )}
          style={{
             textShadow: '0 1px 2px rgba(0,0,0,0.5)',
             border: '1px solid rgba(255,255,255,0.4)'
          }}
        >
          <div className="w-5 h-5 rounded-full bg-white/20 border-2 border-white/60 shadow-inner rotate-12" />
          <span className="hidden md:inline">Start</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Taskbar Items */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[60vw]">
          {windows.filter(w => w.isOpen).map((win) => (
            <button
              key={win.id}
              onClick={() => onWindowClick(win.id)}
              className={cn(
                "h-8 px-3 rounded flex items-center gap-2 min-w-[120px] max-w-[200px] transition-all border border-transparent",
                activeWindowId === win.id && !win.isMinimized
                  ? "bg-white/30 shadow-inner border-white/20 text-white"
                  : "hover:bg-white/10 text-white/90 hover:shadow-lg"
              )}
            >
              <div className="w-4 h-4 text-white drop-shadow-md">{win.icon}</div>
              <span className="text-xs truncate font-medium drop-shadow-sm">{win.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div 
        onClick={() => setIsTrayOpen(!isTrayOpen)}
        className={cn(
          "h-full flex items-center gap-2 md:gap-3 px-3 rounded-lg mx-1 my-1 border border-white/10 shadow-inner cursor-pointer transition-all active:scale-95",
          isTrayOpen ? "bg-[#1e4b6e]/60 border-white/30" : "bg-[#1e4b6e]/40 hover:bg-[#1e4b6e]/50"
        )}
      >
        <div className="flex items-center gap-2 text-white/80">
          <Wifi size={14} className={cn(!isTrayOpen && "animate-pulse")} />
          <Volume2 size={14} />
          <Monitor size={14} className="hidden sm:block" />
        </div>
        <div className="flex flex-col items-end justify-center leading-none text-white text-[10px] md:text-xs font-medium drop-shadow-md">
          <span>{format(time, "h:mm aa")}</span>
          <span className="opacity-80 hidden sm:inline">{format(time, "MM/dd/yyyy")}</span>
        </div>
      </div>

      <AnimatePresence>
        {isTrayOpen && <SystemTrayPopup />}
      </AnimatePresence>
    </div>
  );
}
