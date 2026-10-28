import React from 'react';
import { profileData } from '../../data/profile';
import { User, GraduationCap, Briefcase, BookOpen, Award, Sparkles, X, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Common/Icons';

export default function AboutMeView({ onClose, currentView }) {
  if (currentView !== 'about') return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        className="glass-panel-cyan w-full max-w-4xl rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.25)] border border-cyan-500/40 relative max-h-[90vh]"
      >
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-tr"></div>
        <div className="hud-corner-bl"></div>
        <div className="hud-corner-br"></div>

        {/* Top Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <User size={20} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                HUMANOID PRESENTATION POD // BIOGRAPHY
              </div>
              <h2 className="text-xl font-extrabold text-white font-heading tracking-wide">
                ABOUT STEVE ABY TONIO
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/50 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Profile Overview Card */}
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/30 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative flex-shrink-0">
              <img 
                src={profileData.photo} 
                alt={profileData.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,243,255,0.4)]"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold font-mono px-2.5 py-0.5 rounded-full border border-slate-950">
                ACTIVE
              </span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                <Sparkles size={13} /> {profileData.status}
              </div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                {profileData.name}
              </h3>
              <div className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono">
                {profileData.headline}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {profileData.bio}
              </p>
            </div>
          </div>

          {/* Education & Corporate Experience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UIUC Education Card */}
            <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-heading font-bold text-sm">
                <GraduationCap size={18} />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-sm font-bold text-white">University of Illinois Urbana-Champaign</div>
                <div className="text-xs text-cyan-300 font-mono mt-0.5">Master of Science in Computer Science (MS CS)</div>
                <div className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Focus: Artificial Intelligence, Natural Language Processing, Neural Vector Spaces & Scalable High-Concurrency Systems.
                </div>
              </div>
            </div>

            {/* Barclays Corporate Role Card */}
            <div className="glass-panel p-5 rounded-xl border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-heading font-bold text-sm">
                  <Briefcase size={18} />
                  <span>CORPORATE EXPERIENCE</span>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
                  Barclays PLC
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <img src="/assets/barclays_logo.jpeg" alt="Barclays" className="w-10 h-10 rounded-lg object-contain bg-white p-1" />
                  <div>
                    <div className="text-sm font-bold text-white">Graduate Analyst (SDE II)</div>
                    <div className="text-xs text-emerald-400 font-semibold">⚡ 5x Operational Efficiency</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Engineered automated cloud delivery pipelines & transactional middleware, cutting manual workload by 80%.
                </div>
              </div>
            </div>
          </div>

          {/* Research & Publications Section */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-heading font-bold text-sm">
                <BookOpen size={18} />
                <span>PEER-REVIEWED PUBLICATION</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/40 font-bold">
                SPRINGER NATURE
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <img 
                src="/assets/VectorQuest.jpg" 
                alt="Springer Nature Publication" 
                className="w-full sm:w-28 h-20 object-cover rounded-lg border border-slate-700 flex-shrink-0"
              />
              <div className="space-y-1 text-left">
                <div className="text-sm font-bold text-white">
                  Optimized Multi-Modal Question Answering via Compressed Vector Spaces
                </div>
                <div className="text-xs text-cyan-300 font-mono">
                  Springer Nature • Co-Authored Research
                </div>
                <div className="text-xs text-slate-400">
                  Delivered 50x faster QA prediction speeds through innovative vector topological quantization.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
