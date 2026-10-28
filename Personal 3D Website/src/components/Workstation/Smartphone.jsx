import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { profileData } from '../../data/profile';
import { Mail, Check, Phone, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, DiscordIcon } from '../Common/Icons';
import confetti from 'canvas-confetti';

/**
 * 3D Holographic Spinning Phone Emblem Beacon (Overview Mode)
 */
function HolographicPhoneBeacon({ hovered, setHovered, onClick }) {
  const phoneLogoRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (phoneLogoRef.current) {
      phoneLogoRef.current.rotation.y = t * 1.8;
      phoneLogoRef.current.position.y = 0.42 + Math.sin(t * 2.5) * 0.04;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 1.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 1.5;
    }
  });

  return (
    <group 
      position={[0, 0, 0.18]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Invisible Large Hit Target */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Holographic Projection Light Pillar */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.08, 0.4, 32, 1, true]} />
        <meshBasicMaterial 
          color="#10b981" 
          transparent 
          opacity={hovered ? 0.35 : 0.18} 
          side={THREE.DoubleSide} 
          depthWrite={false} 
        />
      </mesh>

      {/* Floating Rotating Energy Rings */}
      <group position={[0, 0.42, 0]}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.3, 0.012, 16, 48]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3} toneMapped={false} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.36, 0.009, 16, 48]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
      </group>

      {/* 3D Spinning Phone Model Emblem */}
      <group ref={phoneLogoRef} scale={hovered ? 1.25 : 1.0}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.34, 0.02]} />
          <meshStandardMaterial color="#08101a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.002]}>
          <boxGeometry args={[0.186, 0.346, 0.016]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3.5} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.16, 0.31]} />
          <meshStandardMaterial color="#052e16" emissive="#10b981" emissiveIntensity={1.5} roughness={0.2} />
        </mesh>
      </group>

      <pointLight position={[0, 0.45, 0.1]} color="#10b981" intensity={hovered ? 3.5 : 1.8} distance={2.5} />
    </group>
  );
}

