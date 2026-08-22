// This is the entry point for a React app.
// It mounts the app into the HTML element with id="root".
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// document.getElementById('root') finds the root DOM node in index.html.
// The exclamation mark tells TypeScript: "this value should never be null".
createRoot(document.getElementById('root')!).render(
  // StrictMode helps catch common React bugs during development.
  <StrictMode>
    <App />
  </StrictMode>,
);
