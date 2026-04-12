import React from 'react'
import api from '../../axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
    const userId = localStorage.getItem("userId")
    const [data,setdata] = useState([])
    const navigate  = useNavigate()
    function loadCart(){
       api.get(`/cart/${userId}`)
       .then((res)=>{
        console.log(res.data.cart.items)
        setdata(res.data.cart.items)
       })
       .catch((err)=>{
        console.log(err)
       })
    }
   async function removeItem(productId){
    await  api.delete(`/cart/delete`,{data:{userId,productId}})     
        await loadCart()
        window.dispatchEvent(new Event("cartUpdated"))      
    }
    async function updateCart(productId,quantity){
      if(quantity == 0){
        removeItem(productId)
      }
    await  api.put('/cart/update',{userId,productId,quantity})      
        await loadCart()       
        window.dispatchEvent(new Event("cartUpdated"))      
    }
    useEffect(()=>{
      loadCart()
    },[])
  
    const total = data?.reduce((sum,item)=> sum+item.quantity*item.productId.price,0)
    if(total){
      console.log(total)
    }
  function checkOut(){
    navigate('/checkout-address')
  }
  return (
    <div>

      {
        data && data.map((item)=>{
          return(
            <div>
              <h1>{item.productId.title}</h1>
              <h1>Quantity:{item.quantity}</h1>
              <h1>Price:{item.productId.price}</h1>
              <img src={item.productId.image}/>
              <div>
              <button onClick={()=>updateCart(item.productId._id,item.quantity-1)}>-</button>
              <button onClick={()=>updateCart(item.productId._id,item.quantity+1)}>+</button>
              </div>
              <button onClick={()=>removeItem(item.productId._id)}>RemoveItem</button>
            
              </div>
          )
        })
      }
        <h1>Total:{total}</h1>
        <button onClick={checkOut}>CheckOut</button>
    </div>
  )
}

export default Cart