import React from 'react'

export default function Message({msg}) {
  
  return (
    <div className={` p-2 rounded-xl w-fit break-words  max-w-[260px] ${(msg.sender === "me") ? "mr-0 ml-auto bg-pink-400 text-white" : "bg-slate-200"} mt-1 shadow-sm`}>
        <p className='text-sm'>{msg.msg}</p>
    </div>
  )
}
