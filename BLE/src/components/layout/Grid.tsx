// This component draws a 3D grid for the scene.
// In Three.js, a grid is like a reference plane used for layout and alignment.
import type { FC } from 'react';

const Grid: FC = () => {
    return (
        // A gridHelper creates a visual checkerboard reference plane.
        // The two numbers are width and divisions, similar to GridHelper(1000, 1000).
        <gridHelper args={[1000, 1000]} />
    );
};

export default Grid;