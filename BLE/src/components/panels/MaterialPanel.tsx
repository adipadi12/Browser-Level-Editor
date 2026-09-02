// MaterialPanel provides UI for editing material properties in the Inspector.
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import type { Material } from '../../types/scene';
import './MaterialPanel.css';

type MaterialPanelProps = {
  material: Material;
  onChange: (material: Material) => void;
};

const MaterialPanel: React.FC<MaterialPanelProps> = ({ material, onChange }) => {
  const textureInputRef = useRef<HTMLInputElement>(null);

  const handleTextureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and WebP images are supported');
      return;
    }

    const textureUrl = URL.createObjectURL(file);
    onChange({ ...material, textureUrl });
    toast.success(`Texture ${file.name} loaded`);

    event.target.value = '';
  };

  const handleRemoveTexture = () => {
    if (material.textureUrl) {
      URL.revokeObjectURL(material.textureUrl);
      onChange({ ...material, textureUrl: undefined });
      toast.success('Texture removed');
    }
  };

  return (
    <div className="material-panel">
      <h4>Material</h4>

      {/* Color */}
      <div className="material-row">
        <label>Color</label>
        <input
          type="color"
          value={material.color}
          onChange={(e) => onChange({ ...material, color: e.target.value })}
        />
      </div>

      {/* Roughness */}
      <div className="material-row">
        <label>Roughness</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={material.roughness}
          onChange={(e) =>
            onChange({ ...material, roughness: parseFloat(e.target.value) })
          }
        />
        <span>{material.roughness.toFixed(2)}</span>
      </div>

      {/* Metalness */}
      <div className="material-row">
        <label>Metalness</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={material.metalness}
          onChange={(e) =>
            onChange({ ...material, metalness: parseFloat(e.target.value) })
          }
        />
        <span>{material.metalness.toFixed(2)}</span>
      </div>

      {/* Emissive Color */}
      <div className="material-row">
        <label>Emissive</label>
        <input
          type="color"
          value={material.emissive}
          onChange={(e) => onChange({ ...material, emissive: e.target.value })}
        />
      </div>

      {/* Emissive Intensity */}
      <div className="material-row">
        <label>Emissive Intensity</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={material.emissiveIntensity}
          onChange={(e) =>
            onChange({
              ...material,
              emissiveIntensity: parseFloat(e.target.value),
            })
          }
        />
        <span>{material.emissiveIntensity.toFixed(1)}</span>
      </div>

      {/* Texture Upload */}
      <div className="material-row">
        <label>Texture</label>
        <input
          ref={textureInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleTextureUpload}
        />
        <button
          className="texture-btn"
          onClick={() => textureInputRef.current?.click()}
        >
          {material.textureUrl ? 'Change Texture' : 'Upload Texture'}
        </button>
        {material.textureUrl && (
          <button className="texture-remove-btn" onClick={handleRemoveTexture}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default MaterialPanel;
