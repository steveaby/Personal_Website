import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Pixel Swarm (Volumetric curved particle clouds)
 * Matches the reference mockups with vibrant multicolor gradients, organic drift, and shimmer.
 */
export default function PixelSwarm({ 
  count = 600, 
  position = [0, 0, 0], 
  radius = 2.0, 
  shape = 'hemisphere', // 'sphere' | 'hemisphere' | 'arc' | 'behind'
  colors = ['#00f3ff', '#a855f7', '#10b981', '#fbbf24'],
  size = 0.05,
  speed = 0.4
}) {
  const pointsRef = useRef();

  const { positions, colorArray, initialOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const offsets = new Float32Array(count * 3);

    const threeColors = colors.map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      let x, y, z;

      if (shape === 'hemisphere') {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(v); // only upper hemisphere or one side
        const r = radius * (0.6 + Math.random() * 0.5);

        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.cos(phi) * (Math.random() > 0.3 ? 1 : -0.5);
        z = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      } else if (shape === 'arc') {
        const angle = (Math.random() - 0.5) * Math.PI * 1.6;
        const r = radius * (0.8 + Math.random() * 0.4);
        const spread = (Math.random() - 0.5) * 0.8;

        x = Math.cos(angle) * r;
        y = spread + Math.sin(angle * 2) * 0.3;
        z = Math.sin(angle) * r * 0.6;
      } else if (shape === 'behind') {
        // Flat nebula wall behind an object (e.g. humanoid pod)
        x = (Math.random() - 0.5) * radius * 1.8;
        y = (Math.random() - 0.5) * radius * 1.8;
        z = (Math.random() - 0.5) * 0.6 - 0.4;
      } else {
        // Volumetric sphere
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = radius * Math.cbrt(Math.random());

        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      offsets[i * 3] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 2] = Math.random() * Math.PI * 2;

      // Pick blended color from palette
      const cIdx = Math.floor(Math.random() * (threeColors.length - 1));
      const factor = Math.random();
      const mixed = threeColors[cIdx].clone().lerp(threeColors[cIdx + 1], factor);

      cols[i * 3] = mixed.r;
      cols[i * 3 + 1] = mixed.g;
      cols[i * 3 + 2] = mixed.b;
    }

    return { positions: pos, colorArray: cols, initialOffsets: offsets };
  }, [count, radius, shape, colors]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.2;
      pointsRef.current.rotation.z = Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <group position={position}>
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
          size={size}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
