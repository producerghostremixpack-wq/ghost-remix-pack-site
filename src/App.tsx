import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import CustomCursor from './components/CustomCursor'
import GhostRemixPack from './components/GhostRemixPack'
import MentionsLegales from './components/MentionsLegales'
import ContactPage from './components/ContactPage'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import CheckoutPage from './components/CheckoutPage'
import Success from './components/Success'
import SuccessPage from './components/SuccessPage'
import Newsletter from './components/Newsletter'
import NewsletterConfirm from './components/NewsletterConfirm'
import DebuggerPage from './components/DebuggerPage'
import DirectPaymentDemo from './components/DirectPaymentDemo'
import TestPaiementComplet from './components/TestPaiementComplet'

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
          <Route path="/checkout-stripe" element={<CheckoutPage />} />
          <Route path="/paiement-direct" element={<DirectPaymentDemo />} />
          <Route path="/test-paiement-complet" element={<TestPaiementComplet />} />
          <Route path="/success" element={<Success />} />
          <Route path="/success-stripe" element={<SuccessPage />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
          <Route path="/debugger" element={<DebuggerPage />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App

