import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../axios'
const Header = () => {
    const [cartCount , setcartCount] = useState(0)
    const userId = localStorage.getItem("userId")
    function logout(){
        setcartCount(0)
        window.location.href = "/"
        localStorage.clear()
    }
    useEffect(()=>{
        function loadCart(){
            api.get(`/cart/${userId}`)
            .then((res)=>{
                const cart = res.data.cart
                const total = cart.items.reduce((sum,item)=>sum+item.quantity,0 )
                setcartCount(total)
            })
            .catch((err)=>{
                alert("Cart is not get")
            })
        }
        loadCart()
        window.addEventListener("cartUpdated",loadCart)
        return(()=>{
            window.removeEventListener("cartUpdated",loadCart)
        })
    },[userId])
  return (
    <div>
        <div>
            <Link to="/">Mohit Store</Link>
        </div>
        <div>
        
        </div>
        <div>
            {!userId?
            (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">SignUp</Link>
                    </div>
            ):(
                <div>
                    {cartCount>0 && <span>{cartCount}</span>}
                    <Link to="/cart">Cart Show</Link>
                    <button onClick={logout}>LogOut</button>
                </div>
            )
            }
        </div>
    
    </div>
  )
}

export default Header