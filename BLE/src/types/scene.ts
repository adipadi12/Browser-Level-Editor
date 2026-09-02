// This file defines the shape of every object that can appear in the 3D scene.
// In C# terms, this is similar to a lightweight class or struct that stores data.

// All possible object types in the scene.
export type ObjectType =
  | 'cube' | 'sphere' | 'cylinder' | 'cone' | 'plane' | 'torus'  // primitives
  | 'model'                                                        // imported
  | 'pointLight' | 'directionalLight' | 'spotLight'              // lights
  | 'camera'                                                       // camera
  | 'empty';                                                       // group/empty

// Material properties for primitives and models.
export type Material = {
  color: string;              // hex color (e.g. "#ff0000")
  roughness: number;          // 0-1, how rough the surface is
  metalness: number;          // 0-1, how metallic the surface is
  emissive: string;           // hex color for glow
  emissiveIntensity: number;  // brightness of the glow
  textureUrl?: string;        // blob URL for uploaded texture image
};

// Light-specific properties.
export type LightProperties = {
  color: string;              // hex color of the light
  intensity: number;          // brightness
  castShadow: boolean;        // whether this light casts shadows
  // For spotLight
  angle?: number;             // cone angle in radians
  penumbra?: number;          // softness of spotlight edge (0-1)
  // For directional/spot
  target?: [number, number, number]; // where the light points
};

// Camera-specific properties.
export type CameraProperties = {
  fov: number;                // field of view in degrees
  near: number;               // near clipping plane
  far: number;                // far clipping plane
};

export type SceneObject = {
    // A unique identifier so we can find and update one object reliably.
    id: string;

    // Human-readable name shown in the editor UI.
    name: string;

    // The kind of object.
    type: ObjectType;

    // Position in 3D space: [x, y, z].
    position: [number, number, number];

    // Rotation in radians on each axis: [x, y, z].
    rotation: [number, number, number];

    // Scale on each axis: [x, y, z].
    scale: [number, number, number];

    // For imported models: the blob URL pointing to the loaded GLB/GLTF file.
    modelUrl?: string;

    // Material properties (for primitives and models).
    material?: Material;

    // Light properties (for light types).
    light?: LightProperties;

    // Camera properties (for camera type).
    camera?: CameraProperties;

    // Hierarchy: parent object ID (null = root level).
    parentId?: string | null;

    // Hierarchy: list of child object IDs.
    children?: string[];

    // Visibility toggle.
    visible: boolean;
};

// Scene-wide settings.
export type SceneSettings = {
  backgroundColor: string;       // hex color
  ambientLightIntensity: number; // global ambient light brightness
  ambientLightColor: string;     // hex color
  gridVisible: boolean;          // show/hide grid
  gridSize: number;              // grid dimensions
  gridSnap: boolean;             // enable grid snapping
  gridSnapSize: number;          // snap increment in units
};
