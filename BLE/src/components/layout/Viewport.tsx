import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../designforlayout/Viewport.css';

import Scene from './Scene';

const Viewport: FC = () => {
  return (
    <main className="viewport">
      <Canvas camera={{ position: [3, 2, 4], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#20242c']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} />
        <Scene />
        <OrbitControls makeDefault />
      </Canvas>
    </main>
  );
};

export default Viewport;
