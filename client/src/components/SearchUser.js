import React from 'react'

export default function SearchUser(props) {
  return (
    <a href={props.to}>
      <div className='p-1 flex items-center gap-2 relative cursor-pointer hover:bg-slate-100'>
        <img className='h-[40px] w-[40px] object-cover rounded-full' src={props.img} alt="userPic" />
        <div className='flex flex-col items-center text-sm'>
            <span className='font-medium'>{props.fullname}</span>
            <span className='text-xs opacity-40 font-normal'>{props.username}</span>
        </div>
        <div className='absolute right-2'>
            <svg className='w-[15px] h-[15px] opacity-25' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"/></svg>
        </div>
    </div>
    </a>
  )
}
