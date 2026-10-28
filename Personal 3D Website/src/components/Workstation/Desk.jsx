import React, { useRef } from 'react';
import * as THREE from 'three';

export default function Desk() {
  const deskRef = useRef();

  return (
    <group ref={deskRef} position={[0, 0, 0]}>
      {/* Main Desktop Surface (Rich Carbon Walnut Top) */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.12, 2.2]} />
        <meshStandardMaterial 
          color="#231a14" 
          roughness={0.35} 
          metalness={0.4} 
        />
      </mesh>

      {/* Desk Glowing Perimeter Strip (Warm Golden Amber Glow) */}
      <mesh position={[0, 1.34, 0]}>
        <boxGeometry args={[4.84, 0.04, 2.24]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          emissive="#f59e0b" 
          emissiveIntensity={2.2} 
          toneMapped={false}
        />
      </mesh>

      {/* Desk Under-Glow Ambient Mesh (Cyan & Amber Mix) */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[4.7, 0.02, 2.1]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4" 
          emissiveIntensity={1.8} 
          toneMapped={false}
        />
      </mesh>

      {/* Left Drawer Cabinet Body (Dark Espresso Graphite) */}
      <group position={[-1.8, 0.65, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.9, 1.36, 1.9]} />
          <meshStandardMaterial color="#18181b" roughness={0.35} metalness={0.6} />
        </mesh>
        
        {/* Drawer Insets & LED Accents */}
        {[0.35, 0, -0.35].map((yOffset, i) => (
          <group key={i} position={[0, yOffset, 0.96]}>
            {/* Drawer Face Plate */}
            <mesh>
              <boxGeometry args={[0.82, 0.28, 0.02]} />
              <meshStandardMaterial color="#27272a" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Brushed Brass / Gold Metal Handle */}
            <mesh position={[0, 0, 0.025]}>
              <boxGeometry args={[0.4, 0.03, 0.02]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} emissive="#d97706" emissiveIntensity={0.6} />
            </mesh>
            {/* Small Status LED (Amber, Mint, Cobalt) */}
            <mesh position={[-0.32, 0.08, 0.02]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial 
                color={i === 0 ? "#f59e0b" : i === 1 ? "#10b981" : "#3b82f6"} 
                emissive={i === 0 ? "#f59e0b" : i === 1 ? "#10b981" : "#3b82f6"} 
                emissiveIntensity={3.5} 
              />
            </mesh>
          </group>
        ))}

        {/* Vertical Glow Strip on Cabinet Corner (Gold Amber) */}
        <mesh position={[0.46, 0, 0.96]}>
          <boxGeometry args={[0.02, 1.3, 0.02]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Right Modern Angled Metal Legs (Space Gray Brushed Aluminum) */}
      <group position={[1.9, 0.65, 0]}>
        {/* Front Leg */}
        <mesh position={[0, 0, 0.85]} castShadow>
          <boxGeometry args={[0.1, 1.36, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Rear Leg */}
        <mesh position={[0, 0, -0.85]} castShadow>
          <boxGeometry args={[0.1, 1.36, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Bottom Connecting Base (Gold Trim) */}
        <mesh position={[0, -0.66, 0]}>
          <boxGeometry args={[0.12, 0.04, 1.9]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
        </mesh>
        {/* Top Connecting Strut */}
        <mesh position={[0, 0.66, 0]}>
          <boxGeometry args={[0.1, 0.04, 1.8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
      </group>

      {/* Cable Management Raceway underneath */}
      <mesh position={[0, 1.25, -0.6]}>
        <boxGeometry args={[2.5, 0.15, 0.3]} />
        <meshStandardMaterial color="#05070c" metalness={0.5} roughness={0.8} />
      </mesh>
    </group>
  );
}
