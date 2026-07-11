import React from 'react';
import '../designforlayout/StatusBar.css';

const StatusBar: React.FC = () => {
  return (
    <footer className="status-bar">
      <span>Ready</span>
      <span>Resolution: 1920x1080</span>
    </footer>
  );
};

export default StatusBar;