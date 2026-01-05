import React from "react";
import { Code2, Heart } from "lucide-react";

export default function DeveloperFooter() {
  return (
    <footer className="relative py-20 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#000000] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Elegant divider line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#a6b1ff] to-transparent mb-16" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
              Take learning beyond the classroom—one challenge at a time
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
            <button
              onClick={() => window.location.href = "/auth/signup"}
              className="text-sm font-bold text-white hover:text-[#a6b1ff] transition-all duration-300 tracking-wider uppercase"
            >
              Start Free
            </button>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <button
              onClick={() => {/* Logic for sponsor CTA */ }}
              className="text-sm font-bold text-white hover:text-[#ffb585] transition-all duration-300 tracking-wider uppercase"
            >
              Sponsor a Challenge
            </button>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span>© 2026 Techxplora</span>
            <span className="text-white/20">•</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-2 italic">
            <span>Crafted with care for learners everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}