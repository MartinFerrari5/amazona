import React, { useEffect,  useState } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { Context } from '../Context/context'
import { BlueButton } from '../Assets/BlueButton'
import {  ToastContainer, toast } from 'react-toastify'


export const Profile = () => {
    const {state, dispatch} = Context()
   
    const {userInfo} = state
const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    // console.log(userInfo)
    useEffect(()=>{
        const fetchData = async ()=>{
          
            const {data} = await axios.get(`user/${userInfo._id}`)
            console.log(data)
            setName(data.name)
            setEmail(data.email)
        }
        fetchData()
    },[])
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
        if(name.length===0 ||
            email.length===0 ) {toast.error("You must give a name and an email ")
        }else{
            console.log(password.length)
            if(password.length>0){
                if(password !== confirmPass){
                   return toast.error("Passwords must match")
                }
               else if(password.length<8 && password.length>1) return toast.error("Password must be 8 characters length")
            }
                
                
                    
                const {data} = await axios.put(`updateUser/${userInfo._id}`, {name,email,password},{
                    headers: {Authorization:`Bearer ${userInfo.token}`}
                })
                
                setPassword("")
                setConfirmPass("")
                setName(data.name)
            setEmail(data.email)
            dispatch({type:"SAVE_PROFILE", payload:data})
        
            toast.success('User updated successfully')   
            }
           
        } catch (error) {
            toast.error(error)
        }
    }
  return (
    <div>
        <Helmet>
            <title>Profile</title>
        </Helmet>
        <h1 className='font-bold text-3xl block text-center'>User Profile</h1>
        <main className='w-11/12 md:w-9/12 m-auto'>
            <form action="">
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" placeholder='Full Name' value={name} onChange={(e)=>{
                        const {value} = e.target
                        setName(value)
                        
                    }} type="text" id="name" className="p-1 m-2 w-11/12 outline-none border-1"   />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Email' name="email" value={email} onChange={(e)=>{
                        const {value} = e.target
                        setEmail(value)
                       
                    }} className="p-1 m-2 w-11/12 outline-none border-1"   />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input placeholder='Password' type="password" value={password} onChange={(e)=>{
                        const {value} = e.target
                        setPassword(value)
                    }} className="p-1 m-2 w-11/12 outline-none border-1" name="password"  />
                </div>
                <div>
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input placeholder='Confirm Password' value={confirmPass} type="password" onChange={(e)=>{
                        const {value} = e.target
                        setConfirmPass(value)
                    }} className="p-1 m-2 w-11/12 outline-none border-1" name="confirmPass" id="confirmPass" />
                </div>
                <div className='w-fit' onClick={(e)=>{
                    handleSubmit(e)
                    console.log("click")
                }}>
                <BlueButton  text="Update"/>
                </div>
            </form>
            <ToastContainer />
        </main>
    </div>
  )
}
