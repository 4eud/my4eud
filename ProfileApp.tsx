import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, ThumbsDown, Star, Music } from "lucide-react";

export function ProfileApp() {
   return (
      <div className="h-full flex flex-col">
         <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100/50">
            <div className="w-20 h-20 rounded-full bg-slate-200 shadow-inner border-4 border-white overflow-hidden relative group">
               {/* User Avatar */}
               <img
                  src="/assets/images/profile-avatar.png"
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Maria's Profile"
               />
            </div>
            <div>
               <h1 className="text-2xl font-bold text-slate-800">
                  about maria 🌐
               </h1>
               <p className="text-slate-500 italic">
                  16 / south-east asian / estj / cabin 13
               </p>
               <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                     online
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200">
                     mood: hungry :({" "}
                  </span>
               </div>
            </div>
         </div>

         <Tabs defaultValue="about" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start bg-slate-100/80 p-1 border border-slate-200 rounded-lg mb-4">
               <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600"
               >
                  About
               </TabsTrigger>
               <TabsTrigger
                  value="likes"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-rose-500"
               >
                  Likes
               </TabsTrigger>
               <TabsTrigger
                  value="dislikes"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-600"
               >
                  Dislikes
               </TabsTrigger>
               <TabsTrigger
                  value="media"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600"
               >
                  Favorites
               </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
               <TabsContent value="about" className="mt-0 space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        🖥️ intro.txt
                     </h3>
                     <p className="text-slate-600 leading-relaxed text-sm">
                        hey! i'm maria :)) welcome to my profile! i'm 16 years
                        old, turning 17 this year. i'm from the philippines
                        (south-east asian :P). i'm in a LOT of fandoms, love to
                        code, eat, sleep, geek out at certain times, and repeat
                        xD
                     </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        👤 before you follow/interact.txt
                     </h3>
                     <p className="text-slate-600 leading-relaxed text-sm">
                        (1) i don't send the whole, complete message at once (i
                        usually send it in multiple parts, sometimes i even add
                        messages that aren't in line with the current topic) /
                        (2) i have braindead humor and will find unfunny things
                        funny / (3) i am a very sarcastic person and will say
                        things that are not in line with what i'm feeling (one
                        thing is for sure, i'm not exactly good w/ being blunt)
                        / (4) i'll try to remember everything about me that you
                        should probably know, i'll get back to this xdxd
                     </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        ❌ do not follow/interact if.txt
                     </h3>
                     <p className="text-slate-600 leading-relaxed text-sm">
                        (1) we don't have anything in common / (2) can't handle
                        sarcasm / (3) prejudiced views against groups of people
                        / (4) superiority complex (because let's be real, you're
                        not better than me LOL) / (5) i will also get back to
                        this
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-blue-50/50 p-3 rounded border border-blue-100">
                        <span className="text-xs text-blue-400 font-bold uppercase">
                           location
                        </span>
                        <p className="text-sm font-medium text-slate-700">
                           borderlands
                        </p>
                     </div>
                     <div className="bg-blue-50/50 p-3 rounded border border-blue-100">
                        <span className="text-xs text-blue-400 font-bold uppercase">
                           occupation
                        </span>
                        <p className="text-sm font-medium text-slate-700">
                           sub(web) surfer
                        </p>
                     </div>
                  </div>
               </TabsContent>

               <TabsContent value="likes" className="mt-0">
                  <div className="bg-rose-50/50 p-4 rounded-lg border border-rose-100">
                     <h3 className="font-bold text-rose-700 mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 fill-rose-500" /> mwa mwa mwa
                     </h3>
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                        {[
                           "coding/programming",
                           "cooking",
                           "badminton",
                           "karate",
                           "cloudy/windy/rainy days",
                           "sitcoms",
                           "oatmeal cookies",
                           "alice in borderland",
                           "kdrama/cdrama/jdrama",
                           "punk pop/rock",
                           "green",
                           "kpop",
                           "bounty (the chocolate)",
                           "seafood",
                           "newtina (newt scamander x tina goldstein)",
                           "timtams",
                           "mochi ice cream",
                           "beaches"
                        ].map((item) => (
                           <li
                              key={item}
                              className="flex items-center gap-2 bg-white px-3 py-2 rounded shadow-sm border border-rose-100/50"
                           >
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />{" "}
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
               </TabsContent>

               <TabsContent value="dislikes" className="mt-0">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                     <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4" /> nah nah nah
                     </h3>
                     <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-2">
                           <span className="text-red-400">×</span> people w/
                           superior/god-complex
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-red-400">×</span> minimalism
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-red-400">×</span> programming
                           errors
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-red-400">×</span> people who think differing dreams = inferior
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-red-400">×</span>people who leave messages on read (just say you hate me...)
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-red-400">×</span> trash opinions should be pegged up in your asses 
                        </li>
                     </ul>
                  </div>
               </TabsContent>

               <TabsContent value="media" className="mt-0 space-y-4">
                  <div className="space-y-3">
                     <h3 className="font-bold text-purple-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <Music className="w-4 h-4" /> Top Songs
                     </h3>
                     {[
                        { title: "Supersonic", artist: "fromis_9" },
                        { title: "Afterschool", artist: "Weeekly" },
                        { title: "Good", artist: "Better Than Ezra" },
                        { title: "Boys Don't Cry", artist: "The Cure" },
                        { title: "The Middle", artist: "Jimmy Eat World" },
                        { title: "Crush", artist: "Ethel Cain" },
                        { title: "Outbound", artist: "After" },
                        { title: "Things I'll Never Say", artist: "Avril Lavigne" },
                        { title: "Amnesia", artist: "5SOS" },
                     ].map((song, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between bg-white p-3 rounded border border-purple-100 hover:shadow-md transition-shadow cursor-default group"
                        >
                           <div className="flex flex-col">
                              <span className="font-bold text-slate-800 text-sm group-hover:text-purple-600 transition-colors">
                                 {song.title}
                              </span>
                              <span className="text-xs text-slate-500">
                                 {song.artist}
                              </span>
                           </div>
                           <div className="text-xs text-slate-300 font-mono">
                              0{i + 1}
                           </div>
                        </div>
                     ))}
                  </div>
               </TabsContent>
            </div>
         </Tabs>
      </div>
   );
}
