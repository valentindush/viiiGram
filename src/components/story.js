import React from 'react'

export default function Story(props) {
  return (
    <div className='flex flex-col items-center cursor-pointer'>
        <div className='img w-[60px] h-[60px] border-[1px] rounded-full p-[2px] bg-gradient-to-r from-pink-400 to-red-200'>
            <img src={props.src} alt="story" className='w-full h-full rounded-full object-cover' />
        </div>
        <div className='username text-xs font-normal overflow-hidden w-[60px] text-center'>
            {props.username}
        </div>
    </div>
  )
}
