import type { FC } from 'react';

import { useEditorStore } from '../../editor/useEditorStore';

import Grid from './Grid';

const Scene: FC = () => {

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

      <mesh
        position={[0, 0.5, 0]}
        onClick={(event) => {

          event.stopPropagation();

          selectObject('cube-1');

        }}
      >

        <boxGeometry args={[1, 1, 1]} />

        <meshStandardMaterial
          color={isSelected ? 'orange' : 'pink'}
        />

      </mesh>

    </>
  );
};

export default Scene;