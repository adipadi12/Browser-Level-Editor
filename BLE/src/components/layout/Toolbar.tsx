import React from 'react';
import '../designforlayout/Toolbar.css';

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
  onHelpClick
}) => {
  return ( // Add your toolbar logic here, for now keeping void buttons
    <header className="toolbar">
      <button onClick={onFileClick}>File</button>
      <button onClick={onEditClick}>Edit</button>
      <button onClick={onViewClick}>View</button>
      <button onClick={onHelpClick}>Help</button>
    </header>
  );
};

export default Toolbar;