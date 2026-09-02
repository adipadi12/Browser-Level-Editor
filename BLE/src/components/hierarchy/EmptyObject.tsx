// EmptyObject renders a 3D transform handle / axes helper for group and empty nodes.
import { forwardRef } from 'react';
import type { Group } from 'three';
import type { SceneObject } from '../../types/scene';

type EmptyObjectProps = {
  object: SceneObject;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const EmptyObject = forwardRef<Group, EmptyObjectProps>(
  ({ object, isSelected, onSelect }, ref) => {
    return (
      <group
        ref={ref}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        visible={object.visible}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(object.id);
        }}
      >
        {/* Visual axes gizmo for the empty object */}
        <axesHelper args={[0.5]} />

        {/* Invisible hit-box mesh so user can click on the empty node */}
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshBasicMaterial
            color={isSelected ? '#ff8a5b' : '#aaaaaa'}
            wireframe
            transparent
            opacity={isSelected ? 0.8 : 0.2}
          />
        </mesh>
      </group>
    );
  }
);

EmptyObject.displayName = 'EmptyObject';

export default EmptyObject;
