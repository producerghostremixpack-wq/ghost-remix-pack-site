import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import CustomCursor from './components/CustomCursor'
import GhostRemixPack from './components/GhostRemixPack'
import MentionsLegales from './components/MentionsLegales'
import ContactPage from './components/ContactPage'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Success from './components/Success'

function App() {
  return (
    <CartProvider>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<GhostRemixPack />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App

