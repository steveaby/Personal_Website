import React, { useRef, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CyberPortalNode
 * Exact replica of the reference mockup:
 * - Defined circular portal rings (Neon Cyan, Violet, Emerald, Lime)
 * - Volumetric pixel swarm shell (curved arc/dome of thousands of luminous dots)
 * - Dynamic mouse hover interactions (particle turbulence, scale pulse, preview tooltip)
 */
export default function CyberPortalNode({
  id,
  title,
  subtitle,
  previewTitle,
  previewImage,
  previewDesc,
  position = [0, 0, 0],
  swarmType = 'top-left', // 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
  primaryColor = '#00f3ff',
  secondaryColor = '#a855f7',
  colors = ['#00f3ff', '#38bdf8', '#a855f7'],
  portalRadius = 0.95,
  onClick,
  isActive = false
}) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { camera, raycaster, pointer } = useThree();

  const particleCount = 750;

  // Generate the curved particle swarm arc/dome matching the mockup
  const { basePositions, colorsArray, speeds, originalPositions } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const orig = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const spds = new Float32Array(particleCount);

    const threeColors = colors.map(c => new THREE.Color(c));

    for (let i = 0; i < particleCount; i++) {
      let x, y, z;
      const r = portalRadius * (1.1 + Math.random() * 0.9);

      if (swarmType === 'top-left') {
        // Large curved dome on top and left of the circle
        const angle = Math.PI * 0.3 + Math.random() * Math.PI * 1.1; // 54 deg to 252 deg
        const spreadZ = (Math.random() - 0.5) * 0.8;
        const depth = Math.sin(Math.random() * Math.PI) * 0.6;
        x = Math.cos(angle) * r - 0.2;
        y = Math.sin(angle) * r + 0.2;
        z = spreadZ - depth * 0.4;
      } else if (swarmType === 'bottom-left') {
        // Curved cup under the bottom and left
        const angle = Math.PI * 0.8 + Math.random() * Math.PI * 1.0; // 144 deg to 324 deg
        const spreadZ = (Math.random() - 0.5) * 0.7;
        const depth = Math.sin(Math.random() * Math.PI) * 0.5;
        x = Math.cos(angle) * r - 0.15;
        y = Math.sin(angle) * r - 0.2;
        z = spreadZ - depth * 0.3;
      } else if (swarmType === 'top-right') {
        // Curved arc on top and right
        const angle = -Math.PI * 0.1 + Math.random() * Math.PI * 0.9; // -18 deg to 144 deg
        const spreadZ = (Math.random() - 0.5) * 0.7;
        const depth = Math.sin(Math.random() * Math.PI) * 0.5;
        x = Math.cos(angle) * r + 0.15;
        y = Math.sin(angle) * r + 0.2;
        z = spreadZ - depth * 0.4;
      } else {
        // bottom-right: curved cup under bottom-right
        const angle = Math.PI * 1.1 + Math.random() * Math.PI * 0.95;
        const spreadZ = (Math.random() - 0.5) * 0.7;
        const depth = Math.sin(Math.random() * Math.PI) * 0.5;
        x = Math.cos(angle) * r + 0.15;
        y = Math.sin(angle) * r - 0.2;
        z = spreadZ - depth * 0.3;
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      spds[i] = 0.5 + Math.random() * 1.5;

      // Color interpolation
      const cIdx = Math.floor(Math.random() * (threeColors.length - 1));
      const factor = Math.random();
      const mixed = threeColors[cIdx].clone().lerp(threeColors[cIdx + 1], factor);

      cols[i * 3] = mixed.r;
      cols[i * 3 + 1] = mixed.g;
      cols[i * 3 + 2] = mixed.b;
    }

    return { 
      basePositions: pos, 
      colorsArray: cols, 
      speeds: spds, 
      originalPositions: orig 
    };
  }, [swarmType, colors, portalRadius]);

  // Billboard the group towards isometric camera
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Make portal face camera while floating softly
      groupRef.current.quaternion.copy(camera.quaternion);
      const floatOffset = Math.sin(t * 1.4 + position[0]) * 0.05;
      groupRef.current.position.y = position[1] + floatOffset;
    }

    // Dynamic Swarm Particle Animation & Mouse Turbulence
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const arr = positionsAttr.array;

      // Calculate mouse interaction intensity
      const hoverFactor = hovered ? 2.5 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];
        const spd = speeds[i];

        // Soft organic breathing & shimmering
        const waveX = Math.sin(t * spd + oy * 2) * 0.04 * hoverFactor;
        const waveY = Math.cos(t * spd + ox * 2) * 0.04 * hoverFactor;
        const waveZ = Math.sin(t * spd * 1.2) * 0.03 * hoverFactor;

        arr[i3] = ox + waveX;
        arr[i3 + 1] = oy + waveY;
        arr[i3 + 2] = oz + waveZ;
      }
      positionsAttr.needsUpdate = true;
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
      onPointerOut={() => { 
        setHovered(false); 
        document.body.style.cursor = 'auto'; 
      }}
      onClick={(e) => { 
        e.stopPropagation(); 
        onClick(id); 
      }}
    >
      {/* Invisible Raycast Disc Target for reliable click/hover */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[portalRadius * 1.35, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Volumetric Pixel Swarm Arc / Dome */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={basePositions.length / 3}
            array={basePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colorsArray.length / 3}
            array={colorsArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={hovered ? 0.055 : 0.042}
          vertexColors
          transparent
          opacity={hovered ? 0.95 : 0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ========================================================================= */}
      {/* DEFINED CIRCULAR PORTAL (Exact Match to Mockup)                           */}
      {/* ========================================================================= */}
      <group scale={hovered ? 1.08 : 1.0}>
        {/* Outer Soft Glow Halo Ring */}
        <mesh position={[0, 0, -0.02]}>
          <ringGeometry args={[portalRadius * 0.96, portalRadius * 1.18, 64]} />
          <meshBasicMaterial 
            color={secondaryColor} 
            transparent 
            opacity={hovered ? 0.6 : 0.35} 
            side={THREE.DoubleSide} 
            depthWrite={false} 
          />
        </mesh>

        {/* Primary Sharp Glowing Neon Outer Ring */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[portalRadius * 0.92, portalRadius * 0.98, 64]} />
          <meshBasicMaterial 
            color={primaryColor} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Secondary Inner Cyan/Violet Border Ring */}
        <mesh position={[0, 0, 0.002]}>
          <ringGeometry args={[portalRadius * 0.84, portalRadius * 0.87, 64]} />
          <meshBasicMaterial 
            color={hovered ? primaryColor : secondaryColor} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Dark Translucent Glass Core Disc */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[portalRadius * 0.92, 48]} />
          <meshBasicMaterial 
            color="#050813" 
            transparent 
            opacity={0.88} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Clean Centered Typography Inside the Portal */}
        <Html
          transform
          distanceFactor={2.8}
          position={[0, 0, 0.01]}
          className="pointer-events-none select-none"
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '180px',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'transform 0.25s ease'
            }}
          >
            <div 
              style={{
                fontSize: title.length > 12 ? '13px' : '15px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                lineHeight: '1.2',
                textShadow: `0 0 14px ${primaryColor}, 0 0 25px ${secondaryColor}`
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div 
                style={{
                  fontSize: '9px',
                  color: primaryColor,
                  fontFamily: "'JetBrains Mono', monospace",
                  marginTop: '4px',
                  letterSpacing: '0.8px',
                  fontWeight: 600
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* ========================================================================= */}
      {/* HOVER PREVIEW POPUP CARD (Matching "Sample Project" card in Mockup)       */}
      {/* ========================================================================= */}
      {hovered && (
        <Html
          position={[1.2, -0.4, 0.1]}
          distanceFactor={3.2}
          className="pointer-events-none select-none animate-fade-in"
        >
          <div 
            style={{
              width: '210px',
              background: 'rgba(6, 12, 24, 0.94)',
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${primaryColor}`,
              borderRadius: '12px',
              padding: '12px',
              color: '#f8fafc',
              boxShadow: `0 0 25px ${primaryColor}40, 0 10px 30px rgba(0,0,0,0.8)`,
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', color: primaryColor, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, textTransform: 'uppercase' }}>
                {previewTitle || title}
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }}></span>
            </div>

            {previewImage && (
              <div style={{ width: '100%', height: '85px', borderRadius: '6px', overflow: 'hidden', margin: '6px 0', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            )}

            <div style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: '1.3' }}>
              {previewDesc || "Click node to zoom camera and explore full interactive workstation module."}
            </div>

            <div style={{ marginTop: '8px', fontSize: '9px', color: primaryColor, fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>⚡ Click to enter {title}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
