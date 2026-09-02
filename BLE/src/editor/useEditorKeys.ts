// useEditorKeys provides global keyboard shortcuts for the level editor.
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useEditorStore } from './useEditorStore';

export const useEditorKeys = () => {
  const setGizmoMode = useEditorStore((s) => s.setGizmoMode);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const duplicateSelected = useEditorStore((s) => s.duplicateSelected);
  const copySelected = useEditorStore((s) => s.copySelected);
  const pasteClipboard = useEditorStore((s) => s.pasteClipboard);
  const deleteSelected = useEditorStore((s) => s.deleteSelected);
  const selectAll = useEditorStore((s) => s.selectAll);
  const clearSelection = useEditorStore((s) => s.clearSelection);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when user is actively typing in an input or textarea
      if (
        (e.target as HTMLElement).tagName === 'INPUT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA'
      ) {
        return;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl + Z: Undo
      if (isCtrlOrCmd && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl + Shift + Z or Ctrl + Y: Redo
      if (
        (isCtrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'z') ||
        (isCtrlOrCmd && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl + D: Duplicate
      if (isCtrlOrCmd && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        const dup = duplicateSelected();
        if (dup) {
          toast.success(`Duplicated ${dup.name}`);
        }
        return;
      }

      // Ctrl + C: Copy
      if (isCtrlOrCmd && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copySelected();
        toast.success('Copied to clipboard');
        return;
      }

      // Ctrl + V: Paste
      if (isCtrlOrCmd && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        const pasted = pasteClipboard();
        if (pasted) {
          toast.success(`Pasted ${pasted.name}`);
        }
        return;
      }

      // Ctrl + A: Select All
      if (isCtrlOrCmd && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        selectAll();
        return;
      }

      // Delete or Backspace: Delete selected
      if (e.key === 'Delete') {
        e.preventDefault();
        deleteSelected();
        return;
      }

      // Escape: Deselect
      if (e.key === 'Escape') {
        e.preventDefault();
        clearSelection();
        return;
      }

      // Gizmo tool modes: Q (Translate), W (Rotate), E (Scale)
      if (!isCtrlOrCmd) {
        switch (e.key.toLowerCase()) {
          case 'q':
            setGizmoMode('translate');
            break;
          case 'w':
            setGizmoMode('rotate');
            break;
          case 'e':
            setGizmoMode('scale');
            break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    setGizmoMode,
    undo,
    redo,
    duplicateSelected,
    copySelected,
    pasteClipboard,
    deleteSelected,
    selectAll,
    clearSelection,
  ]);
};
