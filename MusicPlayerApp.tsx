import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Music, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function MusicPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.getElementById('bg-music') as HTMLAudioElement;
    if (audioRef.current) {
      setIsPlaying(!audioRef.current.paused);
      setVolume([audioRef.current.volume * 100]);
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/30 shadow-xl p-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-400 to-emerald-400 shadow-2xl flex items-center justify-center relative overflow-hidden group">
          <Music className="w-24 h-24 text-white drop-shadow-lg" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Outbound</h2>
          <p className="text-slate-500 font-medium">After</p>
        </div>

        <div className="flex items-center gap-8">
          <button className="text-slate-400 hover:text-blue-500 transition-colors">
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-all active:scale-95"
          >
            {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
          </button>
          <button className="text-slate-400 hover:text-blue-500 transition-colors">
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        <div className="w-full space-y-2">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-slate-400" />
            <Slider 
              value={volume} 
              onValueChange={handleVolumeChange} 
              max={100} 
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
