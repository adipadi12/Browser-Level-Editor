// The sidebar acts like a Unity hierarchy panel: it lists every object in the scene.
import React from 'react';
import { useEditorStore } from '../../editor/useEditorStore';
import '../designforlayout/Sidebar.css';

const Sidebar: React.FC = () => {
  // Read the objects currently stored in the editor.
  const objects = useEditorStore((state) => state.objects);

  // Read the id of the selected object so we can highlight it.
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);

  // Function to change the selected object when the user clicks a name.
  const selectObject = useEditorStore((state) => state.selectObject);

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3>Hierarchy</h3>
        <ul>
          {objects.map((object) => (
            <li
              key={object.id}
              // If this object is currently selected, add the CSS class 'selected'.
              className={selectedObjectId === object.id ? 'selected' : ''}
              // Clicking an item should set it as the current selection.
              onClick={() => selectObject(object.id)}
            >
              {object.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;