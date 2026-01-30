import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Share2, MoreHorizontal, X } from "lucide-react";

const IMAGES = [
  {
    url: "/assets/images/gallery/shaylas.jpg",
    caption: "my shaylas:)",
    likes: "2.4k",
    tags: ["#shaylas", "#style"]
  },
  {
    url: "/assets/images/gallery/newt1.jpg",
    caption: "my handsome newt scamander",
    likes: "1.8k",
    tags: ["#newtscamander", "#fantasticbeasts"]
  },
  {
    url: "/assets/images/gallery/newtina1.jpg",
    caption: "newtina4ever",
    likes: "3.2k",
    tags: ["#newtina", "#otp"]
  },
  {
    url: "/assets/images/gallery/newtina2.jpg",
    caption: "MORE NEWTINAAAA",
    likes: "2.9k",
    tags: ["#newtina", "#love"]
  },
  {
    url: "/assets/images/gallery/brothers.jpg",
    caption: "my glorious scamander brothers",
    likes: "2.1k",
    tags: ["#scamander", "#brothers"]
  },
  {
    url: "/assets/images/gallery/newtina3.jpg",
    caption: "more newtina (because yes)",
    likes: "3.5k",
    tags: ["#newtina", "#forever"]
  }
];

export function GalleryApp() {
  const [selectedImage, setSelectedImage] = useState<typeof IMAGES[0] | null>(null);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search gallery..." 
            className="bg-transparent border-none text-sm focus:ring-0 w-full"
            readOnly
          />
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <Share2 size={18} className="text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 group hover:shadow-xl transition-all duration-300 cursor-zoom-in"
              onClick={() => setSelectedImage(img)}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={img.caption}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-white font-bold">
                    <Heart size={20} fill="white" />
                    <span>{img.likes}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800 line-clamp-1">{img.caption}</p>
                  <MoreHorizontal size={16} className="text-slate-400" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {img.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-blue-500 font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors z-[1001]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-white/20"
                alt={selectedImage.caption}
              />
              <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
                <p className="text-white text-xl font-bold">{selectedImage.caption}</p>
                <div className="flex gap-2 justify-center mt-2">
                  {selectedImage.tags.map(tag => (
                    <span key={tag} className="text-sm text-blue-300">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
