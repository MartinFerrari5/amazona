import React, {useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import {ImSpinner8} from 'react-icons/im'
import {  Context } from '../Context/context';

const reducer = (state, action) =>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state, loading:true};
    case "FETCH_ADD":
      return {...state, item: action.payload.data, loading: false}
    case "FETCH_ERROR":
      return {...state, error: action.payload.err }
    default:
      return state
  }
}
export function Item() {
  const navigate = useNavigate()
    const params = useParams();
    const {slug} = params
    const [{loading,error, item}, dispatch] = useReducer(reducer,{
      item: {},
      loading: '',
      error:""
    })

    // AÑADIR AL CARRITO
    const {state, dispatch:ctxDispatch} = Context()
   const {cart} = state 
    const addToCartHandler = async ()=>{
      const existItem = cart.cartItems.find(x=>x._id === item._id)
      const quantity = existItem ? existItem.quantity + 1 : 1
      const {data} = await axios.get(`/data/${slug}`)
      if(data.countInStock < quantity) {
        window.alert('Product out of stock')
        return
      }
      ctxDispatch({type:"CART_ADD_ITEM",
       payload:{...item, quantity}})
    }

  useEffect(()=>{
    dispatch({type: "FETCH_REQUEST"})
    const fetchData = async ()=>{
      try {
        const response = await axios.get(`/data/${slug}`)
      dispatch({type: "FETCH_ADD", payload: {data: response.data}})
      !response.data && navigate('/notfound')
      } catch (err) {
        dispatch({type: "FETCH_ERROR", payload:{err: err}})
      }
     
    }
    fetchData()
    
  },[])
  return (
    <div className='w-11/12 md:w-9/12 m-auto grid grid-cols-1
      md:grid-cols-3 p-2 gap-2'>
        {loading && <p className='text-3xl'><ImSpinner8 className='animate-spin'/></p>}
        {error && <p>{error}</p>}
      <div>
        <img src={item.image} alt="" />
      </div>
      <div>
        <Helmet>
        <title >{item.name}</title>
        </Helmet>
        <h1 className='text-3xl'>{item.name}</h1>
        <hr />
        <Rating rating={item.rating}
        reviews={item.numReviews}/>
        <hr />
        <p className='capitalize '>Description: <span className='font-semibold'>{item.description}</span></p>
      </div>
      <div className='border-2 border-gray-300 border-solid h-fit text-center p-3'>
        <p>Price: ${item.price}</p>
        <hr className='w-3/6 m-auto'/>

       <div className='flex flex-col'>
       <p className='mt-2'>Status: </p>
        {item.countInStock>0 ?
        <div className='flex flex-col'>
          <span className="bg-green-600 text-white mt-5 p-1 rounded-md">In Stock</span>
          <hr className='w-3/6 m-auto mt-2'/>
          <button type="button" className="m-2 bg-yellow-500  p-2 rounded-md text-black font-bold border-solid border-black border hover:bg-yellow-200 hover:text-yellow-600 transition-all duration-150" onClick={(e)=>{
            e.stopPropagation()
            addToCartHandler()
          }}>Add to cart</button>
        </div> :
        <span className="bg-red-600 text-white rounded-md p-2">Unavailable</span> }
       </div>

      </div>
    </div>
  )
}

