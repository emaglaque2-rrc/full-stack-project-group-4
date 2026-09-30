import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import UserPage from './components/user-page/user-page'
import RenderReviews from './components/reviews/reviews';
import userData from './data/user-info.json'
import type { User } from './types/user'


function App() {

  const [users, setUsers] = useState<User[]>(userData);

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
                element={<UserPage users={users} setUsers={setUsers} />} 
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
