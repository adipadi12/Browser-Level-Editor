// This component renders a single 3D mesh that the user can select and transform.
// A React component is similar to a Unity GameObject script: it creates visually rendered content.
import { useRef } from 'react';
import type { Mesh } from 'three';
import { TransformControls } from '@react-three/drei';

import type { SceneObject } from '../../types/scene';

// Props needed by this component.
type EditableObjectProps = {
  // The scene data for this object.
  object: SceneObject;

  // Are we currently selecting this object?
  selected: boolean;

  // Callback that tells the parent which object was clicked.
  onSelect: (id: string) => void;
};

const EditableObject = ({
  object,
  selected,
  onSelect,
}: EditableObjectProps) => {
  // Ref lets us hold a direct reference to the underlying mesh instance.
  const meshRef = useRef<Mesh>(null);

  // We only support cube objects in this component.
  if (object.type !== 'cube') {
    return null;
  }

  return (
    <>
      <mesh
        // Keep a reference to the real Three.js mesh for later transform controls.
        ref={meshRef}
        // Position, rotation, and scale come from our scene data.
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        // Clicking the mesh should stop the event from bubbling up and notify the parent.
        onClick={(event) => {
          event.stopPropagation();
          onSelect(object.id);
        }}
      >
        {/* A cube is just a box with width, height, and depth of 1. */}
        <boxGeometry args={[1, 1, 1]} />

        {/* The material color changes depending on whether the mesh is selected. */}
        <meshStandardMaterial color={selected ? 'orange' : 'pink'} />
      </mesh>

      {/* When the object is selected, show gizmo handles so the user can move it around. */}
      {selected && meshRef.current && (
        <TransformControls object={meshRef.current} mode="translate" />
      )}
    </>
  );
};

export default EditableObject;