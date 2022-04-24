import React from 'react'

export default function Message(props) {

    const alignClass = (props.type === "right") ? "mr-0 ml-auto bg-pink-400 text-white" : ""
  return (
    <div className={`bg-slate-200 p-2 rounded-xl max-w-[260px] ${alignClass} mt-1 shadow-sm`}>
        <p className='text-sm'>{props.text}</p>
    </div>
  )
}
