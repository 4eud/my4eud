# Frutiger Aero Site Manual

This guide helps you customize your personal Frutiger Aero desktop experience.

## 🖼️ Customizing Images

### Lock Screen Background
To change the image seen when the website first loads:
1. Open `client/src/pages/Home.tsx`.
2. Find the line containing `bg-[url('https://images.unsplash.com/...')]`.
3. Replace the URL with your desired image link.

### Desktop Wallpaper
To change the main wallpaper:
1. Open `client/src/index.css`.
2. Find `.aero-wallpaper`.
3. You can replace the `radial-gradient` with `background-image: url('YOUR_IMAGE_URL');`.

### Adding Image Widgets
To add a personal photo as a widget on the desktop:
1. Open `client/src/pages/Home.tsx`.
2. Find the `Widgets` component definition.
3. Add a new `div` with an `img` tag inside it. For example:
   ```tsx
   <div className="w-48 h-48 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-2 shadow-xl overflow-hidden flex items-center justify-center">
     <img src="YOUR_IMAGE_URL" className="w-full h-full object-cover rounded-2xl" alt="Widget" />
   </div>
   ```
4. You can adjust the `w-48` and `h-48` to change the size.

## 🎨 Styling & Colors

### Window Appearance
The windows are styled in `client/src/components/Desktop/Window.tsx`. 
Look for the `className` section in the `motion.div`. You can adjust:
- `bg-white/90` (The `90` is opacity out of 100).
- `backdrop-blur-md` (Controls the translucency effect).

## 🎵 Background Music

The music is managed via a Spotify embed.
To change the song:
1. Open `client/src/components/Apps/MusicPlayerApp.tsx`.
2. Update the Spotify track ID in the iframe source URL.

## 📱 Mobile Responsiveness
The layout uses Tailwind CSS classes like `md:`, `sm:`, and `hidden` to adapt to different screen sizes. The desktop icons and windows automatically scale or stack for mobile devices.
