import type { FC } from 'react';
import Grid from './Grid';

type SceneProps = {
  selectedObject: string | null;
  onSelectedObject: (id:string) => void;
}
const Scene: FC<SceneProps> = ({ selectedObject, onSelectedObject }) => {
  const isSelected = selectedObject === "cube-1";
  return (
    <> // react fragment: puts Grid & Mesh under same Fragment object
    <Grid />
      <mesh position={[0, 0.5, 0]} //y offset added for cube to remain above grid
            onClick={(event) => {
              event.stopPropagation();
              onSelectedObject('cube-1');
            }}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color={isSelected ? 'orange' : 'pink'} />
      </mesh>
    </>
  );
};

export default Scene;
