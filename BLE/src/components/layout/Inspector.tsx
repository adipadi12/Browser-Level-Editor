// Inspector lets the user edit the transform values of the currently selected object.
// Think of it like a Unity Inspector panel.
import React from 'react';
import { useEditorStore } from '../../editor/useEditorStore';
import '../designforlayout/Inspector.css';

const Inspector: React.FC = () => {
 // Access the scene data from the shared editor store.
 const objects = useEditorStore((state) => state.objects);
 const selectedObjectId = useEditorStore((state) => state.selectedObjectId);
 const updateObject = useEditorStore((state) => state.updateObject);

 // Find the selected object from the list using its id.
 const selectedObject = objects.find((object) => object.id === selectedObjectId);

 // If nothing is selected, show a friendly empty state.
 if (!selectedObject) {
   return (
     <aside>
       <h3 className="container">Inspector</h3>
       <p className="container">No object selected</p>
     </aside>
   );
 }

 return (
   <aside>
     <h3 className="container-left">Inspector</h3>
     <h4 className="container-left">{selectedObject.name}</h4>

     <p className="container-left">Position</p>

     {/* X position input */}
     <div>
       <label className="container">X</label>
       <input
         type="number"
         value={selectedObject.position[0]}
         onChange={(event) => {
           const newX = Number(event.target.value);

           updateObject(selectedObject.id, {
             position: [newX, selectedObject.position[1], selectedObject.position[2]],
           });
         }}
       />
     </div>

     {/* Y position input */}
     <div>
       <label className="container">Y</label>
       <input
         type="number"
         value={selectedObject.position[1]}
         onChange={(event) => {
           const newY = Number(event.target.value);

           updateObject(selectedObject.id, {
             position: [selectedObject.position[0], newY, selectedObject.position[2]],
           });
         }}
       />
     </div>

     {/* Z position input */}
     <div>
       <label className="container">Z</label>
       <input
         type="number"
         value={selectedObject.position[2]}
         onChange={(event) => {
           const newZ = Number(event.target.value);

           updateObject(selectedObject.id, {
             position: [selectedObject.position[0], selectedObject.position[1], newZ],
           });
         }}
       />
     </div>

     <p className="container-left">Rotation</p>

     {/* Rotation is stored in radians, but the UI shows degrees for usability. */}
     <div>
       <label className="container">X</label>
       <input
         type="number"
         value={selectedObject.rotation[0] * 180 / Math.PI}
         onChange={(event) => {
           const newX = Number(event.target.value) * Math.PI / 180;

           updateObject(selectedObject.id, {
             rotation: [newX, selectedObject.rotation[1], selectedObject.rotation[2]],
           });
         }}
       />
     </div>

     <div>
       <label className="container">Y</label>
       <input
         type="number"
         value={selectedObject.rotation[1] * 180 / Math.PI}
         onChange={(event) => {
           const newY = Number(event.target.value) * Math.PI / 180;

           updateObject(selectedObject.id, {
             rotation: [selectedObject.rotation[0], newY, selectedObject.rotation[2]],
           });
         }}
       />
     </div>

     <div>
       <label className="container">Z</label>
       <input
         type="number"
         value={selectedObject.rotation[2] * 180 / Math.PI}
         onChange={(event) => {
           const newZ = Number(event.target.value) * Math.PI / 180;

           updateObject(selectedObject.id, {
             rotation: [selectedObject.rotation[0], selectedObject.rotation[1], newZ],
           });
         }}
       />
     </div>

     <p className="container-left">Scale</p>

     <div>
       <label className="container">X</label>
       <input
         type="number"
         value={selectedObject.scale[0]}
         onChange={(event) => {
           const newX = Number(event.target.value);

           updateObject(selectedObject.id, {
             scale: [newX, selectedObject.scale[1], selectedObject.scale[2]],
           });
         }}
       />
     </div>

     <div>
       <label className="container">Y</label>
       <input
         type="number"
         value={selectedObject.scale[1]}
         onChange={(event) => {
           const newY = Number(event.target.value);

           updateObject(selectedObject.id, {
             scale: [selectedObject.scale[0], newY, selectedObject.scale[2]],
           });
         }}
       />
     </div>

     <div>
       <label className="container">Z</label>
       <input
         type="number"
         value={selectedObject.scale[2]}
         onChange={(event) => {
           const newZ = Number(event.target.value);

           updateObject(selectedObject.id, {
             scale: [selectedObject.scale[0], selectedObject.scale[1], newZ],
           });
         }}
       />
     </div>
   </aside>
 );
};

export default Inspector;