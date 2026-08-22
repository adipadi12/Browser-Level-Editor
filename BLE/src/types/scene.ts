// This file defines the shape of every object that can appear in the 3D scene.
// In C# terms, this is similar to a lightweight class or struct that stores data.
export type SceneObject = {
    // A unique identifier so we can find and update one object reliably.
    id: string;

    // Human-readable name shown in the editor UI.
    name: string;

    // The kind of object. Right now only cubes are supported.
    type: 'cube' | 'sphere';

    // Position in 3D space: [x, y, z].
    position: [number, number, number];

    // Rotation in radians on each axis: [x, y, z].
    rotation: [number, number, number];

    // Scale on each axis: [x, y, z].
    scale: [number, number, number];
};
