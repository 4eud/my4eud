import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailItem {
  id: number;
  x: number;
  y: number;
}

export function MouseTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const newItem = { id: id++, x: e.clientX, y: e.clientY };
      setTrail((prev) => [...prev.slice(-15), newItem]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [1, 1.5, 0], opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(129,212,250,0.4) 100%)",
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
