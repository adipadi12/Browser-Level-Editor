import { create } from 'zustand';

interface EditorState {
  selectedObjectId: string | null;

  selectObject: (id: string) => void;
  clearSelection: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedObjectId: null,

  selectObject: (id) => set({ selectedObjectId: id }),

  clearSelection: () => set({ selectedObjectId: null }),
}));