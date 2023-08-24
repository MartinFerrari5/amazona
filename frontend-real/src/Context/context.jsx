import React, { createContext, useContext, useReducer } from 'react'



const initialItems = {
  cart:{
    cartItems: localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem("cartItems"))
    : []
  },
  userInfo: JSON.parse(localStorage.getItem("user")),
  shippingData: localStorage.getItem("shippingData") ? JSON.parse(localStorage.getItem("shippingData")) 
  : {},
  paymentMethod: localStorage.getItem("paymentMethod") ? localStorage.getItem("paymentMethod")
  : "",
}

const reducer = (state, action) => {
  switch (action.type){
    case "CART_ADD_ITEM":
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        item => item._id == newItem._id
      )
      let cartItems = existItem ? state.cart.cartItems.map(item=>
        item._id === existItem._id ? newItem: item):
      [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return {...state, cart:{...state.cart, cartItems}}
    
      case "DELETE_ITEM":
        const deleteItem = action.payload.item
      console.log(deleteItem)
       const items = state.cart.cartItems.filter(i=>  i._id !== deleteItem._id)
       console.log(items)
       localStorage.setItem("cartItems", JSON.stringify(items))
        return {...state, cart:{...state.cart, cartItems:items}}
      case "CART_CLEAR":
        localStorage.removeItem("cartItems")
        localStorage.removeItem("paymentMethod")
        return{...state, cart:{cartItems:[]}}
      case "SAVE_USER":
        console.log(action.payload)
        localStorage.setItem("user", JSON.stringify(action.payload))
        return {...state, userInfo: action.payload}
      case "REMOVE_USER":
        localStorage.removeItem("cartItems")
        localStorage.removeItem("shippingData")
        localStorage.removeItem("paymentMethod")
        return {...state, cart:{cartItems:[]},userInfo:null,
      shippingData:{}}
      case "SAVE_SHIPPING_DATA":
        localStorage.setItem("shippingData", JSON.stringify(action.payload))
        return {...state, shippingData:action.payload}
      case "SAVE_METHOD":
        localStorage.setItem("paymentMethod", action.payload)
        return {...state, paymentMethod:action.payload}
        case "SAVE_PROFILE":
          localStorage.setItem("user", JSON.stringify(action.payload))
          return{...state, userInfo: action.payload}
      default:
        return state;
  }
}

export const CommerceContext = createContext();

export const Context = () => {
    return useContext(CommerceContext)
}

export const CommerceContextProvider=(props)=> {
  const [state, dispatch] = useReducer(reducer, initialItems);
  const value = {state, dispatch}
  
  return (
   <CommerceContext.Provider value={value}>
    {props.children}
   </CommerceContext.Provider>
  )
}
