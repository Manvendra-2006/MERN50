import React from 'react'
import { useState } from 'react'
import api from '../../axios'
import { useNavigate } from 'react-router-dom'
const CheckOutAddress = () => {
  const navigate = useNavigate()
  const [form,setform] = useState({
    fullName:"",
    Mobile:"",
    state:"",
    Pincode:"",
    city:"",
    addressLine:""
  })
  const userId = localStorage.getItem("userId")
  function handleChange(e){
    const {name , value} = e.target
    setform((prev)=>({...prev,
      [name]:value
    }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    const fullName = form.fullName
    const Mobile = form.Mobile
    const state = form.state
    const Pincode = form.Pincode
    const city = form.city
    const addressLine = form.addressLine
    const res = await api.post("/address/saveaddress",{userId,fullName,Mobile,state,Pincode,city,addressLine})
    console.log(res)
    navigate("/checkout")
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label>FullName</label>
        <input type="text" placeholder='Enter Full Name' name="fullName" onChange={handleChange} value={form.fullName} />
        <br />
        <label>Mobile</label>
        <input type="text" placeholder='Enter Mobile Number' name="Mobile" onChange={handleChange} value={form.Mobile} />
        <br />   
        <label>State</label>
        <input type="text" placeholder='Enter State' name="state" onChange={handleChange} value={form.state} />
        <br />
        <label>Pincode</label>
        <input type="text" placeholder='Enter Pincode' name="Pincode"  onChange={handleChange} value={form.Pincode}/>
        <br /> 
        <label>city</label>
        <input type="text" placeholder='Enter City' name="city" onChange={handleChange} value={form.city} />
        <br /> 
        <label>AddressLine</label>
        <input type="text" placeholder='Enter AddressLine' name="addressLine" onChange={handleChange} value={form.addressLine} />
        <br />
        <button >Save Address</button>
      </form>
    </div>
  )
}

export default CheckOutAddress