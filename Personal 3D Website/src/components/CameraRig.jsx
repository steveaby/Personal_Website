import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const CAMERA_PRESETS = {
  overview: {
    position: [11.5, 11.5, 11.5],
    target: [0.35, 1.2, 0],
    fov: 36
  },
  about: {
    position: [6.8, 2.0, 3.4],
    target: [3.0, 1.4, 0],
    fov: 36
  },
  portfolio: {
    position: [0, 2.45, 2.7],
    target: [0, 2.45, -0.4],
    fov: 36
  },
  skills: {
    position: [-6.2, 0.72, 0.4],
    target: [-2.3, 0.72, 0.4],
    fov: 28
  },
  contact: {
    position: [2.0, 3.2, 2.0],
    target: [0.7, 1.48, 0.45],
    fov: 25
  }
};

export default function CameraRig({ currentView }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const tweenRef = useRef(null);

  useEffect(() => {
    const preset = CAMERA_PRESETS[currentView] || CAMERA_PRESETS.overview;
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const currentTarget = controls.target;

    const dummyTarget = {
      tx: currentTarget.x,
      ty: currentTarget.y,
      tz: currentTarget.z,
      fov: camera.fov
    };

    tweenRef.current = gsap.timeline({
      onUpdate: () => {
        controls.target.set(dummyTarget.tx, dummyTarget.ty, dummyTarget.tz);
        camera.fov = dummyTarget.fov;
        camera.updateProjectionMatrix();
        controls.update();
      }
    });

    tweenRef.current.to(camera.position, {
      x: preset.position[0],
      y: preset.position[1],
      z: preset.position[2],
      duration: 1.4,
      ease: 'power3.inOut'
    }, 0);

    tweenRef.current.to(dummyTarget, {
      tx: preset.target[0],
      ty: preset.target[1],
      tz: preset.target[2],
      fov: preset.fov,
      duration: 1.4,
      ease: 'power3.inOut'
    }, 0);

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [currentView, camera]);

  const isPortfolio = currentView === 'portfolio';

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={!isPortfolio}
      enableDamping
      dampingFactor={0.06}
      enableRotate={!isPortfolio}
      enableZoom={!isPortfolio}
      enablePan={!isPortfolio}
      minDistance={1.0}
      maxDistance={35}
      maxPolarAngle={Math.PI / 2 - 0.04}
      makeDefault
    />
  );
}
