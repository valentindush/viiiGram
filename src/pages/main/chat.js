import React from 'react'
import ChatUser from '../../components/chatUser'
import img from './cover.png'
export default function Chat() {
  return (
    <div className='h-full py-2 px-5'>
        <div className='title'>
            <h4 className='font-medium'>Chats</h4>
        </div>

        <div className='users'>
            <ChatUser username={"Pro_ghee"} img={img} lastmsg="Hello there !"/>
        </div>
    </div>
  )
}
