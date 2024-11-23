import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import { Auth } from './components/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/SideBar'

import Products from './components/Products'
import Wishlist from './components/Wishlist'
import Cart from './components/Cart'
import Orders from './components/Orders'
import OrderItems from './components/OrderItems'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Auth type='signin'/>}/>
      <Route path='/account' element={<Sidebar/>}/>
      <Route path='/signup' element={     <Auth type='signup'/>}/>
      <Route path='/' element={<Products/>} />
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path="/:orderId" element={<OrderItems />} />


    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
