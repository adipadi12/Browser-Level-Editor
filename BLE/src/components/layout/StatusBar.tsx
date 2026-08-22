// StatusBar is a small footer area that shows editor status text.
import React from 'react';
import '../designforlayout/StatusBar.css';

const StatusBar: React.FC = () => {
  return (
    <footer className="status-bar">
      {/* This tells the user the editor is currently ready. */}
      <span>Ready</span>

      {/* Hardcoded display info for the current screen size. */}
      <span>Resolution: 1920x1080</span>
    </footer>
  );
};

export default StatusBar;