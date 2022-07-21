import axios from 'axios'
import React,{useState,useEffect} from 'react'
import SearchUser from '../../components/SearchUser'
import { searchRoute } from '../../utils/apiRoutes'
import img from './cover.png'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export default function Search() {

    const [searchInput, setSearchInput] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const [token,setToken] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
      const localStorageData = JSON.parse(localStorage.getItem('viigram_access_token'))

      if(!localStorageData){
        navigate('/login')
      }
      
      const token1  = localStorageData.token
      setToken(token1)
      if(searchInput !== ""){
        axios.post(searchRoute,{token: token, str: searchInput})
        .then((res)=>{
            if(res.data.status === true){

              setSearchData(res.data.result)
            }
            
          })
      }
    },[])




  return (
    <div className='h-full w-full p-4 overflow-hidden'>
        <div className='w-full flex items-center gap-2 border-2 p-1 px-2 rounded-xl sticy top-0'>
            <svg className={`h-[17px] w-[17px] opacity-50`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
            <input onFocus={()=>setIsClicked(true)} className= "w-full outline-none border-none text-sm p-1" autoComplete='off' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search viigram'/>
        </div>
        {isClicked === true && 
          <div className='results w-[96%] h-full absolute bg-white overflow-y-auto transition duration-500'>
            {searchData !== null && searchData.map((user,key)=>{

              return (<SearchUser key={key} to={"/profile?user="+user._id} img={img} fullname={`${user.fullname}`} username={`@${user.username}`} />)
            })}
          </div>
        }

        {/* grid */}

        <div className='explore flex flex-col gap-2 pt-3 overflow-y-auto'>
        <div className='title pb-2'>
          <h4>Explore Viigram</h4>
        </div>
          <div className='grid grid-cols-3 gap-2'>
            <a href='/' className='row-span-2'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/' className='col-span-2'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/' className='row-span-2'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <a href='/' className='row-span-2'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/' className='col-span-2'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/' className='row-span-2'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
            <a href='/'>
              <img className='w-full h-full object-cover' src={img} alt="discover" />
            </a>
          </div>
        </div>


    </div>
  )
}
