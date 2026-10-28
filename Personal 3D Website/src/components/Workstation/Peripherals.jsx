import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function Peripherals() {
  // Generate procedural keyboard keys grid
  const keysGrid = useMemo(() => {
    const keys = [];
    const rows = 5;
    const cols = 15;
    const startX = -0.55;
    const startZ = -0.15;
    const keySize = 0.07;
    const gap = 0.01;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let keyColor = "#1e293b"; // default dark navy
        if (r === 2 && (c === 3 || c === 4 || c === 5)) keyColor = "#f97316"; // Tangerine WASD/home
        else if (c === 0 || c === cols - 1) keyColor = "#10b981"; // Mint modifier keys
        else if (r === 0) keyColor = "#f59e0b"; // Golden function row
        else if ((r + c) % 3 === 0) keyColor = "#f8fafc"; // Cream alphas
        else if ((r + c) % 4 === 0) keyColor = "#3b82f6"; // Cobalt accents

        keys.push({
          id: `${r}-${c}`,
          pos: [
            startX + c * (keySize + gap),
            0.03,
            startZ + r * (keySize + gap)
          ],
          color: keyColor
        });
      }
    }
    return keys;
  }, []);

  return (
    <group position={[0, 1.46, 0.25]}>
      {/* Oversized Cyber Desk Mat with Glowing Amber/Mint Trim */}
      <mesh position={[-0.2, 0.005, 0.05]} receiveShadow>
        <boxGeometry args={[3.0, 0.01, 1.2]} />
        <meshStandardMaterial color="#18181b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Desk Mat Glowing Edge Piping (Golden Amber) */}
      <mesh position={[-0.2, 0.008, 0.05]}>
        <boxGeometry args={[3.02, 0.004, 1.22]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} toneMapped={false} />
      </mesh>

      {/* Mechanical Keyboard Assembly (Space Gray Aluminum with Custom Keycaps) */}
      <group position={[-0.3, 0.01, 0.15]} rotation={[-0.03, 0, 0]}>
        {/* Keyboard Aluminum Case */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.04, 0.48]} />
          <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Keyboard Under-Glow Diffuser (Warm Amber) */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[1.36, 0.01, 0.49]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.5} />
        </mesh>
        {/* Custom Multi-Color Keycaps Grid */}
        {keysGrid.map((k) => (
          <mesh key={k.id} position={k.pos} castShadow>
            <boxGeometry args={[0.07, 0.03, 0.07]} />
            <meshStandardMaterial 
              color={k.color} 
              metalness={0.3} 
              roughness={0.35}
              emissive={k.color === "#f97316" || k.color === "#10b981" || k.color === "#f59e0b" ? k.color : "#000000"}
              emissiveIntensity={k.color === "#f97316" || k.color === "#10b981" || k.color === "#f59e0b" ? 1.5 : 0}
            />
          </mesh>
        ))}
        {/* Coiled Aviator Keyboard Cable (Tangerine) */}
        <mesh position={[-0.35, 0.02, -0.28]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 16]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Ergonomic Gaming Mouse (Gunmetal with Tangerine Wheel) */}
      <group position={[0.75, 0.025, 0.2]} rotation={[0, -0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.06, 0.3]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Tangerine Scroll Wheel */}
        <mesh position={[0, 0.035, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={3} />
        </mesh>
        {/* Mouse RGB Mint Tail Line */}
        <mesh position={[0, 0.02, 0.12]}>
          <boxGeometry args={[0.12, 0.01, 0.02]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* Left Studio Monitor Speaker (Dark Walnut with Gold Brass Cones) */}
      <group position={[-1.75, 0.01, -0.25]} rotation={[0, 0.35, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.55, 0.35]} />
          <meshStandardMaterial color="#1c1917" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Speaker Tweeter */}
        <mesh position={[0, 0.14, 0.18]}>
          <cylinderGeometry args={[0.045, 0.045, 0.01, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Speaker Woofer */}
        <mesh position={[0, -0.08, 0.18]}>
          <cylinderGeometry args={[0.09, 0.09, 0.01, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Studio Monitor Speaker */}
      <group position={[1.75, 0.01, -0.25]} rotation={[0, -0.35, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.55, 0.35]} />
          <meshStandardMaterial color="#1c1917" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Speaker Tweeter */}
        <mesh position={[0, 0.14, 0.18]}>
          <cylinderGeometry args={[0.045, 0.045, 0.01, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Speaker Woofer */}
        <mesh position={[0, -0.08, 0.18]}>
          <cylinderGeometry args={[0.09, 0.09, 0.01, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Futuristic Ergonomic Workstation Chair (Cobalt Blue Mesh & Coral Lumbar) */}
      <group position={[0.2, -1.46, 1.4]} rotation={[0, -0.4, 0]}>
        {/* 5-Star Wheeled Base (Polished Chrome) */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.06, 5]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Hydraulic Chrome Piston */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.65, 24]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Seat Cushion (Cobalt Blue Fabric) */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.85, 0.14, 0.85]} />
          <meshStandardMaterial color="#2563eb" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Mesh Backrest (Electric Cobalt Mesh) */}
        <group position={[0, 1.45, -0.4]} rotation={[-0.1, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.75, 1.1, 0.08]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.4} metalness={0.4} />
          </mesh>
          {/* Backrest Lumbar Spine Accent (Vibrant Coral/Orange) */}
          <mesh position={[0, 0, -0.06]}>
            <cylinderGeometry args={[0.035, 0.035, 1.0, 16]} />
            <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={2.5} />
          </mesh>
        </group>
        {/* Armrests */}
        {[-0.45, 0.45].map((xOffset, i) => (
          <group key={i} position={[xOffset, 1.05, 0]}>
            <mesh>
              <boxGeometry args={[0.1, 0.04, 0.45]} />
              <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.04, 0.28, 0.06]} />
              <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
