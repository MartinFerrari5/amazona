import {Header} from "./Header"
import {Item} from "./Item"
import {SignIn} from "../Screen/SignIn"
import {SignUp} from "../Screen/SignUp"
import {Shipping} from "../Screen/Shipping"
import {Payment} from "../Screen/Payment"
import {Order} from "../Screen/Order"
import {History} from "../Screen/History"
import {Profile} from "../Screen/Profile"
import {NotFound} from "./NotFound"
import {Cart} from "./Cart"
import Main from "./Main"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PlaceOrder } from "../Screen/PlaceOrder"
const router = createBrowserRouter([{
    path: "/",
    element: <>
    <Header /> 
    <Main/></>
    },
    {
      path: "product/:slug",
      element: <>
      <Header /> 
      <Item />
      </>
    },
    {
      path: "cart",
      element: <>
      <Header />
      <Cart />
      </>
    },
    {
      path: "/*",
      element: <>
      <Header/>
      <NotFound/>
      </>
    },
    {
      path:"/signin",
      element: <>
       <Header/>
      <SignIn/>
      </>
    },
    {
      path:"/shipping",
      element: <>
       <Header/>
      <Shipping />
      </>
    },
    {
      path:"/payment",
      element: <>
       <Header/>
      <Payment />
      </>
    },
    {
      path:"/place-order",
      element: <>
       <Header/>
      <PlaceOrder />
      </>
    },
    {
      path:"/signup",
      element: <>
      <Header/>
     <SignUp />
     </>
    },
    {
      path:"/order/:id",
      element: <>
      <Header/>
      <Order />
      </>
    },
    {
      path: "/history",
      element: <>
        <Header />
        <History />
      </>
    },
    {
      path: "/profile",
      element: <>
      <Header />
        <Profile />
      </>
    }
  ])
export const App = () => {
  const year = new Date().getFullYear()
    return (<main className=" h-screen">
    <RouterProvider router={router} />
    <footer className="font-bold text-center text-xs">All Rights Reserved {year}</footer>
    </main>)
}