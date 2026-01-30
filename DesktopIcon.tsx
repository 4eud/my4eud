import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  colorClass?: string;
}

export function DesktopIcon({ label, icon, onClick, colorClass = "text-blue-500" }: DesktopIconProps) {
  const handleClick = (e: React.MouseEvent) => {
    console.log("Desktop icon clicked:", label);
    onClick();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="group flex flex-col items-center gap-1 w-24 p-2 rounded-lg hover:bg-white/10 focus:bg-white/20 focus:outline-none transition-colors"
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden",
        "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50",
        colorClass
      )}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-50 pointer-events-none" />
        <div className="drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        {/* Gloss shine */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-transparent to-transparent rotate-45 pointer-events-none" />
      </div>
      
      <span className="text-white text-xs md:text-sm font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center line-clamp-2 px-1 rounded bg-black/10 group-hover:bg-black/30 transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
