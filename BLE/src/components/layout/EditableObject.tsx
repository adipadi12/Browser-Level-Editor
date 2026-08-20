import { useRef } from 'react';
import type { Mesh } from 'three';
import { TransformControls } from '@react-three/drei';

import type { SceneObject } from '../../types/scene';

type EditableObjectProps = {
  object: SceneObject;
  selected: boolean;
  onSelect: (id: string) => void;
};

const EditableObject = ({
  object,
  selected,
  onSelect,
}: EditableObjectProps) => {

  const meshRef = useRef<Mesh>(null);

  if (object.type !== 'cube') {
    return null;
  }

  return (
    <>
      <mesh
        ref={meshRef}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(object.id);
        }}
      >

        <boxGeometry args={[1, 1, 1]} />

        <meshStandardMaterial
          color={selected ? 'orange' : 'pink'}
        />

      </mesh>

      {selected && meshRef.current && (
        <TransformControls
          object={meshRef.current}
          mode="translate"
        />
      )}
    </>
  );
};

export default EditableObject;