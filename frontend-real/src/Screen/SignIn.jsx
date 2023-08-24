import React, { useEffect, useState } from 'react'
import { YellowButton } from '../Assets/YellowButton'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Context } from '../Context/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignIn() {
    const { search } = useLocation()
   
    const redirectInURL = new URLSearchParams(search).get("redirect")
    const redirect = redirectInURL ? redirectInURL : ""
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {state, dispatch:ctxdispatch} = Context()
    const navigate = useNavigate()
    

    const handleSubmit = async(e) =>{
      e.preventDefault()
      if(email.length<3 || password.length<3) return
      try {
        const signIn = {email,password}
      const {data} = await axios.post("/signIn",signIn)
      ctxdispatch({
        type: "SAVE_USER",
        payload: data
      })
      navigate(`/${redirect}` )
      } catch (error) {
        toast.error("Password or email incorrect!");
      }
      
    }

    useEffect(()=>{
      if(state.userInfo) navigate("/")
      const fetchData = async ()=>{
        const {data} = await axios.get("/users")
        
      }
      fetchData()
    })
  return (
    <div className='md:w-2/4 w-full p-2 m-auto'>
        <Helmet>
            <title>
                Sign In
            </title>
        </Helmet>
      <h1 className='text-3xl font-bold'>Sign In</h1>
      <form action="" onSubmit={(e)=>{
        handleSubmit(e)
      }}>
        <div className="campos flex flex-col">
            <label htmlFor="email" className='p-2'>Email</label>
            <input id='email' type="email" placeholder='Email' className='p-2 bg-gray-100 rounded-md' required
            value={email}
            onChange={(e)=>{
              const {value} = e.target
              setEmail(value)
            }}/>
        </div>
        <div className="campos flex flex-col m-2">
            <label htmlFor="pass" className='p-2'>Password</label>
            <input id='password' type="password" placeholder='Password' className='p-2 bg-gray-100 rounded-md' required
            value={password}
            onChange={(e)=>{
              const {value} = e.target
              setPassword(value)
            }}/>
        </div>
        <YellowButton type="submit" text="Sign In" className="yellowButton"/>
        <ToastContainer />
        <div>
            <p>New customer? <button className='text-blue-600 underline'><Link to={`/signup${search}`}>
            Create your account
            </Link></button></p>
        </div>
      </form>
    </div>
  )
}
