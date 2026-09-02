// ModelObject renders an imported GLTF/GLB 3D model into the scene.
// It uses the useGLTF hook from @react-three/drei to load the model from a blob URL.
import { useGLTF } from '@react-three/drei';
import { useMemo, forwardRef } from 'react';
import type { Group } from 'three';
import type { SceneObject } from '../../types/scene';

type ModelObjectProps = {
  object: SceneObject;
  onSelect: (id: string) => void;
};

const ModelObject = forwardRef<Group, ModelObjectProps>(
  ({ object, onSelect }, ref) => {
    // Load the GLTF model from the blob URL.
    // useGLTF caches by URL, so re-renders are efficient.
    const { scene } = useGLTF(object.modelUrl!);

    // Clone the scene only when the loaded GLTF changes so each instance has independent transform state.
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    return (
      <group
        ref={ref}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(object.id);
        }}
      >
        {/* Render the loaded GLTF scene graph */}
        <primitive object={clonedScene} />
      </group>
    );
  }
);

ModelObject.displayName = 'ModelObject';

export default ModelObject;
