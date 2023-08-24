import { Helmet } from 'react-helmet-async'
import {HiMagnifyingGlass} from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../Context/context'
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
export const Header = () => {
   let userData = JSON.parse(localStorage.getItem("user"))
   const [user, setUser] = useState(userData)
    const navigate = useNavigate()
    const {state, dispatch} = Context()
    console.log(state)
    const {cartItems} = state.cart
   
    return (
        <header className="bg-zinc-800 flex flex-col md:flex-row justify-around  p-3">
            
            <div className='flex flex-row  gap-4 mb-2'>
                <Helmet>
                    <title>Amazona</title>
                </Helmet>
                <button  className="text-white text-2xl font-medium m-auto" onClick={()=>{
                    navigate('/')
                }}>amazona</button>
                <form action="#" className='m-auto'>
                    <div className='flex justify-center '>
                        <input type="text" className='rounded-tl-md rounded-bl-md' />
                        <button type="button" className='bg-yellow-400  text-black font-extrabold text-2xl rounded-tr-md rounded-br-md'><HiMagnifyingGlass /></button>
                    </div>
                </form>
            </div>
            <nav className='flex flex-row gap-2 text-white m-auto md:m-0'>
                <div className='flex'>
                <button  className="" > <Link to="/cart">
                    Cart
                </Link>
                </button>
                {cartItems.length>0 && <span className='bg-red-600 text-white rounded-full h-5 w-5 flex justify-center m-auto align-middle font-bold text-sm'>{cartItems.reduce((a,c)=>a + c.quantity,0)}</span>}
                </div>
                <button  className="">Seller</button>
                {userData &&  <NavDropdown title={userData.name}>
                    <NavDropdown.Item>
                        <Link to="/profile">User Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to="/history">Order History</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <hr />
                    <p onClick={()=>{
                        localStorage.removeItem("user")
                        navigate("/signin")
                        dispatch({
                            type: "REMOVE_USER",
                        })
                        setUser("")
                    }}>Sign Out</p>
                    </NavDropdown.Item>
                </NavDropdown>}
                <button  className="">
                    {!userData && 
                    <Link to="/signin">
                        Sign In
                    </Link> }
                </button>
            </nav>
            
        </header>
    )
}