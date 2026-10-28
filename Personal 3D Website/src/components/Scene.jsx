import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import CameraRig from './CameraRig';
import Desk from './Workstation/Desk';
import Monitor from './Workstation/Monitor';
import PCTower from './Workstation/PCTower';
import Smartphone from './Workstation/Smartphone';
import Peripherals from './Workstation/Peripherals';
import HumanoidPod from './Workstation/HumanoidPod';
import PixelGravitySwarm from './Navigation/PixelGravitySwarm';

// Cyber Sci-Fi Ground Grid & Platform
function SciFiFloor() {
  return (
    <group position={[0, 0, 0]}>
      {/* Central Workstation Main Dark Carbon Platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[11.4, 0.1, 8.8]} />
        <meshStandardMaterial 
          color="#080c16" 
          roughness={0.8} 
          metalness={0.4} 
        />
      </mesh>

      {/* Platform Perimeter Cyan Glowing Edge Strips (4 borders) */}
      {/* Front & Back Borders */}
      <mesh position={[0, 0.005, 4.38]}>
        <boxGeometry args={[11.36, 0.015, 0.04]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.005, -4.38]}>
        <boxGeometry args={[11.36, 0.015, 0.04]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      {/* Left & Right Borders */}
      <mesh position={[-5.68, 0.005, 0]}>
        <boxGeometry args={[0.04, 0.015, 8.76]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      <mesh position={[5.68, 0.005, 0]}>
        <boxGeometry args={[0.04, 0.015, 8.76]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>

      {/* Inner Floor Inset Tiles */}
      <mesh position={[0, -0.045, 0]} receiveShadow>
        <boxGeometry args={[11.2, 0.09, 8.6]} />
        <meshStandardMaterial color="#0b101e" roughness={0.7} metalness={0.5} />
      </mesh>

      {/* Sub-floor Floor Grid Lines */}
      <gridHelper 
        args={[40, 40, '#00f3ff', '#1e293b']} 
        position={[0, -0.06, 0]} 
      />

      {/* Deep Dark Space Sub-floor */}
      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#030509" roughness={0.95} />
      </mesh>
    </group>
  );
}

// Floating Ambient Dust Particles in the isometric room
function AmbientDust() {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#00f3ff");
    const c2 = new THREE.Color("#a855f7");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 9 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;

      const mixed = c1.clone().lerp(c2, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene({ currentView, setView }) {
  const isOverview = currentView === 'overview';

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [11, 11, 11], fov: 36, near: 0.1, far: 1000 }}
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <color attach="background" args={['#07090e']} />

        {/* Ambient & Key Studio Lighting */}
        <ambientLight intensity={1.15} />
        <directionalLight 
          position={[12, 22, 14]} 
          intensity={2.8} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          color="#fffaf0"
        />
        {/* Soft Secondary Top-Left Cool Fill Light */}
        <directionalLight 
          position={[-12, 16, -10]} 
          intensity={1.6} 
          color="#dbeafe" 
        />

        {/* Central Workstation Desk High-Luminance Studio Spot */}
        <pointLight position={[0, 4.8, 1.2]} color="#ffffff" intensity={4.5} distance={12} />

        {/* Vibrant Multi-Hue Room Atmosphere Accent Lights */}
        <pointLight position={[-4.5, 3.0, 1.5]} color="#f97316" intensity={4.5} distance={12} />
        <pointLight position={[4.5, 3.5, 1.2]} color="#10b981" intensity={4.0} distance={12} />
        <pointLight position={[0, 1.6, 2.6]} color="#38bdf8" intensity={3.5} distance={9} />
        <pointLight position={[0, 0.8, -2.5]} color="#a855f7" intensity={3.0} distance={10} />

        <Suspense fallback={null}>
          <CameraRig currentView={currentView} />

          {/* Isometric Room Floor */}
          <SciFiFloor />

          {/* Central Procedural Workstation Group */}
          <group position={[0, 0, 0]}>
            <Desk />
            <Monitor 
              currentView={currentView} 
              onSelectProject={() => setView('portfolio')} 
            />
            <PCTower 
              currentView={currentView} 
              onSelectSkills={() => setView('skills')} 
            />
            <Smartphone 
              currentView={currentView} 
              onFocusContact={() => setView('contact')} 
            />
            <Peripherals />
            <HumanoidPod 
              currentView={currentView} 
              onSelectAbout={() => setView('about')} 
            />
          </group>

          {/* 4 Sleek Interactive Pill Badges with Localized Gravitational Pixel Swarms */}
          {isOverview && (
            <group>
              {/* 1. PORTFOLIO PROJECTS: Floating Just Above the Monitor */}
              <PixelGravitySwarm
                id="portfolio"
                title="Portfolio Projects"
                subtitle="Live Archive"
                iconType="portfolio"
                position={[0, 3.05, -0.4]}
                primaryColor="#00f3ff"
                secondaryColor="#3b82f6"
                colors={['#00f3ff', '#38bdf8', '#60a5fa', '#f59e0b', '#ec4899']}
                portalRadius={0.65}
                isActive={currentView === 'portfolio'}
                onClick={setView}
              />

              {/* 2. TECHNICAL SKILLS: Floating Directly Above the PC Tower */}
              <PixelGravitySwarm
                id="skills"
                title="Tech Skills"
                subtitle="Exploded Hardware"
                iconType="skills"
                position={[-2.3, 2.15, 0.4]}
                primaryColor="#c084fc"
                secondaryColor="#ec4899"
                colors={['#a855f7', '#c084fc', '#ec4899', '#f43f5e', '#fbbf24']}
                portalRadius={0.65}
                isActive={currentView === 'skills'}
                onClick={setView}
              />

              {/* 3. ABOUT ME: Floating Directly Near the Humanoid Robot */}
              <PixelGravitySwarm
                id="about"
                title="About Me"
                subtitle="MS CS @ UIUC"
                iconType="about"
                position={[3.0, 3.15, 0]}
                primaryColor="#10b981"
                secondaryColor="#06b6d4"
                colors={['#10b981', '#34d399', '#06b6d4', '#fbbf24', '#a855f7']}
                portalRadius={0.65}
                isActive={currentView === 'about'}
                onClick={setView}
              />

              {/* 4. CONTACT ME: Floating Directly Above the Smartphone */}
              <PixelGravitySwarm
                id="contact"
                title="Contact Me"
                subtitle="Hologram"
                iconType="contact"
                position={[0.7, 1.85, 0.65]}
                primaryColor="#38bdf8"
                secondaryColor="#10b981"
                colors={['#38bdf8', '#00f3ff', '#10b981', '#a855f7', '#f43f5e']}
                portalRadius={0.55}
                isActive={currentView === 'contact'}
                onClick={setView}
              />
            </group>
          )}

          {/* Enable subtle orbit damping when in Overview */}
          {isOverview && (
            <OrbitControls 
              enableZoom={true} 
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.3}
              minDistance={10}
              maxDistance={25}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
