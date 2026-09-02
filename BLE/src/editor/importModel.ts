// importModel creates a SceneObject from a user-provided GLB/GLTF file.
// It validates the file extension, creates a blob URL, and returns a ready-to-use SceneObject.
import { v4 as uuidv4 } from 'uuid';
import type { SceneObject } from '../types/scene';

// Allowed file extensions for 3D model import.
const ALLOWED_EXTENSIONS = ['.glb', '.gltf'];

/**
 * Validate and convert a File into a SceneObject with type 'model'.
 * Throws if the file type is not supported.
 */
export function importModel(file: File): SceneObject {
  const name = file.name;
  const extension = name.substring(name.lastIndexOf('.')).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error(`Unsupported file type "${extension}". Only GLB and GLTF files are supported.`);
  }

  // Create a blob URL so Three.js can load the file from memory.
  const modelUrl = URL.createObjectURL(file);

  // Strip the extension for the display name in the hierarchy panel.
  const displayName = name.substring(0, name.lastIndexOf('.')) || name;

  return {
    id: uuidv4(),
    name: displayName,
    type: 'model',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    modelUrl,
    visible: true,
  };
}
