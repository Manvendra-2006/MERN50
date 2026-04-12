import React, { useState } from 'react'
import api from '../../axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [formData,setformData] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault()
    api.post('/auth/login',formData)
    .then((res)=>{
      alert("Login Successfully")
      console.log(res.data.data)
      localStorage.setItem("token",res.data.data.token)
      localStorage.setItem("userId",res.data.data.id)
      navigate("/")
      window.location.reload()
    })
    .catch((err)=>{
      alert("Login does not successfully")
    })
  }
  function handleChange(e){
    const {name,value} = e.target
    setformData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" placeholder='Enter Email' name='email' onChange={handleChange} value={formData.email} />
        <br />
        <br />
        <label htmlFor="">Password</label>
        <input type="password" placeholder='Enter Password' name='password' onChange={handleChange} value={formData.password}/>
        <br />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login