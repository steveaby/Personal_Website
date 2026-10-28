import React, { useRef, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FolderCode, Cpu, User, Phone, Sparkles, Zap, Globe, Layers } from 'lucide-react';

// Icon Map
const ICON_MAP = {
  portfolio: FolderCode,
  skills: Cpu,
  about: User,
  contact: Phone,
  default: Sparkles
};

/**
 * PixelGravitySwarm
 * - Renders sleek glowing floating Pill Badge (the exact design the user loves)
 * - Surrounded by localized gravitational orbital pixel swarm
 * - Real-time physics: particles dynamically swirl and repel on mouse hover
 */
export default function PixelGravitySwarm({
  id,
  title,
  subtitle,
  iconType = 'default',
  position = [0, 0, 0],
  primaryColor = '#00f3ff',
  secondaryColor = '#a855f7',
  colors = ['#00f3ff', '#38bdf8', '#a855f7', '#fbbf24', '#f43f5e'],
  portalRadius = 0.65,
  onClick,
  isActive = false
}) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  const mousePlanePos = useRef(new THREE.Vector3(999, 999, 999));
  const particleCount = 420;

  const IconComponent = ICON_MAP[id] || ICON_MAP[iconType] || Sparkles;

  // Initialize localized particle cloud orbiting closely around the pill
  const { positions, colorArray, velocities, homePositions, massFactors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const homes = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const mass = new Float32Array(particleCount);

    const threeColors = colors.map(c => new THREE.Color(c));

    for (let i = 0; i < particleCount; i++) {
      // Create tight elliptical swarm surrounding the pill
      const angle = Math.random() * Math.PI * 2;
      const rx = (0.65 + Math.random() * 0.55); // Wider horizontally to match pill
      const ry = (0.28 + Math.random() * 0.35); // Flatter vertically
      const rz = (Math.random() - 0.5) * 0.45;

      const x = Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry;
      const z = rz;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      homes[i * 3] = x;
      homes[i * 3 + 1] = y;
      homes[i * 3 + 2] = z;

      vels[i * 3] = 0;
      vels[i * 3 + 1] = 0;
      vels[i * 3 + 2] = 0;

      mass[i] = 0.5 + Math.random() * 0.8;

      // Color blending
      const cIdx = Math.floor(Math.random() * (threeColors.length - 1));
      const factor = Math.random();
      const mixed = threeColors[cIdx].clone().lerp(threeColors[cIdx + 1], factor);

      cols[i * 3] = mixed.r;
      cols[i * 3 + 1] = mixed.g;
      cols[i * 3 + 2] = mixed.b;
    }

    return {
      positions: pos,
      colorArray: cols,
      velocities: vels,
      homePositions: homes,
      massFactors: mass
    };
  }, [colors, portalRadius]);

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (e.point && groupRef.current) {
      const local = groupRef.current.worldToLocal(e.point.clone());
      mousePlanePos.current.copy(local);
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
    mousePlanePos.current.set(999, 999, 999);
  };

  // Physics simulation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Billboard the group smoothly to face camera
      groupRef.current.quaternion.copy(camera.quaternion);
      // Gentle ambient floating
      const floatY = Math.sin(t * 2.0 + position[0] * 1.5) * 0.04;
      groupRef.current.position.y = position[1] + floatY;
    }

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArr = posAttr.array;
      const mx = mousePlanePos.current.x;
      const my = mousePlanePos.current.y;
      const isMouseNear = hovered && mx < 50;

      const springK = 0.1;
      const damping = 0.84;
      const mouseRepelRadius = 0.9;
      const mouseForce = 0.16;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const px = posArr[i3];
        const py = posArr[i3 + 1];
        const pz = posArr[i3 + 2];

        const hx = homePositions[i3];
        const hy = homePositions[i3 + 1];
        const hz = homePositions[i3 + 2];

        // 1. Hooke's Gravity Spring back to home
        let fx = (hx - px) * springK;
        let fy = (hy - py) * springK;
        let fz = (hz - pz) * springK;

        // 2. Harmonic wave
        const m = massFactors[i];
        fx += Math.sin(t * 2.5 * m + hy * 4) * 0.002;
        fy += Math.cos(t * 2.5 * m + hx * 4) * 0.002;

        // 3. Mouse repulsion & tangential swirl
        if (isMouseNear) {
          const dx = px - mx;
          const dy = py - my;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < mouseRepelRadius && dist > 0.001) {
            const repel = (1 - dist / mouseRepelRadius) * mouseForce;
            const normX = dx / dist;
            const normY = dy / dist;

            fx += normX * repel;
            fy += normY * repel;

            // Swirl
            fx += -normY * repel * 0.9;
            fy += normX * repel * 0.9;
            fz += (Math.random() - 0.5) * repel * 0.4;
          }
        }

        velocities[i3] = (velocities[i3] + fx) * damping;
        velocities[i3 + 1] = (velocities[i3 + 1] + fy) * damping;
        velocities[i3 + 2] = (velocities[i3 + 2] + fz) * damping;

        posArr[i3] += velocities[i3];
        posArr[i3 + 1] += velocities[i3 + 1];
        posArr[i3 + 2] += velocities[i3 + 2];
      }

      posAttr.needsUpdate = true;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHovered(true); 
        document.body.style.cursor = 'pointer'; 
      }}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onClick={(e) => { 
        e.stopPropagation(); 
        if (onClick) onClick(id); 
      }}
    >
      {/* Compact Interactive Hit Area */}
      <mesh position={[0, 0, 0.01]} onClick={(e) => { e.stopPropagation(); if (onClick) onClick(id); }}>
        <boxGeometry args={[1.1, 0.35, 0.1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Localized Gravitational Pixel Swarm Network around Pill */}
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
            count={colorArray.length / 3}
            array={colorArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={hovered ? 0.045 : 0.035}
          vertexColors
          transparent
          opacity={hovered ? 0.95 : 0.78}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ========================================================================= */}
      {/* SLEEK HOLOGRAPHIC PILL BADGE (Directly Clickable with Mouse/Touch)        */}
      {/* ========================================================================= */}
      <Html
        transform
        distanceFactor={2.4}
        position={[0, 0, 0.02]}
        className="pointer-events-auto select-none"
      >
        <div 
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
          style={{
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
            background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
            backdropFilter: 'blur(14px)',
            border: `1.5px solid ${primaryColor}`,
            padding: '7px 18px',
            borderRadius: '26px',
            color: '#ffffff',
            boxShadow: hovered 
              ? `0 0 35px ${primaryColor}90, inset 0 0 15px ${primaryColor}60` 
              : `0 0 25px ${primaryColor}60, inset 0 0 10px ${primaryColor}35`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: '13px',
            letterSpacing: '1.4px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <IconComponent size={16} color={primaryColor} />
          <span>{title}</span>
          {subtitle && (
            <span 
              style={{
                fontSize: '9px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                background: 'rgba(0, 0, 0, 0.35)',
                border: `1px solid ${primaryColor}60`,
                padding: '2px 6px',
                borderRadius: '12px',
                color: '#e2e8f0',
                marginLeft: '4px'
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}
