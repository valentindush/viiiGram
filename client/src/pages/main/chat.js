import React from 'react'
import ChatUser from '../../components/chatUser'
import img from './cover.png'
export default function Chat() {
  return (
    <div className='h-full  px-5 overflow-auto'>
        <div className=' sticky py-1 px-1 top-0 bg-white z-10'>
            <h4 className='font-medium'>Chats</h4>
        </div>

        <div className='users w-full flex h-full flex-col gap-2 overflow-y-auto'>
            <ChatUser username={"Pro_ghee"} to="/chat/message" img={img} lastmsg="Hello there !"/>


        </div>
    </div>
  )
}
