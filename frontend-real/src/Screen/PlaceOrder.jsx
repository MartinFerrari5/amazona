import React, { useEffect, useReducer } from 'react'
import { ProgressBar } from '../Assets/ProgressBar'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context/context'
import { YellowButton } from '../Assets/YellowButton'
import {ImSpinner8} from 'react-icons/im'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'

const acciones={
    AXIOS_REQUEST:"AXIOS_REQUEST",
    AXIOS_SUCCESS: "AXIOS_SUCCESS",
    AXIOS_ERROR: "AXIOS_ERROR"
}
// USE-REDUCER
const reducer = (state, action) => {
    switch(action.type){
        case acciones.AXIOS_REQUEST:
            return {...state, loading:true}
        case acciones.AXIOS_SUCCESS:
            return {...state, loading:false}
        case acciones.AXIOS_ERROR:
            return { ...state, loading:false, err:action.payload}
        default: 
        return state
    }
}

export function PlaceOrder() {
    const navigate = useNavigate()
    const [{loading}, lclDispatch] = useReducer(reducer,{
        loading:false
    })
    const {state, dispatch} = Context()
    const {cart, userInfo, shippingData, paymentMethod} = state
    const {cartItems} = cart
    const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100
  
    let totalMoney = cartItems.reduce((a,c)=> a + c.price*c.quantity,0)
    totalMoney = round2(totalMoney)
    const tax = round2(0.21*totalMoney)
    const shippingPrice = totalMoney>100 ? round2(0) : round2(10)
    const total = totalMoney + tax + shippingPrice

    // PLACE THE ORDER
    const handleSubmit = async (e) => {
        e.preventDefault()
       try {
        const order = {shippingData, paymentMethod, totalMoney,tax, shippingPrice, total, cartItems, userInfo}
        lclDispatch({type:acciones.AXIOS_REQUEST})
        const {data} = await axios.post("/submitOrder", order,{
            headers:{
                authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({type: "CART_CLEAR"})
        lclDispatch({type:acciones.AXIOS_SUCCESS})
        navigate(`/order/${data._id}`)
    }catch (e) {
        lclDispatch({type:acciones.AXIOS_ERROR})
        toast.error(e.message)
    }
    }
    useEffect(()=>{
        if(cartItems.length>0 && userInfo==null) navigate('/signin?redirect=shipping')
        else if (userInfo==null) navigate("/signin")
        else if(cartItems.length==0) navigate("/")
      },[])
      
  return (
    <div >
      <ProgressBar shipping="active" payment="active" order="active"/>
      {loading && <ImSpinner8 className='animate-spin'/>}
      
      <h1 className='text-3xl font-bold m-3'>Place Order</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-2'>
        <div className='flex flex-col gap-3 col-span-2'>
            {/* SHIPPING */}
            <div className=' border p-2 '>
                <p className='text-xl font-semibold'>Shipping</p>
                <ul className='list-none'>
                    <li><b>Name:</b> {userInfo.name}</li>
                    <li><b>Address:</b> {shippingData.address}, {shippingData.city}, {shippingData.country}, {
                        shippingData.postalCode
                    } </li>
                </ul>
                <button className='text-blue-500 underline inline' onClick={()=>{
                    navigate("/shipping")
                }}>Edit</button>
            </div>
            {/* PAYMENT */}
            <div className='border p-2'>
                <p className='text-xl font-semibold'>Payment</p>
                <ul className='list-none'>
                    <li><b>Method:</b> {paymentMethod}</li>
                </ul>
                <button className='text-blue-500 underline' onClick={()=>{
                    navigate("/payment")
                }}>Edit</button>
            </div>
                    {/* ITEMS */}
            <div className='border p-2'>
                <p className='text-xl font-semibold'>Items</p> 
                
                <ul className='list-none grid grid-cols-1 '>
                    {cartItems.map(item=>(
                        <li className='m-2 grid grid-cols-3'>
                            <div className='flex '>
                                <img className='w-24' src={item.image} alt="" />
                                <p className='my-auto text-blue-500 underline cursor-pointer' onClick={()=>{
                                    navigate(`/product/${item.slug}`)
                                }}>{item.name}</p>
                            </div>

                            <span className='m-auto font-bold'>{item.quantity}</span>
                            <span className='m-auto font-bold text-green-700'>${item.price}</span>
                            <button className='text-blue-500 underline text-left my-2' onClick={()=>{
                                navigate("/cart")
                            }}>Edit</button>
                        </li>
                    ))}
                    
                </ul>
               
            </div>
            </div>

            <form onSubmit={(e)=>{
                handleSubmit(e)
            }} className='border h-fit flex flex-col p-2'>
                <p className='text-xl font-semibold'>Order Summary</p>
                <ul className='list-none'>
                    <li className='flex justify-evenly my-2'>Items <span>${totalMoney}</span></li>
                    <hr className='w-3/4 m-auto'/>
                    <li  className='flex justify-evenly my-2'>Shipping <span>${shippingPrice}</span></li>
                    <hr className='w-3/4 m-auto'/>
                    <li className='flex justify-evenly my-2'>Tax <span>${tax}</span></li>
                    <hr className='w-3/4 m-auto'/>
                    <li className='flex justify-evenly my-2'><b>Order Total</b> <b><span>${total}</span></b></li>
                </ul>
                <YellowButton type="submit" text="Place Order"/>
            </form>
            <ToastContainer />
      </div>
    </div>
  )
}
