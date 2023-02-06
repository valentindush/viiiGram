import React,{useState,useEffect} from 'react'
import img from './cover.png'
import jwt_decode from 'jwt-decode'
import ProfilePost from '../../components/profilePost'
import axios from 'axios'
import { followRoute, getUser, unfollowRoute } from '../../utils/apiRoutes'
import { useNavigate } from 'react-router-dom'
export default function Profile() {
    const [currentUser,setCurrentUser] = useState({})
    const [posts,setPostd] = useState("0")
    const [following,setFollowing] = useState("0")
    const [followers,setFollowers] = useState("0")
    const [username,setUsername] = useState("")
    const [fullname,setFullname] = useState("")
    const [bio,setBio] = useState('Music producer || coder "|| gamer')
    const [uuid,setUuid] = useState(null)
    const [isUser, setIsUser] = useState(false)
    const navigate = useNavigate()
    const [isFollowing, setIsFollowing] = useState(false)
    
    const btn_class = (isFollowing === true)? "bg-blue-400 ":"bg-pink-400 hover:bg-pink-500"
    //Nav
    const [tab, setTab] = useState("posts")

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('viigram_access_token'))
        const s_currentUser = jwt_decode(token.token)
        
        const urlParams = new URLSearchParams(window.location.search)
        setUuid(urlParams.get('user'))
        if(uuid !== null){
            axios.post(getUser,{token: token.token, uuid})
                .then((res)=>{
                    if(res.data.status === true){
                        setCurrentUser(res.data.result)
                        setUsername(currentUser.username)
                        setFullname(currentUser.fullname)
                        setFollowers(currentUser.followers.length)
                        setFollowing(currentUser.following.length)
                        setIsUser(false)

                        currentUser.followers.forEach(er => {
                            if(er === s_currentUser.username){
                                setIsFollowing(true)
                            }else{
                                isFollowing(false)
                            }
                        });
                    }
                })
        }else{
            setCurrentUser(s_currentUser)
            setUsername(currentUser.username)
            setFullname(currentUser.fullname)
            setIsUser(true)
        }


        

    },[currentUser, currentUser.username, isFollowing, uuid])

    const handleFollow = ()=>{
        const token = JSON.parse(localStorage.getItem('viigram_access_token'))
        if(isFollowing === false){
            
            axios.post(followRoute, {token: token.token, to_id: uuid})
            .then((res)=>{
                if(res.data.status === true){
                    setIsFollowing(true)
                }
            })
        }else {
            if(isFollowing === true){
                axios.post(unfollowRoute, {token: token.token, unfollow_id: uuid})
                .then((res)=>{
                    if(res.data.status === true){
                        setIsFollowing(false)
                    }
                })
            }
        }
    }

    const logout = ()=>{
        localStorage.removeItem("viigram_access_token")
        navigate('/login')
        console.log("ffffff")
    }

    

  return (
    <div className='h-[85%] w-full overflow-hidden'>
        <div className='header p-2'>
            <div className='username text-center'><p>{fullname}</p></div>

            <div className='flex  gap-4 pt-6 items-center pl-6'>
                <div className='w-[75px] h-[80px]'>
                    <img className='rounded-full w-full h-full object-cover' src={img} alt='profile'/>
                </div>

                <div className='details flex gap-2'>
                    <div className='posts flex flex-col items-center p-1'>
                        <span className='text-lg font-semibold text-black'>{posts}</span>
                        <span className='text-sm'>posts</span>
                    </div>
                    <div className='following flex flex-col items-center p-1'>
                        <span className='text-lg font-semibold text-black'>{following}</span>
                        <span className='text-sm'>following</span>
                    </div>
                    <div className='follwers flex flex-col items-center p-1'>
                        <span className='text-lg font-semibold text-black'>{followers}</span>
                        <span className='text-sm'>followers</span>
                    </div>
                </div>

            </div>
            <p onClick={logout} className='text-sm text-red-500 hover:underline text-right mr-12 cursor-pointer'>Logout</p>


            <div className='details p-2 pl-6'>
                <p className='username p-0 font-medium'>{fullname}</p>
                <span className='bio text-xs block font-medium text-black opacity-60'>
                    @{username}
                </span>
                <span className='bio text-xs font-medium text-black opacity-60'>
                    {bio}
                </span>
            </div>

            {isUser === false && <div className='btns pl-6 flex gap-3'>
                <div className='follow'>
                    <button onClick={handleFollow} className={` transition duration-500 ease-in border-[1px] text-white p-1 px-8 rounded-md ${btn_class}`}>{isFollowing === false && "Follow"}{isFollowing === true && "Following"}</button>
                </div>
                <div className='msg'>
                    <button className='bg-whit p-1 border-[1px] border-slate-500  px-5 rounded-md'>Message</button>  
                </div>
            </div>}
            
            <div className='p-2 px-6 pt-4'>
                <nav className='w-full flex justify-around shadow-md p-1'>
                    <div onClick={()=> setTab("posts")} className='hover:bg-slate-100 p-1 w-full flex items-center justify-center cursor-pointer'>
                        <svg className='cursor-pointer' aria-label="Posts" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                        </svg>
                    </div>
                    <div onClick={()=>setTab("videos")} className='hover:bg-slate-100 p-1 w-full flex items-center justify-center cursor-pointer'>
                        <svg className='cursor-pointer' aria-label="Posts" class="_8-yf5 " color="#0095f6" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path>
                        </svg>
                    </div>
                    <div onClick={()=>setTab("taged")} className='hover:bg-slate-100 p-1 w-full flex items-center justify-center cursor-pointer'>
                        <svg className='cursor-pointer' aria-label="Tagged" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>
                    </div>
                </nav>
                {tab === "posts" && 
                <div className='posts grid grid-cols-3 gap-[2px] pt-2 h-full overflow-auto'>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                    <ProfilePost img={img} to="ijhsgajavbalfshas"/>
                </div>
                }
            </div>
        </div>
    </div>
  )
}
