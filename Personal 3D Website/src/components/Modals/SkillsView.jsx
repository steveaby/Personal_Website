import React, { useState } from 'react';
import { hardwareSkillsData } from '../../data/skills';
import { Cpu, Zap, Activity, HardDrive, Sparkles, X, CheckCircle2 } from 'lucide-react';

export default function SkillsView({ onClose, currentView }) {
  const [activeTab, setActiveTab] = useState('cpu');

  if (currentView !== 'skills') return null;

  const currentModule = hardwareSkillsData.find(m => m.id === activeTab) || hardwareSkillsData[0];

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        className="glass-panel-violet w-full max-w-5xl rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] border border-purple-500/40 relative"
      >
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-tr"></div>
        <div className="hud-corner-bl"></div>
        <div className="hud-corner-br"></div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-500/20 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-400">
              <Cpu size={20} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-purple-400">
                HARDWARE MAPPING // EXPERTISE
              </div>
              <h2 className="text-xl font-extrabold text-white font-heading tracking-wide">
                EXPLODED PC ARCHITECTURE & SKILL MODULES
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-purple-400 hover:bg-purple-950/50 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Layout */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Component Selectors */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
              Select Hardware Node:
            </div>
            {hardwareSkillsData.map((item) => {
              const isSelected = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                    />
                    <div>
                      <div className="text-xs font-bold text-white font-heading">{item.componentName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.label}</div>
                    </div>
                  </div>
                  <Zap size={14} className={isSelected ? 'text-purple-300' : 'text-slate-600'} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Skill Telemetry */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-panel p-6 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400">
                    COMPONENT PROFILE
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-heading mt-0.5">
                    {currentModule.componentName}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-1">
                    {currentModule.label}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono bg-purple-950/60 border border-purple-500/40 text-purple-300 px-2.5 py-1 rounded-md">
                    OVERCLOCKED ● 100%
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed my-4">
                {currentModule.description}
              </p>

              {/* Skills Tags Array */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Technologies & Frameworks:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentModule.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-purple-500/40 text-white text-xs font-mono shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                    >
                      <CheckCircle2 size={13} style={{ color: currentModule.color }} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro-Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">INTERCONNECT BUS</div>
                <div className="text-xs font-bold text-slate-200 mt-1">PCIe 5.0 x16 / High-Speed</div>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">THROUGHPUT</div>
                <div className="text-xs font-bold text-purple-400 mt-1">Ultra-Low Latency</div>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono text-slate-400">STACK READINESS</div>
                <div className="text-xs font-bold text-emerald-400 mt-1">Production Scale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
