// Sidebar displays the scene hierarchy tree with parent-child indentation.
import React from 'react';
import { useEditorStore } from '../../editor/useEditorStore';
import { buildHierarchyTree, type HierarchyNode } from '../../utils/hierarchy';
import type { ObjectType } from '../../types/scene';
import '../designforlayout/Sidebar.css';

const getTypeIcon = (type: ObjectType): string => {
  switch (type) {
    case 'cube':
      return '🧊';
    case 'sphere':
      return '⚽';
    case 'cylinder':
      return '🥫';
    case 'cone':
      return '▲';
    case 'plane':
      return '⬜';
    case 'torus':
      return '🍩';
    case 'pointLight':
      return '💡';
    case 'directionalLight':
      return '☀️';
    case 'spotLight':
      return '🔦';
    case 'camera':
      return '📷';
    case 'empty':
      return '📁';
    case 'model':
      return '📦';
    default:
      return '📄';
  }
};

const Sidebar: React.FC = () => {
  const objects = useEditorStore((state) => state.objects);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const selectObject = useEditorStore((state) => state.selectObject);
  const updateObject = useEditorStore((state) => state.updateObject);

  const hierarchy = buildHierarchyTree(objects);

  const renderNode = (node: HierarchyNode) => {
    const isSelected = selectedObjectId === node.object.id;

    return (
      <div key={node.object.id} className="tree-node">
        <div
          className={`tree-item ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${node.depth * 16 + 8}px` }}
          onClick={() => selectObject(node.object.id)}
        >
          <span className="type-icon">{getTypeIcon(node.object.type)}</span>
          <span className="object-name">{node.object.name}</span>

          {/* Visibility toggle button */}
          <button
            className={`vis-btn ${node.object.visible ? 'visible' : 'hidden'}`}
            title="Toggle visibility"
            onClick={(e) => {
              e.stopPropagation();
              updateObject(node.object.id, { visible: !node.object.visible });
            }}
          >
            {node.object.visible ? '👁️' : '🚫'}
          </button>
        </div>

        {/* Render child nodes recursively */}
        {node.children.map(renderNode)}
      </div>
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Hierarchy</h3>
        <span className="count-badge">{objects.length}</span>
      </div>

      <div className="hierarchy-tree">
        {objects.length === 0 ? (
          <div className="empty-tree">No objects in scene. Click "+ Add Object" above.</div>
        ) : (
          hierarchy.map(renderNode)
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
