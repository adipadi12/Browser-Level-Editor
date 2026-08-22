// App is the root component for the editor UI.
// In a Unity project, this is similar to the main scene / window layout script.
import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import Viewport from './components/layout/Viewport';
import StatusBar from './components/layout/StatusBar';
import './App.css';
import Inspector from './components/layout/Inspector';

function App() {
  return (
    // The whole editor is wrapped in one container.
    <div className="app-container">
      {/* Top toolbar with editor actions. */}
      <Toolbar />

      <div className="main-content">
        {/* Object list on the left. */}
        <Sidebar />

        {/* Main 3D workspace. */}
        <Viewport />

        {/* Property panel on the right. */}
        <Inspector />
      </div>

      {/* Small footer bar showing editor state. */}
      <StatusBar />
    </div>
  );
}

export default App;