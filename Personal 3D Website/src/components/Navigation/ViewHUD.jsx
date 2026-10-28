import React, { useEffect } from 'react';
import { ArrowLeft, Monitor, Cpu, User, PhoneCall, Sparkles } from 'lucide-react';

export default function ViewHUD({ currentView, setView }) {
  const isOverview = currentView === 'overview';

  // Listen for ESC key to return to overview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && currentView !== 'overview') {
        setView('overview');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, setView]);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 pointer-events-none flex flex-col items-center gap-3">
      {/* Prominent Sci-Fi Back Button when in any focused section */}
      {!isOverview && (
        <div className="pointer-events-auto animate-fade-in">
          <button
            onClick={() => setView('overview')}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/90 hover:bg-cyan-950/90 border-2 border-cyan-400 text-cyan-300 hover:text-white font-mono text-sm font-bold tracking-wider uppercase shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO WORKSTATION</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-xs text-cyan-200 border border-cyan-400/40">
              ESC
            </span>
          </button>
        </div>
      )}

      {/* Futuristic Bottom Control Island */}
      <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_35px_rgba(0,243,255,0.2)]">
        <button
          onClick={() => setView('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
            isOverview
              ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>OVERVIEW</span>
        </button>

        <button
          onClick={() => setView('portfolio')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
            currentView === 'portfolio'
              ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>PORTFOLIO</span>
        </button>

        <button
          onClick={() => setView('skills')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
            currentView === 'skills'
              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
              : 'text-slate-400 hover:text-purple-300 hover:bg-purple-500/10'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>SKILLS</span>
        </button>

        <button
          onClick={() => setView('about')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
            currentView === 'about'
              ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>ABOUT</span>
        </button>

        <button
          onClick={() => setView('contact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
            currentView === 'contact'
              ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>CONTACT</span>
        </button>
      </div>

      {/* Helper Status Tip */}
      <div className="text-[11px] font-mono text-slate-400 tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span>
          {isOverview
            ? 'ISOMETRIC WORKSTATION | Select any floating node or hardware component to explore'
            : currentView === 'portfolio'
            ? 'INTERACTIVE MONITOR WEBPAGE | Scroll inside monitor screen to explore projects & research'
            : currentView === 'skills'
            ? 'EXPLODED PC ARCHITECTURE | Inspect CPU, GPU, and Enterprise Infrastructure'
            : currentView === 'about'
            ? 'HUMANOID BOT BIOMETRIC POD | View UIUC Master of Science profile & publications'
            : 'SMARTPHONE HOLOGRAPHIC PROJECTION | Copy email or dispatch live ping'}
        </span>
      </div>
    </div>
  );
}
