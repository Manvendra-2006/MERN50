import React from 'react'
import api from '../../axios'
import { useState } from 'react'
import { useEffect } from 'react'
const CheckOut = () => {
    const userId = localStorage.getItem("userId")
    const [address, setaddress] = useState([])
    const [select, setselect] = useState(null)
    async function getAddress() {
        const res = await api.get(`/address/${userId}`)
        console.log(res.data.Address)
        setaddress(res.data.Address)
        setselect(res.data.Address[0])
    }
    useEffect(() => {
        getAddress()
    }, [])
    return (
        <div>
            {
                address && address.map((item) => {
                    return (
                        <div onClick={()=>setselect(item)}>
                            <input type="radio" value={select} onChange={() => setselect(item)} />
                            <h1>{item.fullName}</h1>
                            <h1>{item.Mobile}</h1>
                            <h1>{item.Pincode}</h1>
                            <h1>{item.state}</h1>
                            <h1>{item.city}</h1>
                            <h1>{item.addressLine}</h1>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CheckOut