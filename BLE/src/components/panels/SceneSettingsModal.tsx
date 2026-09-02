// SceneSettingsModal allows editing scene-wide configuration.
import React from 'react';
import { useEditorStore } from '../../editor/useEditorStore';
import './Modals.css';

type SceneSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SceneSettingsModal: React.FC<SceneSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const sceneSettings = useEditorStore((state) => state.sceneSettings);
  const updateSceneSettings = useEditorStore(
    (state) => state.updateSceneSettings
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Scene Settings</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* Background Color */}
          <div className="modal-row">
            <label>Background Color</label>
            <input
              type="color"
              value={sceneSettings.backgroundColor}
              onChange={(e) =>
                updateSceneSettings({ backgroundColor: e.target.value })
              }
            />
          </div>

          {/* Ambient Light Intensity */}
          <div className="modal-row">
            <label>Ambient Light Intensity</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={sceneSettings.ambientLightIntensity}
              onChange={(e) =>
                updateSceneSettings({
                  ambientLightIntensity: parseFloat(e.target.value),
                })
              }
            />
            <span>{sceneSettings.ambientLightIntensity.toFixed(1)}</span>
          </div>

          {/* Grid Visibility */}
          <div className="modal-row">
            <label>Show Grid</label>
            <input
              type="checkbox"
              checked={sceneSettings.gridVisible}
              onChange={(e) =>
                updateSceneSettings({ gridVisible: e.target.checked })
              }
            />
          </div>

          {/* Grid Snapping */}
          <div className="modal-row">
            <label>Grid Snapping</label>
            <input
              type="checkbox"
              checked={sceneSettings.gridSnap}
              onChange={(e) =>
                updateSceneSettings({ gridSnap: e.target.checked })
              }
            />
          </div>

          {/* Grid Snap Size */}
          <div className="modal-row">
            <label>Snap Size</label>
            <input
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              value={sceneSettings.gridSnapSize}
              onChange={(e) =>
                updateSceneSettings({
                  gridSnapSize: parseFloat(e.target.value) || 1.0,
                })
              }
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SceneSettingsModal;
