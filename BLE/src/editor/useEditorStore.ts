// Zustand is a small state-management library similar to a central data store.
// This store acts like a "scene state" singleton, holding all editable objects and editor state.
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { SceneObject, SceneSettings, ObjectType } from '../types/scene';

export type GizmoMode = 'translate' | 'rotate' | 'scale';
export type RenderMode = 'solid' | 'wireframe' | 'textured';

const MAX_HISTORY = 30;

const defaultSettings: SceneSettings = {
  backgroundColor: '#2a2b36',
  ambientLightIntensity: 0.6,
  ambientLightColor: '#ffffff',
  gridVisible: true,
  gridSize: 100,
  gridSnap: false,
  gridSnapSize: 1.0,
};

const initialObjects: SceneObject[] = [
  {
    id: 'cube-1',
    name: 'Cube',
    type: 'cube',
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    material: {
      color: '#ff8a5b',
      roughness: 0.4,
      metalness: 0.1,
      emissive: '#000000',
      emissiveIntensity: 0,
    },
    visible: true,
  },
  {
    id: 'sphere-1',
    name: 'Sphere',
    type: 'sphere',
    position: [2, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    material: {
      color: '#4a90e2',
      roughness: 0.2,
      metalness: 0.5,
      emissive: '#000000',
      emissiveIntensity: 0,
    },
    visible: true,
  },
];

interface EditorState {
  // Scene Objects
  objects: SceneObject[];
  selectedObjectId: string | null;

  // History (Undo / Redo)
  history: SceneObject[][];
  historyIndex: number;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Selection
  selectObject: (id: string | null) => void;
  clearSelection: () => void;
  selectAll: () => void;

  // Object Mutations
  addObject: (obj: Partial<SceneObject> & { type: ObjectType; name: string }) => SceneObject;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  deleteObject: (id: string) => void;
  deleteSelected: () => void;
  duplicateObject: (id: string) => SceneObject | null;
  duplicateSelected: () => SceneObject | null;

  // Clipboard
  clipboard: SceneObject | null;
  copySelected: () => void;
  pasteClipboard: () => SceneObject | null;

  // Hierarchy
  setParent: (childId: string, parentId: string | null) => void;

  // Scene lifecycle
  setObjects: (objects: SceneObject[]) => void;
  resetScene: () => void;

  // Editor configuration
  gizmoMode: GizmoMode;
  setGizmoMode: (mode: GizmoMode) => void;
  renderMode: RenderMode;
  setRenderMode: (mode: RenderMode) => void;

  // Scene Settings
  sceneSettings: SceneSettings;
  updateSceneSettings: (settings: Partial<SceneSettings>) => void;
}

export const useEditorStore = create<EditorState>((set, get) => {
  // Push the current object state to the history stack
  const recordHistory = (newObjects: SceneObject[]) => {
    const { history, historyIndex } = get();
    // Slice off any redo branch
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newObjects);
    if (updatedHistory.length > MAX_HISTORY) {
      updatedHistory.shift();
    }
    return {
      history: updatedHistory,
      historyIndex: updatedHistory.length - 1,
    };
  };

  return {
    objects: initialObjects,
    selectedObjectId: null,

    // History
    history: [initialObjects],
    historyIndex: 0,

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        set({
          objects: history[newIndex],
          historyIndex: newIndex,
          selectedObjectId: null,
        });
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        set({
          objects: history[newIndex],
          historyIndex: newIndex,
          selectedObjectId: null,
        });
      }
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,

    // Selection
    selectObject: (id) => set({ selectedObjectId: id }),
    clearSelection: () => set({ selectedObjectId: null }),
    selectAll: () => {
      const { objects } = get();
      if (objects.length > 0) {
        set({ selectedObjectId: objects[0].id });
      }
    },

    // Add Object
    addObject: (objData) => {
      const newObject: SceneObject = {
        id: objData.id || uuidv4(),
        name: objData.name,
        type: objData.type,
        position: objData.position || [0, 0, 0],
        rotation: objData.rotation || [0, 0, 0],
        scale: objData.scale || [1, 1, 1],
        visible: objData.visible ?? true,
        material: objData.material || {
          color: '#4a90e2',
          roughness: 0.5,
          metalness: 0.1,
          emissive: '#000000',
          emissiveIntensity: 0,
        },
        light: objData.light,
        camera: objData.camera,
        modelUrl: objData.modelUrl,
        parentId: objData.parentId || null,
        children: objData.children || [],
      };

      set((state) => {
        const newObjects = [...state.objects, newObject];
        return {
          objects: newObjects,
          selectedObjectId: newObject.id,
          ...recordHistory(newObjects),
        };
      });

      return newObject;
    },

    // Update Object
    updateObject: (id, updates) => {
      set((state) => {
        const newObjects = state.objects.map((obj) =>
          obj.id === id ? { ...obj, ...updates } : obj
        );
        return {
          objects: newObjects,
          ...recordHistory(newObjects),
        };
      });
    },

    // Delete Object
    deleteObject: (id) => {
      set((state) => {
        // Also remove from any parent's children list
        const newObjects = state.objects
          .filter((obj) => obj.id !== id)
          .map((obj) =>
            obj.children
              ? { ...obj, children: obj.children.filter((cId) => cId !== id) }
              : obj
          );

        return {
          objects: newObjects,
          selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
          ...recordHistory(newObjects),
        };
      });
    },

    deleteSelected: () => {
      const { selectedObjectId, deleteObject } = get();
      if (selectedObjectId) {
        deleteObject(selectedObjectId);
      }
    },

    // Duplicate Object
    duplicateObject: (id) => {
      const { objects, addObject } = get();
      const target = objects.find((o) => o.id === id);
      if (!target) return null;

      const duplicated: Partial<SceneObject> & { type: ObjectType; name: string } = {
        ...target,
        id: uuidv4(),
        name: `${target.name} (Copy)`,
        position: [
          target.position[0] + 0.5,
          target.position[1],
          target.position[2] + 0.5,
        ],
        children: [],
      };

      return addObject(duplicated);
    },

    duplicateSelected: () => {
      const { selectedObjectId, duplicateObject } = get();
      if (selectedObjectId) {
        return duplicateObject(selectedObjectId);
      }
      return null;
    },

    // Clipboard
    clipboard: null,

    copySelected: () => {
      const { selectedObjectId, objects } = get();
      const target = objects.find((o) => o.id === selectedObjectId);
      if (target) {
        set({ clipboard: JSON.parse(JSON.stringify(target)) });
      }
    },

    pasteClipboard: () => {
      const { clipboard, addObject } = get();
      if (!clipboard) return null;

      const pasted: Partial<SceneObject> & { type: ObjectType; name: string } = {
        ...clipboard,
        id: uuidv4(),
        name: `${clipboard.name} (Pasted)`,
        position: [
          clipboard.position[0] + 0.5,
          clipboard.position[1],
          clipboard.position[2] + 0.5,
        ],
        children: [],
      };

      return addObject(pasted);
    },

    // Hierarchy
    setParent: (childId, parentId) => {
      set((state) => {
        const newObjects = state.objects.map((obj) => {
          if (obj.id === childId) {
            return { ...obj, parentId };
          }
          if (parentId && obj.id === parentId) {
            const existingChildren = obj.children || [];
            if (!existingChildren.includes(childId)) {
              return { ...obj, children: [...existingChildren, childId] };
            }
          }
          if (obj.children && obj.children.includes(childId) && obj.id !== parentId) {
            return { ...obj, children: obj.children.filter((c) => c !== childId) };
          }
          return obj;
        });

        return {
          objects: newObjects,
          ...recordHistory(newObjects),
        };
      });
    },

    // Scene lifecycle
    setObjects: (objects) => {
      set({
        objects,
        selectedObjectId: null,
        ...recordHistory(objects),
      });
    },

    resetScene: () => {
      set({
        objects: [],
        selectedObjectId: null,
        ...recordHistory([]),
      });
    },

    // Configuration
    gizmoMode: 'translate',
    setGizmoMode: (mode) => set({ gizmoMode: mode }),

    renderMode: 'solid',
    setRenderMode: (mode) => set({ renderMode: mode }),

    // Scene Settings
    sceneSettings: defaultSettings,
    updateSceneSettings: (settings) =>
      set((state) => ({
        sceneSettings: { ...state.sceneSettings, ...settings },
      })),
  };
});
