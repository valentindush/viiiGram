import React,{useState} from 'react'
import img from './cover.png'
export default function Profile() {

    const [posts,setPostd] = useState("2,365")
    const [following,setFollowing] = useState("456")
    const [followers,setFollowers] = useState("345.2k")
    const [username,setUsername] = useState("Allan walker")


  return (
    <div className='h-full w-full'>
        <div className='header p-2'>
            <div className='username text-center'><p>{username}</p></div>

            <div className='flex  gap-4 pt-6 items-center pl-6'>
                <div className='w-[75px] h-[80px]'>
                    <img className='rounded-full w-full h-full object-cover' src={img} alt='profile'/>
                </div>

                <div className='details flex gap-2'>
                    <div className='posts flex flex-col items-center p-1'>
                        <span className='text-lg font-semibold text-black'>{posts}</span>
                        <span>posts</span>
                    </div>
                    <div className='following flex flex-col items-center p-1'>
                        <span className='text-lg font-semibold text-black'>{following}</span>
                        <span>following</span>
                    </div>
                    <div className='follwers flex flex-col items-center p-1'>
                        <span className='text-lg font-semibold text-black'>{followers}</span>
                        <span>followers</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
