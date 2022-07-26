import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/message'
import axios from 'axios'
import img from './cover.png'

export default function Messanger() {

  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const [receiverData,setReceiverData] = useState({})

  useEffect(()=>{

    const urlParams = new URLSearchParams(window.location.search)
    const token = JSON.parse(localStorage.getItem('viigram_access_token'))
    const msg_to = urlParams.get('to')

    if(!token) navigate('/login')

    if(!msg_to) navigate("/chat")

    //Get user data

    
    


  },[])

  

  return (
    <div className='h-[85%] overflow-auto'>
        <header className='bg-slate-100 w-full h-12 sticky top-0 z-[1000] flex justify-between items-center'>
            <div className='flex items-center gap-1 p-1 pl-3'>
                <a href='/chat'>
                  <svg className='w-[15px] opacity-70' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/>
                  </svg>
                </a>
                <img className='w-[30px] h-[30px] object-cover rounded-full' src={img} alt='mdf'/>
                <span className='text-sm font-medium'>manzi_dickson</span>
            </div>
            <div className='flex flex-row-reverse gap-2 items-center'>
              <div className='st px-3'>
                <svg className='h-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>
              </div>
              <div className='vid px-2'>
                <svg className='h-[16px] w-[16px] opacity-70' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z"/></svg>
              </div>
              <div className='aud'>
                <svg className='h-14px] w-[15px] opacity-70' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg>
              </div>

            </div>
        </header>
        <div className='msg overflow-auto p-1 h-[90%]'>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="left" text="Hello thee This is vigram you wanna have a talk"/>
            <Message type="right" text="Hello thee This is vigram you wanna have a talk"/>
        </div>

        <div className='input sticky bg-white p-1 flex items-center bottom-[0px] w-full'>
            <div className='icons'>
              <div className='emoji h-[40px] p-2 absolute top-[6px] rounded-l-full'>
                <svg className='h-[20px] fill-slate-600 w-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>
              </div>
            </div>
            <div className=''>
              <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} className='resize-none border border-slate-400 block p-2 rounded-full text-black text-sm outline-none pl-8 h-[40px] w-[300px]' placeholder='Type message ...'></textarea>
            </div>
            <div className='flex gap-2 p-1 items-center'>
              <div className='aud p-1 cursor-pointer '>
                <svg className='h-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 352c53.03 0 96-42.97 96-96h-80C199.2 256 192 248.8 192 240S199.2 224 208 224H288V192h-80C199.2 192 192 184.8 192 176S199.2 160 208 160H288V127.1h-80c-8.836 0-16-7.164-16-16s7.164-16 16-16L288 96c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z"/></svg>
              </div>
              <div className='send px-3 py-2 cursor-pointer  bg-pink-300  rounded-xl'>
                <svg className='w-[20px] fill-white h-[20px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.10514201,11.8070619 L2.74013818,2.2520351 L22.236068,12 L2.74013818,21.7479649 L4.10514201,12.1929381 L4.87689437,12 L4.10514201,11.8070619 Z M5.25986182,5.7479649 L5.89485799,10.1929381 L13.1231056,12 L5.89485799,13.8070619 L5.25986182,18.2520351 L17.763932,12 L5.25986182,5.7479649 Z"/>
                </svg>
              </div>
            </div>
        </div>
    </div>
  )
}
