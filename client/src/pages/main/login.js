import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { loginRoute } from '../../utils/apiRoutes'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const hideFunc = props.hide
    const navigate = useNavigate()
    useEffect(()=>{
        hideFunc()
    })

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async(e)=>{

        //Validation
        e.preventDefault()

        if(email === "" || password === ""){
            setError("Incorrect email or password")
        }else{

            axios.post("http://localhost:3001/api/auth/login", 
                {
                    email:email,
                    password:password

                }).then((response)=>{
                    if(response.data.status === false){
                        setError(response.data.msg)
                    }else{
                        const token = response.data
                        localStorage.setItem('viigram_access_token',JSON.stringify(token))
                        navigate('/')
                    }
                }).catch((error)=>{
                    console.log(error);
                })
        }
    }

    const inputClass = "border mt-2 rounded-[4px] font-mormal p-2  text-sm border-slate-200 outline-none focus:border-black block w-full text-black"
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <div className='logo'>
            <span className='text-xl font-semibold'>ViiGram</span>
        </div>

        <form className='w-full p-[40px] pt-8 ' onSubmit={(e)=>handleLogin(e)} autoComplete='off'>
            <div className='title text-center'>
                <h4 className='font-medium pb-2'>Login into your account</h4>
            </div>

            <div className='field w-full'>
                <input className={`${inputClass}`} value={email} onChange={(e)=> setEmail(e.target.value)}  type={'email'} placeholder="Email"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={password} onChange={(e)=>{setPassword(e.target.value)}}  type={'password'} placeholder="Password"/>
            </div>
            <div className='w-full text-right pr-1'>
                <a href='/auth/resetpassword' className='text-xs opacity-75 font-normal hover:underline'>Forgot password</a>
            </div>
            <div className='submit pt-2'>
                <button className='w-full bg-pink-300 hover:bg-pink-400  transition-all duration-300 p-[5px] cursor-pointer text-white font-normal rounded' type='submit'>Login</button>
            </div>
            <div className='text-center'>
                <span className='text-xs text-red-500'>{error}</span>
            </div>

            <div className='text-center pt-4'>
                <span className='text-xs'>Don't have account? <a href='/signup' className='text-blue-400 hover:underline'>Create one</a></span>
            </div>
        </form>
    </div>
  )
}
