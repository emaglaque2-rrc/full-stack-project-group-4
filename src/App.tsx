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

const nextEquipmentId = useRef(
  Math.max(0, ...equipmentData.map((item) => item.id)) + 1
);

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
                element={<EquipmentInventory equipment={equipment} setEquipment={setEquipment}/>} 
          />

          <Route 
                path="equipment"
                element={<EquipmentInventory equipment={equipment} setEquipment={setEquipment}/>} 
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
