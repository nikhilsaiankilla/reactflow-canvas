import React, { useState } from "react";
import { Share2, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function RightRail() {
  // Manage the dark/light toggle state locally
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="inline-flex items-center gap-3 bg-[#111111]/80 backdrop-blur-md p-1.5 rounded-xl border border-neutral-800/60 shadow-lg select-none">
      {/* 1. Share Action Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/40 transition-colors"
        aria-label="Share page"
      >
        <Share2 className="size-4" />
      </Button>

      {/* 2. Theme Toggle Switch Container */}
      <div className="flex items-center bg-neutral-950 p-0.5 rounded-lg border border-neutral-900">
        {/* Dark Mode Segment */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(true)}
          className={`w-7 h-7 rounded-md transition-all duration-200 ${
            isDarkMode
              ? "bg-neutral-800 text-white shadow-sm"
              : "text-neutral-500 hover:text-neutral-300 bg-transparent"
          }`}
        >
          <Moon className="size-3.5" />
        </Button>

        {/* Light Mode Segment */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(false)}
          className={`w-7 h-7 rounded-md transition-all duration-200 ${
            !isDarkMode
              ? "bg-neutral-200 text-black shadow-sm hover:bg-neutral-100"
              : "text-neutral-600 hover:text-neutral-400 bg-transparent"
          }`}
        >
          <Sun className="size-3.5" />
        </Button>
      </div>

      {/* 3. Circular Profile Avatar */}
      <div className="relative group cursor-pointer">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-700/50 p-[1px] transition-transform duration-200 active:scale-95">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" // Replace with your actual user avatar path
            alt="User profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Optional Online Status Dot Indicators */}
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#111]" />
      </div>
    </div>
  );
}
