import React from "react";
import { useEditorStore } from "../editor/useEditorStore";

const Inspector: React.FC = () => {

const objects = useEditorStore(
    (state) => state.objects
);

const selectedObjectId = useEditorStore(
    (state) => state.selectedObjectId
);

const updateObject = useEditorStore(
    (state) => state.updateObject
);

const selectedObject = objects.find(
    (object) => object.id === selectedObjectId
);

if (!selectedObject) {
  return (
    <aside>
      <h3>Inspector</h3>
      <p>No object selected</p>
    </aside>
  );
}

    return (
    <aside>
        <h3>Inspector</h3>

        <h4>{selectedObject.name}</h4>

        <p>Position</p>

        <div>
            <label>X</label>
            <input // input type of HTML triggering onChange to use new position
                type="number"
                value={selectedObject.position[0]}
                onChange={(event) => {
                    const newX = Number(event.target.value);

                    updateObject(selectedObject.id, {
                        position: [
                            newX,
                            selectedObject.position[1],
                            selectedObject.position[2],
                        ],
                    });
                }}
            />
        </div>

        <div>
            <label>Y</label>
            <input
                type="number"
                value={selectedObject.position[1]}
                onChange={(event) => {
                    const newY = Number(event.target.value);

                    updateObject(selectedObject.id, {
                        position: [
                            selectedObject.position[0],
                            newY,
                            selectedObject.position[2],
                        ],
                    });
                }}
            />
        </div>

        <div>
            <label>Z</label>
            <input
                type="number"
                value={selectedObject.position[2]}
                onChange={(event) => {
                    const newZ = Number(event.target.value);

                    updateObject(selectedObject.id, {
                        position: [
                            selectedObject.position[0],
                            selectedObject.position[1],
                            newZ,
                        ],
                    });
                }}
            />
        </div>

        <p>Rotation</p>

        <div>
            <label>X</label>
            <input // input type of HTML triggering onChange to use new position
                type="number"
                value={selectedObject.rotation[0]  * 180 / Math.PI}
                onChange={(event) => {
                    const newX = Number(event.target.value) * Math.PI / 180;;

                    updateObject(selectedObject.id, {
                        rotation: [
                            newX,
                            selectedObject.rotation[1],
                            selectedObject.rotation[2],
                        ],
                    });
                }}
            />
        </div>

        <div>
            <label>Y</label>
            <input
                type="number"
                value={selectedObject.rotation[1] * 180 / Math.PI}
                onChange={(event) => {
                    const newY = Number(event.target.value) * Math.PI / 180;

                    updateObject(selectedObject.id, {
                        rotation: [
                            selectedObject.rotation[0],
                            newY,
                            selectedObject.rotation[2],
                        ],
                    });
                }}
            />
        </div>

        <div>
            <label>Z</label>
            <input
                type="number"
                value={selectedObject.rotation[2] * 180 / Math.PI}
                onChange={(event) => {
                    const newZ = Number(event.target.value) * Math.PI / 180;;

                    updateObject(selectedObject.id, {
                        rotation: [
                            selectedObject.rotation[0],
                            selectedObject.rotation[1],
                            newZ,
                        ],
                    });
                }}
            />
        </div>

        <p>Scale</p>

        <div>
            <label>X</label>
            <input // input type of HTML triggering onChange to use new position
                type="number"
                value={selectedObject.scale[0]}
                onChange={(event) => {
                    const newX = Number(event.target.value);

                    updateObject(selectedObject.id, {
                        scale: [
                            newX,
                            selectedObject.scale[1],
                            selectedObject.scale[2],
                        ],
                    });
                }}
            />
        </div>

        <div>
            <label>Y</label>
            <input
                type="number"
                value={selectedObject.scale[1]}
                onChange={(event) => {
                    const newY = Number(event.target.value);

                    updateObject(selectedObject.id, {
                        scale: [
                            selectedObject.scale[0],
                            newY,
                            selectedObject.scale[2],
                        ],
                    });
                }}
            />
        </div>

        <div>
            <label>Z</label>
            <input
                type="number"
                value={selectedObject.scale[2]}
                onChange={(event) => {
                    const newZ = Number(event.target.value);

                    updateObject(selectedObject.id, {
                        scale: [
                            selectedObject.scale[0],
                            selectedObject.scale[1],
                            newZ,
                        ],
                    });
                }}
            />
        </div>

    </aside>
);
};

export default Inspector;