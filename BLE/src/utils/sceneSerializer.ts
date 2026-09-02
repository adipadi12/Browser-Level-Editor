// sceneSerializer handles importing and exporting scenes as JSON files
// compatible with Unity and Unreal level importer plugins.
import type { SceneObject, SceneSettings } from '../types/scene';

export interface SerializedScene {
  version: string;
  engineCompatibility: {
    unity: boolean;
    unreal: boolean;
    format: 'BLE-Scene-1.0';
  };
  metadata: {
    createdAt: string;
    objectCount: number;
  };
  settings: SceneSettings;
  objects: SceneObject[];
}

/**
 * Serialize full scene into structured JSON.
 */
export function serializeScene(
  objects: SceneObject[],
  settings: SceneSettings
): string {
  const sceneData: SerializedScene = {
    version: '1.0.0',
    engineCompatibility: {
      unity: true,
      unreal: true,
      format: 'BLE-Scene-1.0',
    },
    metadata: {
      createdAt: new Date().toISOString(),
      objectCount: objects.length,
    },
    settings,
    objects,
  };

  return JSON.stringify(sceneData, null, 2);
}

/**
 * Parse and validate JSON scene data.
 */
export function deserializeScene(
  jsonString: string
): { objects: SceneObject[]; settings?: SceneSettings } {
  try {
    const data = JSON.parse(jsonString);

    if (!data.objects || !Array.isArray(data.objects)) {
      throw new Error('Invalid scene file: missing objects array');
    }

    return {
      objects: data.objects,
      settings: data.settings,
    };
  } catch (err: any) {
    throw new Error(`Failed to parse scene file: ${err.message}`);
  }
}

/**
 * Trigger browser file download.
 */
export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
