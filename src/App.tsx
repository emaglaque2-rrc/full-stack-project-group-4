import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import RenderReviews from './components/reviews/reviews';
import UserPage from './components/user-page/user-page';
import userData from './data/user-info.json';
import { useEquipment } from './hooks/useEquipment';
import { useState } from 'react';
import type { User } from './types/user';

function App() {
const [users, setUsers] = useState<User[]>(userData)


const {
  equipment,
  loading: equipmentLoading,
  errorMessage: equipmentErrorMessage,
  addEquipment,
  removeEquipment,
} = useEquipment();

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
                element={<UserPage equipment={equipment} users={users} setUsers={setUsers} />} 
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