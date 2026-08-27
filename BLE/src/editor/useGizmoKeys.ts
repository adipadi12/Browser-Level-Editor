// useGizmoKeys.ts
import { useEffect } from 'react';
import { useEditorStore } from './useEditorStore';

export const useGizmoKeys = () => {
  const setGizmoMode = useEditorStore((s) => s.setGizmoMode);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT') return;

      switch (e.key.toLowerCase()) {
        case 'q': setGizmoMode('translate'); break;
        case 'w': setGizmoMode('rotate'); break;
        case 'e': setGizmoMode('scale'); break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setGizmoMode]);
};   