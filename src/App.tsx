import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory';
import UserInventory from './components/user-inventory/user-inventory';
import RenderReviews from './components/reviews/reviews';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>

      <Header />

      <main>
        <Routes>
          
          <Route path="/" element={<EquipmentInventory />} />
          <Route path="/user" element={<UserInventory />} />
          <Route path="/reviews" element={<RenderReviews />} />

        </Routes>
      </main>
      
      <Footer />

    </>
  )
}

export default App
