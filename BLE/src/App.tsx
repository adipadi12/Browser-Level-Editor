import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import Viewport from './components/layout/Viewport';
import StatusBar from './components/layout/StatusBar';
import './App.css';
import Inspector from './components/layout/Inspector';

function App() {
  return (
    <div className="app-container">
      <Toolbar />

      <div className="main-content">
        <Sidebar />
        <Viewport />
        <Inspector/>
      </div>

      <StatusBar />
    </div>
  );
}

export default App;