export type SceneObject = {
    id: string;
    name: string;
    type: 'cube' | 'sphere';

    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];

}; // each object in level has id, name, type and transform