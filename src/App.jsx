import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Whishlist from './Pages/Wishlist'
import View from './Pages/View'
import Cart from './Pages/Cart'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'




function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  return (
    <>
    <Header insideHome={location.pathname==='/'}/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/wishlist' element={<Whishlist/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/view/:id' element={<View/>} />
      <Route path='/*' element={<Navigate to={'/'}/>} />
    </Routes>
   
     <Footer />
    </>
  )
}

export default App
