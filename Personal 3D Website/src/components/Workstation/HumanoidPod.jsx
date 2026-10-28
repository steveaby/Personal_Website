import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { profileData } from '../../data/profile';
import { GraduationCap, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Common/Icons';

export default function HumanoidPod({ currentView, onSelectAbout }) {
  const podGroup = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const avatarGroup = useRef();

  const isAboutActive = currentView === 'about';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.7;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.5;
    if (avatarGroup.current) {
      avatarGroup.current.position.y = 0.95 + Math.sin(t * 1.8) * 0.04;
    }
  });

  return (
    <group ref={podGroup} position={[3.0, 0, 0]}>
      {/* Cybernetic Floor Base Platform (Obsidian with Gold & Emerald Trim) */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.1, 0.1, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Concentric Glow Rings on Floor Base (Warm Gold & Emerald) */}
      <mesh position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.95, 32]} />
        <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.106, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.68, 32]} />
        <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
      </mesh>

      {/* Low Subtle Floor Energy Ring */}
      <group position={[0, 0.25, 0]}>
        <mesh ref={ring1Ref} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.9, 0.01, 16, 48]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
      </group>

      {/* PROCEDURAL HUMANOID BOT AVATAR (Ceramic Pearl White, Brushed Gold & Slate) */}
      <group ref={avatarGroup} position={[0, 0.95, 0]}>
        {/* Feet & Platform Magnetic Anchors */}
        <mesh position={[-0.2, 0.1, 0]}>
          <boxGeometry args={[0.12, 0.1, 0.28]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0.1, 0]}>
          <boxGeometry args={[0.12, 0.1, 0.28]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Shins & Mechanical Knees */}
        <mesh position={[-0.2, 0.45, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.55, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.6} />
        </mesh>
        <mesh position={[0.2, 0.45, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.55, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.6} />
        </mesh>

        {/* Knee Armor Pads (Brushed Gold Accent) */}
        <mesh position={[-0.2, 0.72, 0.08]}>
          <boxGeometry args={[0.12, 0.14, 0.06]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0.72, 0.08]}>
          <boxGeometry args={[0.12, 0.14, 0.06]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Thighs & Hip Assembly */}
        <mesh position={[-0.2, 1.05, 0]}>
          <cylinderGeometry args={[0.085, 0.075, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.2, 1.05, 0]}>
          <cylinderGeometry args={[0.085, 0.075, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Pelvis & Core Chassis Frame */}
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[0.54, 0.22, 0.32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.38, 0.15]}>
          <boxGeometry args={[0.26, 0.08, 0.06]} />
          <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Torso Armor (Pearl Ceramic White + Brushed Gold Inlay) */}
        <mesh position={[0, 1.75, 0]}>
          <boxGeometry args={[0.62, 0.58, 0.36]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Glowing Arc Reactor Core (Amber Golden Pulsing Energy) */}
        <mesh position={[0, 1.82, 0.19]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3.5} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 1.82, 0.3]} color="#fbbf24" intensity={1.5} distance={2.5} />

        {/* Shoulders (Spherical Brushed Bronze Metallic) */}
        <mesh position={[-0.42, 1.92, 0]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.42, 1.92, 0]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Arms & Hands */}
        <mesh position={[-0.44, 1.55, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.44, 1.55, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-0.44, 1.15, 0]}>
          <cylinderGeometry args={[0.06, 0.055, 0.45, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0.44, 1.15, 0]}>
          <cylinderGeometry args={[0.06, 0.055, 0.45, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Head Chassis */}
        <mesh position={[0, 2.25, 0]}>
          <boxGeometry args={[0.36, 0.32, 0.32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Futuristic Cyber Visor Glass (Cyan / Emerald Glow) */}
        <mesh position={[0, 2.28, 0.165]}>
          <boxGeometry args={[0.3, 0.09, 0.04]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3.2} toneMapped={false} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 3D HOLOGRAPHIC BIO & CORPORATE CARDS (Compact & Fully Readable in View)    */}
      {/* ========================================================================= */}
      {isAboutActive && (
        <group position={[0, 1.45, 0]}>
          {/* Left Holographic Card - Profile, Bio, UIUC MS CS Degree */}
          <Html
            transform
            distanceFactor={3.4}
            position={[-0.72, 0.05, 0.95]}
            rotation={[0, 0.75, 0]}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                width: '250px',
                background: 'rgba(6, 12, 24, 0.96)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(0, 243, 255, 0.65)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#f8fafc',
                boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {/* Profile Photo and Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src="/assets/steve.jpeg"
                    alt={profileData.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #00f3ff',
                      boxShadow: '0 0 14px rgba(0, 243, 255, 0.5)'
                    }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '1px',
                      right: '1px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#10b981',
                      border: '2px solid #060c18'
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.3px', margin: 0 }}>
                    {profileData.name}
                  </h3>
                  <div style={{ fontSize: '10px', color: '#00f3ff', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>
                    MS CS @ UIUC
                  </div>
                  <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '1px' }}>
                    AI/ML & Systems Architect
                  </div>
                </div>
              </div>

              {/* Bio Summary */}
              <p style={{ fontSize: '9.5px', color: '#cbd5e1', lineHeight: '1.4', margin: '6px 0' }}>
                {profileData.bio}
              </p>

              {/* Education Box */}
              <div style={{ background: 'rgba(0, 243, 255, 0.07)', border: '1px solid rgba(0, 243, 255, 0.25)', borderRadius: '6px', padding: '6px 8px', marginTop: '6px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <GraduationCap size={14} color="#00f3ff" style={{ marginTop: '1px', flexShrink: 0 }} />
                <div style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace" }}>
                  <div style={{ color: '#ffffff', fontWeight: 800 }}>Master of Science (MS CS)</div>
                  <div style={{ color: '#00f3ff' }}>UIUC</div>
                  <div style={{ color: '#94a3b8', fontSize: '8.5px', marginTop: '1px' }}>Focus: AI, Scalable Systems & NLP</div>
                </div>
              </div>

              {/* Social Channels */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '5px', background: 'rgba(0, 243, 255, 0.12)', border: '1px solid #00f3ff', borderRadius: '5px', color: '#00f3ff', fontSize: '9.5px', fontWeight: 700, textDecoration: 'none' }}
                >
                  <LinkedinIcon size={11} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '5px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid #a855f7', borderRadius: '5px', color: '#c084fc', fontSize: '9.5px', fontWeight: 700, textDecoration: 'none' }}
                >
                  <GithubIcon size={11} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </Html>

          {/* Right Holographic Card - Full Barclays Corporate Experience */}
          <Html
            transform
            distanceFactor={3.4}
            position={[0.95, 0.05, -0.72]}
            rotation={[0, 0.75, 0]}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                width: '250px',
                background: 'rgba(18, 10, 32, 0.96)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(168, 85, 247, 0.65)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#f8fafc',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Briefcase size={13} color="#c084fc" />
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Corporate Experience</span>
                </div>
                <span style={{ fontSize: '8.5px', color: '#a855f7', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>Barclays Bank</span>
              </div>

              {/* Role Title and Company */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <img 
                  src="/assets/barclays_logo.jpeg" 
                  alt="Barclays" 
                  style={{ width: '24px', height: '24px', borderRadius: '5px', objectFit: 'contain', background: '#ffffff', padding: '2px' }} 
                />
                <div>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {profileData.experience[0]?.role}
                  </h4>
                  <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 600 }}>
                    {profileData.experience[0]?.company}
                  </div>
                </div>
              </div>

              {/* Efficiency Metric Banner */}
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '5px', padding: '4px 6px', color: '#6ee7b7', fontSize: '9px', fontWeight: 700, margin: '5px 0', fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>⚡</span>
                <span>5x Operational Efficiency Gain</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '9.5px', color: '#cbd5e1', lineHeight: '1.35', margin: '5px 0' }}>
                {profileData.experience[0]?.impact}
              </p>

              {/* Key Deliverables Highlights */}
              <div style={{ marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '5px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>Key Engineering Highlights:</div>
                <ul style={{ margin: 0, paddingLeft: '12px', fontSize: '8.5px', color: '#94a3b8', lineHeight: '1.3' }}>
                  <li>Automated real-time distributed data pipelines (-80% manual work)</li>
                  <li>Mission-critical banking transactional flows & middleware</li>
                  <li>Salesforce Marketing Cloud, AMPscript & Oracle SQL</li>
                </ul>
              </div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
