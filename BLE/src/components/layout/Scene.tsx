// Scene renders all 3D objects, lights, cameras, and gizmos in the editor.
import { useRef, type FC } from 'react';
import type { Object3D } from 'three';
import { useEditorStore } from '../../editor/useEditorStore';
import { useEditorKeys } from '../../editor/useEditorKeys';
import Grid from './Grid';
import TransformGizmo from './TransformGizmo';
import PrimitiveObject from '../primitives/PrimitiveObject';
import LightObject from '../lights/LightObject';
import CameraObject from '../camera/CameraObject';
import EmptyObject from '../hierarchy/EmptyObject';
import ModelObject from './ModelObject';
import type { SceneObject } from '../../types/scene';

const Scene: FC = () => {
  const objects = useEditorStore((state) => state.objects);
  const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
  const gizmoMode = useEditorStore((state) => state.gizmoMode);
  const selectObject = useEditorStore((state) => state.selectObject);
  const renderMode = useEditorStore((state) => state.renderMode);
  const sceneSettings = useEditorStore((state) => state.sceneSettings);

  const objectRefs = useRef<Map<string, Object3D>>(new Map());
  const selectedObject = selectedObjectId
    ? objectRefs.current.get(selectedObjectId)
    : undefined;

  // Global editor keyboard shortcuts
  useEditorKeys();

  const isWireframe = renderMode === 'wireframe';

  // Render individual object based on its type
  const renderSingleObject = (object: SceneObject) => {
    const isSelected = selectedObjectId === object.id;

    const setRef = (instance: Object3D | null) => {
      if (instance) {
        objectRefs.current.set(object.id, instance);
      } else {
        objectRefs.current.delete(object.id);
      }
    };

    let content = null;

    if (
      object.type === 'cube' ||
      object.type === 'sphere' ||
      object.type === 'cylinder' ||
      object.type === 'cone' ||
      object.type === 'plane' ||
      object.type === 'torus'
    ) {
      content = (
        <PrimitiveObject
          ref={setRef as any}
          object={object}
          isSelected={isSelected}
          onSelect={selectObject}
          wireframe={isWireframe}
        />
      );
    } else if (
      object.type === 'pointLight' ||
      object.type === 'directionalLight' ||
      object.type === 'spotLight'
    ) {
      content = (
        <LightObject
          ref={setRef as any}
          object={object}
          isSelected={isSelected}
          onSelect={selectObject}
        />
      );
    } else if (object.type === 'camera') {
      content = (
        <CameraObject
          ref={setRef as any}
          object={object}
          isSelected={isSelected}
          onSelect={selectObject}
        />
      );
    } else if (object.type === 'empty') {
      content = (
        <EmptyObject
          ref={setRef as any}
          object={object}
          isSelected={isSelected}
          onSelect={selectObject}
        />
      );
    } else if (object.type === 'model') {
      content = (
        <ModelObject
          ref={setRef as any}
          object={object}
          onSelect={selectObject}
        />
      );
    }

    return (
      <group key={object.id}>
        {content}
        {/* Transform Gizmo for selected object */}
        {isSelected && selectedObject && (
          <TransformGizmo
            object={selectedObject}
            objectId={object.id}
            mode={gizmoMode}
          />
        )}
      </group>
    );
  };

  return (
    <>
      {/* 3D Grid */}
      {sceneSettings.gridVisible && <Grid />}

      {/* Render all scene objects */}
      {objects.map((obj) => renderSingleObject(obj))}
    </>
  );
};

export default Scene;
