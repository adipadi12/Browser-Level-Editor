// This component defines the 3D viewport where the scene is rendered.
// Think of it like a Unity scene camera + render window.
import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { useEditorStore } from '../../editor/useEditorStore';

import '../designforlayout/Viewport.css';
import Scene from './Scene';

const Viewport: FC = () => {
  // We read the clearSelection function from the shared editor store.
  const clearSelection = useEditorStore((state) => state.clearSelection);

  return (
    <main className="viewport">
      {/* Canvas is the container for all Three.js objects. */}
      <Canvas
        // Camera starts at a position that gives a 3D view of the scene.
        camera={{ position: [3, 2, 4], fov: 50 }}
        // Device pixel ratio = higher quality on retina displays.
        dpr={[1, 2]}
        // If the user clicks empty space, clear the current selection.
        onPointerMissed={clearSelection}
      >
        {/* Background color of the scene. */}
        <color attach="background" args={['rgba(234, 223, 196, 1)']} />

        {/* Ambient light gives basic scene illumination. */}
        <ambientLight intensity={0.6} />

        {/* A main directional light acts like a sun. */}
        <directionalLight position={[4, 5, 3]} intensity={1.8} />

        {/* Render the actual scene content, including objects and grid. */}
        <Scene />

        {/* Mouse orbit controls let the user rotate around the scene. */}
        <OrbitControls makeDefault />
      </Canvas>
    </main>
  );
};

export default Viewport;