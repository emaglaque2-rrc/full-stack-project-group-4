import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import RenderReviews from './components/reviews/reviews';
import { useState } from 'react';
import equipmentData from "./data/equipment.json"
import UserPage from './components/user-page/user-page'

function App() {
const [equipment, setEquipment] = useState(equipmentData)
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
                element={<UserPage equipment={equipment} />} 
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