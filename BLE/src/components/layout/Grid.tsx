import type { FC } from 'react';

const Grid: FC = () => {
    return (
        // GridHelper goes here
        <gridHelper args={[1000, 1000]} /> // equivalent of new THREE.GridHelper(10,10);
    );
};

export default Grid;