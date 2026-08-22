// Zustand is a small state-management library similar to a central data store.
// This store acts like a "scene state" singleton, holding all editable objects.
import { create } from 'zustand';
import type { SceneObject } from '../types/scene';

// The data that lives in the editor state.
interface EditorState {
  // The scene currently contains these objects.
  objects: SceneObject[];

  // The currently selected object's id, or null when nothing is selected.
  selectedObjectId: string | null;

  // Select a specific object by id.
  selectObject: (id: string) => void;

  // Clear the current selection.
  clearSelection: () => void;

  // Update a single object, merging the new values into the existing object.
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
}

// create(...) creates a hook + store. Components can call useEditorStore(...) to read or update state.
export const useEditorStore = create<EditorState>((set) => ({
  // This is the initial list of objects in the scene.
  objects: [
    {
      id: 'cube-1',
      name: 'Cube',
      type: 'cube',
      position: [0, 0.7, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },

    {
      id: 'cube-2',
      name: 'Cube1',
      type: 'cube',
      position: [2, 0.7, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  ],

  // No object is selected when the editor starts.
  selectedObjectId: null,

  // set(...) replaces the store state with a new object.
  selectObject: (id) => set({ selectedObjectId: id }),

  // The UI uses this when the user clicks empty space in the viewport.
  clearSelection: () => set({ selectedObjectId: null }),

  // This updates one object while keeping the rest untouched.
  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((object) =>
        object.id === id
          ? { ...object, ...updates }
          : object,
      ),
    })),
}));