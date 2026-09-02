// AddObjectMenu provides a clean dropdown UI for adding shapes, lights, cameras, and groups.
import React, { useState, useRef, useEffect } from 'react';
import { useEditorStore } from '../../editor/useEditorStore';
import type { ObjectType } from '../../types/scene';
import '../designforlayout/AddObjectMenu.css';

type AddOption = {
  type: ObjectType;
  name: string;
  icon: string;
  category: '3D Shapes' | 'Lights' | 'Other';
};

const options: AddOption[] = [
  // 3D Shapes
  { type: 'cube', name: 'Cube', icon: '🧊', category: '3D Shapes' },
  { type: 'sphere', name: 'Sphere', icon: '⚽', category: '3D Shapes' },
  { type: 'cylinder', name: 'Cylinder', icon: '🥫', category: '3D Shapes' },
  { type: 'cone', name: 'Cone', icon: '▲', category: '3D Shapes' },
  { type: 'plane', name: 'Plane / Floor', icon: '⬜', category: '3D Shapes' },
  { type: 'torus', name: 'Torus / Donut', icon: '🍩', category: '3D Shapes' },

  // Lights
  { type: 'pointLight', name: 'Point Light', icon: '💡', category: 'Lights' },
  { type: 'directionalLight', name: 'Directional Light', icon: '☀️', category: 'Lights' },
  { type: 'spotLight', name: 'Spot Light', icon: '🔦', category: 'Lights' },

  // Other
  { type: 'camera', name: 'Camera', icon: '📷', category: 'Other' },
  { type: 'empty', name: 'Empty / Group', icon: '📁', category: 'Other' },
];

const AddObjectMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const addObject = useEditorStore((state) => state.addObject);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdd = (option: AddOption) => {
    let defaultProps: any = {
      type: option.type,
      name: option.name,
      position: [0, 0.5, 0],
    };

    // Default properties for different types
    if (option.category === 'Lights') {
      defaultProps.light = {
        color: '#ffffff',
        intensity: option.type === 'directionalLight' ? 1.5 : 2.0,
        castShadow: true,
        angle: 0.6,
        penumbra: 0.2,
      };
      defaultProps.position = [0, 3, 0];
    } else if (option.type === 'camera') {
      defaultProps.camera = {
        fov: 50,
        near: 0.1,
        far: 1000,
      };
      defaultProps.position = [0, 2, 5];
    } else if (option.type === 'plane') {
      defaultProps.position = [0, 0, 0];
      defaultProps.rotation = [-Math.PI / 2, 0, 0];
      defaultProps.scale = [10, 10, 1];
    }

    addObject(defaultProps);
    setIsOpen(false);
  };

  const categories = ['3D Shapes', 'Lights', 'Other'] as const;

  return (
    <div className="add-object-container" ref={menuRef}>
      <button
        className="add-object-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Add objects to scene"
      >
        <span>+</span> Add Object ▾
      </button>

      {isOpen && (
        <div className="add-object-dropdown">
          {categories.map((category) => (
            <div key={category} className="add-category">
              <div className="category-title">{category}</div>
              <div className="category-items">
                {options
                  .filter((opt) => opt.category === category)
                  .map((opt) => (
                    <button
                      key={opt.type}
                      className="add-item-btn"
                      onClick={() => handleAdd(opt)}
                    >
                      <span className="item-icon">{opt.icon}</span>
                      <span className="item-name">{opt.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddObjectMenu;
