// export.ts provides GLTF and FBX scene export functionality.
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import type { SceneObject } from '../types/scene';

/**
 * Builds a Three.js scene graph from our SceneObject array,
 * preserving hierarchy, meshes, materials, and light nodes.
 */
export function buildThreeScene(objects: SceneObject[]): THREE.Scene {
  const scene = new THREE.Scene();
  scene.name = 'BLE_Exported_Level';

  // Map to hold created Object3Ds so we can attach parent-child relationships
  const objectMap = new Map<string, THREE.Object3D>();

  // Pass 1: Create all Three.js objects
  for (const obj of objects) {
    if (!obj.visible) continue;

    let threeObj: THREE.Object3D;

    // Primitives
    if (
      obj.type === 'cube' ||
      obj.type === 'sphere' ||
      obj.type === 'cylinder' ||
      obj.type === 'cone' ||
      obj.type === 'plane' ||
      obj.type === 'torus'
    ) {
      let geometry: THREE.BufferGeometry;

      switch (obj.type) {
        case 'cube':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.5, 32, 32);
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(0.5, 1, 32);
          break;
        case 'plane':
          geometry = new THREE.PlaneGeometry(1, 1);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.4, 0.15, 16, 100);
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
      }

      const mat = obj.material || {
        color: '#4a90e2',
        roughness: 0.5,
        metalness: 0.1,
        emissive: '#000000',
        emissiveIntensity: 0,
      };

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(mat.color),
        roughness: mat.roughness,
        metalness: mat.metalness,
        emissive: new THREE.Color(mat.emissive),
        emissiveIntensity: mat.emissiveIntensity,
      });

      threeObj = new THREE.Mesh(geometry, material);
    } else if (obj.type === 'pointLight') {
      const light = obj.light || { color: '#ffffff', intensity: 1, castShadow: true };
      threeObj = new THREE.PointLight(new THREE.Color(light.color), light.intensity);
    } else if (obj.type === 'directionalLight') {
      const light = obj.light || { color: '#ffffff', intensity: 1, castShadow: true };
      threeObj = new THREE.DirectionalLight(new THREE.Color(light.color), light.intensity);
    } else if (obj.type === 'spotLight') {
      const light = obj.light || { color: '#ffffff', intensity: 1, angle: 0.6, penumbra: 0.2, castShadow: true };
      threeObj = new THREE.SpotLight(
        new THREE.Color(light.color),
        light.intensity,
        0,
        light.angle,
        light.penumbra
      );
    } else if (obj.type === 'camera') {
      const cam = obj.camera || { fov: 50, near: 0.1, far: 1000 };
      threeObj = new THREE.PerspectiveCamera(cam.fov, 16 / 9, cam.near, cam.far);
    } else {
      // empty / group / model container
      threeObj = new THREE.Group();
    }

    threeObj.name = obj.name;
    threeObj.position.set(obj.position[0], obj.position[1], obj.position[2]);
    threeObj.rotation.set(obj.rotation[0], obj.rotation[1], obj.rotation[2]);
    threeObj.scale.set(obj.scale[0], obj.scale[1], obj.scale[2]);

    // Store custom metadata for Unity/Unreal importers
    threeObj.userData = {
      bleId: obj.id,
      bleType: obj.type,
      bleName: obj.name,
    };

    objectMap.set(obj.id, threeObj);
  }

  // Pass 2: Assemble parent-child hierarchy
  for (const obj of objects) {
    const threeObj = objectMap.get(obj.id);
    if (!threeObj) continue;

    if (obj.parentId && objectMap.has(obj.parentId)) {
      const parent = objectMap.get(obj.parentId)!;
      parent.add(threeObj);
    } else {
      scene.add(threeObj);
    }
  }

  return scene;
}

/**
 * Export the scene to GLTF (.gltf or .glb format)
 * Native support in Unreal Engine & Unity (via UnityGLTF).
 */
export function exportToGLTF(
  objects: SceneObject[],
  binary: boolean = true,
  filename: string = 'level_export'
): Promise<void> {
  return new Promise((resolve, reject) => {
    const scene = buildThreeScene(objects);
    const exporter = new GLTFExporter();

    exporter.parse(
      scene,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          const blob = new Blob([gltf], { type: 'application/octet-stream' });
          downloadBlob(blob, `${filename}.glb`);
        } else {
          const output = JSON.stringify(gltf, null, 2);
          const blob = new Blob([output], { type: 'application/json' });
          downloadBlob(blob, `${filename}.gltf`);
        }
        resolve();
      },
      (error) => {
        reject(error);
      },
      { binary }
    );
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
