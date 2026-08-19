import { create } from 'zustand';
import type {SceneObject} from '../types/scene'

interface EditorState {
  objects: SceneObject[];
  selectedObjectId: string | null;

  selectObject: (id: string) => void;
  clearSelection: () => void;
  updateObject: (
    id: string, updates: Partial<SceneObject>
  ) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  objects:[
    {
      id: 'cube-1',
      name: 'Cube',
      type: 'cube',

      position: [0, 0.7, 0],
      rotation: [0,0,0],
      scale: [1,1,1],
    },

    {
      id: 'cube-2',
      name: 'Cube1',
      type: 'cube',

      position: [2, 0.7, 0],
      rotation: [0,0,0],
      scale: [1,1,1],
    },
  ],
  selectedObjectId: null,

  selectObject: (id) => set({ selectedObjectId: id }),

  clearSelection: () => set({ selectedObjectId: null }),

  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((object) =>
        object.id === id
          ? {...object, ...updates}
          : object
        ),
    })),
}));