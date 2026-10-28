import React, { useState } from 'react';
import Scene from './components/Scene';
import TopNav from './components/Navigation/TopNav';
import ViewHUD from './components/Navigation/ViewHUD';

export default function App() {
  const [currentView, setCurrentView] = useState('overview');

  const handleSetView = (view) => {
    setCurrentView(view);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#07090e] select-none">
      {/* Subtle Cyber Scanlines overlay */}
      <div className="absolute inset-0 cyber-scanlines z-10 opacity-20 pointer-events-none"></div>

      {/* Main 3D WebGL Canvas Scene (Contains all interactive in-scene 3D spatial surfaces) */}
      <Scene currentView={currentView} setView={handleSetView} />

      {/* Fixed Top HUD Header */}
      <TopNav currentView={currentView} setView={handleSetView} />

      {/* Bottom Floating Controls, Back Button, and Status Switcher */}
      <ViewHUD currentView={currentView} setView={handleSetView} />
    </main>
  );
}
