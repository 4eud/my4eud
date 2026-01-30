import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen, Music, Image as ImageIcon, Link2, LogIn, Lock, Bell } from "lucide-react";
import { format } from "date-fns";
import { Window } from "@/components/Desktop/Window";
import { Taskbar } from "@/components/Desktop/Taskbar";
import { DesktopIcon } from "@/components/Desktop/DesktopIcon";
import { MouseTrail } from "@/components/Desktop/MouseTrail";
import { GuestbookApp } from "@/components/Apps/GuestbookApp";
import { ProfileApp } from "@/components/Apps/ProfileApp";
import { MusicPlayerApp } from "@/components/Apps/MusicPlayerApp";
import { GalleryApp } from "@/components/Apps/GalleryApp";
import { useToast } from "@/hooks/use-toast";

type AppId = "profile" | "guestbook" | "music" | "gallery" | "socials";

interface WindowState {
  id: AppId;
  title: string;
  icon: any;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const APPS: Record<AppId, { title: string; icon: any; component: any; color: string }> = {
  profile: { title: "My Profile", icon: <User />, component: ProfileApp, color: "text-blue-600" },
  guestbook: { title: "Guestbook", icon: <BookOpen />, component: GuestbookApp, color: "text-amber-700" },
  music: { title: "Background Music", icon: <Music />, component: MusicPlayerApp, color: "text-green-600" },
  gallery: { title: "Gallery", icon: <ImageIcon />, component: GalleryApp, color: "text-purple-600" },
  socials: { 
     title: "Links", 
     icon: <Link2 />, 
     component: () => (
        <div className="p-8 text-center space-y-6">
           <p className="text-slate-600 font-medium">Check out my other links!</p>
           <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <a 
                href="https://medium.com/@4eud/anthropophagy-anatomy-of-want-8533a4eca84e" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all group"
              >
                <span className="font-bold text-slate-800">Medium Article</span>
                <Link2 size={16} className="text-slate-400 group-hover:text-blue-500" />
              </a>
              <a 
                href="https://open.spotify.com/user/31nidal6ae2re7ekn5yetxp62glq?si=T_FI13zQQnSFb0xSDwUY_g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all group"
              >
                <span className="font-bold text-slate-800">Spotify</span>
                <Music size={16} className="text-slate-400 group-hover:text-green-500" />
              </a>
              <a 
                href="https://www.roblox.com/share?code=a4bc1d91caf5664293d07e511fd31298&type=Profile&source=ProfileShare&stamp=1769688444789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all group"
              >
                <span className="font-bold text-slate-800">Roblox</span>
                <Link2 size={16} className="text-slate-400 group-hover:text-red-500" />
              </a>
              <a 
                href="https://www.instagram.com/rianasau.r?igsh=cnVkcmU3ZzFwZTN2&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all group"
              >
                <span className="font-bold text-slate-800">Instagram</span>
                <Link2 size={16} className="text-slate-400 group-hover:text-pink-500" />
              </a>
              <a 
                href="https://4eud.replit.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl border border-blue-400 hover:shadow-lg transition-all group"
              >
                <span className="font-bold text-white tracking-wide">4eud</span>
                <Link2 size={16} className="text-white/80 group-hover:text-white" />
              </a>
           </div>
        </div>
     ),
     color: "text-slate-600"
  },
};

const Widgets = () => (
  <div className="absolute top-8 right-8 flex flex-col gap-6 pointer-events-none hidden md:flex">
    <div className="w-48 h-48 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/40 p-4 shadow-2xl flex flex-col items-center justify-center">
      <span className="text-slate-800/80 text-xs font-bold uppercase tracking-widest">Weather</span>
      <div className="text-slate-900 text-5xl font-light my-2 drop-shadow-sm">24°C</div>
      <span className="text-slate-800 text-sm font-medium">Mostly Sunny</span>
    </div>
    <div className="w-48 h-32 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 p-4 shadow-xl flex flex-col items-start justify-center">
      <span className="text-slate-800/80 text-xs font-bold uppercase tracking-widest">Battery</span>
      <div className="flex items-center gap-2 mt-2 w-full">
        <div className="h-4 flex-1 bg-black/10 rounded-full overflow-hidden border border-white/20">
          <div className="h-full w-[85%] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
        </div>
        <span className="text-slate-900 font-bold text-sm">85%</span>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const { toast } = useToast();
  const [windows, setWindows] = useState<WindowState[]>([
     { id: "profile", title: APPS.profile.title, icon: APPS.profile.icon, isOpen: false, isMinimized: false, zIndex: 1 },
     { id: "guestbook", title: APPS.guestbook.title, icon: APPS.guestbook.icon, isOpen: false, isMinimized: false, zIndex: 1 },
     { id: "music", title: APPS.music.title, icon: APPS.music.icon, isOpen: true, isMinimized: true, zIndex: 1 },
     { id: "gallery", title: APPS.gallery.title, icon: APPS.gallery.icon, isOpen: false, isMinimized: false, zIndex: 1 },
     { id: "socials", title: APPS.socials.title, icon: APPS.socials.icon, isOpen: false, isMinimized: false, zIndex: 1 },
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3");
    audio.play().catch(e => console.log("Sound error:", e));
  };

  const handleEnter = () => {
    setIsLocked(false);
    playNotificationSound();
    
    // Slight delay to ensure animation starts and then trigger autoplay state
    setTimeout(() => {
      setHasEntered(true);
      toast({
        title: "Welcome! 🫧",
        description: "Welcome 2 my website :33",
        duration: 5000,
      });
    }, 500);
  };

  const handleOpenWindow = (id: AppId) => {
    console.log("Opening window:", id);
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex } 
        : w
    ));
    setNextZIndex(n => n + 1);
    setActiveWindowId(id);
    setIsStartOpen(false);
  };

  const handleCloseWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const handleFocusWindow = (id: string) => {
    if (activeWindowId === id) return;
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, zIndex: nextZIndex, isMinimized: false } 
        : w
    ));
    setNextZIndex(n => n + 1);
    setActiveWindowId(id);
  };

  const handleTaskbarClick = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized || activeWindowId !== id) {
       handleFocusWindow(id);
    } else {
       handleMinimizeWindow(id);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden font-sans text-slate-900 aero-wallpaper">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0"
        style={{ backgroundImage: "url('/assets/images/wallpaper.png')" }}
      />
      <div className="absolute inset-0 bg-black/10 z-[1]" />
      
      <MouseTrail />
      
      {/* Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aero-bubble w-32 h-32 top-[10%] left-[15%] opacity-20" />
        <div className="aero-bubble w-48 h-48 top-[60%] left-[70%] opacity-10" />
        <div className="aero-bubble w-24 h-24 top-[40%] left-[80%] opacity-15" />
      </div>

      <Widgets />

      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -1000, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white"
          >
             {/* Background for lock screen specifically */}
             <div 
               className="absolute inset-0 -z-10 bg-cover bg-center" 
               style={{ backgroundImage: "url('/assets/images/wallpaper.png')" }}
             />
             <div className="absolute inset-0 -z-10 bg-black/20" />
             
             <div className="mb-12 text-center drop-shadow-lg">
                <h1 className="text-8xl md:text-9xl font-light tracking-tight">
                   {format(new Date(), "h:mm")}
                </h1>
                <p className="text-2xl md:text-3xl font-light mt-2">
                   {format(new Date(), "EEEE, MMMM d")}
                </p>
             </div>

             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl"
             >
                <div className="w-32 h-32 rounded-full border-4 border-white/50 shadow-lg overflow-hidden relative">
                   <img 
                     src="/assets/images/profile-avatar.png" 
                     className="absolute inset-0 w-full h-full object-cover" 
                     alt="User"
                   />
                </div>
                <h2 className="text-2xl font-semibold tracking-wide">Welcome Back</h2>
                
                <button 
                   onClick={handleEnter}
                   className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 transition-all active:scale-95 shadow-lg backdrop-blur"
                >
                   <LogIn size={20} />
                   <span>Enter</span>
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Environment */}
      <div className="relative h-full w-full p-2 md:p-8 flex flex-row flex-wrap md:flex-col md:content-start gap-2 md:gap-6 z-10 overflow-auto md:overflow-hidden">
        {(Object.keys(APPS) as AppId[]).map((appId) => (
          <DesktopIcon
            key={appId}
            label={APPS[appId].title}
            icon={<div className={APPS[appId].color}>{APPS[appId].icon}</div>}
            onClick={() => handleOpenWindow(appId)}
            colorClass={APPS[appId].color.replace('text-', 'bg-') + '/20'}
          />
        ))}
      </div>

      {/* Windows Layer */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <AnimatePresence>
           {windows.map((win) => {
              const AppComp = APPS[win.id as AppId].component;
              return (
                 <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    icon={win.icon}
                    isOpen={win.isOpen}
                    isMinimized={win.isMinimized}
                    zIndex={win.zIndex}
                    onClose={() => handleCloseWindow(win.id)}
                    onMinimize={() => handleMinimizeWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    // Stagger initial positions slightly
                    initialPosition={{ x: 20 + (windows.indexOf(win) * 30), y: 20 + (windows.indexOf(win) * 30) }}
                 >
                    <div className="pointer-events-auto h-full">
                      {win.id === "music" ? <AppComp autoPlay={hasEntered} /> : <AppComp />}
                    </div>
                 </Window>
              );
           })}
        </AnimatePresence>
      </div>

      {/* Start Menu (Simplified) */}
      <AnimatePresence>
         {isStartOpen && (
            <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 20, opacity: 0 }}
               className="fixed bottom-12 md:bottom-14 left-2 w-72 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/50 z-[100] overflow-hidden flex flex-col"
            >
               <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center px-4 gap-3 shadow-md z-10">
                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/50" />
                  <span className="text-white font-bold text-lg drop-shadow">User</span>
               </div>
               <div className="p-2 grid grid-cols-1 gap-1">
                  {(Object.keys(APPS) as AppId[]).map((appId) => (
                     <button
                        key={appId}
                        onClick={() => handleOpenWindow(appId)}
                        className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded transition-colors text-left"
                     >
                        <div className={`p-1 rounded ${APPS[appId].color.replace('text', 'bg')}/10`}>
                           {APPS[appId].icon}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{APPS[appId].title}</span>
                     </button>
                  ))}
               </div>
               <div className="p-2 border-t border-slate-200 bg-slate-50 flex justify-end">
                  <button 
                     onClick={() => { setIsLocked(true); setIsStartOpen(false); }}
                     className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow-sm transition-colors"
                  >
                     <Lock size={12} />
                     Lock
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleTaskbarClick}
        onStartClick={() => setIsStartOpen(!isStartOpen)}
        isStartOpen={isStartOpen}
      />

      {/* Global Background Music */}
      {hasEntered && (
        <audio id="bg-music" autoPlay loop>
          <source src="/assets/audio/outbound.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
