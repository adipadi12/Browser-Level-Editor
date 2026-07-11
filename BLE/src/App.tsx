import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import Viewport from './components/layout/Viewport';
import StatusBar from './components/layout/StatusBar';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Toolbar />

      <div className="main-content">
        <Sidebar />
        <Viewport />
      </div>

      <StatusBar />
    </div>
  );
}

export default App;