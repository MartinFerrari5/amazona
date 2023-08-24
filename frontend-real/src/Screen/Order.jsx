import axios from 'axios'
import React, {  useEffect, useReducer, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { ImSpinner8 } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify'
import { Context } from '../Context/context'

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
        case "PAY_REQUEST":
            return {...state, loadingPay:true}
        case "PAY_SUCCESS":
            return {...state, loadingPay:false, successPay: true}
            case "PAY_RESET":
                return {...state, loadingPay:false, successPay: false}
        default: 
        return state
        
    }
} 

export  function Order() {
    const {id} = useParams()
    console.log(id)
    const [order, setOrder] = useState({shippingData:"", isDelivered:"", paymentMethod:"", isPaid:false, cartItems:[], total:"",shippingPrice:"", tax:"", totalMoney:""})
    console.log(order)
   const [{loading, error, successPay, loadingPay}, dispatch] = useReducer(reducer, {
    loading:false,
    error: "",
    successPay: false,
    loadingPay: false
   })
    const {state, ctxDispatch} =Context()
    const {userInfo} = state
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    
    const createOrder = (data, actions) => {
        console.log(data, actions)
        return actions.order
        // .create crea la ventana emergente de paypal con el precio 
        // order.total
        .create({
            purchase_units: [
                {
                    amount: {value: order.total}
                },
            ],
        })
        .then((orderId) => {
            return orderId
        })
    }
    const onApprove = (data, actions) => {
        // detrails contain user and payment information
        return actions.order.capture().then(async (details) => {
            try {
                dispatch({type: "PAY_REQUEST"})
                const {data} = await axios.put(`/order/${order._id}/pay`,details,
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })
                dispatch({type: "PAY_SUCCESS", payload: data})
                toast.success("Order is paid")
            } catch (err) {
                toast.error(err)
            }
        })
    }
    const onError = (err) =>{
        toast.error(err)
    }
    useEffect(()=>{
        try {
            dispatch({type:acciones.AXIOS_REQUEST})
            const fetchData = async ()=>{
                const {data} = await axios.get(`/order/${id}`,{
                    headers:{
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                setOrder(data)
                
            }
            fetchData()
            dispatch({type:acciones.AXIOS_SUCCESS})
            if(successPay){
                dispatch({type:"PAY_RESET"})
            }
            if(isPaid!==true){
                const loadPaypalScipt = async () =>{
                    const {data: clientId} = await axios.get("/api/keys/paypal", {
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    })
                    paypalDispatch({
                        type: "resetOptions",
                        value: {
                            'client-id': clientId,
                            currency: "USD"
                        }

                    });
                    paypalDispatch({type: "setLoadingStatus", value:"pending"})
                }
                loadPaypalScipt()
            }
        } catch (e) {
            dispatch({type:acciones.AXIOS_ERROR})
            toast.error(e.message)
        }
    },[])
    const {shippingData, isDelivered, paymentMethod, isPaid, cartItems, total, shippingPrice,tax, totalMoney} = order
    
    return (
        <div >
             {loading && <ImSpinner8 className='animate-spin'/>}
          <h1 className='text-3xl font-bold m-3'>Place Order</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-2'>
            <div className='flex flex-col gap-3 col-span-2'>
                {/* SHIPPING */}
                <div className=' border p-2 '>
                    <p className='text-xl font-semibold'>Shipping</p>
                    <ul className='list-none'>
                        <li><b>Name:</b> {shippingData.fullName }</li>
                        <li><b>Address:</b> {shippingData.address ?? ""}, {shippingData.city}, {shippingData.country ?? ""}, { 
                            shippingData.postalCode ?? ""} </li>
                    </ul>
                    {!isDelivered && <div className='p-4 text-red-800 bg-red-200 font-semibold rounded-md'>Not delivered </div>}
                   
                </div>
                {/* PAYMENT */}
                <div className='border p-2'>
                    <p className='text-xl font-semibold'>Payment</p>
                    <ul className='list-none'>
                        <li><b>Method:</b> {paymentMethod}</li>
                    </ul>
                    {!isPaid ? <div className='p-4 text-red-800 bg-red-200 font-semibold rounded-md'>Not paid </div> : <div className='p-4 text-green-800 bg-green-200 font-semibold rounded-md'>Paid at {order.paymentResult.update_time} </div>}
                    
                </div>
                        {/* ITEMS */}
                <div className='border p-2'>
                    <p className='text-xl font-semibold'>Items</p> 
                    
                    <ul className='list-none grid grid-cols-1 '>
                        {cartItems.map(item=>(
                            <li className='m-2 grid grid-cols-3'>
                                <div className='flex '>
                                    <img className='w-24' src={item.image} alt="" />
                                    <p className='my-auto text-blue-500 underline cursor-pointer' >{item.name}</p>
                                </div>
    
                                <span className='m-auto font-bold'>{item.quantity}</span>
                                <span className='m-auto font-bold text-green-700'>${item.price.toFixed(2)}</span>
                                
                            </li>
                        ))}
                        
                    </ul>
                   
                </div>
                </div>
    
                <form  className='border h-fit flex flex-col p-2'>
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
                   {!order.isPaid && (
                    isPending ? <ImSpinner8 className='animate-spin'/>
                : <div>
                    <PayPalButtons createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}>

                    </PayPalButtons>
                </div>
                   )}
                   {loadingPay && <ImSpinner8 className='animate-spin'/>}
                </form>
                <ToastContainer />
              
          </div>
        </div>
      )
}
