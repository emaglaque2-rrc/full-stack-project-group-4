import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import EquipmentInventory from './components/equipment-inventory/EquipmentInventory'

function App() {

  return (
    <>

      <Header />

      <main>
        <EquipmentInventory />
      </main>
      
      <Footer />

    </>
  )
}

export default App
