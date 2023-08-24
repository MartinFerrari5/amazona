import React from 'react'

export function GrayButton(props) {
  return (
    <div>
      <button type='button' disabled className='bg-gray-300  p-2 rounded-md text-gray-500 font-bold border-solid border-black border disabled:cursor-not-allowed '>{props.text}</button>
    </div>
  )
}
