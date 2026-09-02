// ExportModal lets the user export scenes to GLTF, GLB, and JSON for Unity/Unreal Engine.
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useEditorStore } from '../../editor/useEditorStore';
import { exportToGLTF } from '../../utils/export';
import { serializeScene, downloadFile } from '../../utils/sceneSerializer';
import './Modals.css';

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const objects = useEditorStore((state) => state.objects);
  const sceneSettings = useEditorStore((state) => state.sceneSettings);
  const [filename, setFilename] = useState('level_scene');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExportGLB = async () => {
    setIsExporting(true);
    try {
      await exportToGLTF(objects, true, filename);
      toast.success('Exported binary GLB successfully! Ready for Unreal & Unity.');
      onClose();
    } catch (err: any) {
      toast.error(`GLB export failed: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportGLTF = async () => {
    setIsExporting(true);
    try {
      await exportToGLTF(objects, false, filename);
      toast.success('Exported GLTF text format successfully!');
      onClose();
    } catch (err: any) {
      toast.error(`GLTF export failed: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    try {
      const json = serializeScene(objects, sceneSettings);
      downloadFile(json, `${filename}.ble.json`, 'application/json');
      toast.success('Exported BLE Scene JSON! Compatible with Unity/Unreal level scripts.');
      onClose();
    } catch (err: any) {
      toast.error(`JSON export failed: ${err.message}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Export Scene</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <label>Filename</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="level_scene"
            />
          </div>

          <div className="export-options">
            {/* GLB Option */}
            <div className="export-card" onClick={handleExportGLB}>
              <div className="export-card-icon">📦</div>
              <div className="export-card-title">Binary GLB (Recommended)</div>
              <div className="export-card-desc">
                Single self-contained 3D file. Best for drag-and-drop straight into Unreal Engine 5 or Unity (via UnityGLTF).
              </div>
              <button className="export-action-btn" disabled={isExporting}>
                Export .GLB
              </button>
            </div>

            {/* GLTF Option */}
            <div className="export-card" onClick={handleExportGLTF}>
              <div className="export-card-icon">📄</div>
              <div className="export-card-title">GLTF JSON (.gltf)</div>
              <div className="export-card-desc">
                Standard text-based 3D format. Great for inspection, web viewers, and Blender import.
              </div>
              <button className="export-action-btn" disabled={isExporting}>
                Export .GLTF
              </button>
            </div>

            {/* BLE JSON Level Format */}
            <div className="export-card" onClick={handleExportJSON}>
              <div className="export-card-icon">🗂️</div>
              <div className="export-card-title">BLE Level Descriptor (.json)</div>
              <div className="export-card-desc">
                Full hierarchy, custom object tags, lights, cameras, and transform hierarchy for game engine level spawners.
              </div>
              <button className="export-action-btn" disabled={isExporting}>
                Export .JSON
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
