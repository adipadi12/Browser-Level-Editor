import type { FC } from 'react';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../designforlayout/Viewport.css';

import Scene from './Scene';

const Viewport: FC = () => {

  const [selectedObject, setSelectedObject] =
    useState<string | null>(null);

  return (
    <main className="viewport">

      <Canvas
        camera={{ position: [3, 2, 4], fov: 50 }}
        dpr={[1, 2]}
        // resets selection when clicking empty space
        onPointerMissed={() => setSelectedObject(null)}
      >
        <color attach="background" args={['rgba(234, 223, 196, 1)']} />

        <ambientLight intensity={0.6} />

        <directionalLight
          position={[4, 5, 3]}
          intensity={1.8}
        />

        <Scene
          selectedObject={selectedObject}
          onSelectedObject={setSelectedObject}
        />

        <OrbitControls makeDefault />

      </Canvas>

    </main>
  );
};

export default Viewport;