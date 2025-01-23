import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router , Routes, Route  } from 'react-router-dom'
import DetailProduct from './components/DetailProduct.jsx'
import CartProducts from './components/CartProducts.jsx'


// Here i use the routing with the use of react router dom in which i take browserRouter as router
// and into this i create the routes for specific pages , to display the home page / with App component , for specific 
// Products DetailProducts component and for cart use the CartProducts  

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/products/:id" element={<DetailProduct />} />
      <Route path="/cart" element={<CartProducts/>} />
    </Routes>
  </Router>
</StrictMode>
)
