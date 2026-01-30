import { motion, useDragControls } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized?: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: ReactNode;
  icon?: ReactNode;
  initialPosition?: { x: number; y: number };
}

export function Window({
  id,
  title,
  isOpen,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  children,
  icon,
  initialPosition = { x: 50, y: 50 }
}: WindowProps) {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  console.log(`Window ${id} state:`, { isOpen, isMinimized, zIndex });

  if (!isOpen) return null;

  return (
    <motion.div
      ref={constraintsRef}
      initial={{ scale: 0.5, opacity: 0, x: initialPosition.x, y: initialPosition.y }}
      animate={{ 
        scale: isMinimized ? 0 : 1, 
        opacity: isMinimized ? 0 : 1,
        y: isMinimized ? 500 : undefined 
      }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ zIndex }}
      className={cn(
        "absolute flex flex-col w-[90vw] md:w-[600px] h-[70vh] md:h-[500px] max-w-full max-h-full",
        "rounded-t-lg rounded-b-md shadow-2xl overflow-hidden",
        "bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/40",
        "pointer-events-auto"
      )}
      drag
      dragControls={dragControls}
      dragListener={false} // Only drag from handle
      dragMomentum={false}
      onPointerDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-gradient-to-b from-white via-[#e6f0ff] to-[#d0e5ff] border-b border-[#a0bce0] flex items-center justify-between px-3 select-none cursor-default"
        onPointerDown={(e) => {
          dragControls.start(e);
          onFocus();
        }}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-700">{icon}</div>}
          <span className="text-sm font-bold text-slate-700 drop-shadow-sm font-sans tracking-wide">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={onMinimize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-blue-200/50 text-slate-500 transition-colors"
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          <button
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-blue-200/50 text-slate-500 transition-colors opacity-50 cursor-not-allowed"
          >
            <Maximize2 size={12} strokeWidth={3} />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded bg-red-400/80 hover:bg-red-500 flex items-center justify-center text-white shadow-inner border border-red-600/20 transition-colors"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#f8faff] p-1 custom-scrollbar">
         <div className="h-full bg-white/50 border border-black/5 shadow-inner p-4 md:p-6">
            {children}
         </div>
      </div>
    </motion.div>
  );
}
