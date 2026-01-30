import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sun, Wifi, Music, Power } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function SystemTrayPopup() {
  const [volume, setVolume] = useState([70]);
  const [brightness, setBrightness] = useState([100]);
  const [wifiEnabled, setWifiEnabled] = useState(true);

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      setVolume([audio.volume * 100]);
    }
  }, []);

  const handleVolumeChange = (val: number[]) => {
    setVolume(val);
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      audio.volume = val[0] / 100;
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="fixed bottom-12 md:bottom-14 right-2 w-72 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/50 z-[100] overflow-hidden flex flex-col p-4 gap-4"
    >
      <div className="flex items-center justify-between border-b pb-2 border-slate-200">
        <span className="font-bold text-slate-700 text-sm">System Settings</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Volume2 size={16} />
            <span className="text-xs font-medium">Volume</span>
          </div>
          <span className="text-xs text-slate-400">{volume}%</span>
        </div>
        <Slider 
          value={volume} 
          onValueChange={handleVolumeChange} 
          max={100} 
          step={1}
          className="cursor-pointer"
        />
      </div>

      {/* Brightness Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Sun size={16} />
            <span className="text-xs font-medium">Brightness</span>
          </div>
          <span className="text-xs text-slate-400">{brightness}%</span>
        </div>
        <Slider 
          value={brightness} 
          onValueChange={(val) => {
            setBrightness(val);
            document.body.style.filter = `brightness(${0.5 + val[0] / 200})`;
          }} 
          max={100} 
          step={1}
          className="cursor-pointer"
        />
      </div>

      {/* Quick Toggles */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button 
          onClick={() => setWifiEnabled(!wifiEnabled)}
          className={`flex flex-col items-center gap-1 p-2 rounded-md transition-all border ${
            wifiEnabled 
              ? "bg-blue-500 text-white border-blue-400 shadow-lg" 
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          <Wifi size={18} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Wi-Fi</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-md bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 transition-colors">
          <Power size={18} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Power</span>
        </button>
      </div>

      {/* Music Quick Control (Simulation) */}
      <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white shadow-md">
          <Music size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-blue-800 truncate leading-tight">Now Playing</div>
          <div className="text-[10px] text-blue-600 truncate leading-tight">Outbound.mp3</div>
        </div>
      </div>
    </motion.div>
  );
}
