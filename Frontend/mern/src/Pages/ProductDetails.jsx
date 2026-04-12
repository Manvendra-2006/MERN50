import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../../axios'
const ProductDetails = () => {
    const [data, setdata] = useState({})
    const { id } = useParams()
    const userId = localStorage.getItem("userId")
    function loadProduct() {
        api.get("/product/")
            .then((res) => {
                console.log(res.data.product)
                const productData = res.data.product.find((item) => item._id == id)
                setdata(productData)
            })
            .catch((err) => {
                alert("Product is not get")
            })
    }
    function addtocart(productId){
        api.post("/cart/addcart" ,{userId,productId})
        .then((res)=>{
            console.log(res)
            window.dispatchEvent(new Event("cartUpdated"))
        })
        .catch((err)=>{
            alert("cart is not added")
        })
    }
    useEffect(() => {
        loadProduct()
    }, [])
    return (
        <div>
            <h1>{data.title}</h1>
            <h1>{data.description}</h1>
            <h1>{data.stock}</h1>
            <h1>{data.price}</h1>
            <img src={data.image} />
            <br/>
            <a href="/">Go To Home Page</a>
            <br />
            <button onClick={()=>addtocart(data._id)}>Add To Cart</button>
        </div>
    )
}

export default ProductDetails