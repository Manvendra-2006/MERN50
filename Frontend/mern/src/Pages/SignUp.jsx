import React from 'react'
import { useState } from 'react'
import api from '../../axios'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const navigate = useNavigate()
    const [formData,setformData] = useState({
        name:"",
        email:"",
        password:""
    })
    function handleChange(e){
        const {name,value} = e.target
        setformData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
     function handleSubmit(e){
        e.preventDefault()
        api.post("/auth/signup",formData)
        .then((res)=>{
          alert("User Signup Successfully")
          navigate("/login")
          console.log(res.data.newUser._id)
          localStorage.setItem("userId",res.data.newUser._id)
        })
        .catch((err)=>{
          alert("User is not signup successfully")
        })
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" placeholder='Enter Text' name='name' onChange={handleChange} value={formData.name}/>
            <br/>
            <br/>
            <label>Email</label>
            <input type="text" placeholder='Enter Email' name="email" onChange={handleChange} value={formData.email}/>
            <br/>
            <br/>
            <label>Password</label>
            <input type="password" placeholder='Enter Password' name='password' onChange={handleChange} value={formData.password}/>
            <br/>
            <br/>
            <button type='submit'>SignUp</button>
        </form>
    </div>
  )
}

export default SignUp