import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import { BsStarHalf} from 'react-icons/bs'
export default function Rating({rating,reviews}) {
   
  return (
    <div className='flex gap-5'>
      <div className='flex'>
      {rating>=1 ? <AiFillStar className='text-yellow-400'/>
      : rating>= 0.5 && <BsStarHalf className='text-yellow-400'/>}

    {rating>=2 ? <AiFillStar className='text-yellow-400'/>
      : rating>= 1.5 && <BsStarHalf className='text-yellow-400'/>}

    {rating>=3 ? <AiFillStar className='text-yellow-400'/>
      : rating>= 2.5 && <BsStarHalf className='text-yellow-400'/>}

    {rating>=4 ? <AiFillStar className='text-yellow-400'/>
      : rating>= 3.5 && <BsStarHalf className='text-yellow-400'/>}

      {rating>=5 ? <AiFillStar className='text-yellow-400'/>
      : rating>= 4.5 && <BsStarHalf className='text-yellow-400'/>}

      </div>
      <p className='text-yellow-500'>{reviews} reviews</p>
    </div>
  )
}
