import React from 'react'

export  function ProgressBar(props) {
  return (
    <div  className="grid grid-cols-3 w-full text-center m-2">
        <div id={props.shipping} className='flex flex-col gap-3 text-zinc-400 font-bold'>
            <p>Shipping</p>
            <span className='border-4 rounded-l-md'/>
        </div>
        <div id={props.payment} className='flex flex-col gap-3 text-zinc-400 font-bold'>
        <p>Payment</p>
            <span className='border-4 '/>
        </div>
        <div id={props.order} className='flex flex-col gap-3 text-zinc-400 font-bold'>
        <p>Place Order</p>
            <span className='border-4 rounded-r-md'/>
        </div>
    </div>
  )
}
