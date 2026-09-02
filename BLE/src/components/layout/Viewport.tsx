// This component defines the 3D viewport where the scene is rendered.
// Think of it like a Unity scene camera + render window.
import { useState, Suspense, type FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import toast from 'react-hot-toast';

import { useEditorStore } from '../../editor/useEditorStore';
import { importModel } from '../../editor/importModel';

import '../designforlayout/Viewport.css';
import Scene from './Scene';

const Viewport: FC = () => {
  // We read the clearSelection function from the shared editor store.
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const addObject = useEditorStore((state) => state.addObject);
  const selectObject = useEditorStore((state) => state.selectObject);
  const sceneSettings = useEditorStore((state) => state.sceneSettings);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const sceneObject = importModel(file);
        addObject(sceneObject);
        selectObject(sceneObject.id);
        toast.success(`Imported ${file.name}`);
      } catch (err: any) {
        toast.error(err.message || 'Failed to import model');
      }
    }
  };

  return (
    <main
      className={`viewport ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Canvas is the container for all Three.js objects. */}
      <Canvas
        // Camera starts at a position that gives a 3D view of the scene.
        camera={{ position: [3, 2, 4], fov: 50 }}
        // Device pixel ratio = higher quality on retina displays.
        dpr={[1, 2]}
        // If the user clicks empty space, clear the current selection.
        onPointerMissed={clearSelection}
      >
        {/* Background color of the scene. */}
        <color attach="background" args={[sceneSettings.backgroundColor]} />

        {/* Ambient light gives basic scene illumination. */}
        <ambientLight
          intensity={sceneSettings.ambientLightIntensity}
          color={sceneSettings.ambientLightColor}
        />

        {/* A main directional light acts like a sun. */}
        <directionalLight position={[4, 5, 3]} intensity={1.8} />

        {/* Render the actual scene content, including objects and grid. */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        {/* Mouse orbit controls let the user rotate around the scene. */}
        <OrbitControls makeDefault />
      </Canvas>
    </main>
  );
};

export default Viewport;