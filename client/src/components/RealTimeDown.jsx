import React from 'react'

const RealTimeDown = ({display, time}) => {
  return (
    <div className='count-down text-gray-100 mx-4 flex flex-col justify-center items-center'>
        <div className='input-count text-[27px] font-semibold'>{time}</div>
        <span className='text-gray-50 text-[14px]'>{display}</span>
    </div>
  )
}

export default RealTimeDown