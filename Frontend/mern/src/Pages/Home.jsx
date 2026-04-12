import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../axios'
const Home = () => {
    const [data,setdata] = useState([])
    const [search,setsearch] = useState('')
    const [category,setcategory] = useState('')
    const userId = localStorage.getItem("userId")
    function loadProduct(){
        api.get(`/product?search=${search}&category=${category}`)
        .then((res)=>{         
            console.log(res.data.product)
            setdata(res.data.product)
        })
        .catch((err)=>{
            alert("Product is not get")
        })
    }
    function addToCart(productId){
          api.post("/cart/addcart" ,{userId,productId})
        .then((res)=>{
            console.log(res)
            window.dispatchEvent(new Event("cartUpdated"))
        })
        .catch((err)=>{
            alert("cart is not added")
        })
    }
    useEffect(()=>{
        loadProduct()
    },[search,category])
  return (
    <div>
        <input type="text" placeholder='Enter Product' name='product' value={search} onChange={(event)=>setsearch(event.target.value)} />
        <select onChange={(event)=>setcategory(event.target.value)}>
            <option value="">All</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Grocery">Grocery</option>
            <option value="Mobile">Mobile</option>
        </select>
        {
            data && data.map((item)=>{
                return(
                    <div>                
                    <h1>{item.title}</h1>
                    <h1>{item.stock}</h1>
                    <h1>{item.price}</h1>
                    <Link to={`/product-detail/${item._id}`}>
                    <img src={item.image}/>
                    </Link>
                    <button onClick={()=>addToCart(item._id)}>Add To Cart</button>
                        </div>
                )
            })
        }
    </div>
  )
}

export default Home