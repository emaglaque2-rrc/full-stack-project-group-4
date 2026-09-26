import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import UserInventory from './components/user-inventory/user-inventory';
import RenderReviews from './components/reviews/reviews';
import { useState } from 'react';
import equipmentData from "./data/equipment.json"
function App() {
const [equipment, setEquipment] = useState(equipmentData)
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route 
                index 
                element={<EquipmentInventory />} 
          />

          <Route 
                path="equipment"
                element={<EquipmentInventory />} 
          />

          <Route 
                path="user"
                element={<UserInventory />} 
          />

          <Route 
                path="reviews"
                element={<RenderReviews />}
          />

        </Route>
      </Routes>
    </>
  )
}

export default App
