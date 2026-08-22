// This component draws all items that belong in the 3D editor scene.
import { useRef, type FC } from 'react';

import { useEditorStore } from '../../editor/useEditorStore';

import Grid from './Grid';
import TransformGizmo from './TransformGizmo';
import type { Mesh } from 'three';

const Scene: FC = () => {
  // Read the current scene objects from the central store.
  const objects = useEditorStore((state) => state.objects);

  // Read the id of the active selection.
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);

  // Function used to select an object when clicked.
  const selectObject = useEditorStore((state) => state.selectObject);

  // A Map stores direct references to each mesh so we can attach transform handles to it.
  const meshRefs = useRef<Map<string, Mesh>>(new Map());

  // Find the actual Mesh instance for the selected object.
  const selectedMesh = selectedObjectId ? meshRefs.current.get(selectedObjectId) : undefined;

  return (
    <>
      {/* Draw the floor/grid under the objects. */}
      <Grid />

      {objects.map((object) => {
        // Determine whether this object is the active/selected one.
        const isSelected = selectedObjectId === object.id;

        // Only render cubes in this scene version.
        if (object.type === 'cube') {
          return (
           <group key={object.id}>
             <mesh
               // Store a direct Three.js mesh reference for later transform interactions.
               ref={(mesh) => {
                 if (mesh) {
                   meshRefs.current.set(object.id, mesh);
                 } else {
                   meshRefs.current.delete(object.id);
                 }
               }}
               position={object.position}
               rotation={object.rotation}
               scale={object.scale}
               // Clicking an object should make it selected.
               onClick={(event) => {
                 event.stopPropagation();
                 selectObject(object.id);
               }}
             >
               <boxGeometry args={[1, 1, 1]} />

               <meshStandardMaterial color={isSelected ? 'orange' : 'pink'} />
             </mesh>

             {/* Show transform handles for the selected mesh, if it exists. */}
             {selectedMesh && <TransformGizmo object={selectedMesh} />}
           </group>
          );
        }

        return null;
      })}
    </>
  );
};

export default Scene;