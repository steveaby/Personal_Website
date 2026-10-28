import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { Mail, Copy, Check, Terminal, Send, Sparkles, X, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Common/Icons';
import confetti from 'canvas-confetti';

export default function ContactView({ onClose, currentView }) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (currentView !== 'contact') return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      setMessage('');
      setSent(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        className="glass-panel-cyan w-full max-w-3xl rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.25)] border border-emerald-500/40 relative max-h-[90vh]"
      >
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-tr"></div>
        <div className="hud-corner-bl"></div>
        <div className="hud-corner-br"></div>

        {/* Top Header */}
        <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Terminal size={20} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                COMMUNICATIONS PROTOCOL // CONTACT NODE
              </div>
              <h2 className="text-xl font-extrabold text-white font-heading tracking-wide">
                INITIATE DIRECT CONNECTION
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/50 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email */}
            <button
              onClick={handleCopyEmail}
              className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400 transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                  <Mail size={18} />
                </div>
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={14} className="text-slate-500 group-hover:text-cyan-400" />}
              </div>
              <div className="mt-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Email</div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {profileData.email}
                </div>
                <div className="text-[9px] text-cyan-400 mt-1 font-mono">
                  {copied ? 'COPIED TO CLIPBOARD' : 'CLICK TO COPY'}
                </div>
              </div>
            </button>

            {/* LinkedIn */}
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/30 hover:border-purple-400 transition-all text-left flex flex-col justify-between group no-underline"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-500/30">
                  <LinkedinIcon size={18} />
                </div>
                <ExternalLink size={14} className="text-slate-500 group-hover:text-purple-400" />
              </div>
              <div className="mt-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Professional Network</div>
                <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                  {profileData.linkedinHandle}
                </div>
                <div className="text-[9px] text-purple-400 mt-1 font-mono">
                  OPEN PROFILE ↗
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 hover:border-emerald-400 transition-all text-left flex flex-col justify-between group no-underline"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  <GithubIcon size={18} />
                </div>
                <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400" />
              </div>
              <div className="mt-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Source Repositories</div>
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {profileData.githubHandle}
                </div>
                <div className="text-[9px] text-emerald-400 mt-1 font-mono">
                  VIEW CODE ↗
                </div>
              </div>
            </a>
          </div>

          {/* Quick Terminal Message Form */}
          <form onSubmit={handleSendMessage} className="glass-panel p-5 rounded-xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal size={14} />
                <span>DIRECT TERMINAL DISPATCH</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">ENCRYPTED // TLS 1.3</span>
            </div>

            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter transmission / inquiry for Steve Aby Tonio..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 font-mono focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="text-[10px] text-slate-400 font-mono">
                {sent ? (
                  <span className="text-emerald-400 font-bold">✓ TRANSMISSION DISPATCHED TO stonio2@illinois.edu</span>
                ) : (
                  <span>STATUS: READY FOR TRANSMISSION</span>
                )}
              </div>

              <button
                type="submit"
                className="cyber-button text-xs py-2 px-4 flex items-center gap-2"
                style={{ borderColor: '#10b981', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0, 243, 255, 0.2))' }}
              >
                <Send size={13} />
                <span>DISPATCH MESSAGE</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
