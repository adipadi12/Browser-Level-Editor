import type { FC } from 'react';

const Scene: FC = () => {
  return (
    <mesh rotation={[0.45, 0.65, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Scene;
