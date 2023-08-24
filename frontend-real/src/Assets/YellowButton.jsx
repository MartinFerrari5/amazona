import React from 'react'

export  function YellowButton(props) {
  return (
    <button type={props.type} className="m-2 bg-yellow-500  p-2 rounded-md text-black font-bold border-solid border-black border hover:bg-yellow-200 hover:text-yellow-600 transition-all duration-150" >{props.text}</button>
  )
}

