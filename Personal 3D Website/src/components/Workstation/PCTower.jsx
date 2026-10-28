import React, { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { Cpu, Zap, Layers, Terminal, Sparkles, Database, Wrench } from 'lucide-react';

/**
 * Procedural Curved Liquid Cooling Tube (Matching Concept Img 5)
 */
function LiquidCoolingTube({ start, mid, end, color = "#00f3ff" }) {
  const curve = React.useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    ]);
  }, [start, mid, end]);

  return (
    <group>
      {/* Outer Glass Tube */}
      <mesh>
        <tubeGeometry args={[curve, 32, 0.024, 16, false]} />
        <meshPhysicalMaterial 
          color="#38bdf8" 
          transmission={0.9} 
          opacity={0.5} 
          transparent 
          roughness={0.1} 
          ior={1.4} 
        />
      </mesh>
      {/* Inner Glowing Coolant Fluid */}
      <mesh>
        <tubeGeometry args={[curve, 32, 0.016, 16, false]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2.5} 
          toneMapped={false} 
        />
      </mesh>
    </group>
  );
}

export default function PCTower({ currentView, onSelectSkills }) {
  const pcGroup = useRef();
  const glassPanelRef = useRef();
  const cpuCoolerRef = useRef();
  const gpuCardRef = useRef();
  const ramRef = useRef();
  const fan1Ref = useRef();
  const fan2Ref = useRef();
  const fan3Ref = useRef();

  const isSkillsActive = currentView === 'skills';

  // GSAP Side-Panel Open & Component Reveal Animation
  useEffect(() => {
    if (isSkillsActive) {
      // Slide open the tempered glass side panel to reveal internal motherboard & tubes
      gsap.to(glassPanelRef.current.position, { x: -0.75, z: 0.15, duration: 1.2, ease: 'power3.out' });
      gsap.to(glassPanelRef.current.material, { opacity: 0.1, duration: 1.0 });
    } else {
      // Close side panel
      gsap.to(glassPanelRef.current.position, { x: -0.26, z: 0, duration: 1.0, ease: 'power2.inOut' });
      gsap.to(glassPanelRef.current.material, { opacity: 0.35, duration: 1.0 });
    }
  }, [isSkillsActive]);

  // Rotate fan blades continuously
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 12;
    if (fan1Ref.current) fan1Ref.current.rotation.z = t;
    if (fan2Ref.current) fan2Ref.current.rotation.z = t;
    if (fan3Ref.current) fan3Ref.current.rotation.z = t;
  });

  return (
    <group ref={pcGroup} position={[-2.3, 0.72, 0.4]}>
      {/* PC Tower Open Chassis Frame (Dark Gunmetal Finish) */}
      {/* Bottom Base / PSU Basement */}
      <mesh position={[0, -0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.08, 0.94]} />
        <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Top Radiator Roof */}
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.08, 0.94]} />
        <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Rear IO Panel */}
      <mesh position={[0, 0, -0.46]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 1.12, 0.04]} />
        <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Right Solid Side Panel (Behind Motherboard) */}
      <mesh position={[0.24, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1.2, 0.94]} />
        <meshStandardMaterial color="#070a12" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* 4 Corner Steel Beams */}
      {[-0.23, 0.23].map((x) =>
        [-0.45, 0.45].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]}>
            <boxGeometry args={[0.03, 1.2, 0.03]} />
            <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.2} />
          </mesh>
        ))
      )}

      {/* Front Mesh Bezel Intake Grill */}
      <mesh position={[0, 0, 0.46]}>
        <boxGeometry args={[0.44, 1.12, 0.02]} />
        <meshStandardMaterial color="#090d16" metalness={0.7} roughness={0.6} />
      </mesh>

      {/* Front 3x Multi-Color RGB Intake Fans */}
      {[-0.35, 0, 0.35].map((yOffset, i) => (
        <group key={i} position={[0, yOffset, 0.46]}>
          <mesh>
            <ringGeometry args={[0.12, 0.16, 32]} />
            <meshBasicMaterial color={i === 0 ? '#10b981' : i === 1 ? '#00f3ff' : '#a855f7'} side={THREE.DoubleSide} />
          </mesh>
          <group ref={i === 0 ? fan1Ref : i === 1 ? fan2Ref : fan3Ref}>
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, bladeIdx) => (
              <mesh key={bladeIdx} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.03, 0.13, 0.01]} />
                <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* Tempered Glass Side Panel (Slides open in Skills View) */}
      <mesh ref={glassPanelRef} position={[-0.26, 0, 0]}>
        <boxGeometry args={[0.02, 1.18, 0.88]} />
        <meshPhysicalMaterial 
          color="#38bdf8" 
          transmission={0.92} 
          opacity={0.35} 
          transparent 
          roughness={0.05} 
          ior={1.5} 
        />
      </mesh>

      {/* Top 240mm Radiator + Dual RGB Halo Fans */}
      <group position={[0, 0.52, 0]}>
        <mesh>
          <boxGeometry args={[0.38, 0.04, 0.65]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
        </mesh>
        {[-0.16, 0.16].map((zOff, i) => (
          <group key={i} position={[0, -0.03, zOff]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.11, 0.14, 32]} />
              <meshBasicMaterial color={i === 0 ? '#10b981' : '#00f3ff'} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Rear 120mm Exhaust Fan with RGB Halo */}
      <group position={[0, 0.28, -0.42]}>
        <mesh>
          <boxGeometry args={[0.32, 0.32, 0.03]} />
          <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* MOTHERBOARD & INTERNAL HARDWARE (Faithfully matching Concept Img 5)       */}
      {/* ========================================================================= */}
      {/* Motherboard Backplate PCB */}
      <mesh position={[0.22, 0, 0]}>
        <boxGeometry args={[0.02, 1.05, 0.82]} />
        <meshStandardMaterial color="#022c22" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* VRM Slotted Heatsinks with ROG Eye Logo */}
      <group position={[0.2, 0.34, -0.22]}>
        <mesh>
          <boxGeometry args={[0.04, 0.24, 0.22]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Slotted Heatsink Fins */}
        {[-0.08, -0.04, 0, 0.04, 0.08].map((yOff, i) => (
          <mesh key={i} position={[-0.022, yOff, 0]}>
            <boxGeometry args={[0.008, 0.015, 0.2]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* ROG Eye Neon Emblem */}
        <mesh position={[-0.023, 0.04, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={4.5} toneMapped={false} />
        </mesh>
      </group>

      {/* Motherboard 2-Digit Hex Debug Display [AA] */}
      <mesh position={[0.19, 0.44, 0.12]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.04, 0.025]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* CPU Socket & Silver Retention Bracket with Bold "CPU" Inscription (Concept Img 5) */}
      <group position={[0.14, 0.22, -0.05]}>
        {/* Motherboard Socket Base PCB */}
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.012, 0.32, 0.32]} />
          <meshStandardMaterial color="#022c22" roughness={0.4} />
        </mesh>
        {/* Gold Contact Perimeter Array */}
        <mesh position={[0.005, 0, 0]}>
          <boxGeometry args={[0.01, 0.29, 0.29]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Chrome Socket Retention Bracket Frame */}
        <mesh position={[-0.008, 0, 0]}>
          <boxGeometry args={[0.02, 0.27, 0.27]} />
          <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* 4x Corner Screws on Retention Bracket */}
        {[[-0.11, -0.11], [-0.11, 0.11], [0.11, -0.11], [0.11, 0.11]].map(([y, z], i) => (
          <mesh key={i} position={[-0.019, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.006, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
        {/* Tension Load Lever on the side */}
        <mesh position={[-0.015, -0.14, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.28, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Brushed Nickel-Plated CPU Heat Spreader (IHS) */}
        <mesh position={[-0.022, 0, 0]}>
          <boxGeometry args={[0.012, 0.21, 0.21]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Laser-Etched "CPU" Inscription Plate facing Camera (Html Transform) */}
        <Html
          transform
          position={[-0.03, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          distanceFactor={0.88}
          className="pointer-events-none select-none"
        >
          <div
            style={{
              width: '130px',
              height: '130px',
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
              border: '3px solid #f8fafc',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 243, 255, 0.4)',
              position: 'relative'
            }}
          >
            {/* Gold corner orientation mark */}
            <div style={{ position: 'absolute', top: '7px', left: '7px', width: '0', height: '0', borderStyle: 'solid', borderWidth: '9px 9px 0 0', borderColor: '#eab308 transparent transparent transparent' }}></div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '32px', fontWeight: 900, color: '#0f172a', letterSpacing: '4px', textShadow: '0 1px 2px rgba(255,255,255,0.7)' }}>
              CPU
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#1e293b', letterSpacing: '1.2px', marginTop: '2px', fontWeight: 800 }}>
              AI CORE // 5.8 GHz
            </div>
            {/* Silicon traces graphic */}
            <div style={{ display: 'flex', gap: '3px', marginTop: '8px' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ width: '12px', height: '2px', background: '#334155', opacity: 0.8 }}></div>
              ))}
            </div>
          </div>
        </Html>
        <pointLight position={[-0.08, 0, 0]} color="#00f3ff" intensity={3.0} distance={2.0} />
      </group>

      {/* 4x Vertical Glowing RGB RAM Sticks (Next to CPU) */}
      <group ref={ramRef} position={[0.15, 0.24, 0.14]}>
        {[-0.045, -0.015, 0.015, 0.045].map((zOff, i) => (
          <group key={i} position={[0, 0, zOff]}>
            {/* RAM PCB & Metal Armor */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.018, 0.24, 0.015]} />
              <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Vibrant RGB Light Diffuser Bar on Top */}
            <mesh position={[-0.01, 0, 0]}>
              <boxGeometry args={[0.006, 0.23, 0.012]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#10b981' : '#00f3ff'} 
                emissive={i % 2 === 0 ? '#10b981' : '#00f3ff'} 
                emissiveIntensity={4.5} 
                toneMapped={false} 
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 24-Pin ATX Braided Motherboard Cable Bundle with Cable Combs */}
      <group position={[0.12, 0.18, 0.24]}>
        {[-0.04, -0.02, 0, 0.02, 0.04].map((zOff, i) => (
          <mesh key={i} position={[0, 0, zOff]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.006, 0.006, 0.14, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#00f3ff' : '#1e293b'} roughness={0.6} />
          </mesh>
        ))}
        {/* Cable Comb Clamp */}
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.015, 0.012, 0.11]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* High-End GPU with Clear Acrylic Waterblock & Twin 8-Pin Sleeved Cables */}
      <group ref={gpuCardRef} position={[0.06, -0.1, 0.02]}>
        {/* Main PCB & Backplate */}
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.12, 0.76]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Clear Acrylic Water Chamber */}
        <mesh position={[-0.085, 0, 0]}>
          <boxGeometry args={[0.012, 0.09, 0.72]} />
          <meshPhysicalMaterial 
            color="#00f3ff" 
            transmission={0.9} 
            opacity={0.8} 
            transparent 
            roughness={0.05} 
            emissive="#00f3ff" 
            emissiveIntensity={2.0} 
          />
        </mesh>
        {/* GPU Illuminated Logo Bar */}
        <mesh position={[-0.092, 0, -0.1]}>
          <boxGeometry args={[0.004, 0.03, 0.35]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={4.5} toneMapped={false} />
        </mesh>
        {/* Twin 8-Pin PCIe Sleeved Power Cables with Combs */}
        <group position={[0.02, -0.06, 0.16]}>
          {[-0.03, -0.01, 0.01, 0.03].map((zOff, i) => (
            <mesh key={i} position={[0, -0.05, zOff]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#10b981' : '#00f3ff'} roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* M.2 NVMe Thermal Armor Plate & Chipset Heatshield */}
      <group position={[0.16, -0.28, 0.12]}>
        <mesh>
          <boxGeometry args={[0.025, 0.08, 0.28]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.014, 0, 0]}>
          <boxGeometry args={[0.004, 0.012, 0.24]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3.5} toneMapped={false} />
        </mesh>
        {/* Silver Round CMOS Battery */}
        <mesh position={[-0.014, 0.06, -0.18]} rotation={[0, -Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.006, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Audio Cylindrical Capacitors */}
        {[-0.24, -0.21, -0.18, -0.15].map((zOff, i) => (
          <mesh key={i} position={[-0.014, -0.04, zOff]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.018, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Crystalline Liquid Cooling Tubes with Compression Fittings (Concept Img 5) */}
      <LiquidCoolingTube start={[0.1, 0.32, -0.05]} mid={[0.02, 0.46, 0.05]} end={[-0.04, 0.51, 0.25]} color="#00f3ff" />
      <LiquidCoolingTube start={[0.1, 0.12, -0.05]} mid={[-0.02, 0.02, -0.08]} end={[-0.02, -0.05, -0.15]} color="#10b981" />
      <LiquidCoolingTube start={[-0.02, -0.05, 0.22]} mid={[-0.05, 0.18, 0.32]} end={[-0.04, 0.51, 0.32]} color="#00f3ff" />

      {/* Power Supply Basement Shroud (Bottom Section) */}
      <mesh position={[0.05, -0.48, 0]}>
        <boxGeometry args={[0.38, 0.2, 0.85]} />
        <meshStandardMaterial color="#090d16" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* PSU Technical Spec Label ("POWER SUPPLY 1000W 80 PLUS GOLD") */}
      <mesh position={[-0.142, -0.48, -0.18]}>
        <planeGeometry args={[0.22, 0.1]} rotation={[0, -Math.PI / 2, 0]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.8} />
      </mesh>

      {/* Internal Studio Illumination inside the PC */}
      <pointLight position={[-0.1, 0.2, 0]} color="#00f3ff" intensity={isSkillsActive ? 7.5 : 3.0} distance={4.0} />
      <pointLight position={[-0.1, -0.1, 0.2]} color="#10b981" intensity={isSkillsActive ? 6.5 : 2.5} distance={4.0} />

      {/* ========================================================================= */}
      {/* 5 HOLOGRAPHIC CALLOUT BOXES WITH LEADER LINES (EXACTLY LIKE CONCEPT IMG 5) */}
      {/* ========================================================================= */}
      {isSkillsActive && (
        <group position={[-0.32, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {/* CALLOUT 1: CORE SKILLS (Top Left, Pointing directly to CPU Socket) */}
          <Html 
            transform 
            position={[-0.32, 0.38, 0.05]} 
            distanceFactor={0.92}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                background: 'rgba(8, 20, 36, 0.9)',
                border: '1.5px solid #00f3ff',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '148px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 243, 255, 0.4)',
                backdropFilter: 'blur(16px)',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#f8fafc',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f3ff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', borderBottom: '1px solid rgba(0, 243, 255, 0.25)', paddingBottom: '4px', marginBottom: '5px' }}>
                <Cpu size={12} />
                <span>CORE SKILLS</span>
              </div>
              <div style={{ fontSize: '10px', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.45' }}>
                (Python)<br/>
                (C++)<br/>
                (Three.js)<br/>
                (React / Node)
              </div>
              {/* Leader Line & Pin to CPU */}
              <div style={{ position: 'absolute', right: '-20px', top: '50%', width: '20px', height: '2px', background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }}></div>
              <div style={{ position: 'absolute', right: '-24px', top: 'calc(50% - 3px)', width: '6px', height: '6px', borderRadius: '50%', background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }}></div>
            </div>
          </Html>

          {/* CALLOUT 2: EXPERTISE (Middle-Bottom Left, Pointing to GPU) */}
          <Html 
            transform 
            position={[-0.34, -0.06, 0.05]} 
            distanceFactor={0.92}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                background: 'rgba(8, 20, 36, 0.9)',
                border: '1.5px solid #00f3ff',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '152px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 243, 255, 0.4)',
                backdropFilter: 'blur(16px)',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#f8fafc',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f3ff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', borderBottom: '1px solid rgba(0, 243, 255, 0.25)', paddingBottom: '4px', marginBottom: '5px' }}>
                <Zap size={12} />
                <span>EXPERTISE</span>
              </div>
              <div style={{ fontSize: '10px', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.45' }}>
                (3D Rendering)<br/>
                (Computer Vision)<br/>
                (PyTorch & NLP)<br/>
                (Vector DBs)
              </div>
              <div style={{ position: 'absolute', right: '-20px', top: '50%', width: '20px', height: '2px', background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }}></div>
              <div style={{ position: 'absolute', right: '-24px', top: 'calc(50% - 3px)', width: '6px', height: '6px', borderRadius: '50%', background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }}></div>
            </div>
          </Html>

          {/* CALLOUT 3: FRAMEWORKS & AI (Top Right, Pointing to RAM Sticks) */}
          <Html 
            transform 
            position={[0.32, 0.38, 0.05]} 
            distanceFactor={0.92}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                background: 'rgba(6, 26, 20, 0.9)',
                border: '1.5px solid #10b981',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '148px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(16, 185, 129, 0.4)',
                backdropFilter: 'blur(16px)',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#f8fafc',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', borderBottom: '1px solid rgba(16, 185, 129, 0.25)', paddingBottom: '4px', marginBottom: '5px' }}>
                <Sparkles size={12} />
                <span>FRAMEWORKS</span>
              </div>
              <div style={{ fontSize: '10px', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.45' }}>
                (CUDA Acceleration)<br/>
                (FastAPI API)<br/>
                (Scikit-Learn)<br/>
                (Transformers)
              </div>
              <div style={{ position: 'absolute', left: '-20px', top: '50%', width: '20px', height: '2px', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
              <div style={{ position: 'absolute', left: '-24px', top: 'calc(50% - 3px)', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
            </div>
          </Html>

          {/* CALLOUT 4: TOOLS & INFRASTRUCTURE (Middle-Bottom Right, Pointing to Fans / Cables) */}
          <Html 
            transform 
            position={[0.32, -0.06, 0.05]} 
            distanceFactor={0.92}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                background: 'rgba(8, 20, 36, 0.9)',
                border: '1.5px solid #00f3ff',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '148px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 243, 255, 0.4)',
                backdropFilter: 'blur(16px)',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#f8fafc',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f3ff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', borderBottom: '1px solid rgba(0, 243, 255, 0.25)', paddingBottom: '4px', marginBottom: '5px' }}>
                <Wrench size={12} />
                <span>TOOLS</span>
              </div>
              <div style={{ fontSize: '10px', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.45' }}>
                (Git / GitHub)<br/>
                (Docker / Linux)<br/>
                (Modal Cloud)<br/>
                (CI/CD Pipelines)
              </div>
              <div style={{ position: 'absolute', left: '-20px', top: '50%', width: '20px', height: '2px', background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }}></div>
              <div style={{ position: 'absolute', left: '-24px', top: 'calc(50% - 3px)', width: '6px', height: '6px', borderRadius: '50%', background: '#00f3ff', boxShadow: '0 0 8px #00f3ff' }}></div>
            </div>
          </Html>

          {/* CALLOUT 5: ENTERPRISE & DATA (Bottom Left, Pointing to PSU) */}
          <Html 
            transform 
            position={[-0.32, -0.44, 0.05]} 
            distanceFactor={0.92}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                background: 'rgba(6, 26, 20, 0.9)',
                border: '1.5px solid #10b981',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '160px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(16, 185, 129, 0.4)',
                backdropFilter: 'blur(16px)',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#f8fafc',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '11px', fontWeight: 800, letterSpacing: '0.8px', borderBottom: '1px solid rgba(16, 185, 129, 0.25)', paddingBottom: '4px', marginBottom: '5px' }}>
                <Database size={12} />
                <span>ENTERPRISE & SQL</span>
              </div>
              <div style={{ fontSize: '10px', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.45' }}>
                (Salesforce SFMC)<br/>
                (AMPscript & SQL)<br/>
                (Distributed Systems)
              </div>
              <div style={{ position: 'absolute', right: '-20px', top: '50%', width: '20px', height: '2px', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
              <div style={{ position: 'absolute', right: '-24px', top: 'calc(50% - 3px)', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
