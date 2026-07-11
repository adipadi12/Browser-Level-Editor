import React from 'react';
import '../designforlayout/Sidebar.css';

const Sidebar: React.FC = () => {
  return ( // aside used to keep comp at side
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3>Hierarchy</h3>
        <ul>
          <li>Object 1</li>
          <li>Object 2</li>
          <li>Object 3</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;