// Toolbar with full File/Edit/View/Help dropdown menus for the level editor.
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useEditorStore } from '../../editor/useEditorStore';
import { importModel } from '../../editor/importModel';
import AddObjectMenu from './AddObjectMenu';
import SceneSettingsModal from '../panels/SceneSettingsModal';
import ExportModal from '../panels/ExportModal';
import SaveLoadModal from '../panels/SaveLoadModal';
import KeyboardShortcutsModal from '../panels/KeyboardShortcutsModal';
import '../designforlayout/Toolbar.css';

const Toolbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sceneSettingsOpen, setSceneSettingsOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const resetScene = useEditorStore((s) => s.resetScene);
  const addObject = useEditorStore((s) => s.addObject);
  const selectObject = useEditorStore((s) => s.selectObject);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const canUndo = useEditorStore((s) => s.canUndo);
  const canRedo = useEditorStore((s) => s.canRedo);
  const duplicateSelected = useEditorStore((s) => s.duplicateSelected);
  const copySelected = useEditorStore((s) => s.copySelected);
  const pasteClipboard = useEditorStore((s) => s.pasteClipboard);
  const deleteSelected = useEditorStore((s) => s.deleteSelected);
  const selectAll = useEditorStore((s) => s.selectAll);
  const clearSelection = useEditorStore((s) => s.clearSelection);
  const renderMode = useEditorStore((s) => s.renderMode);
  const setRenderMode = useEditorStore((s) => s.setRenderMode);
  const sceneSettings = useEditorStore((s) => s.sceneSettings);
  const updateSceneSettings = useEditorStore((s) => s.updateSceneSettings);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMenus = () => setOpenMenu(null);

  const handleNewScene = () => {
    if (confirm('Create a new scene? This will clear all objects.')) {
      resetScene();
      toast.success('New scene created');
    }
    closeMenus();
  };

  const handleModelImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const sceneObject = importModel(file);
        addObject(sceneObject);
        selectObject(sceneObject.id);
        toast.success(`Imported ${file.name}`);
      } catch (err: any) {
        toast.error(err.message || 'Failed to import model');
      }
    }
    event.target.value = '';
  };

  return (
    <>
      <header className="toolbar" ref={headerRef}>
        {/* Hidden model import input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb,.gltf"
          multiple
          style={{ display: 'none' }}
          onChange={handleModelImport}
        />

        {/* File Menu */}
        <div className="menu-container">
          <button onClick={() => toggleMenu('file')}>File ▾</button>
          {openMenu === 'file' && (
            <div className="dropdown-menu">
              <button onClick={handleNewScene}>New Scene</button>
              <button onClick={() => { setSaveModalOpen(true); closeMenus(); }}>
                Save Scene...
              </button>
              <button onClick={() => { setLoadModalOpen(true); closeMenus(); }}>
                Load Scene...
              </button>
              <div className="menu-divider" />
              <button onClick={() => { setExportModalOpen(true); closeMenus(); }}>
                Export to Unity/Unreal...
              </button>
              <div className="menu-divider" />
              <button onClick={() => { setSceneSettingsOpen(true); closeMenus(); }}>
                Scene Settings...
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="menu-container">
          <button onClick={() => toggleMenu('edit')}>Edit ▾</button>
          {openMenu === 'edit' && (
            <div className="dropdown-menu">
              <button onClick={() => { undo(); closeMenus(); }} disabled={!canUndo()}>
                Undo <span className="shortcut">Ctrl+Z</span>
              </button>
              <button onClick={() => { redo(); closeMenus(); }} disabled={!canRedo()}>
                Redo <span className="shortcut">Ctrl+Shift+Z</span>
              </button>
              <div className="menu-divider" />
              <button onClick={() => { copySelected(); closeMenus(); }}>
                Copy <span className="shortcut">Ctrl+C</span>
              </button>
              <button onClick={() => { pasteClipboard(); closeMenus(); }}>
                Paste <span className="shortcut">Ctrl+V</span>
              </button>
              <button onClick={() => { duplicateSelected(); closeMenus(); }}>
                Duplicate <span className="shortcut">Ctrl+D</span>
              </button>
              <button onClick={() => { deleteSelected(); closeMenus(); }}>
                Delete <span className="shortcut">Delete</span>
              </button>
              <div className="menu-divider" />
              <button onClick={() => { selectAll(); closeMenus(); }}>
                Select All <span className="shortcut">Ctrl+A</span>
              </button>
              <button onClick={() => { clearSelection(); closeMenus(); }}>
                Deselect <span className="shortcut">Escape</span>
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="menu-container">
          <button onClick={() => toggleMenu('view')}>View ▾</button>
          {openMenu === 'view' && (
            <div className="dropdown-menu">
              <div className="menu-section-title">Render Mode</div>
              <button
                onClick={() => { setRenderMode('solid'); closeMenus(); }}
                className={renderMode === 'solid' ? 'active' : ''}
              >
                ● Solid
              </button>
              <button
                onClick={() => { setRenderMode('wireframe'); closeMenus(); }}
                className={renderMode === 'wireframe' ? 'active' : ''}
              >
                ● Wireframe
              </button>
              <button
                onClick={() => { setRenderMode('textured'); closeMenus(); }}
                className={renderMode === 'textured' ? 'active' : ''}
              >
                ● Textured
              </button>
              <div className="menu-divider" />
              <button onClick={() => {
                updateSceneSettings({ gridVisible: !sceneSettings.gridVisible });
                closeMenus();
              }}>
                {sceneSettings.gridVisible ? '✓' : '  '} Show Grid
              </button>
              <button onClick={() => {
                updateSceneSettings({ gridSnap: !sceneSettings.gridSnap });
                closeMenus();
              }}>
                {sceneSettings.gridSnap ? '✓' : '  '} Grid Snapping
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="menu-container">
          <button onClick={() => toggleMenu('help')}>Help ▾</button>
          {openMenu === 'help' && (
            <div className="dropdown-menu">
              <button onClick={() => { setShortcutsModalOpen(true); closeMenus(); }}>
                Keyboard Shortcuts
              </button>
              <button onClick={() => {
                alert('BLE - Browser Level Editor v1.0\nA full-featured 3D level editor for Unity & Unreal Engine');
                closeMenus();
              }}>
                About BLE
              </button>
            </div>
          )}
        </div>

        <div className="toolbar-spacer" />

        {/* Add Object Button */}
        <AddObjectMenu />

        {/* Import Model Button */}
        <button
          className="import-model-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          📦 Import Model
        </button>
      </header>

      {/* Modals */}
      <SceneSettingsModal isOpen={sceneSettingsOpen} onClose={() => setSceneSettingsOpen(false)} />
      <ExportModal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} />
      <SaveLoadModal isOpen={saveModalOpen} onClose={() => setSaveModalOpen(false)} mode="save" />
      <SaveLoadModal isOpen={loadModalOpen} onClose={() => setLoadModalOpen(false)} mode="load" />
      <KeyboardShortcutsModal isOpen={shortcutsModalOpen} onClose={() => setShortcutsModalOpen(false)} />
    </>
  );
};

export default Toolbar;
