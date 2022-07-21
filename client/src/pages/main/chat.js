import axios from 'axios'
import React,{useEffect,useState} from 'react'
import ChatUser from '../../components/chatUser'
import img from './cover.png'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../utils/apiRoutes'
export default function Chat() {

  const navigate = useNavigate()
  const [users,setUsers] = useState(null)
  const [accessToken, setAccessToken] = useState("")

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('viigram_access_token'))
    if(!token) navigate('/login')

    if(token){
      setAccessToken(token.token)
    }

  },[])

  useEffect(()=>{
    if(accessToken){
     axios.post(getAllUsers, {token: accessToken})
     .then((res)=>{
       if(res.data.status === true){
         setUsers(res.data.users)
       }
     }).catch((err)=>{
       console.log(err)
     })
   }
  },[])


  return (
    <div className='h-full  px-5 overflow-auto'>
        <div className=' sticky py-1 px-1 top-0 bg-white z-10'>
            <h4 className='font-medium'>Chats</h4>
        </div>

        <div className='users w-full flex h-full flex-col gap-2 overflow-y-auto'>
            {users != null &&
              users.map((user)=>{

                return <ChatUser username={user.username} img={img} to={`/chat/message?to=${user.username}`} lastmsg= "Workin" />
              })
            }

        </div>
    </div>
  )
}
