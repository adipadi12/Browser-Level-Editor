import { useRef, type FC } from 'react';

import { useEditorStore } from '../../editor/useEditorStore';

import Grid from './Grid';
import Inspector from './Inspector';

import TransformGizmo from './TransformGizmo';
import type { Mesh } from 'three';

const Scene: FC = () => {

  const objects = useEditorStore(
    (state) => state.objects
  );

  const selectedObjectId = useEditorStore(
    (state) => state.selectedObjectId
  );

  const selectObject = useEditorStore(
    (state) => state.selectObject
  );

  const isSelected = selectedObjectId === 'cube-1';

  const meshRefs = useRef<Map<string, Mesh>>(new Map());

  const selectedMesh = selectedObjectId
    ? meshRefs.current.get(selectedObjectId)
    : undefined;


  return (
    <>
      <Grid />

      {objects.map((object) => {
        const isSelected = 
          selectedObjectId === object.id;

        if(object.type === 'cube'){
          return (
          <group key={object.id}>
            <mesh              
              ref={(mesh) => {
                if(mesh){
                  meshRefs.current.set(object.id, mesh);
                } else{
                  meshRefs.current.delete(object.id);
                }
              }}
              position={object.position}
              rotation={object.rotation}
              scale={object.scale}

              onClick={(event) => {
                event.stopPropagation();
                selectObject(object.id);
              }}
            >
        
      

              <boxGeometry args={[1, 1, 1]} />

              <meshStandardMaterial
                color={isSelected ? 'orange' : 'pink'}
              />
            
            </mesh>

            {selectedMesh && (
               <TransformGizmo object={selectedMesh} />
           )}
          </group>
          );
        }
        return null;
      })}
      
    </>
  );
};

export default Scene;