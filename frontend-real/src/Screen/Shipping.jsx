import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { YellowButton } from '../Assets/YellowButton'
import { Context } from '../Context/context'
import {useNavigate} from "react-router-dom"
import {ProgressBar} from "../Assets/ProgressBar"
export function Shipping() {
    const {state, dispatch} = Context()
    const {shippingData, userInfo, cart} = state
    const {cartItems} = cart
    console.log(cartItems.length)
    const [fullName,setFullName] = useState(shippingData.fullName || "")
    const [address,setAddress] = useState(shippingData.address || "")
    const [city,setCity] = useState(shippingData.city || "")
    const [postalCode,setPostalCode] = useState(shippingData.postalCode || "")
    const [country,setCountry] = useState(shippingData.country || "")
    const navigate = useNavigate()
   
    const handleSubmit = (e)=>{
      e.preventDefault()
      const shippingData = {
        fullName,
        address,
        city,
        postalCode,
        country
      }
      dispatch({
        type: "SAVE_SHIPPING_DATA",
        payload: shippingData
      })
      navigate("/payment")
    }
    useEffect(()=>{
      if(cartItems.length>0 && userInfo==null) navigate('/signin?redirect=shipping')
      else if (userInfo==null) navigate("/signin")
      else if(cartItems.length==0) navigate("/")
    })
  return (
    <div className='w-11/12 md:w-2/4 md:m-auto m-auto'>
        <Helmet>
            <title>Shipping</title>
        </Helmet>
        <ProgressBar shipping="active" />
        <h1 className='text-3xl font-bold my-2'>Shipping Address</h1>
      <form action="" className='flex flex-col gap-3 m-auto' onSubmit={(e)=>{
        handleSubmit(e)
      }}>
        <div className='flex flex-col'>
            <label htmlFor="fullName">Full Name</label>
            <input required className='border p-1 rounded-md' type="text"
            name='fullName' onChange={(e)=>{
              const {value} = e.target;
              setFullName(value)
            }} value={fullName} id="fullName"/>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="address">Address</label>
            <input required className='border p-1 rounded-md' type="text" 
             name="address" onChange={(e)=>{
              const {value} = e.target;
              setAddress(value)
             }} value={address} id="address" />
        </div>
        <div className='flex flex-col'>
            <label htmlFor="city">City</label>
            <input request className='border p-1 rounded-md' type="text" name="city" onChange={(e)=>{
              const {value} = e.target;
              setCity(value)
            }} value={city} id="city" />
        </div>
        <div className='flex flex-col'>
            <label htmlFor="postalCode">Postal Code</label>
            <input required className='border p-1 rounded-md' type="text" name="postalCode" onChange={(e)=>{
              const {value} = e.target;
              setPostalCode(value)
            }} value={postalCode} id="postalCode" />
        </div>
        <div className='flex flex-col'>
            <label htmlFor="country">Country</label>
            <input required className='border p-1 rounded-md' type="text" name="country" onChange={(e)=>{
              const {value} = e.target;
              setCountry(value)
            }} value={country} id="country" />
        </div>
       
       <YellowButton  type="text" text="Continue" />
      
      </form>
    </div>
  )
}
