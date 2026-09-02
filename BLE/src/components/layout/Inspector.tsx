// Inspector provides real-time property inspection and editing for the selected object.
import React from 'react';
import { useEditorStore } from '../../editor/useEditorStore';
import MaterialPanel from '../panels/MaterialPanel';
import '../designforlayout/Inspector.css';

const Inspector: React.FC = () => {
  const objects = useEditorStore((state) => state.objects);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const updateObject = useEditorStore((state) => state.updateObject);
  const setParent = useEditorStore((state) => state.setParent);
  const deleteObject = useEditorStore((state) => state.deleteObject);

  const round3 = (n: number) => Math.round(n * 1000) / 1000;

  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  if (!selectedObject) {
    return (
      <aside className="inspector-header">
        <h3>Inspector</h3>
        <p className="empty-msg">No object selected</p>
      </aside>
    );
  }

  const isPrimitive = [
    'cube',
    'sphere',
    'cylinder',
    'cone',
    'plane',
    'torus',
  ].includes(selectedObject.type);

  const isLight = [
    'pointLight',
    'directionalLight',
    'spotLight',
  ].includes(selectedObject.type);

  const potentialParents = objects.filter(
    (o) => o.id !== selectedObject.id && (o.type === 'empty' || o.type === 'cube')
  );

  return (
    <aside className="inspector">
      <div className="inspector-header">
        <h3>Inspector</h3>
        <button
          className="delete-btn"
          title="Delete object"
          onClick={() => deleteObject(selectedObject.id)}
        >
          🗑️
        </button>
      </div>

      {/* Name and Visibility */}
      <div className="inspector-section">
        <div className="inspector-row">
          <label>Name</label>
          <input
            type="text"
            value={selectedObject.name}
            onChange={(e) =>
              updateObject(selectedObject.id, { name: e.target.value })
            }
          />
        </div>

        <div className="inspector-row">
          <label>Visible</label>
          <input
            type="checkbox"
            checked={selectedObject.visible}
            onChange={(e) =>
              updateObject(selectedObject.id, { visible: e.target.checked })
            }
          />
        </div>

        <div className="inspector-row">
          <label>Parent</label>
          <select
            value={selectedObject.parentId || ''}
            onChange={(e) =>
              setParent(selectedObject.id, e.target.value || null)
            }
          >
            <option value="">None (Root)</option>
            {potentialParents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transform Section */}
      <div className="inspector-section">
        <h4>Transform</h4>

        <div className="transform-group">
          <div className="transform-title">Position</div>
          <div className="transform-inputs">
            <div>
              <span>X</span>
              <input
                type="number"
                step="0.1"
                value={round3(selectedObject.position[0])}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    position: [
                      Number(e.target.value),
                      selectedObject.position[1],
                      selectedObject.position[2],
                    ],
                  })
                }
              />
            </div>
            <div>
              <span>Y</span>
              <input
                type="number"
                step="0.1"
                value={round3(selectedObject.position[1])}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    position: [
                      selectedObject.position[0],
                      Number(e.target.value),
                      selectedObject.position[2],
                    ],
                  })
                }
              />
            </div>
            <div>
              <span>Z</span>
              <input
                type="number"
                step="0.1"
                value={round3(selectedObject.position[2])}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    position: [
                      selectedObject.position[0],
                      selectedObject.position[1],
                      Number(e.target.value),
                    ],
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="transform-group">
          <div className="transform-title">Rotation (Deg)</div>
          <div className="transform-inputs">
            <div>
              <span>X</span>
              <input
                type="number"
                step="5"
                value={round3((selectedObject.rotation[0] * 180) / Math.PI)}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    rotation: [
                      (Number(e.target.value) * Math.PI) / 180,
                      selectedObject.rotation[1],
                      selectedObject.rotation[2],
                    ],
                  })
                }
              />
            </div>
            <div>
              <span>Y</span>
              <input
                type="number"
                step="5"
                value={round3((selectedObject.rotation[1] * 180) / Math.PI)}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    rotation: [
                      selectedObject.rotation[0],
                      (Number(e.target.value) * Math.PI) / 180,
                      selectedObject.rotation[2],
                    ],
                  })
                }
              />
            </div>
            <div>
              <span>Z</span>
              <input
                type="number"
                step="5"
                value={round3((selectedObject.rotation[2] * 180) / Math.PI)}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    rotation: [
                      selectedObject.rotation[0],
                      selectedObject.rotation[1],
                      (Number(e.target.value) * Math.PI) / 180,
                    ],
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="transform-group">
          <div className="transform-title">Scale</div>
          <div className="transform-inputs">
            <div>
              <span>X</span>
              <input
                type="number"
                step="0.1"
                value={round3(selectedObject.scale[0])}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    scale: [
                      Number(e.target.value),
                      selectedObject.scale[1],
                      selectedObject.scale[2],
                    ],
                  })
                }
              />
            </div>
            <div>
              <span>Y</span>
              <input
                type="number"
                step="0.1"
                value={round3(selectedObject.scale[1])}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    scale: [
                      selectedObject.scale[0],
                      Number(e.target.value),
                      selectedObject.scale[2],
                    ],
                  })
                }
              />
            </div>
            <div>
              <span>Z</span>
              <input
                type="number"
                step="0.1"
                value={round3(selectedObject.scale[2])}
                onChange={(e) =>
                  updateObject(selectedObject.id, {
                    scale: [
                      selectedObject.scale[0],
                      selectedObject.scale[1],
                      Number(e.target.value),
                    ],
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Material Properties for Primitives */}
      {isPrimitive && (
        <MaterialPanel
          material={
            selectedObject.material || {
              color: '#4a90e2',
              roughness: 0.5,
              metalness: 0.1,
              emissive: '#000000',
              emissiveIntensity: 0,
            }
          }
          onChange={(material) =>
            updateObject(selectedObject.id, { material })
          }
        />
      )}

      {/* Light Properties */}
      {isLight && (
        <div className="inspector-section">
          <h4>Light Settings</h4>
          <div className="inspector-row">
            <label>Color</label>
            <input
              type="color"
              value={selectedObject.light?.color || '#ffffff'}
              onChange={(e) =>
                updateObject(selectedObject.id, {
                  light: {
                    ...selectedObject.light,
                    color: e.target.value,
                    intensity: selectedObject.light?.intensity || 1.0,
                    castShadow: selectedObject.light?.castShadow ?? true,
                  },
                })
              }
            />
          </div>

          <div className="inspector-row">
            <label>Intensity</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={selectedObject.light?.intensity ?? 1.0}
              onChange={(e) =>
                updateObject(selectedObject.id, {
                  light: {
                    ...selectedObject.light,
                    color: selectedObject.light?.color || '#ffffff',
                    intensity: parseFloat(e.target.value),
                    castShadow: selectedObject.light?.castShadow ?? true,
                  },
                })
              }
            />
            <span>{(selectedObject.light?.intensity ?? 1.0).toFixed(1)}</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Inspector;
