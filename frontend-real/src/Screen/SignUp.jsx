import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { YellowButton } from '../Assets/YellowButton'
import {ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export  function SignUp() {
    const { search } = useLocation()
    const navigate = useNavigate()
    const redirectInURL = new URLSearchParams(search).get("redirect")
    const redirect = redirectInURL ? redirectInURL : ""
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const signUpObject = {name,email,password}
        try {
          if(password !== confirmedPassword) {
            toast.error("Passwords don't match");
            return
          }else if(password.length<8) {
            toast.error("Password must has 8 characters");
            return
          }
            const {data} = await axios.post("/signUp", signUpObject)
            console.log(data)
            if(data.message) return toast.error(`${data.message}`);
           else navigate(`/${redirect}`)
        } catch (error) {
            console.log({message: error.message})    
        }
        
    }
  return (
    <div  className='md:w-2/4 w-full p-2 m-auto'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className='text-3xl font-bold'>Sign Up</h1>
      <form action="" onSubmit={(e)=>{
        handleSubmit(e)
      }}>
          <div className="campos flex flex-col">
            <label htmlFor="name" className='p-2'>Name</label>
            <input minLength="5" id='name' type="text" placeholder='Enter your name' className='p-2 bg-gray-100 rounded-md' required
            value={name}
            onChange={(e)=>{
              const {value} = e.target
              setName(value)
            }}/>
        </div>
        <div className="campos flex flex-col">
            <label htmlFor="email" className='p-2'>Email</label>
            <input minLength="5" id='email' type="text" placeholder='Email' className='p-2 bg-gray-100 rounded-md' required
            value={email}
            onChange={(e)=>{
              const {value} = e.target
              setEmail(value)
            }}/>
        </div>
        <div className="campos flex flex-col m-2">
            <label htmlFor="pass" className='p-2'>Password</label>
            <input id='pass' type="password" placeholder='Password' className='p-2 bg-gray-100 rounded-md' required
            value={password}
            onChange={(e)=>{
              const {value} = e.target
              setPassword(value)
            }}/>
        </div>
        <div className="campos flex flex-col m-2">
            <label htmlFor="cpass" className='p-2'>Confirm Password</label>
            <input minLength="5" id='cpass' type="password" placeholder='Confirm Password' className='p-2 bg-gray-100 rounded-md' required
            value={confirmedPassword}
            onChange={(e)=>{
              const {value} = e.target
              setConfirmedPassword(value)
            }}/>
        </div>
        <YellowButton type="submit" text="Sign In" className="yellowButton"/>
        <ToastContainer />
        <div>
            <p>Have an account? <button className='text-blue-600 underline'><Link to={`/signin?redirect=${redirectInURL}`}>
            Sign in to your account
            </Link></button></p>
        </div>
      </form>
    </div>
  )
}
