import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory'
import RenderReviews from './components/reviews/reviews'

function App() {

  return (
    <>

      <Header />

      <main>
        <EquipmentInventory />
        <RenderReviews />
      </main>
      
      <Footer />

    </>
  )
}

export default App
