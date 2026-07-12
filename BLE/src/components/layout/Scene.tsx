import type { FC } from 'react';

const Scene: FC = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
};

export default Scene;
