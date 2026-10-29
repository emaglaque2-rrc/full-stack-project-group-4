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

/**
 * Uses one equipment hook instance to share equipment across pages.
 * Loading, addition, and removal go through useEquipment,
 * equipmentService, and equipmentRepository.
 * The repository handles data storage and ID generation. 
 * The service handles business validation and error messages.
 */
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
                element={
                <EquipmentInventory 
                  equipment={equipment} 
                  loading={equipmentLoading}
                  errorMessage={equipmentErrorMessage}
                  onAddEquipment={addEquipment}
                  onRemoveEquipment={removeEquipment}
                />} 
          />

          <Route 
                path="equipment"
                element={
                <EquipmentInventory 
                  equipment={equipment}
                  loading={equipmentLoading}
                  errorMessage={equipmentErrorMessage}
                  onAddEquipment={addEquipment}
                  onRemoveEquipment={removeEquipment}
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