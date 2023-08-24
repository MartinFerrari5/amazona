import React from 'react'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import {AiFillMinusCircle} from 'react-icons/ai'
import {BsFillTrash3Fill} from 'react-icons/bs'
import { Context } from '../Context/context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const CartItem = ({item}) => {
  const navigate = useNavigate();
    const res = item.quantity * item.price
    const {state, dispatch} = Context()
    const {cartItems} = state.cart
    const updateToCart = async (item, q) => {
        const quantity = q
        const {data} = await axios.get(`/data/${item.slug}`)
        if(data.countInStock < quantity) {
            window.alert('Product out of stock')
            return
          }
          dispatch({type:"CART_ADD_ITEM",
           payload:{...item, quantity}})
    }

  return (
    <div className='flex align-middle justify-between border-gray-400 border-solid border p-2 rounded-md cursor-pointer'>
      <div onClick={()=>{
        navigate(`/product/${item.slug}`)
      }}>
        <div className='flex'>
        <img src={item.image} alt="" className='w-20'/>
        <span className='text-blue-600 underline'>{item.brand}</span>
        </div>
        <p className='text-blue-600 underline'>{item.name}</p>
      </div>
      <div className='my-auto flex '>
        <div className='flex-col gap-3'>
            <BsFillPlusCircleFill className='w-6 h-6 cursor-pointer' onClick={()=>{
                updateToCart(item, item.quantity + 1)
            }}/>
           <button disabled={item.quantity<=1 ? true : false} className=' cursor-pointer disabled:opacity-5 disabled:cursor-not-allowed w-11 h-11'> <AiFillMinusCircle className='w-6 h-6  ' disabled
             onClick={()=>{
                if(item.quantity<=1) return;
                updateToCart(item, item.quantity - 1)
            }}/></button>
        </div>
        <span className='my-auto mx-2 text-xl'>{item.quantity}</span>
      </div>
      <p className='my-auto font-bold text-green-700'>${res}</p>
            <button onClick={()=>{
              dispatch({type:"DELETE_ITEM", payload:{item}})
            }} className='hover:scale-150 transition'><BsFillTrash3Fill /></button>
    </div>
  )
}
