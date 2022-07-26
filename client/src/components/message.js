import React from 'react'

export default function Message(props) {
  
  return (
    <div className={` p-2 rounded-xl max-w-[260px] ${(props.type === "right") ? "mr-0 ml-auto bg-pink-400 text-white" : "bg-slate-200"} mt-1 shadow-sm`}>
        <p className='text-sm'>{props.text}</p>
    </div>
  )
}
