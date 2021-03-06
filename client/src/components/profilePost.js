import React from 'react'

export default function ProfilePost(props) {
  return (
    <a href={`/post?p=${props.to}`} className='w-full h-[80px] block rounded-md'>
        <img src={props.img} alt="Post" className='w-full h-full object-cover rounded-sm' />
    </a>
  )
}
