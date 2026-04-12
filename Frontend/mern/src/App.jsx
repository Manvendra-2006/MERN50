import React, { useEffect } from 'react'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import Header from './Components/Header'
import CheckOutAddress from './Pages/CheckOutAddress'
import CheckOut from './Pages/CheckOut'
const App = () => {
  // useEffect(()=>{
  //   localStorage.clear()
  // },[])
  function LayOut() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    )

  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut/>}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product-detail/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-address" element={<CheckOutAddress/>}/>
            <Route path="/checkout" element={<CheckOut/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App