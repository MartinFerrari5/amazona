import React from 'react'
import { Context } from '../Context/context'
import {CartItem} from './CartItem'
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
export const Cart = ()=> {
    const navigate = useNavigate();
    const userData= JSON.parse(localStorage.getItem("user"))
    console.log(userData)
    const {state, dispatch} = Context()
    
    const {cartItems} = state.cart
    console.log(cartItems==0)
   
    const totalItems = cartItems.reduce((a,c)=> a + c.quantity, 0)
    const totalMoney = cartItems.reduce((a,c)=> a + c.price*c.quantity,0)
  return (
    <div className='p-2'>
        <Helmet>
            <title>
                Shopping Cart
            </title>
        </Helmet>
        <h1 className='font-bold text-3xl block text-center'>Shopping Cart</h1>
    <div className='grid cartGrid md:w-11/12 w-full m-auto mt-2 mb-2 justify-center align-middle'>
        
        <div className='p-2 flex flex-col gap-2 grow'>
            {cartItems.length===0 ? 
            <div>
                <p className='bg-blue-200 p-2 rounded-md text-green-800'>Cart is empty. <a className='text-blue-600 underline' href="/">Go shopping</a></p>
            </div>
            : cartItems.map(item=>(
                <CartItem key={item._id} item={item}/>
            ))}
        </div>
        <div className='border-gray-400 border-solid border flex flex-col p-2 h-fit my-auto rounded-md'> 
            <h2 className='font-semibold text-center text-2xl'>Subtotal({totalItems} items) : ${totalMoney}</h2>
            <hr className='w-11/12 m-auto mt-2 mb-2'/>
            <button disabled={cartItems.length===0} className='bg-blue-400 text-white font-semibold cursor-pointer hover:bg-blue-500 duration-150 w-11/12 p-2  rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed' onClick={()=>{
                userData ? navigate("/shipping")
                : navigate("/signin?redirect=shipping")  
            }}>Proceed to checkout</button>
        </div>
    </div>
    </div>
  )
}
