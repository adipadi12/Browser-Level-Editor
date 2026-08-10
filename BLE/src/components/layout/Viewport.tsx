import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { useEditorStore } from '../../editor/useEditorStore';

import '../designforlayout/Viewport.css';
import Scene from './Scene';

const Viewport: FC = () => {

  const clearSelection = useEditorStore(
    (state) => state.clearSelection
  );

  return (
    <main className="viewport">

      <Canvas
        camera={{ position: [3, 2, 4], fov: 50 }}
        dpr={[1, 2]}
        onPointerMissed={clearSelection}
      >

        <color
          attach="background"
          args={['rgba(234, 223, 196, 1)']}
        />

        <ambientLight intensity={0.6} />

        <directionalLight
          position={[4, 5, 3]}
          intensity={1.8}
        />

        <Scene />

        <OrbitControls makeDefault />

      </Canvas>

    </main>
  );
};

export default Viewport;