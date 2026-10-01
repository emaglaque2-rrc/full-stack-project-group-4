import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import UserInventory from './components/user-inventory/user-inventory';
import RenderReviews from './components/reviews/reviews';
import { useState, useRef } from 'react';
import equipmentData from "./data/equipment.json"

function App() {
const [equipment, setEquipment] = useState(equipmentData)

// Start the counter above the highest initial equipment ID in the JSON data. 
// This ensures that new equipment entries will have unique IDs.
// if the initial list is empty, the first ID will be 1.
// RESOURCES: https://react.dev/reference/react/useRef
// RESOURCES: https://www.w3schools.com/react/react_useref.asp
const nextEquipmentId = useRef(
  Math.max(0, ...equipmentData.map((item) => item.id)) + 1
);

// Return the next available ID, then advance the counter for the next call.
// ** IMPORTANT** Deleted equipment IDs are not reused during this app session.
// **IMPORTANT** So, removing equipment won't move the counter backwards.
// Just a simple way to generate unique IDs for new equipment entries for now !!
function getNextEquipmentId() {
  const id = nextEquipmentId.current;
  nextEquipmentId.current += 1;
  return id;
}
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route 
                index 
                element={<EquipmentInventory 
                  equipment={equipment} 
                  setEquipment={setEquipment}
                  getNextEquipmentId={getNextEquipmentId}
                />} 
          />

          <Route 
                path="equipment"
                element={<EquipmentInventory 
                  equipment={equipment} 
                  setEquipment={setEquipment}
                  getNextEquipmentId={getNextEquipmentId}
                />} 
          />

          <Route 
                path="user"
                element={<UserInventory />} 
          />

          <Route 
                path="reviews"
                element={<RenderReviews equipment={equipment} />}
          />

        </Route>
      </Routes>
    </>
  )
}

export default App
