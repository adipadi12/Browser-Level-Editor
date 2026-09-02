// SaveLoadModal provides options to save scene files or load existing ones.
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useEditorStore } from '../../editor/useEditorStore';
import {
  serializeScene,
  deserializeScene,
  downloadFile,
} from '../../utils/sceneSerializer';
import './Modals.css';

type SaveLoadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'save' | 'load';
};

const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const objects = useEditorStore((state) => state.objects);
  const sceneSettings = useEditorStore((state) => state.sceneSettings);
  const setObjects = useEditorStore((state) => state.setObjects);
  const updateSceneSettings = useEditorStore(
    (state) => state.updateSceneSettings
  );

  const [filename, setFilename] = useState('my_scene');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      const json = serializeScene(objects, sceneSettings);
      downloadFile(json, `${filename}.blescene`, 'application/json');
      toast.success(`Saved scene to ${filename}.blescene`);
      onClose();
    } catch (err: any) {
      toast.error(`Save failed: ${err.message}`);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const { objects: loadedObjects, settings: loadedSettings } =
          deserializeScene(text);

        setObjects(loadedObjects);
        if (loadedSettings) {
          updateSceneSettings(loadedSettings);
        }

        toast.success(`Loaded scene from ${file.name}`);
        onClose();
      } catch (err: any) {
        toast.error(`Load failed: ${err.message}`);
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'save' ? 'Save Scene' : 'Load Scene'}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {mode === 'save' ? (
            <div>
              <div className="modal-row">
                <label>File Name</label>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="my_scene"
                />
              </div>
              <p className="modal-hint">
                This will save your entire scene (objects, materials, hierarchy,
                and lights) as a JSON file you can open anytime.
              </p>
            </div>
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.blescene"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <div
                className="upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">📂</div>
                <p>Click here to select a saved scene file (.blescene / .json)</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          {mode === 'save' && (
            <button className="primary-btn" onClick={handleSave}>
              Save File
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveLoadModal;
