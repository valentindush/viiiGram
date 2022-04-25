import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { signUpRoute } from '../../utils/apiRoutes'
import { useNavigate } from 'react-router-dom'
export default function Signup(props) {
    const navigate = useNavigate()
    const hideFunc = props.hide
    useEffect(()=>{
        hideFunc()
    })
    const inputClass = "border mt-2 rounded-[4px] font-mormal p-2  text-sm border-slate-200 outline-none focus:border-black block w-full text-black"

    const [fullname ,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassoword] = useState("")

    const [err,setErr] = useState("")

    const isEmpty = (str)=>{
        if(str === "") return true

        return false
    }

    const handleSignUp = (e)=>{
        e.preventDefault()
        //validation
        if(isEmpty(fullname) || isEmpty(username) || isEmpty(email) || isEmpty(password)){
            setErr("all fields are required")
        }else if(fullname.length < 4 || fullname.length > 20){
            setErr("must not contain specail characters and must be between 4 an 20 characters")
        }else if(username.length < 4 || username.length > 20){
            setErr("Username must not contain specail characters and must be between 4 an 20 characters")
        }else if(password.length < 8 || password.length > 20){
            setErr('Password must be atleast 8 characters and not more than 20')
        }else{


            //REQUEST

            axios.post(signUpRoute,
                {
                    fullname: fullname,
                    username: username,
                    email: email,
                    password: password
                }).then((res)=>{
                    
                    if(res.data.status ===true){
                        console.log(res.data)
                        const accessToken = res.data

                        console.log(accessToken);
                        localStorage.setItem('viigram_access_token',JSON.stringify(accessToken))
                        navigate('/')
                    }
                })
        }
        
    }

  return (
    <div className='h-full  w-full flex flex-col justify-center items-center'>
        <div className='logo pb-5'>
            <span className='text-xl font-semibold'>ViiGram</span>
        </div>
        <div className=''>
            <p className='text-sm'>Signup to see photos and videos from your friends</p>
        </div>
        <form className='w-full p-[40px] pt-4 ' autoComplete='off' onSubmit={(e)=>handleSignUp(e)}>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={email} onChange={(e)=>setEmail(e.target.value)}  type={'email'} placeholder="Email address"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={fullname} onChange={(e)=>setFullName(e.target.value)} type={'text'} placeholder="Full name"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={username} onChange={(e)=>setUsername(e.target.value)} type={'text'} placeholder="username"/>
            </div>
            <div className='field w-full'>  
                <input className={`${inputClass}`} value={password} onChange={(e)=> setPassoword(e.target.value)} type={'password'} placeholder="Password"/>
            </div>
            <div className='submit pt-2'>
                <button className='w-full bg-pink-300 hover:bg-pink-400  transition-all duration-300 p-[5px] cursor-pointer text-white font-normal rounded' type='submit'>Create account</button>
            </div>
            <div className='text-center'>
                <p className='text-xs'>By creating account you agree to our <a className='text-blue-400' href='/signup/#'>terms</a> and <a className='text-blue-400' href='/signup/#'>policies</a></p>
            </div>
            <div className='text-center'>
                <span className='text-xs text-red-500 animate-pulse'>{err}</span>
            </div>

            <div className='text-center pt-4'>
                <span className='text-xs'>Already have account? <a href='/login' className='text-blue-400 hover:underline'>login now</a></span>
            </div>
        </form>
    </div>
  )
}