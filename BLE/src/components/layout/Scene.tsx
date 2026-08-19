import type { FC } from 'react';

import { useEditorStore } from '../../editor/useEditorStore';

import Grid from './Grid';
import Inspector from '../Inspector';

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

  return (
    <>
      <Grid />

      {objects.map((object) => {
        const isSelected = 
          selectedObjectId === object.id;

        if(object.type === 'cube'){
          return (
            <mesh
              key={object.id}
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
          );
        }
        return null;
      })}

    </>
  );
};

export default Scene;