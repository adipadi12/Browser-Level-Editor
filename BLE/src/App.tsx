// App is the root component for the editor UI.
// In a Unity project, this is similar to the main scene / window layout script.
import { Toaster } from 'react-hot-toast';
import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import Viewport from './components/layout/Viewport';
import StatusBar from './components/layout/StatusBar';
import './App.css';
import '../src/components/designforlayout/Inspector.css';
import '../src/components/designforlayout/Sidebar.css';
import Inspector from './components/layout/Inspector';
import { useState } from 'react';

function App() {
  const [showInspector, setShowInspector] = useState(true);
  const [showHierarchy, setShowHierarchy] = useState(true);
  return (
    // The whole editor is wrapped in one container.
    <div className="app-container">
      <Toaster position="bottom-right" />
      {/* Top toolbar with editor actions. */}
      <Toolbar />

      <div className="main-content">
        
        <div className="sidebar-wrapper">
          <button
            className="sidebar-toggle"
            onClick={() => setShowHierarchy((prev1) => !prev1)}
            >
              {showHierarchy ? '<' : '>'}
          </button>
          {/* Object list on the left. */}
          {showHierarchy && <Sidebar />}
        </div>

        {/* Main 3D workspace. */}
        <Viewport />

        <div className="inspector-wrapper">
          <button
            className="inspector-toggle"
            onClick={() => setShowInspector((prev) => !prev)}
            >
              {showInspector ? '>' : '<'}
            </button>
          {/* Property panel on the right. */}
          {showInspector && <Inspector />}
        </div>
      </div>

      {/* Small footer bar showing editor state. */}
      <StatusBar />
    </div>
  );
}

export default App;