export default function Smartphone({ currentView, onFocusContact, onSelectContact }) {
  const phoneRef = useRef();
  const [beaconHovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const isContactFocused = currentView === 'contact';
  const handleTriggerContact = onFocusContact || onSelectContact;

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <group 
      ref={phoneRef} 
      position={[0.7, 1.48, 0.45]} 
      rotation={[-Math.PI / 2, 0, -0.2]}
    >
      {/* Smartphone Outer Metallic Curved Body resting on table */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.96, 0.024]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Glowing Neon Cyber Edge Trim (Cyan / Golden Amber Accent) */}
      <mesh position={[0, 0, 0.002]}>
        <boxGeometry args={[0.488, 0.968, 0.02]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3.0} toneMapped={false} />
      </mesh>

      {/* Screen Surface Mesh (Glossy OLED Display) */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.45, 0.92]} />
        <meshStandardMaterial 
          color="#030712" 
          roughness={0.08} 
          metalness={0.8}
          emissive="#001824"
          emissiveIntensity={0.6} 
        />
      </mesh>

      {/* 1. OVERVIEW MODE: Spinning Holographic Phone Logo Projecting from Table */}
      {!isContactFocused && (
        <HolographicPhoneBeacon 
          hovered={beaconHovered}
          setHovered={setHovered}
          onClick={handleTriggerContact}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. CONTACT FOCUSED MODE: STACKED HOLOGRAPHIC CAPSULES (CONCEPT IMG 6)     */}
      {/* ========================================================================= */}
      {isContactFocused && (
        <group position={[0, 0.06, 0.2]} rotation={[0.42, 0, 0]}>
          {/* Holographic Projection Light Beams */}
          <mesh position={[0, -0.05, -0.06]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.16, 0.28, 32, 1, true]} />
            <meshBasicMaterial 
              color="#00f3ff" 
              transparent 
              opacity={0.16} 
              side={THREE.DoubleSide} 
              depthWrite={false} 
            />
          </mesh>

          {/* Floating Projected Holographic Capsule Stack (Concept Img 6) */}
          <Html
            transform
            distanceFactor={0.62}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            className="pointer-events-auto select-none"
          >
            <div 
              style={{
                width: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {/* TOP FLOATING TITLE BADGE: [ CONTACT ME ] */}
              <div 
                style={{
                  background: 'rgba(4, 18, 30, 0.92)',
                  border: '1.5px solid #00f3ff',
                  borderRadius: '10px',
                  padding: '4px 16px',
                  color: '#00f3ff',
                  fontSize: '12px',
                  fontWeight: 900,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  boxShadow: '0 0 20px rgba(0, 243, 255, 0.6), inset 0 0 10px rgba(0, 243, 255, 0.3)',
                  backdropFilter: 'blur(12px)',
                  marginBottom: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>[ CONTACT ME ]</span>
              </div>

              {/* CAPSULE 1: EMAIL (Cyan Glowing Capsule) */}
              <div
                onClick={handleCopyEmail}
                style={{
                  width: '100%',
                  background: 'rgba(6, 20, 32, 0.88)',
                  border: '1.5px solid #00f3ff',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 0 14px rgba(0, 243, 255, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#67e8f9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; e.currentTarget.style.borderColor = '#00f3ff'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0, 243, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #00f3ff' }}>
                    <Mail size={11} color="#00f3ff" />
                  </div>
                  <span style={{ fontSize: '9.5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.3px' }}>
                    EMAIL: <span style={{ color: '#00f3ff' }}>[{profileData.email}]</span>
                  </span>
                </div>
                <span style={{ fontSize: '8px', fontFamily: "'JetBrains Mono', monospace", background: copied ? '#10b981' : 'rgba(0, 243, 255, 0.25)', border: `1px solid ${copied ? '#10b981' : '#00f3ff'}`, padding: '2px 5px', borderRadius: '10px', color: '#ffffff', fontWeight: 800 }}>
                  {copied ? 'COPIED!' : 'COPY'}
                </span>
              </div>

              {/* CAPSULE 2: LINKEDIN (Emerald Green Glowing Capsule) */}
              <a
                href={profileData.linkedin || "https://linkedin.com/in/steveaby"}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '100%',
                  background: 'rgba(6, 28, 22, 0.88)',
                  border: '1.5px solid #10b981',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 0 14px rgba(16, 185, 129, 0.35)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#34d399'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; e.currentTarget.style.borderColor = '#10b981'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #10b981' }}>
                    <LinkedinIcon size={11} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '9.5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.3px' }}>
                    LINKEDIN: <span style={{ color: '#34d399' }}>[{profileData.linkedinHandle || "/in/steveaby"}]</span>
                  </span>
                </div>
                <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 800 }}>↗</span>
              </a>

              {/* CAPSULE 3: DISCORD (Emerald Green Glowing Capsule) */}
              <div
                onClick={() => {
                  navigator.clipboard.writeText("steveaby");
                  alert("Discord handle copied: steveaby");
                }}
                style={{
                  width: '100%',
                  background: 'rgba(6, 28, 22, 0.88)',
                  border: '1.5px solid #10b981',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 0 14px rgba(16, 185, 129, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#34d399'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; e.currentTarget.style.borderColor = '#10b981'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #10b981' }}>
                    <DiscordIcon size={11} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '9.5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.3px' }}>
                    DISCORD: <span style={{ color: '#34d399' }}>[@steveaby]</span>
                  </span>
                </div>
                <span style={{ fontSize: '8px', fontFamily: "'JetBrains Mono', monospace", background: 'rgba(16, 185, 129, 0.25)', border: '1px solid #10b981', padding: '2px 5px', borderRadius: '10px', color: '#ffffff', fontWeight: 800 }}>
                  COPY
                </span>
              </div>

              {/* CAPSULE 4: GITHUB (Cyan Glowing Capsule) */}
              <a
                href={profileData.github || "https://github.com/steveaby"}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '100%',
                  background: 'rgba(6, 20, 32, 0.88)',
                  border: '1.5px solid #00f3ff',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 0 14px rgba(0, 243, 255, 0.35)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#67e8f9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; e.currentTarget.style.borderColor = '#00f3ff'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0, 243, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #00f3ff' }}>
                    <GithubIcon size={11} color="#00f3ff" />
                  </div>
                  <span style={{ fontSize: '9.5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.3px' }}>
                    GITHUB: <span style={{ color: '#00f3ff' }}>[{profileData.githubHandle || "/steveaby"}]</span>
                  </span>
                </div>
                <span style={{ fontSize: '9px', color: '#00f3ff', fontWeight: 800 }}>↗</span>
              </a>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
