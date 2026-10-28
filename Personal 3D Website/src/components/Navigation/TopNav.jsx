import { Sparkles, Mail, Layers, Cpu, User, PhoneCall } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Common/Icons';
import { profileData } from '../../data/profile';

export default function TopNav({ currentView, setView }) {
  const navItems = [
    { id: 'portfolio', label: 'WORKS', icon: Layers },
    { id: 'skills', label: 'EXPERTISE', icon: Cpu },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'contact', label: 'CONTACT', icon: PhoneCall },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 pointer-events-none flex items-center justify-between">
      {/* Left Winner / Status Tag & Identity */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div 
          onClick={() => setView('overview')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-xs font-bold tracking-wider uppercase cursor-pointer hover:border-cyan-300 transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)]"
        >
          <Sparkles size={14} className="animate-spin text-cyan-300" style={{ animationDuration: '6s' }} />
          <span>SPATIAL WORKSTATION</span>
        </div>

        <button 
          onClick={() => setView('overview')}
          className="text-left group cursor-pointer bg-transparent border-none"
        >
          <div className="text-white font-extrabold text-sm sm:text-base tracking-wider font-heading group-hover:text-cyan-400 transition-colors">
            STEVE ABY TONIO
          </div>
          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <span className="text-cyan-400 font-semibold">MS CS @ UIUC</span>
            <span>•</span>
            <span className="text-purple-400">AI & ML Specialist</span>
          </div>
        </button>
      </div>

      {/* Center Main Header Banner (Mathematically centered across full viewport) */}
      {currentView === 'overview' && (
        <div className="hidden lg:flex flex-col items-center justify-center text-center pointer-events-auto absolute left-1/2 top-4 -translate-x-1/2">
          <h1 className="text-2xl xl:text-3xl font-extrabold tracking-widest text-white font-heading glow-cyan">
            STEVE ABY TONIO
          </h1>
          <div className="text-sm font-semibold tracking-wider text-cyan-400 font-mono mt-0.5">
            MS CS @ UIUC
          </div>
          <div className="text-xs tracking-widest text-slate-400 uppercase font-mono mt-0.5">
            INTERACTIVE 3D WEB DEVELOPER & AI ARCHITECT
          </div>
        </div>
      )}

      {/* Right Navigation Links & Social Icons */}
      <div className="flex items-center gap-6 pointer-events-auto">
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(isActive ? 'overview' : item.id)}
                className={`relative px-3 py-1 text-xs font-bold tracking-widest font-heading transition-all cursor-pointer bg-transparent border-none ${
                  isActive ? 'text-cyan-400 glow-cyan' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_#00f3ff]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Vertical divider */}
        <div className="hidden md:block w-px h-5 bg-slate-700/60"></div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={profileData.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all"
            title="GitHub Profile"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-purple-400 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            title="Send Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
