import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import RenderReviews from './components/reviews/reviews';
import UserPage from './components/user-page/user-page';
import { useEquipment } from './hooks/useEquipment';
import useUsers from './hooks/useUser';
        
function App() {
// Uses the custom hook to mange uses and connect the UI to the service.
//The hook loads user data and provides functions for creating, updating users and removing rentals.
const { users, setUsers, loading, errorMessage, createUser, updateUser,removeRental} = useUsers();

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

          {/* Displays the user page after the user data has loaded.*/}
          <Route 
                path="user"
                element={
                  loading ? (
                    <p>Loading users ...</p>
                  ): errorMessage ? (
                    <p>{errorMessage}</p>
                  ):(
                    <UserPage 
                      equipment={equipment} 
                      users={users} 
                      setUsers={setUsers}
                      onAddUser={createUser}
                      updateUser={updateUser}
                      removeRental={removeRental} 
                    />
                  )
                }
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