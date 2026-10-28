import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PixelSwarm from '../Workstation/PixelSwarm';

export default function ParticleSphere({ 
  id, 
  title, 
  subtitle,
  position, 
  color = "#00f3ff", 
  secondaryColor = "#a855f7",
  palette = ['#00f3ff', '#a855f7', '#10b981'],
  isActive, 
  onClick 
}) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.9;
      ring1Ref.current.rotation.y = t * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.7;
      ring2Ref.current.rotation.y = -t * 0.5;
    }
    if (groupRef.current) {
      const floatY = Math.sin(t * 1.5 + position[0]) * 0.08;
      groupRef.current.position.y = position[1] + floatY;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
    >
      {/* Invisible Raycast Hit Target */}
      <mesh visible={false}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Volumetric Pixel Swarm wrapping around the interaction orb (Matches mockup) */}
      <PixelSwarm
        position={[0, 0, 0]}
        radius={1.65}
        shape="hemisphere"
        count={450}
        colors={palette}
        size={0.04}
        speed={0.5}
      />

      {/* Glowing Core Sphere */}
      <mesh scale={hovered || isActive ? 1.25 : 1.0}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered || isActive ? 3.5 : 2.2} 
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Rotating Cyber Neon Ring 1 */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[0.7, 0.022, 16, 64]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered || isActive ? 3.5 : 2.5} 
            toneMapped={false} 
          />
        </mesh>
      </group>

      {/* Rotating Cyber Neon Ring 2 */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[0.82, 0.016, 16, 64]} />
          <meshStandardMaterial 
            color={secondaryColor} 
            emissive={secondaryColor} 
            emissiveIntensity={hovered || isActive ? 3.5 : 2.0} 
            toneMapped={false} 
          />
        </mesh>
      </group>

      {/* Point Light Source */}
      <pointLight 
        color={color} 
        intensity={hovered || isActive ? 3.5 : 1.8} 
        distance={2.5} 
      />

      {/* Floating 3D Text Label Tag */}
      <Html
        transform
        distanceFactor={3.2}
        position={[0, -0.05, 0]}
        rotation={[0, 0, 0]}
        className="pointer-events-none select-none"
      >
        <div 
          style={{
            transform: hovered || isActive ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.25s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '180px'
          }}
        >
          <div 
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: hovered || isActive 
                ? 'rgba(4, 12, 24, 0.95)' 
                : 'rgba(6, 10, 18, 0.85)',
              border: `1.5px solid ${color}`,
              boxShadow: hovered || isActive 
                ? `0 0 25px ${color}, inset 0 0 10px ${secondaryColor}` 
                : `0 0 15px ${color}`,
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div 
              style={{
                fontSize: '9px',
                color: '#94a3b8',
                fontFamily: "'JetBrains Mono', monospace",
                marginTop: '4px',
                textShadow: '0 0 8px rgba(0, 0, 0, 0.9)'
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
