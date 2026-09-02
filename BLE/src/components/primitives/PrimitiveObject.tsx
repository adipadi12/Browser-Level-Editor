// PrimitiveObject renders all primitive shapes (cube, sphere, cylinder, cone, plane, torus)
// with full material support (color, roughness, metalness, emissive, texture).
import { forwardRef, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import type { Mesh } from 'three';
import type { SceneObject } from '../../types/scene';

type PrimitiveObjectProps = {
  object: SceneObject;
  isSelected: boolean;
  onSelect: (id: string) => void;
  wireframe?: boolean;
};

const PrimitiveObject = forwardRef<Mesh, PrimitiveObjectProps>(
  ({ object, isSelected, onSelect, wireframe = false }, ref) => {
    const material = object.material || {
      color: '#888888',
      roughness: 0.5,
      metalness: 0.1,
      emissive: '#000000',
      emissiveIntensity: 0,
    };

    // Load texture if provided
    const texture = object.material?.textureUrl
      ? useLoader(TextureLoader, object.material.textureUrl)
      : null;

    // Choose the correct geometry based on object type
    const geometry = useMemo(() => {
      switch (object.type) {
        case 'cube':
          return <boxGeometry args={[1, 1, 1]} />;
        case 'sphere':
          return <sphereGeometry args={[0.5, 32, 32]} />;
        case 'cylinder':
          return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
        case 'cone':
          return <coneGeometry args={[0.5, 1, 32]} />;
        case 'plane':
          return <planeGeometry args={[1, 1]} />;
        case 'torus':
          return <torusGeometry args={[0.4, 0.15, 16, 100]} />;
        default:
          return <boxGeometry args={[1, 1, 1]} />;
      }
    }, [object.type]);

    return (
      <mesh
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
        {geometry}
        <meshStandardMaterial
          color={isSelected ? '#ff8a5b' : material.color}
          roughness={material.roughness}
          metalness={material.metalness}
          emissive={material.emissive}
          emissiveIntensity={material.emissiveIntensity}
          map={texture}
          wireframe={wireframe}
        />
      </mesh>
    );
  }
);

PrimitiveObject.displayName = 'PrimitiveObject';

export default PrimitiveObject;
