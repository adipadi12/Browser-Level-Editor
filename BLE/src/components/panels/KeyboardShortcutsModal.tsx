// KeyboardShortcutsModal displays a help reference for all keyboard shortcuts.
import React from 'react';
import './Modals.css';

type KeyboardShortcutsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const shortcuts = [
  { category: 'Transform', key: 'Q', action: 'Translate mode' },
  { category: 'Transform', key: 'W', action: 'Rotate mode' },
  { category: 'Transform', key: 'E', action: 'Scale mode' },
  { category: 'Edit', key: 'Ctrl + Z', action: 'Undo' },
  { category: 'Edit', key: 'Ctrl + Shift + Z', action: 'Redo' },
  { category: 'Edit', key: 'Ctrl + D', action: 'Duplicate selected' },
  { category: 'Edit', key: 'Ctrl + C', action: 'Copy selected' },
  { category: 'Edit', key: 'Ctrl + V', action: 'Paste' },
  { category: 'Edit', key: 'Delete', action: 'Delete selected' },
  { category: 'Selection', key: 'Ctrl + A', action: 'Select all' },
  { category: 'Selection', key: 'Escape', action: 'Deselect' },
];

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Keyboard Shortcuts</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {categories.map((category) => (
            <div key={category} className="shortcut-category">
              <h4>{category}</h4>
              <div className="shortcut-list">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, idx) => (
                    <div key={idx} className="shortcut-row">
                      <kbd className="shortcut-key">{shortcut.key}</kbd>
                      <span className="shortcut-action">{shortcut.action}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
