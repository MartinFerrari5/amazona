import React, { useEffect, useReducer } from 'react'

import axios from "axios";
import {ProductItem} from "./ProductItem"
import { Context } from '../Context/context';

const reducer = (state, action) => {
  
  switch(action.type) {
    case "FETCH_REQUEST":
      return {...state, loading:true};
      case "FETCH_SUCCESS":
        return {...state, products: action.payload, loading: false};
      case "FETCH_FAIL":
        return {...state, loading: false, error:action.payload};
      default:
        return state;
  }
}

 // AÑADIR AL CARRITO

export default function Main() {
  const [{loading, error, products}, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: ""
  })
  const {state, dispatch:ctxDispatch} = Context()
  
  const addToCartHandler = async (product)=>{
    const existItem= state.cart.cartItems.find(item=> item._id===product._id)
    const slug = product.slug
    const quantity = existItem ? existItem.quantity + 1 : 1
    const {data} = await axios.get(`/data/${slug}`)
    if(data.countInStock < quantity) {
      window.alert('Product out of stock')
      return
    }
    ctxDispatch({type:"CART_ADD_ITEM",
     payload:{...product, quantity}})
  }
 
  // const [products, setProducts] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch({type: "FETCH_REQUEST"})
     
      try {
        const response = await axios.get("/data")
        dispatch({type: "FETCH_SUCCESS", payload: response.data})
      } catch (error) {
        dispatch({type: "FETCH_FAIL", payload: error.message})
      }
     
    }
    fetchData()
  },[])

  return (
    
    <div className='mt-2 p-2 grid grid-cols-1 md:grid-cols-4 gap-2 '>
      { loading && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center'>ERROR</p>}
      {products.map(product =>(
          <ProductItem key={product.slug}
          addToCartHandler = {addToCartHandler}
          product={product}/>
      ))}
    </div>
  )
}
