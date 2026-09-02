// CameraObject renders an in-scene camera gizmo/helper for level design.
import { forwardRef } from 'react';
import type { Group } from 'three';
import type { SceneObject } from '../../types/scene';

type CameraObjectProps = {
  object: SceneObject;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const CameraObject = forwardRef<Group, CameraObjectProps>(
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
        {/* Camera body gizmo */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.5]} />
          <meshBasicMaterial
            color={isSelected ? '#ff8a5b' : '#3498db'}
            wireframe
          />
        </mesh>

        {/* Camera lens gizmo */}
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.2, 16]} />
          <meshBasicMaterial
            color={isSelected ? '#ff8a5b' : '#2980b9'}
            wireframe
          />
        </mesh>
      </group>
    );
  }
);

CameraObject.displayName = 'CameraObject';

export default CameraObject;
