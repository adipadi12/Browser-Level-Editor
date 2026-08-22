// TransformGizmo adds interactive move handles to a selected mesh.
import { TransformControls } from '@react-three/drei';
import type { ThreeElement } from '@react-three/fiber';
import type { Mesh } from 'three';

type TransformGizmoProps = {
    // The mesh that will be manipulated by the gizmo.
    object: Mesh;
};

const TransformGizmo = ({ object }: TransformGizmoProps) => {
    return (
        // TransformControls attaches a drag gizmo to the mesh.
        // mode="translate" means the user can move it around in space.
        <TransformControls 
            object={object} 
            mode="translate"
            />
    );
};

export default TransformGizmo;