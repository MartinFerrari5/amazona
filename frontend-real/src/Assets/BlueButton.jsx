import React from 'react'

export  function BlueButton(props) {
  return (
    <button type={props.type} className="m-2 bg-blue-600  p-2 rounded-md text-white font-bold border-solid   shadow-lg shadow-cyan-800/100  border-4 border-blue-200 hover:bg-blue-700" >{props.text}</button>
  )
}