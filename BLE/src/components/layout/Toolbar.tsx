// Toolbar is a simple top-level menu, similar to a Unity toolbar or editor menu bar.
import React from 'react';
import '../designforlayout/Toolbar.css';

// These props are optional callbacks for button clicks.
interface ToolbarProps {
  onFileClick?: () => void;
  onEditClick?: () => void;
  onViewClick?: () => void;
  onHelpClick?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFileClick,
  onEditClick,
  onViewClick,
  onHelpClick,
}) => {
  return (
    <header className="toolbar">
      {/* Each button can trigger a parent-provided callback. */}
      <button onClick={onFileClick}>File</button>
      <button onClick={onEditClick}>Edit</button>
      <button onClick={onViewClick}>View</button>
      <button onClick={onHelpClick}>Help</button>
    </header>
  );
};

export default Toolbar;