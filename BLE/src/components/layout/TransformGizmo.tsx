// TransformGizmo adds interactive move handles to a selected object.
import { TransformControls } from '@react-three/drei';
import type { Object3D } from 'three';
import { useEditorStore } from '../../editor/useEditorStore';

type TransformGizmoProps = {
    // The Object3D (Mesh or Group) that will be manipulated by the gizmo.
    object: Object3D;
    objectId: string;
    mode: 'translate' | 'rotate' | 'scale';
};

const TransformGizmo = ({ object, objectId, mode }: TransformGizmoProps) => {
    const updateObject = useEditorStore((s) => s.updateObject);
    return (
        // TransformControls attaches a drag gizmo to the mesh.
        // mode="translate" means the user can move it around in space.
        <TransformControls 
            object={object} 
            mode={mode}
            onChange={() => {
                updateObject(objectId, {
                    position: [object.position.x, object.position.y, object.position.z],
                    rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
                    scale: [object.scale.x, object.scale.y, object.scale.z],
                });
            }}
            />
    );
};

export default TransformGizmo;