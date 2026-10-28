import React, { useState } from 'react';
import { projectCategories, projectsData } from '../../data/projects';
import { Layers, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Database, Bot, ShieldCheck, FileText, CheckCircle2, X } from 'lucide-react';
import { GithubIcon } from '../Common/Icons';

export default function PortfolioView({ onClose, currentView }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);

  const handleNextImage = (images, e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (images, e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (currentView !== 'portfolio') return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        className="glass-panel-cyan w-full max-w-6xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.25)] border border-cyan-500/40 relative"
      >
        {/* Futuristic Corner Accents */}
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-tr"></div>
        <div className="hud-corner-bl"></div>
        <div className="hud-corner-br"></div>

        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Layers size={20} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                SYSTEM WORKSTATION // PORTFOLIO GRID
              </div>
              <h2 className="text-xl font-extrabold text-white font-heading tracking-wide">
                PROJECTS & TECHNICAL ARCHITECTURE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              {filteredProjects.length} MODULES LOADED
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/50 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Tabs Navigation */}
        <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {projectCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCarouselIndex(0); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                    : 'bg-slate-900/40 text-slate-400 border-slate-700/50 hover:text-white hover:border-slate-600'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isSelected = selectedProject?.id === project.id;
            const isAiVenture = project.category === 'ai_ml';
            const isFullStack = project.category === 'fullstack';
            const isCorporate = project.category === 'corporate';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group rounded-xl border p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isAiVenture
                    ? 'bg-purple-950/20 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                    : isFullStack
                    ? 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,243,255,0.25)]'
                    : 'bg-slate-900/40 border-slate-700/60 hover:border-slate-500 hover:shadow-[0_0_25px_rgba(148,163,184,0.2)]'
                }`}
              >
                {/* Category & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span 
                      className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                        isAiVenture 
                          ? 'bg-purple-500/20 border-purple-400/60 text-purple-300' 
                          : isFullStack
                          ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
                          : 'bg-slate-800 border-slate-600 text-slate-300'
                      }`}
                    >
                      {project.badge}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400">
                      {project.categoryLabel.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">
                    {project.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Media Preview (GIF / Carousel / Image / Architecture Callout) */}
                  <div className="my-4 rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950/80 relative min-h-[160px] flex items-center justify-center">
                    {/* IlliniRide Architecture Box */}
                    {project.id === 'illiniride' && (
                      <div className="p-4 w-full text-left font-mono text-[11px] space-y-2">
                        <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                          <Database size={14} /> Relational Schema & Backend Modules:
                        </div>
                        <div className="text-slate-300 text-[10px] bg-slate-900/90 p-2 rounded border border-cyan-500/20">
                          ⚡ <span className="text-cyan-300 font-semibold">Backend:</span> {project.architecture.backend}
                        </div>
                        <div className="text-slate-300 text-[10px] bg-slate-900/90 p-2 rounded border border-emerald-500/20">
                          ⚡ <span className="text-emerald-300 font-semibold">Stored Procs:</span> {project.architecture.database}
                        </div>
                        <div className="text-slate-300 text-[10px] bg-slate-900/90 p-2 rounded border border-purple-500/20">
                          ⚡ <span className="text-purple-300 font-semibold">BCNF/3NF:</span> {project.architecture.schema}
                        </div>
                      </div>
                    )}

                    {/* BugCatcher Joey Image Carousel */}
                    {project.id === 'bugcatcher-joey' && project.images.length > 0 && (
                      <div className="relative w-full h-[180px] group/carousel">
                        <img
                          src={project.images[carouselIndex]}
                          alt={`BugCatcher Slide ${carouselIndex + 1}`}
                          className="w-full h-full object-cover transition-all"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-purple-300 bg-slate-950/80 px-2 py-0.5 rounded border border-purple-500/40">
                          Slide {carouselIndex + 1} of {project.images.length}
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                          <button
                            onClick={(e) => handlePrevImage(project.images, e)}
                            className="p-1 rounded bg-slate-950/80 border border-slate-700 text-slate-200 hover:text-cyan-300"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            onClick={(e) => handleNextImage(project.images, e)}
                            className="p-1 rounded bg-slate-950/80 border border-slate-700 text-slate-200 hover:text-cyan-300"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* HyperSafety Animated GIF */}
                    {project.id === 'hypersafety' && (
                      <div className="relative w-full h-[180px]">
                        <img
                          src={project.videoOrGif}
                          alt="HyperSafety Real-Time ML System"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                          LIVE INFERENCE GIF
                        </div>
                      </div>
                    )}

                    {/* VectorQuest Springer Nature Published */}
                    {project.id === 'vectorquest' && (
                      <div className="relative w-full h-[180px]">
                        <img
                          src={project.primaryImage}
                          alt="VectorQuest Springer Research"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-purple-950/80 border border-purple-400 text-purple-300 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                          SPRINGER NATURE
                        </div>
                      </div>
                    )}

                    {/* Barclays Bank Corporate */}
                    {project.id === 'barclays-enterprise' && (
                      <div className="p-4 w-full flex items-center gap-4">
                        <img
                          src={project.primaryImage}
                          alt="Barclays Logo"
                          className="w-16 h-16 rounded-xl object-contain bg-white p-2 border border-slate-700 flex-shrink-0"
                        />
                        <div className="text-left font-mono text-[11px] space-y-1">
                          <div className="text-cyan-400 font-bold">Graduate Analyst (SDE II)</div>
                          <div className="text-slate-300">Salesforce Marketing Cloud & AMPscript Architect</div>
                          <div className="text-emerald-400 font-semibold">⚡ 5x Operational Efficiency Achieved</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 my-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 font-mono">{m.label}</div>
                        <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Tags & Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700 text-slate-300">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                    className="text-xs font-bold font-heading text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <span>INSPECT</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Inspect Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="glass-panel-cyan w-full max-w-3xl rounded-2xl p-6 sm:p-8 border border-cyan-500 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/40">
                {selectedProject.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedProject.categoryLabel}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {selectedProject.title}
            </h3>
            <div className="text-sm font-semibold text-cyan-300 mt-1">
              {selectedProject.subtitle}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed my-4">
              {selectedProject.description}
            </p>

            {/* Architecture Details if present */}
            {selectedProject.architecture && (
              <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-3 font-mono text-xs">
                <div className="text-cyan-400 font-bold text-sm">System Architecture Breakdown:</div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div><strong className="text-white">Backend Layer:</strong> {selectedProject.architecture.backend}</div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div><strong className="text-white">Database Logic:</strong> {selectedProject.architecture.database}</div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  <div><strong className="text-white">Schema Design:</strong> {selectedProject.architecture.schema}</div>
                </div>
              </div>
            )}

            {/* Tech Stack Full List */}
            <div className="my-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Technologies Used:</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 my-4">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[11px] text-slate-400 font-mono">{m.label}</div>
                  <div className="text-sm font-bold text-white mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold font-heading cursor-pointer"
              >
                CLOSE
              </button>
              {selectedProject.links?.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="cyber-button flex items-center gap-2 text-xs"
                >
                  <GithubIcon size={14} />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
