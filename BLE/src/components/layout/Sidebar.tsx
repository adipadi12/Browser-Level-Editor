import React from 'react';
import { useEditorStore } from '../../editor/useEditorStore'
import '../designforlayout/Sidebar.css';

const Sidebar: React.FC = () => {
  const objects = useEditorStore(
    (state) => state.objects
  );

  const selectedObjectId = useEditorStore(
    (state) => state.selectedObjectId // give currently selected object from editor store
  );

  const selectObject = useEditorStore(
    (state) => state.selectObject
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3>Hierarchy</h3>
        <ul>
          {objects.map((object) => (
            <li
              key={object.id}

              className={
                selectedObjectId === object.id
                ? 'selected'
                : ''
              }
              onClick={() => selectObject(object.id)}
              >
                {object.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
};

export default Sidebar;