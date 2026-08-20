import { TransformControls } from "@react-three/drei";
import type { Mesh } from "three";

type TransformGizmoProps = {
    object: Mesh;
};

const TransformGizmo = ({ object }: TransformGizmoProps) => {
    return (
        <TransformControls 
            object={object}
            mode="translate"
        />
    );
};

export default TransformGizmo;