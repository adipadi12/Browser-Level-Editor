// LightObject renders 3D lights with visual gizmos in the editor.
import { forwardRef } from 'react';
import type { Group } from 'three';
import type { SceneObject } from '../../types/scene';

type LightObjectProps = {
  object: SceneObject;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const LightObject = forwardRef<Group, LightObjectProps>(
  ({ object, isSelected, onSelect }, ref) => {
    const light = object.light || {
      color: '#ffffff',
      intensity: 1.0,
      castShadow: true,
      angle: 0.6,
      penumbra: 0.2,
    };

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
        {/* Real Three.js light source */}
        {object.type === 'pointLight' && (
          <pointLight
            color={light.color}
            intensity={light.intensity}
            castShadow={light.castShadow}
          />
        )}

        {object.type === 'directionalLight' && (
          <directionalLight
            color={light.color}
            intensity={light.intensity}
            castShadow={light.castShadow}
          />
        )}

        {object.type === 'spotLight' && (
          <spotLight
            color={light.color}
            intensity={light.intensity}
            angle={light.angle || 0.6}
            penumbra={light.penumbra || 0.2}
            castShadow={light.castShadow}
          />
        )}

        {/* Visual editor helper bulb / icon so the user can click & drag the light */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color={isSelected ? '#ff8a5b' : light.color}
            wireframe={!isSelected}
          />
        </mesh>
      </group>
    );
  }
);

LightObject.displayName = 'LightObject';

export default LightObject;
