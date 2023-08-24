import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../Assets/ProgressBar'
import { BlueButton } from '../Assets/BlueButton'
import { ToastContainer, toast } from 'react-toastify'
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export  function Payment() {
  const navigate = useNavigate()
  const {state, dispatch} = Context()
  const {cart, userInfo, paymentMethod} = state
  const {cartItems} = cart
  const [method, setMethod] = useState(paymentMethod )
console.log(state)

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(method.length==0) return toast.error("You have to select a payment method")
    dispatch({type: "SAVE_METHOD", payload:method})
    navigate("/place-order")
  }
  useEffect(()=>{
    if(cartItems.length>0 && userInfo==null) navigate('/signin?redirect=shipping')
    else if (userInfo==null) navigate("/signin")
    else if(cartItems.length==0 ) navigate("/")
  },[])
  return (
    <div className='md:w-2/4 w-full p-2 m-auto'>
      <Helmet>
        <title>
          Payment Method
        </title>
      </Helmet>
      <ProgressBar shipping="active" payment="active"/>
      <h1 className='text-3xl font-bold my-2'>Paymennt Method</h1>
      <form onSubmit={(e)=>{
        handleSubmit(e)
      }} className='mt-3 flex flex-col gap-2' action="">
        <div className='flex gap-2'>
          <input className=' checked:bg-blue-500' type="radio" id='paypal' name='radioButton' value="PayPal"  onClick={(e)=>{
            const {value} = e.target;
            setMethod(value)
          }} 
          />
          <label className='text-2xl' htmlFor="paypal">Paypal</label>
        </div>
        <div className='flex gap-2'>
        <input className='checked:bg-blue-500 bg-blue-600' type="radio" id='debitCard' name='radioButton' value="Debit Card"  onChange={(e)=>{
            const {value} = e.target;
            setMethod(value)
          }} />
          <label className='text-2xl' htmlFor="debitCard">Debit Card</label>
        </div>
        <div>
        <BlueButton text="Continue" type="submit"/>
        </div>
      </form>
      <ToastContainer />
    
    </div>
   
  )
}
