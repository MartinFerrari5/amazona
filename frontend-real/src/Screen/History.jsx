import React, { useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Context } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import { ImSpinner8 } from 'react-icons/im'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
const reducer = (state,action) => {
    switch(action.type){
        case "AXIOS_REQUEST":
            return {...state, loading:true}
        case "AXIOS_SUCCESS":
            return {...state, loading:false}
        default: 
            return {...state}
    }
}
export const History = () => {
    const {state, dispatch} = Context()
    const navigate = useNavigate()
    const {userInfo} = state
    const [historyData, setHistoryData] = useState([])
    const [{loading}, histDispatch] = useReducer(reducer, {
        loading:false
    })
    useEffect(()=>{
        const fetchData = async () => {
           try {
            histDispatch({type:"AXIOS_REQUEST"})
            
            const {data} = await axios.get(`/history/${userInfo._id}`,
            {headers: {Authorization: `Bearer ${userInfo.token}`}})
            histDispatch({type:"AXIOS_SUCCESS"})
            setHistoryData(data)
           } catch (error) {
            toast.error("Error while loading your history")
           }
        }
        fetchData()
    },[])
  return (
    <div>
        <Helmet>
            <title>
                Order History
            </title>
        </Helmet>
      <h1 className='font-semibold text-5xl py-2'>Order History</h1>
      {loading && <ImSpinner8 className='animate-spin'/>}
    {historyData.length==0 ? <h2 className='m-2 text-center font-semibold p-3 bg-blue-200 text-2xl rounded-md'>No orders yet</h2>: 
    <div className='overflow-x-scroll'>
        <table className='p-2 md:w-11/12 m-auto '> 
        <thead>
            <tr className='p-2 border-b-2 border-black text-center'>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            {historyData.map((data,index) => {
               return(
                <tr className='text-center border-b-2' key={index}>
                <td className='p-2 '>{data._id}</td>
                <td className='p-2'>{data.createdAt.substring(0,10)}</td>
                <td className='font-bold p-2'>${data.total}</td>
                <td>{data.isPaid ? data.paidAt.substring(0,10) : "No"}</td>
                <td>{data.isDelivered ? "Yes" : "No"}</td>
                <td>
                    <button className='bg-gray-200 border-none p-2 cursor-pointer hover:bg-gray-300' onClick={()=>{
                        navigate(`/order/${data._id}`)
                    }}>Details</button>
                </td>
            </tr>
               )
            })}
        </tbody>
      </table>
        </div>}
      <ToastContainer />
      
    </div>
  )
}

