import React, { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PixelSwarm from './PixelSwarm';
import { projectCategories, projectsData } from '../../data/projects';
import { 
  Layers, ChevronLeft, ChevronRight, ExternalLink, Sparkles, 
  Database, Bot, ShieldCheck, BookOpen, CheckCircle2, RefreshCw, Globe, Terminal, X 
} from 'lucide-react';
import { GithubIcon } from '../Common/Icons';

export default function Monitor({ currentView, onSelectProject }) {
  const monitorRef = useRef();
  const screenLightRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loadingWebpage, setLoadingWebpage] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const isPortfolioView = currentView === 'portfolio';

  // Trigger simulated webpage boot-up loading animation when zooming in
  useEffect(() => {
    if (isPortfolioView) {
      setLoadingWebpage(true);
      setLoadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 25) + 15;
        if (progress >= 100) {
          progress = 100;
          setLoadProgress(100);
          setTimeout(() => setLoadingWebpage(false), 350);
          clearInterval(interval);
        } else {
          setLoadProgress(progress);
        }
      }, 120);

      return () => clearInterval(interval);
    } else {
      setSelectedProject(null);
      setLoadingWebpage(false);
    }
  }, [isPortfolioView]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (screenLightRef.current) {
      screenLightRef.current.intensity = isPortfolioView 
        ? 2.2 + Math.sin(t * 4) * 0.2 
        : 1.2 + Math.sin(t * 2) * 0.15;
    }
  });

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

  return (
    <group ref={monitorRef} position={[0, 1.46, -0.4]}>
      {/* Heavy Base Stand */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.04, 32]} />
        <meshStandardMaterial color="#111625" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glowing Base Ring */}
      <mesh position={[0, 0.045, 0]}>
        <ringGeometry args={[0.34, 0.38, 32]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#00f3ff" side={THREE.DoubleSide} />
      </mesh>

      {/* Articulated Monitor Arm Pillar */}
      <mesh position={[0, 0.55, -0.15]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 1.1, 0.14]} />
        <meshStandardMaterial color="#0b0e17" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cable pass-through glow line */}
      <mesh position={[0, 0.55, -0.07]}>
        <boxGeometry args={[0.02, 0.9, 0.01]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>

      {/* VESA Mount Bracket */}
      <mesh position={[0, 0.95, -0.04]}>
        <boxGeometry args={[0.3, 0.3, 0.08]} />
        <meshStandardMaterial color="#1a2236" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Curved Monitor Chassis Group */}
      <group position={[0, 1.05, 0]}>
        {/* Main Display Outer Bezel */}
        <mesh castShadow>
          <boxGeometry args={[3.2, 1.35, 0.1]} />
          <meshStandardMaterial color="#080b12" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Ambient RGB Backlight Glow Bar */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[3.0, 1.15, 0.02]} />
          <meshStandardMaterial 
            color={isPortfolioView ? "#00f3ff" : "#a855f7"} 
            emissive={isPortfolioView ? "#00f3ff" : "#a855f7"} 
            emissiveIntensity={3} 
            toneMapped={false} 
          />
        </mesh>

        {/* Display Panel Screen Surface */}
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[3.1, 1.25]} />
          <meshStandardMaterial 
            color="#030712" 
            roughness={0.1} 
            metalness={0.2}
            emissive="#001824"
            emissiveIntensity={0.6} 
          />
        </mesh>

        {/* Screen Dynamic Projection Light */}
        <pointLight 
          ref={screenLightRef}
          position={[0, 0, 0.8]} 
          color={isPortfolioView ? "#00f3ff" : "#38bdf8"} 
          intensity={1.5} 
          distance={4} 
        />

        {/* ========================================================================= */}
        {/* 1. IDLE OVERVIEW SCREEN (Rendered when looking in 3D Isometric Overview) */}
        {/* ========================================================================= */}
        {!isPortfolioView && (
          <Html
            transform
            distanceFactor={1.35}
            position={[0, 0, 0.056]}
            rotation={[0, 0, 0]}
            className="pointer-events-auto cursor-pointer"
            onClick={onSelectProject}
          >
            <div 
              style={{
                width: '880px',
                height: '350px',
                background: 'radial-gradient(ellipse at center, rgba(8, 20, 38, 0.96) 0%, rgba(4, 8, 16, 0.99) 100%)',
                border: '1.5px solid rgba(0, 243, 255, 0.5)',
                borderRadius: '10px',
                padding: '16px',
                color: '#e2e8f0',
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: 'inset 0 0 35px rgba(0, 243, 255, 0.2), 0 0 25px rgba(0, 243, 255, 0.3)',
                overflow: 'hidden',
                userSelect: 'none'
              }}
            >
              {/* Window Title Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 243, 255, 0.25)', paddingBottom: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '12px', color: '#00f3ff', letterSpacing: '1px', fontWeight: 700, marginLeft: '8px' }}>
                    WORKSPACE_OS // STEVE_ABY_TONIO [UIUC_NODE_01]
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#94a3b8' }}>
                  <span>STATUS: ONLINE</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>SYS_READY ●</span>
                </div>
              </div>

              {/* Grid Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '14px', height: 'calc(100% - 46px)' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.45)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ color: '#a855f7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>📁 /PROJECTS_&_RESEARCH</div>
                  <div style={{ color: '#10b981', paddingLeft: '8px', fontWeight: 700 }}>├── 📄 VectorQuest (Springer Nature)</div>
                  <div style={{ color: '#00f3ff', paddingLeft: '8px' }}>├── 🤖 BugCatcher Joey (AI Sim)</div>
                  <div style={{ color: '#00f3ff', paddingLeft: '8px' }}>├── 🛡️ HyperSafety (Vision ML)</div>
                  <div style={{ color: '#00f3ff', paddingLeft: '8px' }}>└── 🚀 IlliniRide (Campus DB)</div>

                  <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '6px', fontSize: '10px', color: '#00f3ff' }}>
                    ⚡ Click monitor to explore full interactive web portfolio
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.55)', border: '1px solid rgba(0, 243, 255, 0.25)', borderRadius: '8px', padding: '14px', fontSize: '11px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ color: '#38bdf8', marginBottom: '8px' }}>// Neural & Distributed Relational Clusters Ready</div>
                    <div style={{ color: '#10b981', lineHeight: '1.5' }}>
                      &gt; [INIT] UIUC MS CS Core: ACTIVE<br/>
                      &gt; [QUERY] IlliniRide SQL Triggers: Atomic seat sync (0.002ms)<br/>
                      &gt; [AI] BugCatcher Joey: MCTS predictive heuristic pipeline<br/>
                      &gt; [VISION] HyperSafety: Real-time inference streaming (60 FPS)<br/>
                      &gt; [RESEARCH] VectorQuest: Springer Nature 50x speedup
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <span style={{ padding: '3px 8px', background: 'rgba(0, 243, 255, 0.2)', border: '1px solid #00f3ff', borderRadius: '4px', color: '#00f3ff', fontSize: '10px' }}>
                      Interactive WebOS
                    </span>
                    <span style={{ padding: '3px 8px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', borderRadius: '4px', color: '#a855f7', fontSize: '10px' }}>
                      PyTorch & CUDA
                    </span>
                    <span style={{ padding: '3px 8px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '4px', color: '#10b981', fontSize: '10px' }}>
                      Node & SQL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Html>
        )}

        {/* ========================================================================= */}
        {/* 2. FOCUSED WEBPAGE INSIDE THE MONITOR (After Camera Zooms into Monitor)   */}
        {/* ========================================================================= */}
        {isPortfolioView && (
          <Html
            transform
            distanceFactor={1.05}
            position={[0, 0, 0.058]}
            rotation={[0, 0, 0]}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                width: '1060px',
                height: '450px',
                background: '#070b14',
                border: '2px solid rgba(0, 243, 255, 0.7)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontFamily: "'Space Grotesk', 'Outfit', sans-serif",
                boxShadow: '0 0 45px rgba(0, 243, 255, 0.35), inset 0 0 25px rgba(0, 243, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Web Browser Top Chrome Bar */}
              <div 
                style={{
                  background: 'rgba(11, 18, 32, 0.98)',
                  borderBottom: '1px solid rgba(0, 243, 255, 0.3)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></span>
                </div>

                {/* Cyber Browser URL Address Bar */}
                <div 
                  style={{
                    flex: 1,
                    maxWidth: '650px',
                    background: 'rgba(4, 8, 16, 0.8)',
                    border: '1px solid rgba(0, 243, 255, 0.4)',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontFamily: "'JetBrains Mono', monospace",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#94a3b8'
                  }}
                >
                  <Globe size={14} color="#00f3ff" />
                  <span style={{ color: '#00f3ff', fontWeight: 600 }}>https://</span>
                  <span style={{ color: '#ffffff' }}>steveaby.dev/portfolio/projects-and-research</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#00f3ff', fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ padding: '3px 8px', background: 'rgba(0, 243, 255, 0.15)', border: '1px solid #00f3ff', borderRadius: '6px' }}>
                    CYBER_BROWSER v3.2
                  </span>
                </div>
              </div>

              {/* Webpage Loading Screen Animation */}
              {loadingWebpage ? (
                <div 
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(ellipse at center, #091322 0%, #04070f 100%)',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00f3ff', fontSize: '15px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                    <Sparkles className="animate-spin text-cyan-400" size={20} />
                    <span>INITIALIZING PROJECTS & RESEARCH ARCHIVE [{loadProgress}%]</span>
                  </div>
                  <div style={{ width: '400px', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0, 243, 255, 0.4)' }}>
                    <div 
                      style={{
                        width: `${loadProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #00f3ff, #a855f7, #10b981)',
                        boxShadow: '0 0 15px #00f3ff',
                        transition: 'width 0.15s ease'
                      }}
                    ></div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                    Loading IlliniRide SQL Schemas • BugCatcher AI • HyperSafety Models • Springer Nature
                  </div>
                </div>
              ) : (
                /* Full Scrollable Webpage Content Inside Monitor */
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* Category Filter Tab Bar */}
                  <div 
                    style={{
                      background: 'rgba(8, 14, 26, 0.95)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '8px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflowX: 'auto'
                    }}
                  >
                    {projectCategories.map((cat) => {
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setCarouselIndex(0); }}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            background: isActive ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                            border: isActive ? '1px solid #00f3ff' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: isActive ? '#00f3ff' : '#94a3b8',
                            boxShadow: isActive ? '0 0 12px rgba(0, 243, 255, 0.3)' : 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Scrollable Webpage Project List Grid */}
                  <div 
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: '16px 20px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                      gap: '16px'
                    }}
                  >
                    {filteredProjects.map((project) => {
                      const isAiVenture = project.category === 'ai_ml';
                      const isFullStack = project.category === 'fullstack';
                      const isCorporate = project.category === 'corporate';

                      return (
                        <div
                          key={project.id}
                          style={{
                            background: isAiVenture 
                              ? 'rgba(28, 14, 45, 0.7)' 
                              : isFullStack
                              ? 'rgba(8, 25, 42, 0.7)'
                              : 'rgba(15, 23, 42, 0.7)',
                            border: `1px solid ${isAiVenture ? 'rgba(168, 85, 247, 0.4)' : isFullStack ? 'rgba(0, 243, 255, 0.4)' : 'rgba(148, 163, 184, 0.3)'}`,
                            borderRadius: '12px',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          <div>
                            {/* Category Badge */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span 
                                style={{
                                  fontSize: '10px',
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  background: isAiVenture ? 'rgba(168, 85, 247, 0.25)' : isFullStack ? 'rgba(0, 243, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                                  border: `1px solid ${isAiVenture ? '#a855f7' : isFullStack ? '#00f3ff' : '#94a3b8'}`,
                                  color: isAiVenture ? '#d8b4fe' : isFullStack ? '#67e8f9' : '#ffffff'
                                }}
                              >
                                {project.badge}
                              </span>
                              <span style={{ fontSize: '10px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
                                {project.categoryLabel.split(' ')[0]}
                              </span>
                            </div>

                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                              {project.title}
                            </h3>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: isAiVenture ? '#c084fc' : '#38bdf8' }}>
                              {project.subtitle}
                            </div>

                            <p style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4', margin: '8px 0' }}>
                              {project.description}
                            </p>

                            {/* Media Section: IlliniRide architecture or Carousels or GIFs */}
                            <div style={{ margin: '8px 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(0, 0, 0, 0.6)', minHeight: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {/* IlliniRide Architecture Box */}
                              {project.id === 'illiniride' && (
                                <div style={{ padding: '10px', width: '100%', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  <div style={{ color: '#00f3ff', fontWeight: 800 }}>⚡ Relational Schema & Backend:</div>
                                  <div style={{ background: 'rgba(0, 243, 255, 0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(0, 243, 255, 0.3)', color: '#e2e8f0' }}>
                                    <strong style={{ color: '#00f3ff' }}>Backend:</strong> {project.architecture.backend}
                                  </div>
                                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#e2e8f0' }}>
                                    <strong style={{ color: '#10b981' }}>Stored Procs:</strong> {project.architecture.database}
                                  </div>
                                  <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#e2e8f0' }}>
                                    <strong style={{ color: '#a855f7' }}>BCNF/3NF:</strong> {project.architecture.schema}
                                  </div>
                                </div>
                              )}

                              {/* BugCatcher Joey Image Carousel */}
                              {project.id === 'bugcatcher-joey' && project.images.length > 0 && (
                                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                  <img 
                                    src={project.images[carouselIndex]} 
                                    alt="BugCatcher Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  <div style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '9px', background: 'rgba(0, 0, 0, 0.8)', color: '#a855f7', padding: '2px 6px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace", border: '1px solid #a855f7' }}>
                                    Slide {carouselIndex + 1}/{project.images.length}
                                  </div>
                                  <div style={{ position: 'absolute', bottom: '6px', right: '6px', display: 'flex', gap: '4px' }}>
                                    <button 
                                      onClick={(e) => handlePrevImage(project.images, e)}
                                      style={{ padding: '3px 6px', background: 'rgba(0, 0, 0, 0.8)', border: '1px solid #94a3b8', color: '#ffffff', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                      <ChevronLeft size={12} />
                                    </button>
                                    <button 
                                      onClick={(e) => handleNextImage(project.images, e)}
                                      style={{ padding: '3px 6px', background: 'rgba(0, 0, 0, 0.8)', border: '1px solid #94a3b8', color: '#ffffff', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                      <ChevronRight size={12} />
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* HyperSafety Animated GIF */}
                              {project.id === 'hypersafety' && (
                                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                  <img 
                                    src={project.videoOrGif} 
                                    alt="HyperSafety Real-Time ML System"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  <div style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(16, 185, 129, 0.9)', color: '#ffffff', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                                    LIVE INFERENCE GIF
                                  </div>
                                </div>
                              )}

                              {/* VectorQuest Springer Nature Published */}
                              {project.id === 'vectorquest' && (
                                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                  <img 
                                    src={project.primaryImage} 
                                    alt="VectorQuest Research"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  <div style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(168, 85, 247, 0.9)', color: '#ffffff', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                                    SPRINGER NATURE
                                  </div>
                                </div>
                              )}

                              {/* Barclays Corporate Role */}
                              {project.id === 'barclays-enterprise' && (
                                <div style={{ padding: '12px', width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <img 
                                    src={project.primaryImage} 
                                    alt="Barclays Logo"
                                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'contain', background: '#ffffff', padding: '4px' }}
                                  />
                                  <div style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", spaceY: '2px' }}>
                                    <div style={{ color: '#00f3ff', fontWeight: 800 }}>Graduate Analyst (SDE II)</div>
                                    <div style={{ color: '#10b981', fontWeight: 700 }}>⚡ 5x Operational Efficiency</div>
                                    <div style={{ color: '#94a3b8', fontSize: '10px' }}>Enterprise SFMC & AMPscript Middleware</div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Metrics Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', margin: '8px 0' }}>
                              {project.metrics.map((m, idx) => (
                                <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '6px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
                                  <div style={{ fontSize: '9px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{m.label}</div>
                                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#f8fafc', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack & Inspect Button */}
                          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '8px', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {project.techStack.slice(0, 3).map((t, idx) => (
                                <span key={idx} style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", background: 'rgba(255, 255, 255, 0.06)', padding: '2px 5px', borderRadius: '4px', color: '#94a3b8' }}>
                                  {t}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={() => setSelectedProject(project)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.2), rgba(168, 85, 247, 0.2))',
                                border: '1px solid #00f3ff',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '10px',
                                fontWeight: 700,
                                padding: '4px 10px',
                                cursor: 'pointer'
                              }}
                            >
                              <span>INSPECT</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* Nested Project Deep Dive Detail Overlay with Rich Image Gallery           */}
              {/* ========================================================================= */}
              {selectedProject && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(5, 9, 18, 0.98)',
                    backdropFilter: 'blur(16px)',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 30,
                    overflowY: 'auto'
                  }}
                >
                  {/* Top Header Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", background: 'rgba(0, 243, 255, 0.2)', border: '1px solid #00f3ff', color: '#00f3ff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 800 }}>
                        {selectedProject.badge}
                      </span>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                        // {selectedProject.categoryLabel}
                      </span>
                    </div>

                    <button 
                      onClick={() => setSelectedProject(null)}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid #ef4444',
                        borderRadius: '6px',
                        color: '#fca5a5',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 800,
                        fontFamily: "'JetBrains Mono', monospace",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#fca5a5'; }}
                    >
                      <X size={13} />
                      <span>CLOSE [ESC]</span>
                    </button>
                  </div>

                  {/* 2-Column Inspection Studio Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '480px 1fr', gap: '18px', flex: 1, minHeight: '340px' }}>
                    {/* LEFT COLUMN: Interactive Media Studio & Image Gallery */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Main Featured Image / GIF / Diagram Canvas */}
                      <div 
                        style={{
                          width: '100%',
                          height: '240px',
                          background: '#020610',
                          border: '1.5px solid rgba(0, 243, 255, 0.4)',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        {/* If Project has images */}
                        {selectedProject.images && selectedProject.images.length > 0 ? (
                          <>
                            <img 
                              src={selectedProject.images[carouselIndex % selectedProject.images.length]} 
                              alt="Inspected Project Media"
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                            {/* Slide Counter & Caption Overlay */}
                            <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: 'rgba(4, 8, 16, 0.88)', border: '1px solid rgba(0, 243, 255, 0.3)', borderRadius: '6px', padding: '4px 8px', fontSize: '9.5px', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{selectedProject.imageCaptions?.[carouselIndex % selectedProject.images.length] || `Figure ${carouselIndex + 1}`}</span>
                              <span style={{ color: '#00f3ff', fontWeight: 800 }}>[{(carouselIndex % selectedProject.images.length) + 1}/{selectedProject.images.length}]</span>
                            </div>

                            {/* Carousel Navigation Buttons if > 1 image */}
                            {selectedProject.images.length > 1 && (
                              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                                <button 
                                  onClick={(e) => handlePrevImage(selectedProject.images, e)}
                                  style={{ padding: '4px 8px', background: 'rgba(0, 0, 0, 0.8)', border: '1px solid #00f3ff', color: '#00f3ff', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                  <ChevronLeft size={14} />
                                </button>
                                <button 
                                  onClick={(e) => handleNextImage(selectedProject.images, e)}
                                  style={{ padding: '4px 8px', background: 'rgba(0, 0, 0, 0.8)', border: '1px solid #00f3ff', color: '#00f3ff', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                  <ChevronRight size={14} />
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          /* IlliniRide Interactive Architecture Box */
                          <div style={{ width: '100%', height: '100%', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace" }}>
                            <div style={{ color: '#00f3ff', fontWeight: 800, fontSize: '12px' }}>
                              ⚡ ILLINIRIDE ARCHITECTURAL TOPOLOGY
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px' }}>
                              <div style={{ background: 'rgba(0, 243, 255, 0.1)', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '8px', borderRadius: '6px' }}>
                                <strong style={{ color: '#00f3ff' }}>REST API Pool:</strong><br/>
                                Express connection pool with JWT token auth & rate limits.
                              </div>
                              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '8px', borderRadius: '6px' }}>
                                <strong style={{ color: '#10b981' }}>Atomic Stored Procs:</strong><br/>
                                SQL isolation preventing concurrent overbooking.
                              </div>
                            </div>
                            <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '8px', borderRadius: '6px', fontSize: '10px' }}>
                              <strong style={{ color: '#a855f7' }}>BCNF / 3NF Normalization:</strong><br/>
                              Decomposed 8+ entities eliminating all update & deletion anomalies.
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Clickable Image Thumbnails Row */}
                      {selectedProject.images && selectedProject.images.length > 1 && (
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {selectedProject.images.map((imgSrc, idx) => {
                            const isSelected = (carouselIndex % selectedProject.images.length) === idx;
                            return (
                              <div
                                key={idx}
                                onClick={() => setCarouselIndex(idx)}
                                style={{
                                  width: '74px',
                                  height: '52px',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  border: isSelected ? '2px solid #00f3ff' : '1px solid rgba(255, 255, 255, 0.2)',
                                  boxShadow: isSelected ? '0 0 10px rgba(0, 243, 255, 0.6)' : 'none',
                                  opacity: isSelected ? 1 : 0.6,
                                  transition: 'all 0.2s ease',
                                  flexShrink: 0
                                }}
                              >
                                <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* RIGHT COLUMN: Detailed Technical Information & Metrics */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                      <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                          {selectedProject.title}
                        </h2>
                        <div style={{ fontSize: '12px', color: '#00f3ff', fontWeight: 600, marginBottom: '10px' }}>
                          {selectedProject.subtitle}
                        </div>

                        {/* Detailed Description */}
                        <p style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '10px' }}>
                          {selectedProject.detailedBio || selectedProject.description}
                        </p>

                        {/* Key Technical Highlights */}
                        {selectedProject.highlights && (
                          <div style={{ marginBottom: '10px', background: 'rgba(0, 0, 0, 0.45)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 12px' }}>
                            <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px' }}>
                              KEY ENGINEERING ACHIEVEMENTS:
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '10px', color: '#e2e8f0', lineHeight: '1.4' }}>
                              {selectedProject.highlights.map((h, i) => (
                                <li key={i} style={{ marginBottom: '2px' }}>{h}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Metrics Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '6px', marginBottom: '10px' }}>
                          {selectedProject.metrics.map((m, idx) => (
                            <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '6px 8px', borderRadius: '6px', border: '1px solid rgba(0, 243, 255, 0.2)' }}>
                              <div style={{ fontSize: '8.5px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{m.label}</div>
                              <div style={{ fontSize: '10px', fontWeight: 700, color: '#00f3ff', marginTop: '2px' }}>{m.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Complete Tech Stack Chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {selectedProject.techStack.map((tech, idx) => (
                            <span key={idx} style={{ padding: '3px 7px', background: 'rgba(0, 243, 255, 0.12)', border: '1px solid rgba(0, 243, 255, 0.3)', borderRadius: '4px', color: '#67e8f9', fontSize: '9.5px', fontFamily: "'JetBrains Mono', monospace" }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Links */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px', marginTop: '6px' }}>
                        {selectedProject.links?.publication && (
                          <a
                            href={selectedProject.links.publication}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontWeight: 800, fontSize: '11px', textDecoration: 'none' }}
                          >
                            <BookOpen size={13} />
                            <span>SPRINGER NATURE PAPER</span>
                          </a>
                        )}
                        {selectedProject.links?.github && (
                          <a
                            href={selectedProject.links.github}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: '#00f3ff', color: '#07090e', borderRadius: '6px', fontWeight: 800, fontSize: '11px', textDecoration: 'none' }}
                          >
                            <GithubIcon size={13} color="#07090e" />
                            <span>VIEW GITHUB REPOSITORY</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
